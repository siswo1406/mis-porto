<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QaSopAttachmentArchive extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function qa_sop_archive()
    {
        return $this->belongsTo(QaSopArchive::class, 'item_id', 'id');
    }
}
