<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $fillable = [
        'kodeunit', 'namaunit', 'alamat', 'lon', 'lat', 'lokasi', 
        'area_unit', 'zona', 'zona_grd', 'region', 'kodearca', 
        'aktif', 'adjust_hrg_pakan', 'area_pakan', 'area_jual', 
        'grup_area', 'kareg'
    ];
}
