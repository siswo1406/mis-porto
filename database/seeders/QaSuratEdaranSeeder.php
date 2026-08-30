<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QaSuratEdaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sqlPath = '/Users/siswo/Downloads/tbl_surat_edaran_202607261110.sql';
        
        if (!file_exists($sqlPath)) {
            $this->command->error("File SQL tidak ditemukan di $sqlPath");
            return;
        }

        $sqlContent = file_get_contents($sqlPath);

        // Ganti nama tabel
        $sqlContent = str_ireplace('INSERT INTO db_mis.tbl_surat_edaran', 'INSERT INTO qa_surat_edarans', $sqlContent);
        $sqlContent = str_ireplace('INSERT INTO tbl_surat_edaran', 'INSERT INTO qa_surat_edarans', $sqlContent);

        // Eksekusi tiap query
        $queries = explode(';', $sqlContent);
        $insertedCount = 0;
        
        foreach ($queries as $query) {
            $query = trim($query);
            if (empty($query)) continue;
            
            if (str_starts_with(strtoupper($query), 'INSERT INTO QA_SURAT_EDARANS')) {
                try {
                    \Illuminate\Support\Facades\DB::unprepared($query . ';');
                    $insertedCount++;
                } catch (\Exception $e) {
                    $this->command->error("Error: " . $e->getMessage());
                }
            }
        }

        $this->command->info("Berhasil melakukan insert dari $insertedCount statement SQL.");
    }
}
