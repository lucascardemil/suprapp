<template>
    <form action="POST" v-on:submit.prevent="guardarCheckList">
        <div id="CheckListVehicle" class="modal fade" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-body">

                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2" style="vertical-align: top;">Categoria</th>
                                        <th colspan="2">Existe</th>
                                        <th colspan="3">Estado</th>
                                        <th colspan="2" rowspan="2" style="vertical-align: top;">Observación</th>
                                        
                                    </tr>
                                    <tr>
                                        <th>Si</th>
                                        <th>No</th>
                                        <th>Bueno</th>
                                        <th>Regular</th>
                                        <th>Malo</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(formatchecklist, index) in formatchecklists" :key="index">
                                    <tr>
                                        <td colspan="8" class="table-secondary">
                                            <em>{{ index + 1 }}.- {{ formatchecklist.categoria }}</em>
                                        </td>
                                    </tr>
                                    
                                    <tr v-for="intervencion in formatchecklist.intervenciones" :key="intervencion.id">
                                        <td>{{ intervencion.intervencion }}</td>
                                        <td class="text-center">
                                            <input type="radio" required :name="'existe' + intervencion.id" :value="intervencion.id" v-model="checkExisteSi">
                                            <label></label>
                                        </td>
                                        <td class="text-center">
                                            <input type="radio" required :name="'existe' + intervencion.id" :value="intervencion.id" v-model="checkExisteNo">
                                            <label></label>
                                        </td>
                                        <td class="text-center">
                                            <input type="radio" required :name="'estado' + intervencion.id" :value="intervencion.id" v-model="checkEstadoBueno">
                                            <label></label>
                                        </td>
                                        <td class="text-center">
                                            <input type="radio" required :name="'estado' + intervencion.id" :value="intervencion.id" v-model="checkEstadoRegular">
                                            <label></label>
                                        </td>
                                        <td class="text-center">
                                            <input type="radio" required :name="'estado' + intervencion.id" :value="intervencion.id" v-model="checkEstadoMalo">
                                            <label></label>
                                        </td>
                                        <td>
                                            <a class="btn btn-success btn-block btn-sm text-white"
                                                @click.prevent="modalObservacionVehicleCheckList({ id_intervencion: intervencion.id, id_vehicle: formcheckList.id_vehicle})">
                                                <i class="fas fa-plus"></i> Observación
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        

                    </div>
                    <div class="modal-footer">
                        
                        <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">
                            Cerrar
                        </button>

                        <button type="submit" class="btn btn-success">
                            Guardar
                        </button>
                            
                    </div>
                </div>
            </div>
        </div>
        <AgregarObservacionCheckList></AgregarObservacionCheckList>
    </form>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';
import AgregarObservacionCheckList from './AgregarObservacionCheckList'

export default {
    components: {AgregarObservacionCheckList},
    computed:{
        ...mapState(['formatchecklists', 'formcheckList', 'columnaObservacion', 'columnaExiste', 'columnaEstado']),
        ...mapGetters([]),
        checkExisteSi: {
            get () {
                return this.$store.state.checkExisteSi
            },
            set (value) {
                this.$store.commit('setCheckExisteSi', value)
            }
        },
        checkExisteNo: {
            get () {
                return this.$store.state.checkExisteNo
            },
            set (value) {
                this.$store.commit('setcheckExisteNo', value)
            }
        },
        checkEstadoBueno: {
            get () {
                return this.$store.state.checkEstadoBueno
            },
            set (value) {
                this.$store.commit('setCheckEstadoBueno', value)
            }
        },
        checkEstadoRegular: {
            get () {
                return this.$store.state.checkEstadoRegular
            },
            set (value) {
                this.$store.commit('setCheckEstadoRegular', value)
            }
        },
        checkEstadoMalo: {
            get () {
                return this.$store.state.checkEstadoMalo
            },
            set (value) {
                this.$store.commit('setCheckEstadoMalo', value)
            }
        }
    },
    methods:{
        ...mapActions(['guardarCheckList', 'modalObservacionVehicleCheckList'])
    },
}
</script>

