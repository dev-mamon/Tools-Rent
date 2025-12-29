<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Tool;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrowseToolsController extends Controller
{
    public function browseTools(Request $request)
    {
        // 1. Get the highest price from the database to set the slider max dynamically
        $maxDatabasePrice = Tool::where('status', 'active')->max('price_per_day') ?? 500;

        $staticCategories = [
            'Power Tools', 'Hand Tools', 'Garden Equipment', 'Lawn Care',
            'Plumbing', 'Painting', 'Outdoor', 'Measuring',
        ];

        $query = Tool::with(['user', 'images'])
            ->where('status', 'active')
            ->where('available_to', '>=', now());

        // Filters logic (keep your existing logic here...)
        if ($request->has('categories')) {
            $selectedCategories = explode(',', $request->categories);
            $query->whereIn('category', $selectedCategories);
        }

        if ($request->has('max_price')) {
            $query->where('price_per_day', '<=', $request->max_price);
        }

        // ... rest of your delivery and date filters ...

        // Sort logic (keep your existing logic here...)
        $sort = $request->get('sort', 'recommended');
        // ... switch($sort) ...

        $tools = $query->paginate(12);

        return Inertia::render('Frontend/BrowseTools', [
            'tools' => $tools,
            'staticCategories' => $staticCategories,
            'maxDatabasePrice' => (int) $maxDatabasePrice, // Pass this to React
            'filters' => $request->only([
                'categories', 'max_price', 'sort', 'delivery_type', 'available_date',
            ]) ?: (object) [],
        ]);
    }

    public function browseToolsDetails($slug)
    {
        $tool = Tool::with(['images', 'user', 'category', 'specifications', 'guidelines'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Frontend/BrowseToolsDetails', [
            'tool' => $tool,
        ]);
    }
}
