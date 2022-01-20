<template>
    
    <div id="MostrarCheckListVehicle" class="modal fade" style="overflow-y: scroll;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">

                    <!-- <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th rowspan="2" style="vertical-align: top;">Categoria</th>
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
                            <tbody v-for="(mostrarchecklistvehicle, index) in mostrarchecklistvehicles" :key="index">
                                <tr>
                                    <td colspan="7" class="table-secondary">
                                        <em>{{ index + 1 }}.- {{ mostrarchecklistvehicle.categoria }}</em>
                                    </td>
                                </tr>
                                
                                <tr v-for="intervencion in mostrarchecklistvehicle.intervenciones" :key="intervencion.id">
                                    <td>{{ intervencion.intervencion }}</td>
                                    <td class="text-center">
                                        <input type="radio" :name="'existe' + intervencion.id" :value="intervencion.id" v-model="checkExisteSi">
                                        <label></label>
                                    </td>
                                    <td class="text-center">
                                        <input type="radio" :name="'existe' + intervencion.id" :value="intervencion.id" v-model="checkExisteNo">
                                        <label></label>
                                    </td>
                                    <td class="text-center">
                                        <input type="radio"  :name="'estado' + intervencion.id" :value="intervencion.id" v-model="checkEstadoBueno">
                                        <label></label>
                                    </td>
                                    <td class="text-center">
                                        <input type="radio"  :name="'estado' + intervencion.id" :value="intervencion.id" v-model="checkEstadoRegular">
                                        <label></label>
                                    </td>
                                    <td class="text-center">
                                        <input type="radio" :name="'estado' + intervencion.id" :value="intervencion.id" v-model="checkEstadoMalo">
                                        <label></label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->

                </div>
                <div class="modal-footer">
                    
                    <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">
                        Cerrar
                    </button>
                        
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';


export default {
    components: {},
    computed:{
        ...mapState(['mostrarchecklistvehicles']),
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
        ...mapActions(['getMostrarCheckListVehicles'])
    },
    // created(){
    //     loadProgressBar();

    //     this.$store.dispatch('getMostrarCheckListVehicles')
    // }
}
</script>

