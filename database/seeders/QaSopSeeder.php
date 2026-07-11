<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class QaSopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Path to the downloaded sql files
        $downloadsPath = env('HOME') . '/Downloads';

        // Mapping of old table names in SQL to new table names
        $tableMapping = [
            'tbl_sop' => 'qa_sops',
            'tbl_sop_arsip' => 'qa_sop_archives',
            'tbl_sop_pendukung' => 'qa_sop_attachments',
            'tbl_sop_pendukung_arsip' => 'qa_sop_attachment_archives',
            'tbl_update_sop_bukusaku' => 'qa_updates'
        ];

        // Ensure we don't duplicate data if seeded multiple times
        Schema::disableForeignKeyConstraints();
        foreach ($tableMapping as $old => $new) {
            DB::table($new)->truncate();
        }

        foreach ($tableMapping as $oldTable => $newTable) {
            $files = glob($downloadsPath . '/*.sql');
            $files = array_filter($files, function($file) use ($oldTable) {
                return preg_match('/' . preg_quote($oldTable, '/') . '_\d{12}\.sql$/', basename($file));
            });
            
            if (empty($files)) {
                $this->command->warn("No SQL dump found for table {$oldTable}");
                continue;
            }

            // Sort by modified time descending to get the latest
            usort($files, function($a, $b) {
                return filemtime($b) - filemtime($a);
            });

            $latestFile = $files[0];
            $this->command->info("Importing {$latestFile} into {$newTable}...");

            $sql = file_get_contents($latestFile);

            // Replace the old insert statements with new table names
            // Dbeaver dump format: INSERT INTO db_mis.tbl_sop (...)
            $sql = str_replace("INSERT INTO db_mis.{$oldTable} ", "INSERT INTO {$newTable} ", $sql);
            
            // Execute the raw SQL
            DB::unprepared($sql);
        }
        Schema::enableForeignKeyConstraints();

        $this->command->info('QA SOP data successfully imported!');
    }
}
