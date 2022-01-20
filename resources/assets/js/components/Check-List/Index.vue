<template>

    <div class="col-lg-12">

        <h5 class="text-white">
            Check List
            <a href="#" class="btn btn-success pull-right" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#CrearFormatoCheckList">
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
                        <th>#</th>
                        <th>Check List</th>
                        <th>Kilometraje</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-for="(checklistvehicle, index) in checklistvehicles" :key="index">
                    <tr>
                        <td>{{ index + 1 }}</td>
                        <td>Check List {{ index + 1 }}</td>
                        <td>{{ checklistvehicle.km }}</td>
                        <td v-if="checklistvehicle.checklist[0]['realizado'] > 0">
                            <button class="btn btn-success"><i class="fas fa-check"></i></button>
                        </td>
                        <td>{{ checklistvehicle.checklist[0]['created_at'] |  moment('DD/MM/YYYY') }}</td>
                        <td width="10px">
                            <a class="btn btn-block btn-info"
                                title="Editar"
                                @click.prevent="modalMostrarCheckListVehicle({ id: checklistvehicle.checklist[0]['check_list_id'] })">
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
        ...mapState(['ordenestrabajos', 'checklists','trabajos', 'checklistvehicles','checkRealizado']),
        // ...mapGetters(['isActived', 'pagesNumber']),
        // checkRealizado: {
        //     get () {
        //         return this.$store.state.checkRealizado
        //     },
        //     set (value) {
        //         this.$store.commit('setcheckRealizado', value)
        //         this.$store.commit('getOrdenesTrabajos')
        //     }
        // }
    },
    methods:{
        
        ...mapActions(['modalCrearFormatoCheckList', 'modalCrearIntervencionCheckList', 'modalMostrarFormatoCheckList', 'modalMostrarCheckListVehicle' ,'getCheckListVehicles'])
    },
    created(){
        loadProgressBar();

        this.$store.dispatch('getCheckListVehicles')
    }
}

</script>
