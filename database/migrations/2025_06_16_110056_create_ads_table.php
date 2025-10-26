<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->nullable(); 
            $table->foreignId('place_id')->constrained()->onDelete('cascade')->nullable(); 
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('subcategory_id')->constrained()->onDelete('cascade'); 
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('price')->nullable();
            $table->longText('title')->nullable();
            $table->longText('slug')->nullable();
            $table->longText('description')->nullable();
            $table->longText('type')->nullable();
            $table->json('images')->nullable();
            $table->string('featured')->default(false);
            $table->string('published')->default(false);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->unsignedBigInteger('views')->default(0);
            $table->string('reason')->nullable();
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ads');
    }
};
