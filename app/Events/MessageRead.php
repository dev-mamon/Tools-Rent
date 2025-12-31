<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageRead implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userId;

    public $senderId;

    public $messageIds;

    public function __construct($userId, $senderId, $messageIds)
    {
        $this->userId = $userId;
        $this->senderId = $senderId;
        $this->messageIds = $messageIds;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat.'.$this->senderId);
    }

    public function broadcastAs()
    {
        return 'MessageRead';
    }
}
