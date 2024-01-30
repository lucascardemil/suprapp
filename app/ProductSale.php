<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ProductSale extends Pivot
{
    public $table = 'productsales';
    protected $fillable = ['sale_id', 'code_id', 'price', 'utility', 'quantity', 'total'];

    public function sale() {
        return $this->belongsTo('App\Sale');
    }

    public function codes() {
        return $this->hasMany('App\Code', 'id', 'code_id');
    }
}
