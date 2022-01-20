<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CheckListCategoria extends Model
{
    protected $fillable = [
        'check_list_id' , 'categoria'
    ];

    public function intervenciones()
    {
        return $this->hasMany('App\CheckListIntervencion');
    }
}
