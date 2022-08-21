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
                                <form action="POST" v-on:submit.prevent="guardarOrdenTrabajo({ id: newOrdenTrabajo.vehicle_id, km_old:  newOrdenTrabajo.km_old})">
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

                                    <button type="submit" class="btn btn-success" :disabled="!completeOrdenTrabajo">
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
                                                <th>Kilometraje</th>
                                                <th>Fecha</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr  v-for="trabajo in trabajos" :key="trabajo.id">
                                                <td>{{ trabajo.id }}</td>
                                                <td>{{ trabajo.descripcion }}</td>
                                                <td>{{ trabajo.km }}</td>
                                                <td>{{ trabajo.created_at |  moment('DD/MM/YYYY h:mm a') }}</td>
                                                <td class="text-right">
                                                    <a 
                                                        href="#" 
                                                        class="btn btn-danger btn-sm"
                                                        @click.prevent="removeTrabajo({ id: trabajo.id, vehicle_id: newOrdenTrabajo.vehicle_id })"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        title="Eliminar">
                                                        <i class="fas fa-trash-alt"></i>
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
                        <button type="button" data-dismiss="modal" aria-label="Close" class="btn btn-danger">
                        Cerrar
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loadProgressBar } from 'axios-progress-bar'
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed:{
        ...mapState(['trabajos','newOrdenTrabajo', 'errorsLaravel']),
        ...mapGetters(['completeOrdenTrabajo'])
    },

    methods:{
        ...mapActions(['getTrabajos', 'removeTrabajo', 'guardarOrdenTrabajo']),
    },
}
</script>
