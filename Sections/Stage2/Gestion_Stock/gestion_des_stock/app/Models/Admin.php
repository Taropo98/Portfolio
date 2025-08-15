<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable;

    protected $table = 'admins';

    protected $fillable = [
        'login_admin',
        'email_admin',
        'password_admin',
    ];

    protected $hidden = [
        'password_admin',
        'remember_token',
    ];

    // Définir 'password' comme nom de champ pour le mot de passe
    public function getAuthPassword()
    {
        return $this->password_admin;
    }
}