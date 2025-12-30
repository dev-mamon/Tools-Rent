<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function checkout(Request $request, Tool $tool)
    {
        // Validate query parameters
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'quantity' => 'required|integer|min:1',
        ]);

        // Calculate pricing
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $quantity = $request->quantity;

        $totalDays = \Carbon\Carbon::parse($startDate)->diffInDays($endDate) + 1;
        $subTotal = $tool->price_per_day * $totalDays * $quantity;
        $bookingFee = 2.00; // Fixed booking fee
        $totalAmount = $subTotal + $bookingFee;

        return inertia('Frontend/Booking/Checkout', [
            'tool' => $tool->load('user'),
            'bookingData' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'quantity' => $quantity,
                'total_days' => $totalDays,
                'price_per_day' => $tool->price_per_day,
                'sub_total' => $subTotal,
                'booking_fee' => $bookingFee,
                'total_amount' => $totalAmount,
            ],
        ]);
    }

    // Process booking request
    public function store(Request $request, Tool $tool)
    {
        // 1. Validation
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'quantity' => 'required|integer|min:1',
            'special_instructions' => 'nullable|string|max:500',
            'payment_method' => 'required|in:stripe,paypal,bank_transfer,cash',
            'agree_terms' => 'required|accepted',
        ]);

        return DB::transaction(function () use ($validated, $tool) {

            $lockedTool = Tool::where('id', $tool->id)->lockForUpdate()->firstOrFail();

            $startDate = Carbon::parse($validated['start_date']);
            $endDate = Carbon::parse($validated['end_date']);
            $requestedQty = $validated['quantity'];

            $daysInRange = $startDate->diffInDays($endDate) + 1;
            $overlappingBookings = Booking::where('tool_id', $lockedTool->id)
                ->whereIn('status', ['confirmed', 'in_progress'])
                ->where(function ($query) use ($validated) {
                    $query->whereBetween('start_date', [$validated['start_date'], $validated['end_date']])
                        ->orWhereBetween('end_date', [$validated['start_date'], $validated['end_date']])
                        ->orWhere(function ($q) use ($validated) {
                            $q->where('start_date', '<=', $validated['start_date'])
                                ->where('end_date', '>=', $validated['end_date']);
                        });
                })
                ->get();
            for ($i = 0; $i < $daysInRange; $i++) {
                $checkDate = $startDate->copy()->addDays($i);

                $bookedOnThisDay = $overlappingBookings->filter(function ($booking) use ($checkDate) {
                    return $checkDate->between($booking->start_date, $booking->end_date);
                })->sum('quantity');

                $availableStock = $lockedTool->quantity - $bookedOnThisDay;

                if ($requestedQty > $availableStock) {
                    return redirect()->back()->withErrors([
                        'quantity' => "Sorry, only $availableStock units are available on ".$checkDate->format('M d, Y'),
                    ])->withInput();
                }
            }

            // ৪. Calculations
            $totalDays = $daysInRange;
            $subTotal = $lockedTool->price_per_day * $totalDays * $requestedQty;
            $bookingFee = 2.00;
            $totalAmount = $subTotal + $bookingFee;

            // ৫. Create Booking
            $booking = Booking::create([
                'tool_id' => $lockedTool->id,
                'renter_id' => Auth::id(),
                'lender_id' => $lockedTool->user_id,
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'quantity' => $requestedQty,
                'total_days' => $totalDays,
                'price_per_day' => $lockedTool->price_per_day,
                'sub_total' => $subTotal,
                'booking_fee' => $bookingFee,
                'total_amount' => $totalAmount,
                'special_instructions' => $validated['special_instructions'],
                'status' => 'pending',
            ]);

            // ৬. Create Payment
            $payment = Payment::create([
                'booking_id' => $booking->id,
                'user_id' => Auth::id(),
                'transaction_id' => 'PAY-'.\Illuminate\Support\Str::random(16),
                'amount' => $totalAmount,
                'payment_method' => $validated['payment_method'],
                'payment_gateway' => $validated['payment_method'],
                'status' => 'pending',
                'payment_details' => [
                    'method' => $validated['payment_method'],
                    'notes' => $validated['payment_method'] === 'cash' ? 'Cash payment' : 'Online pending',
                ],
            ]);

            // ৭. Update Status for Online Payments
            if ($validated['payment_method'] !== 'cash') {
                $payment->update([
                    'status' => 'completed',
                    'paid_at' => now(),
                ]);
                $booking->update(['status' => 'confirmed']);
            }

            // ৮. Redirect
            return redirect()->route('bookings.show', $booking->id)
                ->with('success', 'Booking successful!');
        });
    }

    public function show(Booking $booking)
    {
        // Eager load all relationships used in your React component
        $booking->load([
            'tool.images',
            'lender',
            'renter',
            'payment',
        ]);

        return inertia('Frontend/Booking/BookingShow', [
            'booking' => $booking,
        ]);
    }
}
