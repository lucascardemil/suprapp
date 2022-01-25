<template>
    
    <div id="MostrarCheckListVehicle" class="modal fade" style="overflow-y: scroll;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    
                    <div id="accordion">
                        <div v-for="(mostrarchecklistvehicle, index) in mostrarchecklistvehicles[0]" :key="index" class="card">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" @click.prevent="mostrarCondiciones({ id_categoria:  mostrarchecklistvehicle.id })" data-toggle="collapse" :data-target="'#collapseOne_' + mostrarchecklistvehicle.id" aria-expanded="true" :aria-controls="'collapseOne_' + mostrarchecklistvehicle.id">
                                    <b><em>{{ index + 1 }}.- {{ mostrarchecklistvehicle.categoria }}</em></b>
                                    </button>
                                </h5>
                            </div>

                            <div :id="'collapseOne_' + mostrarchecklistvehicle.id" class="collapse false" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="vertical-align: top;">Intervenciones</th>
                                                <th colspan="2">Existe</th>
                                                <th colspan="3">Estado</th>
                                                <th rowspan="2" style="vertical-align: top;">Observación</th>
                                                
                                            </tr>
                                            <tr>
                                                <th>Si</th>
                                                <th>No</th>
                                                <th>Bueno</th>
                                                <th>Regular</th>
                                                <th>Malo</th>
                                            </tr>
                                        </thead>
                                        <tbody v-for="intervencion in intervenciones" :key="intervencion.id">
                                            <tr v-for="condicion in intervencion.condiciones" :key="condicion.id">
                        
                                                <td>{{ intervencion.intervencion }}</td>
                                                <td class="text-center" v-if="condicion.existe == 'si'">
                                                    <i class="fas fa-check"></i>
                                                </td>
                                                <td v-else></td>
                                                <td class="text-center" v-if="condicion.existe == 'no'">
                                                    <i class="fas fa-check"></i>
                                                </td>
                                                <td v-else></td>
                                                <td class="text-center" v-if="condicion.estado == 'bueno'">
                                                    <i class="fas fa-check"></i>
                                                </td>
                                                <td v-else></td>
                                                <td class="text-center" v-if="condicion.estado == 'regular'">
                                                    <i class="fas fa-check"></i>
                                                </td>
                                                <td v-else></td>
                                                <td class="text-center" v-if="condicion.estado == 'malo'">
                                                    <i class="fas fa-check"></i>
                                                </td>
                                                <td v-else></td>
                                                <td v-for="observacion in intervencion.observaciones" :key="observacion.id">
                                                    <a v-if="observacion.id > 0" class="btn btn-block btn-warning"
                                                        @click.prevent="modalMostrarObservacion({ id_intervencion: observacion.check_list_intervencion_id, id_vehicle: observacion.check_list_vehicle_id  })">
                                                        <i class="far fa-eye"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    
                    <button type="button" @click.prevent="cerrarMostrarCheckListVehicle" class="btn btn-danger" data-dismiss="modal" aria-label="Close">
                        Cerrar
                    </button>
                        
                </div>
            </div>
        </div>
        <MostrarObservacion></MostrarObservacion>
    </div>
    
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';
import MostrarObservacion from './MostrarObservacion'

export default {
    components: {MostrarObservacion},
    computed:{
        ...mapState(['mostrarchecklistvehicles', 'intervenciones']),
        ...mapGetters([]),
    },
    methods:{
        ...mapActions(['getMostrarCheckListVehicles', 'mostrarCondiciones', 'modalMostrarObservacion', 'cerrarMostrarCheckListVehicle'])
    }
}
</script>

