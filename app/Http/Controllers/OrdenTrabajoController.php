<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use App\OrdenTrabajo;
use App\Trabajos;
use App\ImageOrdenTrabajo;
use App\Observacion;
use App\Vehicle;
use App\User;
use Auth;


class OrdenTrabajoController extends Controller
{
    
    public function index()
    {
        $user_id = \Auth::user()->id;

        $ordenestrabajos = OrdenTrabajo::with('vehicle', 'trabajo')->where('user_id', '=', $user_id)->get();
        return $ordenestrabajos;
           
    }

    public function obtenerFotosOrdenTrabajo($id)
    {
        $fotosordentrabajo = ImageOrdenTrabajo::with('trabajo')->where('trabajo_id', '=', $id)->get();     
        return $fotosordentrabajo;
    }



    public function observaciones($id)
    {
        $observacion = Observacion::where('trabajo_id', '=', $id)->get();     
        return $observacion;
    }

    public function trabajos($id){

        $ordenestrabajos = OrdenTrabajo::where('vehicle_id', '=', $id)->get();
        foreach($ordenestrabajos as $ordentrabajo){

            $trabajos = Trabajos::where('orden_trabajo_id', '=', $ordentrabajo->id)->get();
            return $trabajos;
        }

    }

    
    public function store(Request $request)
    {

        $data = $request->all();
        $user_id = \Auth::user()->id;

        if(OrdenTrabajo::where('vehicle_id', '=', $data['vehicle_id'])->count() > 0){

            $ordenestrabajos = OrdenTrabajo::where('vehicle_id', '=', $data['vehicle_id'])->get();

            if($ordenestrabajos[0]['id'] > 0){
                Trabajos::create([
                    'orden_trabajo_id' => $ordenestrabajos[0]['id'],
                    'descripcion' => $data['descripcion'],
                    'realizado' => 0, 
                    'km' => $data['km']
                ]);

                Vehicle::find($data['vehicle_id'])->update([
                    'km' => $data['km'],
                ]);

                OrdenTrabajo::where('vehicle_id', '=', $data['vehicle_id'])->update([
                    'km' => $data['km']
                ]);

                $trabajos = Trabajos::where('orden_trabajo_id', '=', $ordenestrabajos[0]['id'])->get();
                return $trabajos;
            }
            
        }else{

            $orden_trabajo_id = OrdenTrabajo::create([
                'user_id' => $user_id,
                'vehicle_id' => $data['vehicle_id'],
                'km' => $data['km']
            ])->id;

            Trabajos::create([
                'orden_trabajo_id' => $orden_trabajo_id,
                'descripcion' => $data['descripcion'],
                'realizado' => 0,
                'km' => $data['km']
            ]);

            Vehicle::find($data['vehicle_id'])->update([
                'km' => $data['km'],
            ]);

            OrdenTrabajo::where('vehicle_id', '=', $data['vehicle_id'])->update([
                'km' => $data['km']
            ]);

            $trabajos = Trabajos::where('orden_trabajo_id', '=', $orden_trabajo_id)->get();
            return $trabajos;
        }



    }

    
    public function destroy($id)
    {
        $observaciones = Observacion::where('trabajo_id', '=', $id)->get();

        foreach($observaciones as $observacion){
            Observacion::findOrFail($observacion->id)->delete();
            // unlink( public_path().$observacion->url);
            unlink( getcwd().$observacion->url);
        }

        $ordenes_trabajos = ImageOrdenTrabajo::where('trabajo_id', '=', $id)->get();
        foreach($ordenes_trabajos as $orden_trabajo){
            ImageOrdenTrabajo::findOrFail($orden_trabajo->id)->delete();
            // unlink( public_path().$orden_trabajo->url);
            unlink( getcwd().$orden_trabajo->url);

        }
        
        
        $trabajo = Trabajos::findOrFail($id);
        $trabajo->delete();

        $trabajos = Trabajos::where('orden_trabajo_id', '=', $trabajo->orden_trabajo_id)->get();
        return $trabajos;
    }


    public function checkRealizado(Request $request)
    {
        $data = $request->all();

        Trabajos::where('id', $data['check'])->update([
            'realizado' => 1,
            'created_at' => date('Y-m-d H:i:s')
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
            // $path = public_path().'/images/orden_trabajos/'.$filename;
            $path = getcwd().'/images/orden_trabajos/'.$filename;


            $img = $manager->make($file->getRealPath());
            $img->resize(1000,1000, function($constraint){
                $constraint->aspectRatio();
            })->save($path);

            $url = '/images/orden_trabajos/'.$filename;

            ImageOrdenTrabajo::create(['trabajo_id' => $id, 'url' => $url]);

            array_push($arreglo, $path);


        }



        return response($arreglo);
    }


    public function AgregarObservacion(Request $request)
    {
        $arreglo = array();
        $uploadedFile = $request->pics_observacion;
        $id =  $request->id;
        $observacion =  $request->observacion;

        $manager = new ImageManager(array('local' => 'imagick'));

        foreach ($uploadedFile as $file){

            $filename = time().'.'.$file->getClientOriginalExtension();
            // $path = public_path().'/images/observaciones/'.$filename;
            $path = getcwd().'/images/observaciones/'.$filename;

            $img = $manager->make($file->getRealPath());
            $img->resize(1000,1000, function($constraint){
                $constraint->aspectRatio();
            })->save($path);

            $url = '/images/observaciones/'.$filename;

            Observacion::create([
                'trabajo_id' => $id,
                'observacion' => $observacion,
                'url' => $url,
            ]);

            array_push($arreglo, $path);


        }
        return response($arreglo);
        
    }


    public function EliminarObservacion($id){

        $observacion = Observacion::findOrFail($id);
        // unlink( public_path().$observacion->url);
        unlink( getcwd().$observacion->url);
        $observacion->delete();

        return;
    }
}
