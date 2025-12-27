<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MyListingController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Listing/Index');
    }

    // create
    public function create()
    {
        return Inertia::render('User/Listing/Create');
    }

    // details
    public function details()
    {
        return Inertia::render('User/Listing/Details');
    }
}
