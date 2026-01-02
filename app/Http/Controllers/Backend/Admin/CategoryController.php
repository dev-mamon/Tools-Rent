<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // index
    public function index(Request $request)
    {
        $products = Category::query()
            ->when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%");
            })
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/Category/Index', [
            'products' => $products, // নিশ্চিত করুন এই কি-নামটি ঠিক আছে
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }
}
