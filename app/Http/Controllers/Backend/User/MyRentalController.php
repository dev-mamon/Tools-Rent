<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class MyRentalController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();
        $perPage = $request->input('per_page', 10);

        $bookings = Booking::where('renter_id', $userId)
            ->with(['tool.images'])
            ->latest()
            ->paginate((int) $perPage)
            ->withQueryString()
            ->through(fn ($booking) => [
                'id' => $booking->id,
                'tool_name' => $booking->tool?->name,
                'thumbnail' => $booking->tool?->images->first()?->url,
                'start_date' => \Carbon\Carbon::parse($booking->start_date)->format('d M, Y'),
                'end_date' => \Carbon\Carbon::parse($booking->end_date)->format('d M, Y'),
                'total_days' => $booking->total_days,
                'total_amount' => number_format($booking->total_amount, 2),
                'status' => $booking->status,
            ]);

        return inertia('User/My-rental/Index', [
            'bookings' => $bookings,
            'totalBookings' => Booking::where('renter_id', $userId)->count(),
            'activeBookings' => Booking::where('renter_id', $userId)->where('status', 'in_progress')->count(),
            'pendingPayments' => Booking::where('renter_id', $userId)->where('status', 'pending')->count(),
        ]);
    }
}
