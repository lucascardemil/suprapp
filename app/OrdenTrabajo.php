<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrdenTrabajo extends Model
{
    protected $fillable = [
        'vehicle_id', 'km'
     ];

    public function vehicle()
    {
        return $this->belongsTo('App\Vehicle');
    }

    public function trabajo()
    {
        return $this->hasMany('App\Trabajos');
    }

    public function images()
    {
        return $this->hasMany('App\Image');
    }

}