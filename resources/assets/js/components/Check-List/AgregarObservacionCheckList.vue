<template>
    <form action="POST" v-on:submit.prevent="agregarObservacionCheckList">
        <div id="AgregarObservacionCheckList" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Agregar Observación</h4>
                    </div>
                    <div class="modal-body">
                        
                        <div class="form-group">
                            <label for="observacion">Observación</label>
                            <textarea v-validate="'required|min:4'"
                                    :class="{'input': true, 'is-invalid': errors.has('observacion') }"
                                    name="observacion" rows="5"
                                    class="form-control" v-model="columnaObservacion.observacion"></textarea>
                            <p v-show="errors.has('observacion')" class="text-danger">{{ errors.first('observacion') }}</p>
                        </div>

                        <div class="form-group">
                            <input id="filesObservacion" type="file" class="form-control"
                            @change="subirFotosObservacionCheckList({ evt: $event})">
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
    </form>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';


export default {
    data(){
        return{
            attachment: [],
            form: new FormData
        }
    },
    computed:{
        ...mapState(['columnaObservacion', 'errorsLaravel']),
        ...mapGetters([]),
    },
    methods:{
        ...mapActions(['agregarObservacionCheckList', 'subirFotosObservacionCheckList'])
    },
}
</script>

