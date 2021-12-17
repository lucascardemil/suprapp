<template>
    <div>
        
        <div id="modalObservacion" class="modal fade">
            <div class="modal-dialog modal-observacion">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Observaciones</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <form action="POST" v-on:submit.prevent="AgregarObservacion">
    
                                    <div class="form-group">
                                        <label for="observacion">Observacion y/o comentario</label>
                                        <textarea v-validate="'required|min:4'"
                                                :class="{'input': true, 'is-invalid': errors.has('observacion') }"
                                                name="observacion" rows="5"
                                                class="form-control" v-model="newOrdenTrabajo.observacion"></textarea>
                                        <p v-show="errors.has('observacion')" class="text-danger">{{ errors.first('observacion') }}</p>
                                    </div>

                                    <div class="form-group">
                                        <input id="filesObservacion" type="file" class="form-control"
                                        @change="subirFotosObservacion({ evt: $event})">
                                    </div>

                                    <button type="submit" class="btn btn-success">
                                        <i class="fas fa-plus-square"></i> Agregar
                                    </button>
                                </form>
                            </div>
                            
                            <div class="col-12 mt-5">
                                <div class="row row-cols-1 row-cols-md-2 g-4">
                                    <div class="col-6 pb-3" v-for="observacion in observaciones" :key="observacion.id">
                                        <div class="card">
                                            <img :src="observacion.url" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <p class="card-text">{{ observacion.observacion }}</p>
                                                <a href="#" class="btn btn-danger btn-sm"
                                                    @click.prevent="removeObservacion({ id: observacion.id })"
                                                    title="Eliminar">
                                                    Eliminar
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="submit" class="btn btn-success" v-on:click="guardarObservacion">
                            <i class="fas fa-plus-square"></i> Guardar
                        </button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loadProgressBar } from 'axios-progress-bar'
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return{
            attachment: [],
            form: new FormData
        }
    },
    computed:{
        ...mapState(['observaciones','newOrdenTrabajo', 'errorsLaravel']),
        ...mapGetters(['completeOrdenTrabajo'])
    },

    methods:{
        ...mapActions(['getObservaciones','removeObservacion', 'AgregarObservacion', 'subirFotosObservacion']),
    },

    created(){
        loadProgressBar();
        // this.$store.dispatch('getOrdenesTrabajos', { page: 1 })
        this.$store.dispatch('getObservaciones')
    }
}
</script>
<style>
.modal-observacion {
    max-width: 1000px;
}
</style>