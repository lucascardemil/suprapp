<template>
    
    <div id="MostrarObservacion" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <div v-for="observacion in observaciones" :key="observacion.id">
                        <p class="font-weight-bold">Observación</p>
                        <p class="text-justify">{{ observacion.observacion}}</p>
                        <hr>
                        <p class="font-weight-bold">Foto</p>
                        <img :src="observacion.imagen" class="img-thumbnail" :alt="observacion.imagen">
                    </div>
                </div>
                <div class="modal-footer">
                    
                    <button type="button" class="btn btn-danger" @click.prevent="cerrarMostrarObservacion">
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
    components: { },
    computed:{
        ...mapState(['observaciones']),
        ...mapGetters([]),
    },
    methods:{
        ...mapActions(['cerrarMostrarObservacion'])
    },
}
</script>

