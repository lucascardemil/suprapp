<?php

namespace App\Http\Controllers;

use Auth;
use App\Code;
use App\Inventory;
use App\TipoPago;
use App\Atributo;
use App\ProductPago;
use App\Flete;
use App\Product;
use Illuminate\Http\Request;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $idUser = Auth::id();
        $search = request('name');

        $codes = Code::with('client', 'product', 'inventories', 'productpagos')
        ->whereHas('client', function ($query) use($idUser) {
            $query->where('clients.user_id', '=', $idUser);
        })
        ->WhereHas('product', function ($query) use($search) {
            $query->where('products.name', 'LIKE', '%'.$search.'%');
        })->orderBy('id', 'DESC')->paginate(20);

        return [
            'pagination' => [
                'total'         => $codes->total(),
                'current_page'  => $codes->currentPage(),
                'per_page'      => $codes->perPage(),
                'last_page'     => $codes->lastPage(),
                'from'          => $codes->firstItem(),
                'to'            => $codes->lastItem(),
            ],
            'codes' => $codes
        ];
    }

    public function search ($code) {
        $search = Code::where('codebar', 'LIKE', '%'.$code.'%')->with(array(
            'inventories' => function ($query) {
                $query->orderBy('inventories.id', 'DESC');
                $query->where('inventories.quantity', '>', '0');
                $query->first();
            }, 'product'))
            ->first();

        return $search;
    }

    public function product(Code $code) {
        
        $product = $code->product;

        return $product;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $code = Code::create($data);

        return $code->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Code  $code
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $code = Code::find($id);

        return $code;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Code  $code
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $code = Code::find($id);
        $code->codebar = $request->codebar;
        $code->atributo = $request->atributo;
        $code->save();

        if($request->product !== '' || $request->detail !== ''){
            Product::where('id', $code->product_id)->update([
                'name' => $request->product,
                'detail' => $request->detail,
            ]);
        }

        if($request->utilidad > 0){
            ProductPago::where('product_id', $code->product_id)->update([
                'forma_pago' => 'DEFECTO',
                'utilidad' => $request->utilidad,
                'flete' => $request->flete
            ]);
        }


        if($request->atributo > 0){
            $inventorys = Inventory::where('code_id', $code->id)->get();
            foreach($inventorys as $inventory){
                if($request->atributo != $inventory->quantity){
                    $cantidad = $inventory->quantity * $request->atributo;
                    $total = $inventory->price * $inventory->quantity;
                    
                    Inventory::where('code_id', $code->id)->update([
                        'quantity' => $cantidad,
                        'price' => $total / $cantidad
                    ]);
                }
            }
        }

        return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Code  $code
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return;
    }

    public function inventories($id)
    {
        $inventories = Code::find($id)->inventories;

        return $inventories;
    }


    public function updateUtilidadDefect(Request $request)
    {
        $idUser = Auth::id();

        try {
            TipoPago::where('pago', 'DEFECTO')->update([
                'utilidad' => $request->utilidad
            ]);

            $codes = Code::with('client', 'product')
                ->whereHas('client', function ($query) use ($idUser) {
                    $query->where('clients.user_id', '=', $idUser);
                })->get();

            foreach ($codes as $code) {
                ProductPago::where('product_id', $code->product_id)->update([
                    'forma_pago' => 'DEFECTO',
                    'utilidad' => $request->utilidad
                ]);
            }

            // Retorna true si todo se completó sin errores
            return true;
        } catch (\Exception $e) {
            // Manejar errores si es necesario y retorna false
            return false;
        }
    }


    public function utilidadDefect()
    {
        $utilidad = TipoPago::orderBy('id', 'ASC')->where('pago', 'DEFECTO')->get();

        return $utilidad;
    }


    public function updateFleteDefect(Request $request)
    {
        $idUser = Auth::id();

        try {
        
            Flete::updateOrCreate([
                'flete' => $request->flete
            ]);

            $codes = Code::with('client', 'product')
            ->whereHas('client', function ($query) use($idUser) {
                $query->where('clients.user_id', '=', $idUser);
            })->get();

            foreach($codes as $code){

                ProductPago::where('product_id', $code->product_id)->update([
                    'flete' => $request->flete
                ]);

            }
            // Retorna true si todo se completó sin errores
            return true;
        } catch (\Exception $e) {
            // Manejar errores si es necesario y retorna false
            return false;
        }
    }

    public function fleteDefect()
    {
        $flete = Flete::orderBy('id', 'ASC')->get();

        return $flete;
    }

    

}
