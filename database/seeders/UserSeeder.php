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
        // 10user loom
        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => 'user'.$i,
                'email' => 'user'.$i.'@gmail.com',
                'password' => bcrypt('12345678'),
                'is_admin' => false,
                'email_verified_at' => now(),
            ]);
        }
    }
}
