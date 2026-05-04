<?php

namespace App\Http\Controllers\Seeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class SeekerResumeController extends Controller
{
    public function index()
    {
        return inertia('seeker/resume');
        // $user = auth()->user();
        // $profile = $user->seekerProfile;

        // return inertia('Seeker/Resume', [
        //     'profile' => $profile,
        // ]);
    }
}
