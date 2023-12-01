<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Intervention\Image\ImageManager;

class ImageOrdenTrabajo extends Model
{
    protected $fillable = [
        'trabajo_id', 'url'
     ];

    public function trabajo()
    {
        return $this->belongsTo('App\Trabajos');
    }
    
}
