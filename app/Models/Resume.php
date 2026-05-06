<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resume extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'mobile_1',
        'mobile_2',
        'email',
        'current_address',
        'college_school',
        'college_year',
        'position',
        'company',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
