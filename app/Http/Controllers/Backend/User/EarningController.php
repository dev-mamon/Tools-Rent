<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class EarningController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();

        $perPage = $request->input('per_page', 10);
        $earnings = Booking::where('lender_id', $userId)
            ->with(['tool.images'])
            ->whereIn('status', ['confirmed', 'in_progress', 'completed'])
            ->latest()
            ->paginate((int) $perPage)
            ->withQueryString()
            ->through(fn ($booking) => [
                'id' => $booking->id,
                'name' => $booking->tool?->name,
                'image' => $booking->tool?->images->first()?->image_path,
                'transactionId' => 'TRX-'.str_pad($booking->id, 8, '0', STR_PAD_LEFT),
                'rentPeriod' => \Carbon\Carbon::parse($booking->start_date)->format('d.m.y').' - '.\Carbon\Carbon::parse($booking->end_date)->format('d.m.y'),
                'rentalPrice' => number_format($booking->total_amount, 2),
                'commission' => number_format($booking->booking_fee, 2),
                'earning' => number_format($booking->total_amount - $booking->booking_fee, 2),
            ]);

        // ২. সামারি কার্ডের জন্য ক্যালকুলেশন
        // আপনার যদি ডেটাবেজে 'confirmed' বুকিং থাকে কিন্তু আপনি এখানে শুধু 'completed' খুঁজছেন,
        // তবে কার্ডে $0.00 দেখাবে। সব ইনকাম যোগ করতে চাইলে 'completed' এর জায়গায় ['confirmed', 'completed'] দিন।
        $totalEarning = Booking::where('lender_id', $userId)
            ->whereIn('status', ['confirmed', 'completed', 'in_progress'])
            ->get()
            ->sum(fn ($b) => $b->total_amount - $b->booking_fee);

        return inertia('User/Earnings/Index', [
            'earnings' => $earnings,
            'stats' => [
                'totalEarning' => number_format($totalEarning, 2),
                'totalWithdrawn' => '0.00',
            ],
        ]);
    }
}
