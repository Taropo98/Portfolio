<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lieu extends Model
{
    use HasFactory;

    protected $table = 'lieux';
    protected $primaryKey = 'id_lieu';

    protected $fillable = [
        'nom_lieu',
        'description',
        'default_lieu',
    ];

    // Relation One-to-Many : Un lieu peut avoir plusieurs catégories
    public function categories()
    {
        return $this->hasMany(Categorie::class, 'id_lieu', 'id_lieu'); // Relation directe
    }

    // Obtenir l'ID du lieu par défaut
    public static function getDefaultLieuId()
    {
        return self::where('default_lieu', true)->value('id_lieu');
    }
}