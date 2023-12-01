<?php

namespace App\Http\Controllers;

use Auth;
use App\Towns;
use App\QuotationShipping;
use App\Http\Requests\StoreQuotationShipping;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade as PDF;
// use Mike42\Escpos\PrintConnectors\FilePrintConnector;
// use Mike42\Escpos\Printer;


class QuotationShippingController extends Controller
{
    public function cotizar_envio(){
        return view('quotationshipping');
    }

    public function cotizacion_envio_enviada(){
        return view('quotationshipping_enviado');
    }

    public function ciudades(){

        $ciudades = Towns::orderBy('id', 'ASC')->get();

        return $ciudades;
    }

    public function user(){

        $id = \Auth::user()->id;

        return $id;
    }

    public function index()
    {
        $id = request('id');
        $quotationshipping = DB::table('quotation_shippings')
                                    ->join('towns', 'quotation_shippings.ciudad', '=', 'towns.id')
                                    ->select(
                                        'quotation_shippings.id',
                                        'quotation_shippings.nombre',
                                        'quotation_shippings.rut',
                                        'quotation_shippings.telefono',
                                        'towns.nombre as ciudad',
                                        'quotation_shippings.direccion',
                                        'quotation_shippings.sucursal',
                                        'quotation_shippings.created_at',
                                        'quotation_shippings.url',
                                        'quotation_shippings.enviado',
                                    )
                                    ->orderBy('quotation_shippings.id', 'DESC')
                                    ->when($id, function ($query, $id) {
                                        return $query->where('quotation_shippings.id', 'like', '%' . $id . '%');
                                    })->paginate(20);

        return [
            'pagination_shipping' => [
                'total'         => $quotationshipping->total(),
                'current_page'  => $quotationshipping->currentPage(),
                'per_page'      => $quotationshipping->perPage(),
                'last_page'     => $quotationshipping->lastPage(),
                'from'          => $quotationshipping->firstItem(),
                'to'            => $quotationshipping->lastItem(),
            ],
            'quotationshipping' => $quotationshipping
        ];

        return $quotationshipping;
    }
    
    public function store(StoreQuotationShipping $request){

        $data = $request->all();
        
        $user_id_logeado = $data['id'];
        $nombre = $data['nombre'];
        $rut = $data['rut'];
        $telefono = $data['telefono'];
        $ciudad = $data['ciudad'];
        // $direccion = $data['direccion'];
        $sucursal = $data['sucursal'];
        
        $id = QuotationShipping::create([
            'user_id' => $user_id_logeado, //usuario alvaro por defecto
            'nombre' => $nombre,
            'rut' => $rut,
            'telefono' => str_replace(" ", "", $telefono),
            'ciudad' => $ciudad,
            // 'direccion' => $direccion,
            'sucursal' => $sucursal
        ])->id;
    

        return response()->json([
            'numero_envio' => $id
        ], 200);
    }

    public function update(Request $request, $id)
    {
        QuotationShipping::find($id)->update($request->all());

        return;
    }

    public function updateFacebook(Request $request, $id)
    {
        QuotationShipping::find($id)->update($request->all());

        return;
    }

    public function checkEnviado(Request $request)
    {
        $data = $request->all();

        QuotationShipping::where('id', $data['check'])->update([
            'enviado' => 1
        ]);
    }

    public function NocheckEnviado(Request $request)
    {
        $data = $request->all();

        QuotationShipping::where('id', $data['check'])->update([
            'enviado' => 0
        ]);
    }


    public function pdf($id)
    {
        /**
         * toma en cuenta que para ver los mismos
         * datos debemos hacer la misma consulta
        **/
        $shippings = DB::table('quotation_shippings')
                            ->join('towns', 'quotation_shippings.ciudad', '=', 'towns.id')
                            ->select(
                                'quotation_shippings.id',
                                'quotation_shippings.nombre',
                                'quotation_shippings.rut',
                                'quotation_shippings.telefono',
                                'towns.nombre as ciudad',
                                'quotation_shippings.direccion',
                                'quotation_shippings.sucursal'
                            )->where('quotation_shippings.id', '=', $id )
                            ->orderBy('quotation_shippings.id', 'DESC')->get();

        // $connector = new FilePrintConnector("php://stdout");
        // $printer = new Printer($connector);
        // $printer->text("Hello World!\n");
        // $printer->cut();
        // $printer->close();

        $pdf = PDF::loadView('pdf.quotationshipping', compact(['shippings']) )->setPaper([ 0 , 0 , 226.772 , 141.732 ], 'landscape');


        return $pdf->stream('Envio_'.$id.'.pdf');

        ///return $pdf->download('cotizacion N° '.$id.'.pdf');
    }

    public function destroy($id)
    {
        $quotation = QuotationShipping::findOrFail($id);
        $quotation->delete();

        return;
    }
}
