<template>

    <form action="POST" v-on:submit.prevent="createTipoPago">
        <div id="createTiposPagos" class="modal fade">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Crear Formas de Pagos</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="pago">Tipo de Pago</label>
                            <input required
                                    type="text"
                                    name="pago"
                                    class="form-control" v-model="newTipoPago.pago">
                            
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-success">
                                <i class="fas fa-plus-square"></i> Guardar
                            </button>
                        </div>

                        <!-- <div class="form-group">
                            <label for="codigo">% Utilidad</label>
                            <input required
                                    type="number"
                                    name="utilidad"
                                    class="form-control" v-model="newTipoPago.utilidad">
                        </div> -->

                        <div class="form-group">
                            <div class="table-responsive">
                                <table class="table table-striped mt-3 table-sm text-white bg-dark">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tipo de Pago</th>
                                            <!-- <th>% Utilidad</th> -->
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="tipospagosLocal in tipospagos" :key="tipospagosLocal.id">
                                            <td>{{ tipospagosLocal.id }}</td>
                                            <td>{{ tipospagosLocal.pago }}</td>
                                            <!-- <td>{{ tipospagosLocal.utilidad }}%</td> -->
                                            <td class="text-right">
                                                <button class="btn btn-warning"
                                                    @click.prevent="editTiposPagos({ tipospagosLocal })"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Editar Tipo de pago">
                                                    <i class="far fa-edit"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <EditTiposPagos></EditTiposPagos>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

</template>

<script>

import { loadProgressBar } from 'axios-progress-bar'
import { mapState, mapActions, mapGetters } from 'vuex'
import EditTiposPagos from './EditTiposPagos'

export default {
    components: { EditTiposPagos},
    computed:{
        ...mapState(['newTipoPago', 'tipospagos']),
        ...mapGetters([])
    },
    methods:{
        ...mapActions(['getTiposPagos','createTipoPago','editTiposPagos'])
    },
    created(){
        loadProgressBar();
        this.$store.dispatch('getTiposPagos')
    }
}

</script>

