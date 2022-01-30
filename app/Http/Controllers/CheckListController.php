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
use App\CheckListVehicleObservacion;
use App\CheckListVehicleCondicion;
use App\CheckListVehicleIntervencion;
use App\CheckListVehicleCategoria;
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


        $user_id = Auth::user()->id;

        $count = CheckList::where('user_id', '=', $user_id)->count();
        if($count > 0){
            $checklists = CheckList::where('user_id', '=', $user_id)->orderby('created_at', 'desc')->first();
            $formatchecklist = CheckListCategoria::with('intervenciones')->where('check_list_id', '=', $checklists->id)->get();
            return $formatchecklist;
        }else{
            $user_id = DB::table('roles')
            ->join('model_has_roles', 'roles.id', '=', 'model_has_roles.role_id')
            ->join('users', 'model_has_roles.model_id', '=', 'users.id')
            ->where('roles.name', '=', 'admin')
            ->select('users.id')
            ->get();
        
            $checklists = CheckList::where('user_id', '=', $user_id[0]->id)->orderby('created_at', 'desc')->first();
            $formatchecklist = CheckListCategoria::with('intervenciones')->where('check_list_id', '=', $checklists->id)->get();
            return $formatchecklist;

        } 
        
    }


    public function mostrarCheckList($id){

        $count = CheckListVehicle::where('vehicle_id', '=', $id)->count();
        if($count > 0){

            $checklistvehicles = CheckListVehicle::where('vehicle_id', '=', $id)->get();
            foreach ($checklistvehicles as $checklistvehicle){
                $formatchecklist = CheckListVehicleCategoria::with('intervenciones')->where('check_list_vehicle_id', '=', $checklistvehicle->id)->get();
                return $formatchecklist;
            }

        }else{

            $user_id = Auth::user()->id;
            $checklists = CheckList::where('user_id', '=', $user_id)->orderby('created_at', 'desc')->first();
            $categorias = CheckListCategoria::where('check_list_id', '=', $checklists->id)->get();

            $check_list_vehicle_id = CheckListVehicle::create([
                'check_list_id' => $checklists->id,
                'vehicle_id' => $id,
                'realizado' => 0
            ])->id;

            foreach ($categorias as $categoria){
                $check_list_vehicle_categoria_id = CheckListVehicleCategoria::create([
                    'check_list_vehicle_id' => $check_list_vehicle_id,
                    'categoria' => $categoria->categoria
                ])->id;

                $intervenciones = CheckListIntervencion::where('check_list_categoria_id', '=', $categoria->id)->get();

                foreach ($intervenciones as $intervencion){
                    CheckListVehicleIntervencion::create([
                        'check_list_categoria_id' => $check_list_vehicle_categoria_id,
                        'intervencion' => $intervencion->intervencion
                    ]);
                }
            }


            $checklistvehicles = CheckListVehicle::where('vehicle_id', '=', $id)->get();
            foreach ($checklistvehicles as $checklistvehicle){
                $formatchecklist = CheckListVehicleCategoria::with('intervenciones')->where('check_list_vehicle_id', '=', $checklistvehicle->id)->get();
                return $formatchecklist;
            }
        }
        
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


    function unique_multidim_array($array, $key) {
        $uniq = [];
        foreach($array as $val) {
            $curVal = $val[$key]; // shortcut of the value
            $uniq[$curVal] = $val; // override previous value if exists
        }
        return array_values($uniq); // array_values to re-index array
    }


    public function guardarCheckListVehicle(Request $request)
    {
        $id_vehicle = $request->id_vehicle;
        $kilometraje = $request->kilometraje;
        $user_id = Auth::user()->id;

        
        $existe =  $this->unique_multidim_array($request->existe, 'id_intervencion');
        $estado =  $this->unique_multidim_array($request->estado, 'id_intervencion');


        $checklistvehicles = CheckListVehicle::where('vehicle_id', '=', $id_vehicle)->get();
        foreach ($checklistvehicles as $checklistvehicle){

            $categorias = CheckListVehicleCategoria::where('check_list_vehicle_id', '=', $checklistvehicle->id)->get();
            foreach ($categorias as $categoria){

                $intervenciones = CheckListVehicleIntervencion::where('check_list_categoria_id', '=', $categoria->id)->get();
                foreach ($intervenciones as $intervencion){

                    $count_condicion = CheckListVehicleCondicion::where('check_list_intervencion_id', '=', $intervencion->id)->count();
                    if($count_condicion > 0){
                    
                        for ($i=0; $i<count($existe); $i++){

                            if($existe[$i]['existe'] == 'no'){
                                CheckListVehicleCondicion::where('check_list_intervencion_id', '=', $existe[$i]['id_intervencion'])
                                ->update([
                                    'estado' => '',
                                    'existe' => $existe[$i]['existe']
                                ]);
                            }else{

                                for ($y=0; $y<count($estado); $y++){
                
                                    if($existe[$i]['id_intervencion'] == $estado[$y]['id_intervencion']){
                                        CheckListVehicleCondicion::where('check_list_intervencion_id', '=', $existe[$i]['id_intervencion'])
                                        ->update([
                                            'estado' => $estado[$y]['estado'],
                                            'existe' => $existe[$i]['existe']
                                        ]);
                                    }
                                }

                            }
                        }

                        Vehicle::find($id_vehicle)->update([
                            'km' => $kilometraje,
                        ]);

                        CheckListVehicle::find($checklistvehicle->id)->update([
                            'realizado' => 1
                        ]);
                        
                    }else{
                        for ($i=0; $i<count($existe); $i++){

                            if($existe[$i]['existe'] == 'no'){
                                CheckListVehicleCondicion::create([
                                    'check_list_intervencion_id' => $existe[$i]['id_intervencion'],
                                    'estado' => '',
                                    'existe' => $existe[$i]['existe']
                                ]);
                            }else{

                                for ($y=0; $y<count($estado); $y++){
                
                                    if($existe[$i]['id_intervencion'] == $estado[$y]['id_intervencion']){
                                        CheckListVehicleCondicion::create([
                                            'check_list_intervencion_id' => $existe[$i]['id_intervencion'],
                                            'estado' => $estado[$y]['estado'],
                                            'existe' => $existe[$i]['existe']
                                        ]);
                                    }
                                }

                            }
                        }

                        Vehicle::find($id_vehicle)->update([
                            'km' => $kilometraje,
                        ]);

                        CheckListVehicle::find($checklistvehicle->id)->update([
                            'realizado' => 1
                        ]);
                    }
                }
            }
        }
    }



    public function agregarObservacionCheckList(Request $request){
        $arreglo = array();

        $id_intervencion =  $request->id_intervencion_checklist;
        $id_vehicle =  $request->id_vehicle_checklist;
        $imagenes = $request->imagenes_checklist;
        $user_id = Auth::user()->id;

        $manager = new ImageManager(array('local' => 'imagick'));

        foreach ($imagenes as $imagen){

            $filename = time().'.'.$imagen->getClientOriginalExtension();
            $path = public_path().'/images/checklist/'.$filename;


            $img = $manager->make($imagen->getRealPath());
            $img->resize(1000,1000, function($constraint){
                $constraint->aspectRatio();
            })->save($path);

            $url = '/images/checklist/'.$filename;


    
            $intervenciones = CheckListVehicleIntervencion::where('id', '=', $id_intervencion)->get();
            foreach ($intervenciones as $intervencion){

                $count_observacion = CheckListVehicleObservacion::where('check_list_intervencion_id', '=', $intervencion->id)->count();
                if($count_observacion > 0){

                    $observaciones = CheckListVehicleObservacion::where('check_list_intervencion_id', '=', $intervencion->id)->get();

                    foreach ($observaciones as $observacion){
                        unlink(public_path().$observacion->imagen);

                        $image = CheckListVehicleObservacion::findOrFail($observacion->id);
                        $image->delete();
                    }
        
                    CheckListVehicleObservacion::create([
                        'check_list_intervencion_id' => $intervencion->id,
                        'observacion' => $request->observacion_checklist,
                        'imagen' => $url,
                    ]);

                }else{
                    CheckListVehicleObservacion::create([
                        'check_list_intervencion_id' => $intervencion->id,
                        'observacion' => $request->observacion_checklist,
                        'imagen' => $url,
                    ]);

                }
            }
                
            array_push($arreglo, $path);


        }
        return response($arreglo);
    }


    public function checklistvehicles(){

        $user_id = Auth::user()->id;

        $roles = DB::table('roles')
            ->join('model_has_roles', 'roles.id', '=', 'model_has_roles.role_id')
            ->join('users', 'model_has_roles.model_id', '=', 'users.id')
            ->where('users.id', '=', $user_id)
            ->select('roles.name')
            ->get();

        if($roles[0]->name == 'admin'){
            $checklistvehicles = Vehicle::with('checklist')->get();
            return $checklistvehicles;
        }else{
            $checklistvehicles = Vehicle::with('checklist')->where('user_id', '=', $user_id)->get();
            return $checklistvehicles;
        }

    }


    public function mostrarCheckListVehicles($id){

        $checklistvehicles= CheckListVehicle::where('id', '=', $id)->get();
        foreach ($checklistvehicles as $checklistvehicle){
            
            $formatchecklist = CheckListVehicleCategoria::with('intervenciones')->where('check_list_vehicle_id', '=', $checklistvehicle->id)->get();
            $array = [
                $formatchecklist,
                'id_checklist_vehicle' => $id
            ];

            return $array;
        }  
    }



    public function mostrarCondiciones(Request $request){

        $intervenciones = CheckListVehicleIntervencion::with('condiciones' , 'observaciones')->where('check_list_categoria_id', '=', $request->id_categoria)->get();
        return $intervenciones;
        
    }

    public function mostrarObservaciones(Request $request){

        $observaciones = CheckListVehicleObservacion::where('check_list_intervencion_id', '=', $request->id_intervencion)->get();
        return $observaciones;
        
    }


    public function roleschecklists(){

        $user_id = Auth::user()->id;

        $roles = DB::table('roles')
            ->join('model_has_roles', 'roles.id', '=', 'model_has_roles.role_id')
            ->join('users', 'model_has_roles.model_id', '=', 'users.id')
            ->where('users.id', '=', $user_id)
            ->select('roles.name')
            ->get();

        return $roles[0]->name;

    }

    public function crearFormatoCheckList(Request $request){

        $user_id = Auth::user()->id;

        $count = CheckList::where('user_id', '=', $user_id)->count();
        if($count > 0){
            $checklists = CheckList::where('user_id', '=', $user_id)->orderby('created_at', 'desc')->first();
            $formatchecklist = CheckListCategoria::with('intervenciones')->where('check_list_id', '=', $checklists->id)->get();
            return $formatchecklist;
        }else{
            $checklist = CheckList::create([
                'user_id' => $user_id
            ])->id;

            foreach ($request->formatchecklist as $format){
                $categoria_id = CheckListCategoria::create([
                    'check_list_id' => $checklist,
                    'categoria' => $format['categoria'],
                ])->id;

                foreach ($format['intervenciones'] as $intervencion){
                    CheckListIntervencion::create([
                        'check_list_categoria_id' => $categoria_id,
                        'intervencion' => $intervencion['intervencion'],
                    ]);
                }
            }

            $checklists = CheckList::where('user_id', '=', $user_id)->orderby('created_at', 'desc')->first();
            $formatchecklist = CheckListCategoria::with('intervenciones')->where('check_list_id', '=', $checklists->id)->get();
            return $formatchecklist;
        }
    }
}
