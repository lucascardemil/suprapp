<template>

    <div class="col-lg-12">

        <h5 class="text-white">
            Check List

            <a v-if="roleschecklists == 'admin'" href="#" class="btn btn-success pull-right" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#CrearFormatoCheckList">
                <i class="fas fa-plus-circle"></i>
            </a>

            <a href="#" class="btn btn-success pull-right" @click.prevent="modalMostrarFormatoCheckList">
                <i class="fas fa-clipboard-check"></i> Formato Check List
            </a>
        </h5>
        <div class="table-responsive">
            <table class="table table-striped mt-3 table-sm text-white bg-dark">
                <thead>
                    <tr>
                        <th>Patente</th>
                        <th>Kilometraje</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-for="checklistvehicle in checklistvehicles" :key="checklistvehicle.id">
                    <tr class="accordion-toggle" data-toggle="collapse" :data-target="'#checklist_'+checklistvehicle.id">
                        <td>{{ checklistvehicle.patent }}</td>
                        <td>{{ checklistvehicle.km }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr v-for="(checklist, index) in checklistvehicle.checklist" :key="index" :id="'checklist_'+checklistvehicle.id" class="accordian-body collapse font-weight-light bg-secondary">
                        <td>{{ index + 1 }}</td>
                        <td>Check List {{ index + 1 }} </td>
                        <td v-if="checklist.realizado > 0">
                            <a class="btn btn-success btn-sm"><i class="fas fa-check"></i></a>
                        </td>
                        <td v-else></td>
                        <td>{{ checklist.created_at |  moment('DD/MM/YYYY') }}</td>
                        <td style="width: 20px">
                            <a class="btn btn-block btn-info btn-sm"
                                title="Editar"
                                @click.prevent="modalMostrarCheckListVehicle({ id: checklist.id })">
                                <i class="fas fa-clipboard-check"></i> Ver
                            </a>
                        </td>
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>
        <CrearFormatoCheckList></CrearFormatoCheckList>
        <CrearIntervencionCheckList></CrearIntervencionCheckList>
        <MostrarFormatoCheckList></MostrarFormatoCheckList>
        <MostrarCheckListVehicle></MostrarCheckListVehicle>
    </div>

</template>


<script>

import { loadProgressBar } from 'axios-progress-bar'
import CrearFormatoCheckList from './CrearFormatoCheckList'
import CrearIntervencionCheckList from './CrearIntervencionCheckList'
import MostrarFormatoCheckList from './MostrarFormatoCheckList'
import MostrarCheckListVehicle from './MostrarCheckListVehicle'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    components: { CrearFormatoCheckList, CrearIntervencionCheckList, MostrarFormatoCheckList, MostrarCheckListVehicle },
    computed:{
        ...mapState(['ordenestrabajos', 'checklists','trabajos', 'checklistvehicles', 'roleschecklists']),
    },
    methods:{
        
        ...mapActions(['modalCrearFormatoCheckList', 'modalCrearIntervencionCheckList', 'modalMostrarFormatoCheckList', 'modalMostrarCheckListVehicle' ,'getCheckListVehicles','getCheckListRoles'])
    },
    created(){
        loadProgressBar();

        this.$store.dispatch('getCheckListVehicles')
        this.$store.dispatch('getCheckListRoles')
    }
}

</script>
