<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            [
                'name' => 'Seeker',
                'slug' => 'seeker',
            ],
            [
                'name' => 'Employer Owner',
                'slug' => 'employer_owner',
            ],
            [
                'name' => 'Employer Staff',
                'slug' => 'employer_staff',
            ],
            [
                'name' => 'Admin',
                'slug' => 'admin',
            ],
        ]);
    }
}
