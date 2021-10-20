<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Archiveimport extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function import()
    {
        return $this->belongsTo('App\Import');
    }
}
