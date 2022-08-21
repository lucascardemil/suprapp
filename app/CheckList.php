<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CheckList extends Model
{
    protected $fillable = [
        'user_id', 'count'
    ];

    public function categorias()
    {
        return $this->hasMany('App\CheckListCategoria');
    }
}
