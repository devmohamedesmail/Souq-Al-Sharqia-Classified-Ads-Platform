<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->longText('website_name')->nullable();
            $table->longText('description')->nullable();
            $table->longText('keywords')->nullable();
            $table->longText('favicon')->nullable();
            $table->longText('phone')->nullable();
            $table->longText('email')->nullable();
            $table->longText('logo')->nullable();
           

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
