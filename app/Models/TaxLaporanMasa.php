<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaxLaporanMasa extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function pembetulans()
    {
        return $this->hasMany(TaxLaporanMasaPembetulan::class, 'laporan_masa_id');
    }
}
