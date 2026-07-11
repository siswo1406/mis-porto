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
        Schema::create('qa_updates', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal')->nullable();
            $table->string('nik')->nullable();
            $table->string('nama')->nullable();
            $table->string('no_sop_bukusaku')->nullable();
            $table->unsignedBigInteger('item_id')->nullable();
            $table->string('item_type')->nullable();
            $table->string('file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qa_updates');
    }
};
