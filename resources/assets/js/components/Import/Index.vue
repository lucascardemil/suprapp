<template>

    <div class="col-lg-12">

        <h5 class="text-white">
            Administración de Importaciones
        </h5>

        <div class="">
            <div id="accordion">
                <div class="card">

                    <div class="card-header p-0" id="headingOne">
                    <h5 class="mb-0">
                        <button id="btn-quotation-card" class="btn btn-block text-left p-3" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">
                        Nueva Importación
                        <span class="text-right"><i class="fas fa-arrows-alt-v"></i></span>
                        </button>
                    </h5>
                    </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            <form action="POST" v-on:submit.prevent="createImport">
                                <div class="row">

                                    <div class="col-lg-9">
                                        <label for="nombre">Nombre</label>
                                        <input required
                                                type="text"
                                                name="nombre"
                                                class="form-control" v-model="newImport.name">
                                    </div>


                                    <div class="col-lg-3 mt-2">
                                        <label></label>
                                        <button type="submit" class="btn btn-success form-control">
                                            <i class="fas fa-plus-square"></i> Guardar
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-hover table-striped mt-3 table-sm text-white bg-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="importLocal in imports" :key="importLocal.id">
                        <td width="10">{{ importLocal.id }}</td>
                        <td>{{ importLocal.name }}</td>
                        <td>{{ importLocal.created_at |  moment('DD/MM/YYYY HH:mm') }}</td>
                        <td width="300">
                            <a href="#" class="btn btn-info btn-sm"
                                @click.prevent="showModalDetailimport({ id: importLocal.id })"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Editar">
                                <i class="fas fa-info-circle"></i>
                                Detalle
                            </a>

                            <a href="#"
                                @click.prevent="excelImport({ id: importLocal.id })"
                                class="btn btn-success btn-sm"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Excel">
                                <i class="far fa-file-excel"></i>
                                Excel
                            </a>

                            <a href="#" class="btn btn-primary btn-sm"
                                @click.prevent="showQuotationimport({ id: importLocal.id })"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Editar">
                                <i class="fas fa-file-contract"></i>
                                Cotización
                            </a>

                            <a href="#" class="btn btn-danger btn-sm"
                                @click.prevent="showModalDeleteImport( { id: importLocal.id } )"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Eliminar">
                                <i class="fas fa-ban"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <nav>
            <ul class="pagination">
                <li class="page-item" v-if="pagination.current_page > 1">
                    <a class="page-link border-light bg-dark" href="#" @click.prevent="changePageImport({page: 1})">
                        <span>Primera</span>
                    </a>
                </li>

                <li class="page-item" v-if="pagination.current_page > 1">
                    <a class="page-link border-light bg-dark" href="#" @click.prevent="changePageImport({page: pagination.current_page - 1})">
                        <span>Atrás</span>
                    </a>
                </li>

                <li class="page-item" v-for="page in pagesNumber"
                    v-bind:class="[ page == isActived ? 'active' : '' ]" :key="page">
                    <a class="page-link border-light bg-dark" href="#" @click.prevent="changePageImport({page})">
                        {{ page }}
                    </a>
                </li>

                <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                    <a class="page-link border-light bg-dark" href="#" @click.prevent="changePageImport({page: pagination.current_page + 1})">
                        <span>Siguiente</span>
                    </a>
                </li>

                <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                    <a class="page-link border-light bg-dark" href="#"  @click.prevent="changePageImport({page:pagination.last_page})">
                        <span>Última</span>
                    </a>
                </li>
            </ul>
        </nav>

        <Detalle></Detalle>
        <Cotizacion></Cotizacion>
        <DetalleEditar></DetalleEditar>
        <EliminarImportacion></EliminarImportacion>

    </div>

</template>


<script>

import { loadProgressBar } from 'axios-progress-bar'
import Detalle from './Detalle'
import Cotizacion from './Cotizacion'
import DetalleEditar from './DetalleEditar'
import EliminarImportacion from './Eliminar'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    components: { Detalle, Cotizacion, DetalleEditar, EliminarImportacion },
    computed:{
        ...mapState(['imports', 'newImport', 'searchImport',
                    'pagination', 'offset', 'errorsLaravel']),
        ...mapGetters(['isActived', 'pagesNumber'])
    },
    methods:{
        ...mapActions(['getImports', 'createImport', 'showModalDetailimport', 'showQuotationimport',
                        'showModalDeleteImport', 'excelImport', 'changePageImport'])
    },
    created(){
        loadProgressBar()
        this.$store.dispatch('getImports', { page: 1 })
    }
}

</script>

<style>

</style>
