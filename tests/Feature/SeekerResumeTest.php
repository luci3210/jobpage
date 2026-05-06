<?php

use App\Models\Resume;
use App\Models\User;

function resumePayload(array $overrides = []): array
{
    return array_merge([
        'first_name' => 'Jane',
        'middle_name' => 'Marie',
        'last_name' => 'Doe',
        'mobile_1' => '123-456-7890',
        'mobile_2' => '098-765-4321',
        'email' => 'jane@example.com',
        'current_address' => '123 Main Street',
        'college_school' => 'Example University',
        'college_year' => '2026',
        'position' => 'Software Engineer',
        'company' => 'Example Co',
    ], $overrides);
}

test('guests are redirected when submitting a resume', function () {
    $this->post('/dashboard/resume', resumePayload())->assertRedirect('/login');
});

test('authenticated users can submit a resume', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from('/dashboard/resume')
        ->post('/dashboard/resume', resumePayload())
        ->assertRedirect('/dashboard/resume/view');

    $resume = Resume::query()->whereBelongsTo($user)->firstOrFail();

    expect($resume)
        ->first_name->toBe('Jane')
        ->email->toBe('jane@example.com')
        ->company->toBe('Example Co');
});

test('submitting a resume updates the existing resume for the user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->post('/dashboard/resume', resumePayload());
    $this->actingAs($user)->post('/dashboard/resume', resumePayload([
        'first_name' => 'Janet',
        'company' => 'Updated Co',
    ]));

    expect(Resume::query()->whereBelongsTo($user)->count())->toBe(1);
    expect($user->resume()->first())
        ->first_name->toBe('Janet')
        ->company->toBe('Updated Co');
});

test('first name last name and email are required to submit a resume', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from('/dashboard/resume')
        ->post('/dashboard/resume', resumePayload([
            'first_name' => '',
            'last_name' => '',
            'email' => '',
        ]))
        ->assertRedirect('/dashboard/resume')
        ->assertSessionHasErrors(['first_name', 'last_name', 'email']);
});

test('authenticated users can view their resume preview', function () {
    $user = User::factory()->create();

    $user->resume()->create(resumePayload());

    $this->actingAs($user)
        ->get('/dashboard/resume/view')
        ->assertOk();
});

test('guests are redirected from the resume preview page', function () {
    $this->get('/dashboard/resume/view')->assertRedirect('/login');
});
