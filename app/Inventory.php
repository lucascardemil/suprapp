<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function code()
    {
        return $this->belongsTo('App\Code');
    }
}
