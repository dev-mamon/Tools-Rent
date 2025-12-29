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
            ->with(['images', 'specifications', 'guidelines'])
            ->latest()
            ->paginate((int) $perPage)
            ->withQueryString();

        return inertia('User/Listing/Index', [
            'tools' => $tools,
            'totalCount' => Tool::where('user_id', $userId)->count(),
            'activeRentals' => Tool::where('user_id', $userId)->where('status', 'approved')->count(),
            'pendingApprovals' => Tool::where('user_id', $userId)->where('status', 'pending')->count(),
            'queryParams' => $request->query(),
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Listing/Create');
    }

    public function store(StoreToolRequest $request)
    {
        try {
            DB::beginTransaction();

            // 1. Tool Create
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

            // 2. Dynamic Relations
            if (! empty($request->guidelines)) {
                $tool->guidelines()->createMany($request->guidelines);
            }

            if (! empty($request->specifications)) {
                $tool->specifications()->createMany($request->specifications);
            }

            // 3. Image handling
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
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

            return redirect()->route('user.my-listings.index')->with('success', 'Listing submitted for approval!');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Error: '.$e->getMessage()]);
        }
    }
}
