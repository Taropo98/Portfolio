<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::create([
            'login_admin' => 'admin',
            'password_admin' => bcrypt('admin'),
            'email_admin' => 'mailtempo@gmail.com', // Laisser l'email vide si le champ est nullable
        ]);
    }
}