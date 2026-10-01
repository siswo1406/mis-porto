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
        Schema::create('tax_stps', function (Blueprint $table) {
            $table->id();
            $table->string('ap');
            $table->string('jenis_pajak');
            $table->string('bulan', 2);
            $table->integer('tahun');
            $table->string('nomor_stp')->nullable();
            $table->date('tanggal_bayar')->nullable();
            $table->date('tanggal_stp')->nullable();
            $table->decimal('nominal', 15, 2)->default(0);
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
        Schema::dropIfExists('tax_stps');
    }
};
