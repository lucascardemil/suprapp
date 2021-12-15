<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trabajos extends Model
{
    protected $fillable = [
        'orden_trabajo_id', 'descripcion', 'realizado'
    ];

    public function orden_trabajos()
    {
        return $this->belongsTo('App\OrdenTrabajo');
    }
}
