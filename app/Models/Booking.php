<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'tool_id',
        'renter_id',
        'lender_id',
        'start_date',
        'end_date',
        'quantity',
        'total_days',
        'price_per_day',
        'sub_total',
        'booking_fee',
        'total_amount',
        'special_instructions',
        'status',
        'confirmed_at',
        'cancelled_at',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'price_per_day' => 'decimal:2',
        'sub_total' => 'decimal:2',
        'booking_fee' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'confirmed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    public function tool()
    {
        return $this->belongsTo(Tool::class);
    }

    public function renter()
    {
        return $this->belongsTo(User::class, 'renter_id');
    }

    public function lender()
    {
        return $this->belongsTo(User::class, 'lender_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
