<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Tool;
use Inertia\Inertia;

class BrowseToolsController extends Controller
{
    public function browseTools()
    {
        return Inertia::render('Frontend/BrowseTools');
    }

    public function browseToolsDetails($slug)
    {
        $tool = Tool::with(['images', 'user', 'category'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Frontend/BrowseToolsDetails', [
            'tool' => $tool,
        ]);
    }
}
