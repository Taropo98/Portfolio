<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id('id'); // Id auto-incrémentée pour la clé primaire
            $table->string('login_admin'); // Nom de l'utilisateur
            $table->string('email_admin')->unique(); // Email de l'utilisateur, doit être unique
            $table->string('password_admin'); // Mot de passe haché
            $table->rememberToken(); // Jeton pour "se souvenir de moi"
            $table->timestamps(); // Colonnes 'created_at' et 'updated_at'
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};