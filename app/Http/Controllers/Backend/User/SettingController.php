<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Setting/Index');
    }

    // update password
    public function editPassword()
    {
        return Inertia::render('User/Setting/Password');
    }

    // update profile
    public function editProfile()
    {
        return Inertia::render('User/Setting/Profile');
    }
}
