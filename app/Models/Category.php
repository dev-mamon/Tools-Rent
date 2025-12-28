<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = [
        'name',
        'slug',
        'image',
        'status',
    ];

    // scope
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
