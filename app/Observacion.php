<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Observacion extends Model
{
    protected $table = 'observaciones';
    protected $fillable = [
        'trabajo_id', 'observacion' ,'url'
    ];
}
