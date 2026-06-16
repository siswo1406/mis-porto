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
        Schema::create('menu_logdocs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('link');
            $table->text('akses')->nullable();
            $table->string('kodemenu')->unique();
            $table->bigInteger('dilihat')->default(0);
            $table->integer('kategori')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_logdocs');
    }
};
