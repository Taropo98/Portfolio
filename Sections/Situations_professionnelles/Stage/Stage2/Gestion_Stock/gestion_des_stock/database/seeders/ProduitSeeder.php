<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produit;

class ProduitSeeder extends Seeder
{
    public function run()
    {
        Produit::create([
            'nom_produit' => 'Produit exemple',
            'quantite' => 100,
            'lieu_id' => 1, // Remplacez par un ID de catégorie existant
        ]);
    }
}