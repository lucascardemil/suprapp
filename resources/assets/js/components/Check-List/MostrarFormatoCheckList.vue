<template>
    
    <div id="MostrarFormatoCheckList" class="modal fade" style="overflow-y: scroll;">
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
                            <tbody v-for="(formatchecklist, index) in formatchecklists" :key="index">
                                <tr>
                                    <td colspan="7" class="table-secondary">
                                        <em>{{ index + 1 }}.- {{ formatchecklist.categoria }}</em>
                                        
                                        <a class="btn btn-warning btn-sm" style="float: right;" 
                                            @click.prevent="modalEditarCategoria({ formatchecklist: formatchecklist})"
                                            title="Editar">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a class="btn btn-success btn-sm text-white mr-3"  style="float: right;"
                                            @click.prevent="modalAgregarIntervencion({ id: formatchecklist.id })">
                                            <i class="fas fa-plus"></i> Intervencion
                                        </a>
                                    </td>
                                </tr>
                                
                                <tr v-for="intervencion in formatchecklist.intervenciones" :key="intervencion.id">
                                    <td>{{ intervencion.intervencion }}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <a class="btn btn-warning btn-sm" style="float: right;" 
                                            @click.prevent="modalEditarIntervencion({ intervenciones: intervencion})"
                                            title="Editar">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <a class="btn btn-success btn-sm text-white" 
                        @click.prevent="modalAgregarCategoria">
                        <i class="fas fa-plus"></i> Agregar Categoria
                    </a>
                    <!-- <a class="btn btn-success btn-sm text-white" 
                        @click.prevent="modalAgregarIntervencion">
                        <i class="fas fa-plus"></i> Agregar Intervencion
                    </a> -->
                    

                </div>
                <div class="modal-footer">
                    
                    <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">
                        Cerrar
                    </button>
                        
                </div>
            </div>
        </div>
        <EditarCategoriaCheckList></EditarCategoriaCheckList>
        <EditarIntervencionCheckList></EditarIntervencionCheckList>
        <AgregarCategoria></AgregarCategoria>
        <AgregarIntervencion></AgregarIntervencion>
    </div>
    
</template>

<script>
import EditarCategoriaCheckList from './EditarCategoriaCheckList'
import EditarIntervencionCheckList from './EditarIntervencionCheckList'
import AgregarCategoria from './AgregarCategoria'
import AgregarIntervencion from './AgregarIntervencion'
import { mapState, mapGetters, mapActions } from 'vuex';


export default {
    components: { EditarCategoriaCheckList, EditarIntervencionCheckList, AgregarCategoria, AgregarIntervencion },
    computed:{
        ...mapState(['formatchecklists']),
        ...mapGetters([])
    },
    methods:{
        ...mapActions(['modalEditarCategoria', 'modalEditarIntervencion', 'modalAgregarCategoria', 'modalAgregarIntervencion'])
    },
}
</script>

