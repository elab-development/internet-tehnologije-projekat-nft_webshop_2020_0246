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
        Schema::table('nft_collections', function (Blueprint $table) {
            $table->string('crypto_currency',80);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('nft_collections', function (Blueprint $table) {
            $table->string('crypto_currency',80);
        });
    }
};
