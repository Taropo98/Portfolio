<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $primaryKey = 'id_categorie';

    protected $fillable = [
        'nom_categorie',
        'description',
        'id_lieu',
    ];

    public function lieu()
    {
        return $this->belongsTo(Lieu::class, 'id_lieu', 'id_lieu');
    }

    public function produits()
    {
        return $this->hasMany(Produit::class, 'categorie_id', 'id_categorie');
    }
}