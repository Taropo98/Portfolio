<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id('id_produit'); // Primary key
            $table->string('nom_produit'); // Name of the product
            $table->integer('quantite'); // Quantity
            $table->integer('limite');
            $table->string('description')->nullable(); // Optional description
            $table->string('code_produit')->unique(); // Unique code for the product
            $table->unsignedBigInteger('categorie_id'); // Foreign key to rays
            $table->timestamps(); // Created and updated timestamps

            // Define the foreign key constraint
            $table->foreign('categorie_id')->references('id_categorie')->on('categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};