<?php

namespace App\Http\Controllers;
use Intervention\Image\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Vehicle;
use App\CheckList;
use App\CheckListCategoria;
use App\CheckListIntervencion;
use App\CheckListVehicle;
use App\CheckListVehicleObservaciones;
use App\CheckListVehicleCondiciones;
use Auth;

class CheckListController extends Controller
{
    public function crearCheckList(Request $request)
    {
        $user_id = Auth::user()->id;
        $checklist = CheckList::create([
            'user_id' => $user_id
        ])->id;


        $checklists = $request->checklists;

        for ($i=0; $i<count($checklists); $i++){
            CheckListCategoria::create([
                'check_list_id' => $checklist,
                'categoria' => $checklists[$i]['categoria'],
            ]);
        }


        return $checklist;
    }

    public function checkListCategorias($id){
        $checklist = CheckListCategoria::with('intervenciones')->where('check_list_id', '=', $id)->get();
        return $checklist;
    }



    public function crearIntervenciones(Request $request)
    {
        $intervenciones = $request->intervenciones;

        for ($i=0; $i<count($intervenciones); $i++){
            CheckListIntervencion::create([
                'check_list_categoria_id' => $intervenciones[0]['id_categoria'],
                'intervencion' => $intervenciones[$i]['intervencion'],
            ]);
        }

        $id = CheckListCategoria::select('check_list_id')->where('id', '=', $intervenciones[0]['id_categoria'])->get();
        return $id;
    }


    public function checkListIntervencion($id){
        $checklistintervencion = CheckListIntervencion::where('check_list_categoria_id', '=', $id)->get();
        return $checklistintervencion;
    }

    public function finalizarFormatoCheckList(){

        $categorias = CheckListCategoria::with('intervenciones')->orderby('created_at', 'desc')->first();
        return $categorias;
        
    }

    public function mostrarFormatoCheckList(){

        $checklists = CheckList::orderby('created_at', 'desc')->first();
        $formatchecklist = CheckListCategoria::with('intervenciones')->where('check_list_id', '=', $checklists->id)->get();
        return $formatchecklist;
        
    }

    public function editarCategoriaCheckList(Request $request){

        $data = $request->all();

        CheckListCategoria::find($data['id_categoria'])->update([
            'categoria' => $data['categoria'],
        ]);
        return;
    }

    public function editarIntervencionCheckList(Request $request){
        $data = $request->all();

        CheckListIntervencion::find($data['id_intervencion'])->update([
            'intervencion' => $data['intervencion'],
        ]);
        return;

    }

    public function crearCategoria(Request $request)
    {
        $checklists = CheckList::orderby('created_at', 'desc')->first();


        $categorias = $request->checklists;

        for ($i=0; $i<count($categorias); $i++){
            CheckListCategoria::create([
                'check_list_id' => $checklists->id,
                'categoria' => $categorias[$i]['categoria'],
            ]);
        }


        return $checklists->id;
    }

    public function crearIntervencion(Request $request, $id)
    {
    
        $intervenciones = $request->intervenciones;

        for ($i=0; $i<count($intervenciones); $i++){
            CheckListIntervencion::create([
                'check_list_categoria_id' => $id,
                'intervencion' => $intervenciones[$i]['intervencion'],
            ]);
        }


        return $id;
    }


    public function guardarCheckListVehicle(Request $request)
    {
        $estados = $request->estado;
        $existe = $request->existe;
        $id_vehicle = $request->id_vehicle;
        $id_checklist = $request->id_checklist;

        CheckListVehicle::create([
            'check_list_id' => $id_checklist,
            'vehicle_id' => $id_vehicle,
            'realizado' => 1
        ]);

        for ($i=0; $i<count($estados); $i++){
            for ($y=0; $y<count($existe); $y++){

                if($existe[$y]['id_intervencion'] == $estados[$i]['id_intervencion']){
                    CheckListVehicleCondiciones::create([
                        'check_list_intervencion_id' => $existe[$y]['id_intervencion'],
                        'estado' => $estados[$i]['estado'],
                        'existe' => $existe[$y]['existe']
                    ]);
                }
            }

        }
    }



    public function agregarObservacionCheckList(Request $request){
        $arreglo = array();

        $id_intervencion =  $request->id_intervencion_checklist;
        $id_vehicle =  $request->id_vehicle_checklist;
        $imagenes = $request->imagenes_checklist;
        $observacion =  $request->observacion_checklist;

        $manager = new ImageManager(array('local' => 'imagick'));

        foreach ($imagenes as $imagen){

            $filename = time().'.'.$imagen->getClientOriginalExtension();
            $path = public_path().'/images/checklist/'.$filename;


            $img = $manager->make($imagen->getRealPath());
            $img->resize(1000,1000, function($constraint){
                $constraint->aspectRatio();
            })->save($path);

            $url = '/images/checklist/'.$filename;

            
            CheckListVehicleObservaciones::create([
                'check_list_intervencion_id' => $id_intervencion,
                'vehicle_id' => $id_vehicle,
                'observacion' => $observacion,
                'imagen' => $url,
            ]);

            

            array_push($arreglo, $path);


        }
        return response($arreglo);
    }


    public function checklistvehicles(){

        $user_id = Auth::user()->id;
        $vehicles = Vehicle::where('user_id', '=', $user_id)->get();


        for ($i=0; $i<count($vehicles); $i++){
            $checklistvehicles = Vehicle::with('checklist')->where('id', '=', $vehicles[$i]['id'])->get();
        }

        return $checklistvehicles;
        
    }


    public function mostrarCheckListVehicles($id){
        

        // $categorias = CheckListCategoria::where('check_list_id', '=', $id)->get();
        // for ($i=0; $i<count($categorias); $i++){
        //     $intervenciones = CheckListIntervencion::with('condiciones')->where('check_list_categoria_id', '=', $categorias[$i]['id'])->get();

        //     for ($y=0; $y<count($intervenciones); $y++){
        //         if($categorias[$i]['id'] == $intervenciones[$y]['check_list_categoria_id']){
        //             $array = [
        //                 'categorias' => $categorias,
        //                 'intervenciones' => $intervenciones
        //             ];

        //             return $array;

        //         }
        //     }
            
        // }

        
              $formatchecklist = CheckListCategoria::with('intervenciones')->where('check_list_id', '=', $id)->get();

              return $formatchecklist;
        
        
        
       


        // $checklistvehicles = DB::table('check_list_categorias')
        //     ->join('check_list_intervenciones', 'check_list_categorias.id', '=', 'check_list_intervenciones.check_list_categoria_id')
        //     ->join('check_list_vehicle_condiciones', 'check_list_intervenciones.id', '=', 'check_list_vehicle_condiciones.check_list_intervencion_id')
            
        //     ->groupBy('check_list_intervenciones.id')
        //     ->where('check_list_categorias.check_list_id', '=', $id)
        //     ->get();

        // return $checklistvehicles;
        
    }

}
