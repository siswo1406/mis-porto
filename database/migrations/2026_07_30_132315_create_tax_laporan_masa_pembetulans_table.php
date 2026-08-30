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
        Schema::create('tax_laporan_masa_pembetulans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('laporan_masa_id')->constrained('tax_laporan_masas')->onDelete('cascade');
            $table->string('keterangan')->nullable();
            $table->date('tanggal_bayar')->nullable();
            $table->date('tanggal_lapor')->nullable();
            $table->string('nop')->nullable();
            $table->decimal('nominal', 15, 2)->nullable();
            $table->decimal('nilai_sewa', 15, 2)->nullable();
            $table->decimal('pajak_10_persen', 15, 2)->nullable();
            $table->string('bukti_bayar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tax_laporan_masa_pembetulans');
    }
};
