<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
    protected $fillable = [
        'name', 'tool_id',
    ];

    public function tool()
    {
        return $this->belongsTo(Tool::class);
    }
}
