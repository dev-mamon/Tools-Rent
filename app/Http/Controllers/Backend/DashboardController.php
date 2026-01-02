<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        if (auth()->user()->is_admin) {
            return Inertia::render('Admin/Dashboard');
        }

        return Inertia::render('User/Dashboard');
    }
}
