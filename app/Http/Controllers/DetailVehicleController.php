<?php

namespace App\Http\Controllers;

use App\DetailVehicle;
use App\Vehicle;
use Illuminate\Http\Request;

class DetailVehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $detalle = DetailVehicle::orderBy('id', 'DESC')->get();

        return $detalle;
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

        $vehicle = Vehicle::find($data['vehicle_id']);
        if($data['km'] > $vehicle->km){
        
            Vehicle::where('id', $data['vehicle_id'])
            ->update(['km' => $data['km']]);
            $detail = DetailVehicle::create($data);

            return $detail->id;
        }else{
            return response()->json('¡Error, El kilometraje no puede ser menor al actual!', 400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DetailVehicle  $detailVehicle
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $detalle = DetailVehicle::find($id)->images;

        return $detalle;
    }

    
}
