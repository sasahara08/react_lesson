<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => '田中太郎',
            'imgUrl' => 'default',
            'email' => 'tanaka@gmail.com',
            'password' => Hash::make('Aa12345678'),
            'remember_token' => 123
        ]);
    }
}
