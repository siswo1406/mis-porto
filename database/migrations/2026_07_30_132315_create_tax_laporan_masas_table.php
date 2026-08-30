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
        Schema::create('tax_laporan_masas', function (Blueprint $table) {
            $table->id();
            $table->string('jenis_pajak');
            $table->string('ap');
            $table->string('bulan', 2);
            $table->integer('tahun');
            $table->date('tanggal_bayar')->nullable();
            $table->date('tanggal_lapor')->nullable();
            $table->string('nop')->nullable();
            $table->decimal('nominal', 15, 2)->nullable();
            $table->decimal('nilai_sewa', 15, 2)->nullable();
            $table->decimal('pajak_10_persen', 15, 2)->nullable();
            $table->text('uraian')->nullable();
            $table->string('bukti_bayar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tax_laporan_masas');
    }
};
