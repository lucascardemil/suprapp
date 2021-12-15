<template>
    <div>
        
        <div id="createOrdenTrabajo" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Agregar Orden de Trabajo</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <form action="POST" v-on:submit.prevent="addTrabajo">
                                    <div class="form-group">
                                        <label for="kilometraje">Kilometraje</label>
                                        <input v-validate="'required|min:2|max:190'"
                                                :class="{'input': true, 'is-invalid': errors.has('kilometraje') }"
                                                type="number"
                                                name="kilometraje"
                                                class="form-control" v-model="newOrdenTrabajo.km">
                                        <p v-show="errors.has('kilometraje')" class="text-danger">{{ errors.first('kilometraje') }}</p>
                                    </div>

                                    <div class="form-group">
                                        <label for="descripcion">Descripción de trabajo</label>
                                        <textarea v-validate="'required|min:4'"
                                                :class="{'input': true, 'is-invalid': errors.has('descripcion') }"
                                                name="descripcion" rows="12"
                                                class="form-control" v-model="newOrdenTrabajo.descripcion"></textarea>
                                        <p v-show="errors.has('descripcion')" class="text-danger">{{ errors.first('descripcion') }}</p>
                                    </div>

                                    <button type="submit" class="btn btn-success">
                                        <i class="fas fa-plus-square"></i> Agregar
                                    </button>
                                </form>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped mt-3 table-sm text-white bg-dark">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Trabajo</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr  v-for="(trabajo, index) in trabajos" :key="index">
                                                <td>{{index + 1}}</td>
                                                <td>{{ trabajo.descripcion }}</td>
                                                <td>
                                                    <a 
                                                        href="#" 
                                                        class="btn btn-danger btn-sm"
                                                        @click.prevent="removeFromTrabajo(index)"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        title="Eliminar"
                                                    >
                                                        <i class="fas fa-ban"></i>
                                                    </a>
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success" v-on:click="guardarOrdenTrabajo">
                            <i class="fas fa-plus-square"></i> Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed:{
        ...mapState(['orden_trabajo','trabajos','newOrdenTrabajo', 'errorsLaravel']),
        ...mapGetters(['completeOrdenTrabajo'])
    },

    methods:{
        ...mapActions(['addTrabajo', 'removeFromTrabajo', 'guardarOrdenTrabajo']),
    },
}
</script>
