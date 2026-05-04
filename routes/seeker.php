<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard/resume', [\App\Http\Controllers\Seeker\SeekerResumeController::class, 'index'])->name('seeker.resume');
});
