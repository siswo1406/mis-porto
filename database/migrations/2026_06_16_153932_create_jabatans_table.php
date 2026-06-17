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
        Schema::create('jabatans', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 50)->nullable();
            $table->timestamps();
        });

        $sqlPath = base_path('database/sql/jabatan_dump.sql');
        if (file_exists($sqlPath)) {
            $content = file_get_contents($sqlPath);
            preg_match_all('/INSERT INTO `jabatan` VALUES \(.*?\);/s', $content, $matches);
            foreach ($matches[0] as $insert) {
                // Ganti nama tabel di string insert agar masuk ke jabatans
                $insert = str_replace('INSERT INTO `jabatan`', 'INSERT INTO `jabatans`', $insert);
                \Illuminate\Support\Facades\DB::unprepared($insert);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jabatans');
    }
};
