<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'SISWO SUKMO PAMUNGKAS',
            'nik' => '1978.MTK.1222',
            'email' => 'siswo.sukmo@ptmjl.co.id',
            'roles' => 'admin',
            'region' => 'MJL',
            'unit' => 'HO',
            'jabatan' => 'ADMINISTRATOR',
            'password' => \Illuminate\Support\Facades\Hash::make('@Siswo1998'),
        ]);

        $this->call(RealUserSeeder::class);
    }
}
