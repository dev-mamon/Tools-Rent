<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guideline extends Model
{
    protected $table = 'guidelines';

    protected $fillable = [
        'name', 'tool_id',
    ];

    public function tool()
    {
        return $this->belongsTo(Tool::class);
    }
}
