<?php

use App\Http\Controllers\Seeker\SeekerResumeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard/resume', [SeekerResumeController::class, 'index'])->name('seeker.resume');
    Route::post('dashboard/resume', [SeekerResumeController::class, 'store'])->name('seeker.resume.store');

    Route::get('dashboard/resume/view', [SeekerResumeController::class, 'show'])->name('seeker.resume.show');

});
