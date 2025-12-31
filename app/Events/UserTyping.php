<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserTyping implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user_id;

    public $receiver_id;

    public $is_typing;

    public function __construct(User $user, $receiver_id, $is_typing)
    {
        $this->user_id = $user->id;
        $this->receiver_id = $receiver_id;
        $this->is_typing = $is_typing;
    }

    /**
     * Broadcast on the receiver's private channel.
     */
    public function broadcastOn()
    {
        return new PrivateChannel('user.'.$this->receiver_id);
    }

    /**
     * The name the frontend is listening for: .UserTyping
     */
    public function broadcastAs()
    {
        return 'UserTyping';
    }
}
