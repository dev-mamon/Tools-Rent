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

        // Get unique contacts you have messaged with
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
                    'avatar' => $user->avatar_url ?? 'https://ui-avatars.com/api/?name='.urlencode($user->name).'&background=437C61&color=fff',
                    'lastMsg' => $lastMsg?->message ?? '',
                    'time' => $lastMsg?->created_at->toIso8601String() ?? null,
                    'unread_count' => Message::where('sender_id', $user->id)
                        ->where('receiver_id', $authId)
                        ->where('is_read', false)->count(),
                ];
            })
            // Sort by time so newest is on top
            ->sortByDesc('time')->values();

        $messages = [];
        $selectedUserData = null;
        if ($selectedUserId) {
            $user = User::findOrFail($selectedUserId);
            $selectedUserData = [
                'id' => $user->id, 'name' => $user->name, 'avatar' => $user->avatar_url ?? 'https://ui-avatars.com/api/?name='.urlencode($user->name),
            ];

            $messages = Message::where(function ($q) use ($authId, $selectedUserId) {
                $q->where('sender_id', $authId)->where('receiver_id', $selectedUserId);
            })->orWhere(function ($q) use ($authId, $selectedUserId) {
                $q->where('sender_id', $selectedUserId)->where('receiver_id', $authId);
            })->orderBy('created_at', 'asc')->get()->map(fn ($m) => [
                'id' => $m->id, 'message' => $m->message, 'sender_id' => $m->sender_id,
                'is_sent_by_me' => $m->sender_id == $authId,
                'created_at_full' => $m->created_at->toIso8601String(),
                'is_read' => $m->is_read,
            ]);

            // Auto-mark as read
            Message::where('sender_id', $selectedUserId)->where('receiver_id', $authId)->update(['is_read' => true]);
        }

        return Inertia::render('User/Message/Index', [
            'chatList' => $chatList,
            'selectedUser' => $selectedUserData,
            'messages' => $messages,
            'authUser' => ['id' => $authId, 'name' => Auth::user()->name],
        ]);
    }

    public function store(Request $request)
    {
        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'is_read' => false,
        ]);

        broadcast(new MessageSent($message, Auth::user(), $request->receiver_id))->toOthers();

        return back();
    }

    public function markRead(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
        ]);

        // Update all unread messages from this sender to the current user
        Message::where('sender_id', $request->sender_id)
            ->where('receiver_id', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        // Return back to refresh the Inertia props (updates the sidebar counts)
        return back();
    }

    public function typing(Request $request)
    {
        broadcast(new UserTyping(Auth::user(), $request->receiver_id, $request->is_typing))->toOthers();

        return back();
    }
}
