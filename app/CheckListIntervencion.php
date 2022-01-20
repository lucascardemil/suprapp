<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CheckListIntervencion extends Model
{
    protected $table = 'check_list_intervenciones';
    protected $fillable = [
        'check_list_categoria_id' , 'intervencion'
    ];


    public function condiciones()
    {
        return $this->hasMany('App\CheckListVehicleCondiciones');
    }

    public function categorias()
    {
        return $this->belongsTo('App\CheckListCategoria');
    }

    

}
