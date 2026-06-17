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
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->string('kodeunit', 3);
            $table->string('namaunit', 50);
            $table->text('alamat');
            $table->text('lon');
            $table->text('lat');
            $table->string('lokasi', 50)->nullable();
            $table->string('area_unit', 50)->nullable();
            $table->string('zona', 50)->nullable();
            $table->integer('zona_grd')->nullable();
            $table->string('region', 50)->nullable();
            $table->string('kodearca', 50)->nullable();
            $table->string('aktif', 1)->default('Y');
            $table->integer('adjust_hrg_pakan')->default(0);
            $table->string('area_pakan', 50)->default('0');
            $table->string('area_jual', 50)->default('0');
            $table->integer('grup_area')->default(0);
            $table->string('kareg', 50);
            $table->timestamps();
        });

        $sqlPath = base_path('database/sql/units_dump.sql');
        if (file_exists($sqlPath)) {
            $content = file_get_contents($sqlPath);
            preg_match_all('/INSERT INTO `units` VALUES \(.*?\);/s', $content, $matches);
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
        Schema::dropIfExists('units');
    }
};
