<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lieu;

class LieuSeeder extends Seeder
{
    public function run()
    {
        Lieu::create([
            'nom_lieu' => 'Electro',
            'description' => 'Produits electroniques',
        ]);
    }
}