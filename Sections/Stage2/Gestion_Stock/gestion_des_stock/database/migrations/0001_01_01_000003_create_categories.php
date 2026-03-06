<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id('id_categorie'); // unsigned big integer
            $table->string('nom_categorie');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('id_lieu')->nullable(); // Définit explicitement la clé étrangère
            $table->foreign('id_lieu')->references('id_lieu')->on('lieux')->onDelete('set null'); // Clé étrangère vers lieux
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};