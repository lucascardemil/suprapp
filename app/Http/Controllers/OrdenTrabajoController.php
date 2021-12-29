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

        $users = User::where('id', '=', $user_id)->with('roles')->get();

        foreach ($users as $user) {
            foreach ($user->roles as $roles) {
                if($roles->name == 'admin'){
                    $ordenestrabajos = OrdenTrabajo::with('vehicle', 'trabajo')->get();
                    return $ordenestrabajos;
                }else{
                    $vehicles = Vehicle::where('user_id', '=', $user_id)->get();

                    foreach($vehicles as $vehicle){

                        $ordenestrabajos = OrdenTrabajo::with('vehicle', 'trabajo')->where('vehicle_id', '=', $vehicle->id)->get();
                        return $ordenestrabajos;
                    }
                }
            }
        }
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

        if(OrdenTrabajo::where('vehicle_id', '=', $data['vehicle_id'])->count() > 0){

            $ordenestrabajos = OrdenTrabajo::where('vehicle_id', '=', $data['vehicle_id'])->get();
            foreach($ordenestrabajos as $ordentrabajo){

                Trabajos::create([
                    'orden_trabajo_id' => $ordentrabajo->id,
                    'descripcion' => $data['descripcion'],
                    'realizado' => 0
                ]);

                Vehicle::find($data['vehicle_id'])->update([
                    'km' => $data['km'],
                ]);
            }

        }else{

            $orden_trabajo_id = OrdenTrabajo::create([
                'vehicle_id' => $data['vehicle_id'],
                'km' => $data['km']
            ])->id;

            Trabajos::create([
                'orden_trabajo_id' => $orden_trabajo_id,
                'descripcion' => $data['descripcion'],
                'realizado' => 0
            ]);

            Vehicle::find($data['vehicle_id'])->update([
                'km' => $data['km'],
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
        $observaciones = Observacion::where('trabajo_id', '=', $id)->get();

        foreach($observaciones as $observacion){
            Observacion::findOrFail($observacion->id)->delete();
            unlink( public_path().$observacion->url);
        }

        $ordenes_trabajos = ImageOrdenTrabajo::where('trabajo_id', '=', $id)->get();
        foreach($ordenes_trabajos as $orden_trabajo){
            ImageOrdenTrabajo::findOrFail($orden_trabajo->id)->delete();
            unlink( public_path().$orden_trabajo->url);
        }
        
        
        $trabajo = Trabajos::findOrFail($id);
        $trabajo->delete();

        return;
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
            $path = public_path().'/images/orden_trabajos/'.$filename;


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
            $path = public_path().'/images/observaciones/'.$filename;


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
        unlink( public_path().$observacion->url);
        $observacion->delete();

        return;
    }
}
