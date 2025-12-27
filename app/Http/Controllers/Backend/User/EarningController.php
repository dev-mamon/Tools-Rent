<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class EarningController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Earnings/Index');
    }
}
