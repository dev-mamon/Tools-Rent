<?php

namespace App\Http\Controllers\Backend\User;

use App\Events\MessageSent;
use App\Events\UserTyping;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $authId = Auth::id();
        $selectedUserId = $request->input('selected_user');
        $searchQuery = $request->input('search');

        // 1. Get Chat List (Users you have interacted with)
        $contactIds = Message::where('sender_id', $authId)
            ->orWhere('receiver_id', $authId)
            ->selectRaw('CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END as contact_id', [$authId])
            ->distinct()
            ->pluck('contact_id');

        $chatList = User::whereIn('id', $contactIds)
            ->get()
            ->map(function ($user) use ($authId) {
                $lastMsg = Message::where(function ($q) use ($authId, $user) {
                    $q->where('sender_id', $authId)->where('receiver_id', $user->id);
                })->orWhere(function ($q) use ($authId, $user) {
                    $q->where('sender_id', $user->id)->where('receiver_id', $authId);
                })->latest()->first();

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar ? asset('storage/'.$user->avatar) : null,
                    'lastMsg' => $lastMsg?->message ?? '',
                    'time' => $lastMsg?->created_at->toIso8601String() ?? null,
                    'unread' => Message::where('sender_id', $user->id)
                        ->where('receiver_id', $authId)
                        ->where('is_read', false)->count(),
                ];
            })->sortByDesc('time')->values();

        // 2. Handle Search Results
        $searchUsers = [];
        if ($searchQuery) {
            $searchUsers = User::where('id', '!=', $authId)
                ->where(function ($q) use ($searchQuery) {
                    $q->where('name', 'like', "%{$searchQuery}%")
                        ->orWhere('email', 'like', "%{$searchQuery}%");
                })
                ->limit(10)
                ->get()
                ->map(fn ($u) => [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'avatar' => $u->avatar ? asset('storage/'.$u->avatar) : null,
                    'isContact' => $contactIds->contains($u->id),
                ]);
        }

        // 3. Load Messages for Selected User
        $messages = [];
        $selectedUserData = null;
        if ($selectedUserId) {
            $user = User::findOrFail($selectedUserId);
            $selectedUserData = [
                'id' => $user->id,
                'name' => $user->name,
                'avatar' => $user->avatar ? asset('storage/'.$user->avatar) : null,
                'email' => $user->email,
            ];

            // Mark as read immediately on load
            Message::where('sender_id', $selectedUserId)
                ->where('receiver_id', $authId)
                ->where('is_read', false)
                ->update(['is_read' => true]);

            $messages = Message::where(function ($q) use ($authId, $selectedUserId) {
                $q->where('sender_id', $authId)->where('receiver_id', $selectedUserId);
            })->orWhere(function ($q) use ($authId, $selectedUserId) {
                $q->where('sender_id', $selectedUserId)->where('receiver_id', $authId);
            })->orderBy('created_at', 'asc')->get()->map(fn ($m) => [
                'id' => $m->id,
                'message' => $m->message,
                'sender_id' => $m->sender_id,
                'is_sent_by_me' => $m->sender_id == $authId,
                'created_at_full' => $m->created_at->toIso8601String(),
                'is_read' => $m->is_read,
            ]);
        }

        return Inertia::render('User/Message/Index', [
            'chatList' => $chatList,
            'searchUsers' => $searchUsers,
            'selectedUser' => $selectedUserData,
            'messages' => $messages,
            'authUser' => ['id' => $authId, 'name' => Auth::user()->name],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['receiver_id' => 'required', 'message' => 'required']);

        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'is_read' => false,
        ]);

        broadcast(new MessageSent($message, Auth::user(), $request->receiver_id))->toOthers();

        return back();
    }

    public function typing(Request $request)
    {
        broadcast(new UserTyping(Auth::user(), $request->receiver_id, $request->is_typing))->toOthers();
    }

    public function markRead(Request $request)
    {
        Message::where('sender_id', $request->sender_id)
            ->where('receiver_id', Auth::id())
            ->update(['is_read' => true]);

        return back();
    }
}
