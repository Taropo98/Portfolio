<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategorieLieu extends Model
{
    use HasFactory;

    protected $table = 'categorie_lieu'; // Nom explicite de la table pivot

    protected $fillable = [
        'id_categorie',
        'id_lieu',
    ];

    public $timestamps = true; // Inclut les horodatages `created_at` et `updated_at`

    // Relation vers la catégorie
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie', 'id_categorie');
    }

    // Relation vers le lieu
    public function lieu()
    {
        return $this->belongsTo(Lieu::class, 'id_lieu', 'id_lieu');
    }
}