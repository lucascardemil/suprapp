<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CheckListVehicleObservaciones extends Model
{
    protected $table = 'check_list_vehicle_observaciones';
    protected $fillable = [
        'check_list_intervencion_id','observacion', 'imagen'
    ];
}
