<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);
        // user create
        User::create([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'password' => bcrypt('12345678'),
            'is_admin' => false,
            'email_verified_at' => now(),

        ]);
    }
}
