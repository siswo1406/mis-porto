<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QaSopArchive extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function attachments()
    {
        return $this->hasMany(QaSopAttachmentArchive::class, 'item_id', 'id');
    }
}
