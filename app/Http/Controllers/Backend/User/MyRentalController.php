<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MyRentalController extends Controller
{
    public function index()
    {
        return Inertia::render('User/My-rental/Index');
    }
}
