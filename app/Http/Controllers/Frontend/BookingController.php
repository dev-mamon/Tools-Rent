<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            'end_date' => 'required|date|after:start_date',
            'quantity' => 'required|integer|min:1',
            'special_instructions' => 'nullable|string|max:500',
            'payment_method' => 'required|in:stripe,paypal,bank_transfer,cash',
            'agree_terms' => 'required|accepted',
        ]);

        // 2. Calculations
        $startDate = \Carbon\Carbon::parse($validated['start_date']);
        $endDate = \Carbon\Carbon::parse($validated['end_date']);
        $totalDays = $startDate->diffInDays($endDate) + 1;

        $subTotal = $tool->price_per_day * $totalDays * $validated['quantity'];
        $bookingFee = 2.00;
        $totalAmount = $subTotal + $bookingFee;

        // 3. Create Booking
        $booking = Booking::create([
            'tool_id' => $tool->id,
            'renter_id' => Auth::id(),
            'lender_id' => $tool->user_id,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'quantity' => $validated['quantity'],
            'total_days' => $totalDays,
            'price_per_day' => $tool->price_per_day,
            'sub_total' => $subTotal,
            'booking_fee' => $bookingFee,
            'total_amount' => $totalAmount,
            'special_instructions' => $validated['special_instructions'],
            'status' => 'pending',
        ]);

        // 4. Create Payment
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

        // 5. Update Status for Online Payments
        if ($validated['payment_method'] !== 'cash') {
            $payment->update([
                'status' => 'completed',
                'paid_at' => now(),
            ]);
            $booking->update(['status' => 'confirmed']);
        }

        // 6. Redirect
        return redirect()->route('bookings.show', $booking->id)
            ->with('success', 'Booking successful!');
    }

    private function processOnlinePayment(Payment $payment, Booking $booking)
    {
        $payment->update([
            'status' => 'completed',
            'paid_at' => now(),
            'payment_details' => array_merge(
                $payment->payment_details ?? [],
                [
                    'test_mode' => true,
                    'gateway_response' => 'Test payment successful',
                    'completed_at' => now()->toDateTimeString(),
                ]
            ),
        ]);

        $booking->update(['status' => 'confirmed']);

        return redirect()->back()
            ->with('success', 'Payment completed! Your booking has been confirmed.');
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
