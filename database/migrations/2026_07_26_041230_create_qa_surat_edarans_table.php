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
        Schema::create('qa_surat_edarans', function (Blueprint $table) {
            $table->id();
            $table->string('no_surat')->unique();
            $table->date('tanggal_surat_masuk');
            $table->date('tanggal_surat_dikirim')->nullable();
            $table->string('nama');
            $table->string('keyword')->nullable();
            $table->text('link_file')->nullable();
            $table->json('pic')->nullable();
            $table->string('departemen')->nullable();
            $table->json('jabatan')->nullable();
            $table->date('tanggal_berlaku')->nullable();
            $table->date('tanggal_berakhir')->nullable();
            $table->string('status')->default('DISETUJUI');
            $table->string('nik')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qa_surat_edarans');
    }
};
