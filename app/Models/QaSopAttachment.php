<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QaSopAttachment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function qa_sop()
    {
        return $this->belongsTo(QaSop::class, 'item_id', 'id');
    }
}
