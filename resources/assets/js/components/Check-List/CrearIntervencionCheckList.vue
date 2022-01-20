<template>
    
    <div id="CrearIntervencionCheckList" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Crear Intervenciones</h4>
                </div>
                <div class="modal-body">
                    <div v-for="(categoria, index) in categorias" :key="index" class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-7 align-self-center">
                                    <h5 class="card-title mb-0">{{ categoria.categoria }}</h5>
                                </div>
                                <div class="col-5 text-right">
                                    <a 
                                        href="#" 
                                        class="btn btn-success"
                                        @click.prevent="modalIntervencion({ id: categoria.id })">
                                        Intervenciones
                                    </a>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li v-for="intervencion in categoria.intervenciones" :key="intervencion.id" class="list-group-item">
                                {{ intervencion.intervencion }}
                            </li>
                        </ul>
                    </div>                        
                </div>
                <div class="modal-footer">
                    <!-- <a 
                        href="#" 
                        class="btn btn-danger"
                        @click.prevent="modalCerrarIntervencion">
                        <i class="fas fa-arrow-left"></i> Atras
                    </a> -->
                

                    <button type="submit" class="btn btn-info" v-on:click="finalizarFormatoCheckList">
                        Finalizar Check List
                    </button>
                </div>
            </div>
        </div>
        <IntervencionCheckList></IntervencionCheckList>
    </div>
    
</template>

<script>
import { loadProgressBar } from 'axios-progress-bar'
import IntervencionCheckList from './IntervencionCheckList'
import { mapState, mapGetters, mapActions } from 'vuex';


export default {
    components: { IntervencionCheckList },
    computed:{
        ...mapState(['categorias']),
        //...mapGetters()
    },
    methods:{
        ...mapActions(['modalIntervencion', 'finalizarFormatoCheckList', 'modalCerrarIntervencion']),
    },
}
</script>
<style>
.list-group-item {
    margin-bottom: 1px;
}
</style>

