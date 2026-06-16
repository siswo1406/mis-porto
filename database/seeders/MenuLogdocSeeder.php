<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuLogdocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\MenuLogdoc::create([
            'name' => 'PO DOC',
            'link' => '#', // diarahin ke # dulu sementara karena route spesifiknya belum dibuat
            'akses' => 'ADMINISTRATOR,SUPERVISOR,ADMIN LOGISTIK',
            'kodemenu' => 'DOC006',
            'dilihat' => 0,
            'kategori' => 4, // 4 = Administrasi
        ]);
    }
}
