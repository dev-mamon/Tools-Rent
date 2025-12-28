<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreToolRequest;
use App\Models\Tool;
use App\Models\ToolImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MyListingController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();

        $perPage = $request->input('per_page', 10);

        $tools = Tool::where('user_id', $userId)
            ->with(['images'])
            ->latest()
            ->paginate((int) $perPage)
            ->withQueryString();

        $totalCount = Tool::where('user_id', $userId)->count();
        $activeRentals = Tool::where('user_id', $userId)->where('status', 'approved')->count();
        $pendingApprovals = Tool::where('user_id', $userId)->where('status', 'pending')->count();

        return inertia('User/Listing/Index', [
            'tools' => $tools,
            'totalCount' => $totalCount,
            'activeRentals' => $activeRentals,
            'pendingApprovals' => $pendingApprovals,
            'queryParams' => $request->query(),
        ]);
    }

    // create
    public function create()
    {
        return Inertia::render('User/Listing/Create');
    }

    // store
    public function store(StoreToolRequest $request)
    {
        try {
            DB::beginTransaction();

            // ১. Tool Create
            $tool = Tool::create([
                'user_id' => Auth::id(),
                'name' => $request->name,
                'slug' => Str::slug($request->name).'-'.time(),
                'category' => $request->category,
                'description' => $request->description,
                'price_per_day' => $request->price_per_day,
                'user_earning' => $request->price_per_day * 0.92,
                'quantity' => $request->quantity ?? 1,
                'available_from' => $request->availability_from,
                'available_to' => $request->availability_to,
                'location_address' => $request->location,
                'lat' => $request->lat,
                'lng' => $request->lng,
                'status' => 'pending',
            ]);

            // ২. Image handling
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {

                    $path = $image->store('tools', 'public');
                    ToolImage::create([
                        'tool_id' => $tool->id,
                        'image_path' => $path,
                        'image_name' => $image->getClientOriginalName(),
                        'image_extension' => $image->getClientOriginalExtension(),
                        'image_size' => $image->getSize(),
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('user.my-listings.index')
                ->with('success', 'Listing submitted for approval!');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Database error: '.$e->getMessage()]);
        }
    }

    // details
    public function details()
    {
        return Inertia::render('User/Listing/Details');
    }
}
