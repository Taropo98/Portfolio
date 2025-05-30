<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';

    protected $fillable = [
        'email',
        'telephone',
        'adresse',
        'ville',
        'pays',
    ];

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'client_id', 'id_client');
    }
}