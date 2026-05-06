<?php

namespace App\Http\Controllers\Seeker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seeker\StoreResumeRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SeekerResumeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('seeker/resume', [
            'resume' => auth()->user()->resume,
        ]);
    }

    public function store(StoreResumeRequest $request): RedirectResponse
    {
        $request->user()->resume()->updateOrCreate([], $request->validated());

        return back()->with('success', 'Resume saved successfully.');
    }
}
