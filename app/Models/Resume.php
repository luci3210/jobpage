<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
