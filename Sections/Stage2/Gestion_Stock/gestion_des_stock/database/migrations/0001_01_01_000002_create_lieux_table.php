<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Table des catégories
        Schema::create('lieux', function (Blueprint $table) {
            $table->id('id_lieu');
            $table->string('nom_lieu')->unique();
            $table->text('description')->nullable();
            $table->boolean('default_lieu')->default(false)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lieux');
    }
};