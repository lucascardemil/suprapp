<?php

namespace App\Http\Controllers;

use Auth;
use App\Product;
use App\Code;
use App\Inventory;
use App\Sale;
use App\Client;
use App\ProductSale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade as PDF;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $idUser = Auth::id();
        $search = request('calendar');



        if ($search == "null" || $search == null) {
            //$sales = Sale::with('client', 'products')->where('user_id', '=', $idUser)->paginate(10);

            $sales = DB::table('sales')
                ->join('clients', 'sales.client_id', '=', 'clients.id')
                ->join('productsales', 'sales.id', '=', 'productsales.sale_id')
                ->join('codes', 'productsales.code_id', '=', 'codes.id')
                ->join('products', 'codes.product_id', '=', 'products.id')
                ->join('product_pagos', 'products.id', '=', 'product_pagos.product_id')
                ->select(
                    'clients.*',
                    'productsales.*',
                    'codes.*',
                    'products.*',
                    'sales.id as sale_id',
                    'sales.total',
                    'sales.forma_pago',
                    'sales.descuento',
                    'sales.created_at as fecha_sale_create',
                    'sales.updated_at as fecha_sale_update',
                    'product_pagos.flete',
                    'productsales.total as total_productsale'
                )
                ->where('sales.user_id', '=', $idUser)
                ->orderBy('sales.total', 'DESC')
                ->paginate(10);
        } else {
            // $sales = Sale::with('client', 'products')->where('user_id', '=', $idUser)->whereRaw("DATE_FORMAT(updated_at, '%Y-%m-%d') = ?", [$search])->paginate(10);

            $sales = DB::table('sales')
                ->join('clients', 'sales.client_id', '=', 'clients.id')
                ->join('productsales', 'sales.id', '=', 'productsales.sale_id')
                ->join('codes', 'productsales.code_id', '=', 'codes.id')
                ->join('products', 'codes.product_id', '=', 'products.id')
                ->join('product_pagos', 'products.id', '=', 'product_pagos.product_id')
                ->select(
                    'clients.*',
                    'productsales.*',
                    'codes.*',
                    'products.*',
                    'sales.id as sale_id',
                    'sales.total',
                    'sales.forma_pago',
                    'sales.descuento',
                    'sales.created_at as fecha_sale_create',
                    'sales.updated_at as fecha_sale_update',
                    'product_pagos.flete',
                    'productsales.total as total_productsale'
                )
                ->where('sales.user_id', '=', $idUser)
                ->whereRaw("DATE_FORMAT(sales.updated_at, '%Y-%m-%d') = ?", [$search])
                ->orderBy('sales.total', 'DESC')
                ->paginate(10);
        }

        return [
            'pagination' => [
                'total'         => $sales->total(),
                'current_page'  => $sales->currentPage(),
                'per_page'      => $sales->perPage(),
                'last_page'     => $sales->lastPage(),
                'from'          => $sales->firstItem(),
                'to'            => $sales->lastItem(),
            ],
            'sales' => $sales

        ];
    }

    public function sale(Request $request)
    {

        $saleData = $request->sale;

        $clients = Client::where('user_id', '=', Auth::user()->id)->where('type', '=', 'Empresa')->get();

        $sale = Sale::create([
            'user_id' => Auth::user()->id,
            'client_id' => $clients[0]->id,
            'total' => $saleData['total'],
            'forma_pago' => $saleData['formapago'],
            'descuento' => floatval($saleData['descuento'] / 100)
        ]);

        $productsData = $request->products;

        foreach ($productsData as $key => $product) {

            ProductSale::create([
                'sale_id' => $sale->id,
                'code_id' => $product['product']['code_id'],
                'price' => $product['product']['price'],
                'utility' => floatval($product['utility'] / 100),
                'quantity' => $product['quantity'],
                'total' => $product['total']
            ]);

            $inventories = Inventory::where('code_id', $product['product']['code_id'])->orderBy('id', 'ASC')->get();

            foreach ($inventories as $key => $inventory) {
                // Calcula la cantidad a descontar para este producto
                $discountQuantity = min($product['quantity'], $inventory['quantity']);


                // Aplica el descuento y actualiza la cantidad del producto
                $inventories[$key]['quantity'] -= $discountQuantity;


                // Actualiza el total a descontar
                $product['quantity'] -= $discountQuantity;


                Inventory::where('id', $inventory['id'])->update([
                    'discount' => $discountQuantity
                ]);


                // Si ya se han descontado todos los productos necesarios, detén el bucle
                if ($product['quantity'] <= 0) {
                    break;
                }
            }

            foreach ($inventories as $inventory) {
                Inventory::where('id', $inventory['id'])->update([
                    'quantity' => $inventory['quantity']
                ]);
            }
        }
    }

    public function anularSale($id)
    {
        $products = ProductSale::where('sale_id', $id)->get();
        foreach ($products as $product) {

            $inventories = Inventory::where('code_id', $product['code_id'])->get();

            foreach ($inventories as $inventory) {
                Inventory::where('id', $inventory['id'])->update([
                    'quantity' => $inventory['quantity'] + $inventory['discount'],
                    'discount' => 0
                ]);
            }

            $productSale = ProductSale::where('sale_id', $id)->delete();
            if ($productSale) {
                Sale::where('id', $id)->delete();
            }
        }
    }


    public function products($sale)
    {
        return DB::select(
            'select
            p.name as product, 
            c.codebar as code, 
            ps.utility as utility, 
            ps.quantity as quantity, 
            round(ps.price*ps.quantity*(1+ps.utility)*1.19) as total 
        from products as p inner join codes as c on p.id = c.product_id 
            inner join productsales as ps on c.id = ps.code_id and ps.sale_id = ?',
            array($sale)
        );
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
        $data['user_id'] = Auth::user()->id;

        $sale = Sale::create($data);

        //$products = $request->products;

        return response()->json($sale, 200);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sale $sale)
    {
        $sale->update($request->all());

        return response()->json($sale, 200);
    }

    public function all()
    {
        $idUser = Auth::id();
        $product = DB::table('clients')
            ->join('codes', 'clients.id', '=', 'codes.client_id')
            ->join('products', 'codes.product_id', '=', 'products.id')
            ->join('inventories', 'codes.id', '=', 'inventories.code_id')
            ->join('product_pagos', 'products.id', '=', 'product_pagos.product_id')
            ->select(
                DB::raw('MAX(inventories.fecha_fact) as max_fecha_fact'),
                'products.id',
                'products.name',
                'codes.id as code_id',
                'inventories.id as inventory_id',
                'product_pagos.utilidad',
                'product_pagos.flete',
                'codes.codebar as codebar',
                'inventories.price as price',
                DB::raw('MAX(inventories.price) as max_price'),
                DB::raw('SUM(inventories.price * inventories.quantity) as total_sum_price'),
                DB::raw('SUM(inventories.price) as total_price'),
                DB::raw('SUM(inventories.quantity) as total_quantity') // Suma de las cantidades
            )
            ->where('clients.user_id', '=', $idUser)
            ->where('inventories.quantity', '>', 0)
            ->groupBy('inventories.code_id')
            ->get();


        return $product;
    }

    public function generarRecibo($id)
    {

        $products = DB::table('products')
            ->join('codes', 'products.id', '=', 'codes.product_id')
            ->join('productsales', 'codes.id', '=', 'productsales.code_id')
            ->where('productsales.sale_id', '=', $id)
            ->get();

        $clients = DB::table('sales')
            ->join('users', 'sales.user_id', '=', 'users.id')
            ->join('clients', 'sales.client_id', '=', 'clients.id')
            ->select(
                'users.name as user_name',
                'sales.id as sale_id',
                'sales.updated_at as sale_updated_at',
                'sales.descuento as descuento',
                'clients.address as client_address',
                'clients.phone as client_phone',
                'clients.razonSocial as client_razonSocial'
            )
            ->where('sales.id', '=', $id)
            ->get();

        // $pdf = PDF::loadView('pdf.sales-recibo', compact(['products','clients']) )->setPaper([ 0 , 0 , 226.772 , 141.732 ], 'landscape');
        $pdf = PDF::loadView('pdf.sales-recibo', compact(['products', 'clients']))->setPaper('B8', 'portrait');
        return $pdf->stream('Recibo N° ' . $id . '.pdf');
    }

    public function cierreCajaZ($fecha)
    {
        $idUser = Auth::id();
        $products = DB::table('products')
            ->join('codes', 'products.id', '=', 'codes.product_id')
            ->join('productsales', 'codes.id', '=', 'productsales.code_id')
            ->join('sales', 'productsales.sale_id', '=', 'sales.id')
            ->where('sales.user_id', '=', $idUser)
            ->whereDate('sales.created_at', $fecha)
            ->get();

        $clients = DB::table('sales')
            ->join('users', 'sales.user_id', '=', 'users.id')
            ->join('clients', 'sales.client_id', '=', 'clients.id')
            ->select(
                'users.name as user_name',
                'sales.id as sale_id',
                'sales.updated_at as sale_updated_at',
                'sales.descuento as descuento',
                'clients.address as client_address',
                'clients.phone as client_phone',
                'clients.razonSocial as client_razonSocial'
            )
            ->where('sales.user_id', '=', $idUser)
            ->whereDate('sales.created_at', $fecha)
            ->get();

        if (count($products) > 0 && count($clients) > 0) {
            $pdf = PDF::loadView('pdf.cierre-cajaz', compact(['products', 'clients', 'fecha']));
            return $pdf->stream('CajaZ-' . $fecha . '.pdf');
        } else {
            return response()->json(['error' => 0], 200);
        }
    }

    public function search_inventory($code)
    {
        $product = Inventory::where('code_id', '=', $code)->where('quantity', '>', 0)->get();
        return $product;
    }
}
