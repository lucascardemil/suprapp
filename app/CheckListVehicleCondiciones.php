<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CheckListVehicleCondiciones extends Model
{
    protected $table = 'check_list_vehicle_condiciones';
    protected $fillable = [
        'check_list_intervencion_id','existe', 'estado'
    ];
}
