<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OTP extends Model
{
    protected $table = 'o_t_p_s';

    protected $fillable = [
        'user_id',
        'otp_code',
        'expires_at',
        'is_used',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
