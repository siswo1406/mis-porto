<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QaSuratEdaran extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'tanggal_surat_masuk' => 'date',
        'tanggal_surat_dikirim' => 'date',
        'tanggal_berlaku' => 'date',
        'tanggal_berakhir' => 'date',
        'pic' => 'array',
        'jabatan' => 'array',
    ];
}
