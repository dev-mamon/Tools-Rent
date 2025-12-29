<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Tool;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Frontend/Home', [
            'tools' => Tool::with(['images', 'user'])->where('status', 'active')->latest()->get()->take(8),
        ]);
    }
}
