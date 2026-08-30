<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaxLaporanMasaPembetulan extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function laporanMasa()
    {
        return $this->belongsTo(TaxLaporanMasa::class, 'laporan_masa_id');
    }
}
