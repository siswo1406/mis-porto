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
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            $table->string('koderegion', 3);
            $table->string('namaregion', 50);
            $table->string('kode_ap', 50);
            $table->timestamps();
        });

        $sqlPath = base_path('database/sql/regions_dump.sql');
        if (file_exists($sqlPath)) {
            $content = file_get_contents($sqlPath);
            preg_match_all('/INSERT INTO `regions` VALUES \(.*?\);/s', $content, $matches);
            foreach ($matches[0] as $insert) {
                \Illuminate\Support\Facades\DB::unprepared($insert);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regions');
    }
};
