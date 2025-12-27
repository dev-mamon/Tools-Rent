<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Message/Index');
    }
}
