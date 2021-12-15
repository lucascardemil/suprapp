<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use App\OrdenTrabajo;
use App\Trabajos;
use App\ImageOrdenTrabajo;
use App\Vehicle;
use Auth;


class OrdenTrabajoController extends Controller
{
    
    public function index()
    {
        $vehicles = Vehicle::where('user_id', '=', Auth::id())->get();

        foreach($vehicles as $vehicle){

            $ordenestrabajos = OrdenTrabajo::with('vehicle', 'trabajo')->where('vehicle_id', '=', $vehicle->id)->get();
            return $ordenestrabajos;
        }
    }

    public function obtenerFotosOrdenTrabajo($id)
    {
        $fotosordentrabajo = ImageOrdenTrabajo::with('trabajo')->where('trabajo_id', '=', $id)->get();     
        return $fotosordentrabajo;
    }

    
    public function store(Request $request)
    {
        $orden_trabajo = $request->orden_trabajo;

        $orden_trabajo_id = OrdenTrabajo::create([
            'vehicle_id' => $orden_trabajo[0]['vehicle_id'],
            'km' => $orden_trabajo[0]['km']
        ])->id;

        $trabajo = $request->trabajos;

        for ($i=0; $i<count($trabajo); $i++){
            Trabajos::create([
                'orden_trabajo_id' => $orden_trabajo_id,
                'descripcion' => $trabajo[$i]['descripcion'],
                'realizado' => 0
            ]);
        }
    }

    
    public function show($id)
    {
        //
    }


    
    public function update(Request $request, $id)
    {
        // Detail::find($id)->update($request->all());

        // return;
    }

    
    public function destroy($id)
    {
        // $detail = Detail::findOrFail($id);
        // $detail->delete();

        // return;
    }


    public function checkRealizado(Request $request)
    {
        $data = $request->all();

        Trabajos::where('id', $data['check'])->update([
            'realizado' => 1
        ]);
    }

    public function NocheckRealizado(Request $request)
    {
        $data = $request->all();

        Trabajos::where('id', $data['check'])->update([
            'realizado' => 0
        ]);
    }


    public function SubirFotosOrdenTrabajo(Request $request)
    {
        $arreglo = array();
        $uploadedFile = $request->pics;
        $id =  $request->id;

        $manager = new ImageManager(array('local' => 'imagick'));

        foreach ($uploadedFile as $file){
            $filename = time().'.'.$file->getClientOriginalExtension();
            $path = storage_path('app/public/ordenes_trabajos/'.$filename);
            $img = $manager->make($file->getRealPath());
            $img->resize(1000,1000, function($constraint){
                $constraint->aspectRatio();
            })->save($path);
            //url de comercialsupra.cl/registro
            //$url = url('storage/img/vehicles/'.$filename);
            //url original sin subcarpeta
            $url = url('storage/ordenes_trabajos/'.$filename);
            ImageOrdenTrabajo::create(['trabajo_id' => $id, 'url' => $url]);

            array_push($arreglo, $path);
        }



        return response($arreglo);
    }
}
