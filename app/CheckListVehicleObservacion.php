<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CheckListVehicleObservacion extends Model
{
    protected $table = 'check_list_vehicle_observaciones';
    protected $fillable = [
        'check_list_intervencion_id','check_list_vehicle_id', 'observacion', 'imagen'
    ];
}
