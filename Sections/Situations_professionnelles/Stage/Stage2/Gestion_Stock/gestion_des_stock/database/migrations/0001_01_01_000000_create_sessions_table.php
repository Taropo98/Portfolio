<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); // ID unique de la session
            $table->foreignId('user_id')->nullable()->index(); // Clé étrangère pour l'ID de l'utilisateur, si connecté
            $table->string('ip_address', 45)->nullable(); // Adresse IP de l'utilisateur
            $table->text('user_agent')->nullable(); // Informations sur le navigateur de l'utilisateur
            $table->text('payload'); // Données de session sérialisées
            $table->integer('last_activity')->index(); // Dernière activité en timestamp UNIX
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};