<?php

namespace App\Http\Controllers\Seeker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seeker\StoreResumeRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

        return redirect()->route('seeker.resume.show')->with('success', 'Resume saved successfully.');
    }

    public function show(Request $request): Response
    {
        return Inertia::render('seeker/resume-view', [
            'resume' => $request->user()->resume,
        ]);
    }
}
