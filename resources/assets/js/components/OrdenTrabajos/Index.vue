<template>

    <div class="col-lg-12">

        <h5 class="text-white">
            Ordenes de trabajo
        </h5>
        <div class="table-responsive">
            <table class="table table-striped mt-3 table-sm text-white bg-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patente</th>
                        <th>Kilometraje</th>
                        <th>Fecha</th>
                        <th>Trabajos</th>
                    </tr>
                </thead>
                <tbody v-for="ordentrabajoLocal in ordenestrabajos" :key="ordentrabajoLocal.id">
                    <tr data-toggle="collapse" :data-target="'#orden_trabajo_'+ordentrabajoLocal.id" class="accordion-toggle">
                        <td>{{ ordentrabajoLocal.id }}</td>
                        <td>{{ ordentrabajoLocal.vehicle.patent }}</td>
                        <td>{{ ordentrabajoLocal.km }}</td>
                        <td>{{ ordentrabajoLocal.updated_at |  moment('DD/MM/YYYY') }}</td>

                        <td width="10px">
                            <a class="btn btn-block btn-info btn-sm"
                                title="Editar">
                                <i class="fas fa-info"></i>
                            </a>
                        </td>
                    </tr>
                    
                    <tr>
                        <td colspan="12" class="p-0">
                            <div class="accordian-body collapse" :id="'orden_trabajo_'+ordentrabajoLocal.id"> 
                                <table class="table table-hover table-striped mb-0 table-sm">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Descripcion Del Trabajo</th>
                                            <th>Kilometraje</th>
                                            <th>Realizado</th>
                                            <th>Fecha</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="trabajo in ordentrabajoLocal.trabajo" :key="trabajo.id">
                                            <td>{{ trabajo.id }}</td>
                                            <td>{{ trabajo.descripcion }}</td>
                                            <td>{{ trabajo.km }}</td>
                                            <td v-if="trabajo.realizado > 0">
                            
                                                <button class="button" @click.prevent="deleteRealizado({ id: trabajo.id })" ><i class="fas fa-check"></i></button>
                                                
                                            </td>
                                            <td v-else>
                                                
                                                <input type="checkbox" :id="trabajo.id" :value="trabajo.id" v-model="checkRealizado">
                                                <label :for="trabajo.id"></label>
                                                
                                            </td>
                                            <td>{{ trabajo.created_at |  moment('DD/MM/YYYY') }}</td>

                                            <td>
                                                <a href="#" class="btn btn-success btn-sm"
                                                    @click.prevent="modalFotosOrdenTrabajo({ id: trabajo.id })"
                                                    title="Fotos">
                                                    <i class="fas fa-camera-retro"></i>
                                                </a>
                                            
                                                <a href="#" class="btn btn-warning btn-sm"
                                                    @click.prevent="modalObservacion({ id: trabajo.id })"
                                                    title="Editar">
                                                    <i class="fas fa-edit"></i>
                                                </a>

                                                <a href="#" class="btn btn-danger btn-sm"
                                                    @click.prevent="removeTrabajo({ id: trabajo.id})"
                                                    title="Eliminar">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <AgregarFotosOrdenTrabajo></AgregarFotosOrdenTrabajo>
        <AgregarObservacion></AgregarObservacion>
    </div>

</template>


<script>

import { loadProgressBar } from 'axios-progress-bar'
import AgregarFotosOrdenTrabajo from './AgregarFotosOrdenTrabajo'
import AgregarObservacion from './AgregarObservacion'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    components: { AgregarFotosOrdenTrabajo, AgregarObservacion },
    computed:{
        ...mapState(['ordenestrabajos', 'trabajos', 'checkRealizado']),
        ...mapGetters(['isActived', 'pagesNumber']),
        checkRealizado: {
            get () {
                return this.$store.state.checkRealizado
            },
            set (value) {
                this.$store.commit('setcheckRealizado', value)
                this.$store.commit('getOrdenesTrabajos')
            }
        }
    },
    methods:{
        ...mapActions(['getOrdenesTrabajos','deleteRealizado', 'modalFotosOrdenTrabajo', 'modalObservacion', 'removeTrabajo'])
    },
    created(){
        loadProgressBar();
        this.$store.dispatch('getOrdenesTrabajos')
    }
}

</script>

<style>
.button {
  border-radius: 0.2rem;
  background-color: #28a745;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  width: 50px;
  transition: all 0.5s;
  cursor: pointer;
}


.button:hover {
  background-color: #dc3545;
}
.button:hover .fa-check:before {
    content: "";
}
.button:hover:before {
    font-family: "Font Awesome 5 Free"; font-weight: 900; content: "\f00d";
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
