<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $table = 'produits';
    protected $primaryKey = 'id_produit';

    protected $fillable = [
        'nom_produit',
        'quantite',
        'limite',
        'description',
        'code_produit',
        'categorie_id',
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id', 'id_categorie');
    }
}