<template>
    <div>
        <h5 class="text-white">
            Lista de Precios
        </h5>
        <div class="row mt-3">
            <div class="col-lg-3">
                <input type="text" v-model="search.name" @keyup="getCodes" class="form-control"
                    placeholder="Filtrar Producto...">
            </div>
        </div>
        <table class="table table-borderless table-dark table-hover table-striped mt-3 table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Código</th>
                    <th>Proveedor</th>
                    <th>Fecha Factura</th>
                    <th>Precio</th>
                    <th>Unidades</th>

                    <th>Precio Promedio</th>
                    <th>Precio Mas Alto</th>
                </tr>
            </thead>
            <tbody v-for="codeLocal in rows" :key="codeLocal.id">
                <tr class="accordion-toggle" data-toggle="collapse" :data-target="'#stock' + codeLocal.id">
                    <td>{{ codeLocal.id }}</td>
                    <td>{{ codeLocal.product.name }}</td>
                    <td>{{ codeLocal.codebar }}</td>
                    <td>{{ codeLocal.client.name }}</td>
                    <td></td>
                    <td></td>
                    <td>{{ totalUnidades(codeLocal) }}</td>

                    <td>{{ calcularPromedioPreciosCompra(codeLocal) | currency('$', 0,
                        { thousandsSeparator: '.' }) }}</td>
                    <td>{{ encontrarPrecioCompraMasAlto(codeLocal) | currency('$', 0,
                        { thousandsSeparator: '.' }) }}</td>

                </tr>
                <tr v-for="inventario in codeLocal.inventories" :key="inventario.id" :id="'stock' + inventario.code_id"
                    class="accordian-body collapse">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td v-if="inventario.fecha_fact != null">{{ inventario.fecha_fact }}</td>
                    <td v-else></td>


                    <td>{{ inventario.price | currency('$', 1) }}</td>
                    <td>{{ inventario.quantity }}</td>

                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        <nav>
            <ul class="pagination">
                <li class="page-item" v-if="pagination.current_page > 1">
                    <a class="page-link border-light bg-dark" href="#" @click.prevent="changePageCode({ page: 1 })">
                        <span>Primera</span>
                    </a>
                </li>
                <li class="page-item" v-if="pagination.current_page > 1">
                    <a class="page-link border-light bg-dark" href="#"
                        @click.prevent="changePageCode({ page: pagination.current_page - 1 })">
                        <span>Atrás</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pagesNumber" v-bind:class="[page == isActived ? 'active' : '']"
                    :key="page">
                    <a class="page-link border-light bg-dark" href="#" @click.prevent="changePageCode({ page })">
                        {{ page }}
                    </a>
                </li>
                <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                    <a class="page-link border-light bg-dark" href="#"
                        @click.prevent="changePageCode({ page: pagination.current_page + 1 })">
                        <span>Siguiente</span>
                    </a>
                </li>

                <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                    <a class="page-link border-light bg-dark" href="#"
                        @click.prevent="changePageCode({ page: pagination.last_page })">
                        <span>Última</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { loadProgressBar } from 'axios-progress-bar'
import { mapState, mapActions, mapGetters } from 'vuex'


export default {
    data() {
        return {
            search_value: '',
            sortMethod: 'asc'
        }
    },
    components: {},
    computed: {
        rows() {
            return this.codes
                .sort((a, b) => {
                    let modifier = 1;
                    if (this.sortMethod.localeCompare('desc')) modifier = -1;
                    if (typeof (a.inventories[0].price) !== 'undefined') return 0;
                    return 0;
                })
                .filter(code => {
                    return code.product.name.toLowerCase().includes(this.search_value.toLowerCase());
                })
        },
        ...mapState(['codes', 'search', 'pagination', 'offset', 'errorsLaravel', 'allInventory']),
        ...mapGetters(['isActived', 'pagesNumber'])
    },
    methods: {
        sortBy() {
            this.sortMethod = this.sortMethod === 'asc' ? 'desc' : 'asc';
        },
        ...mapActions(['crearInventarioUsuario', 'getCodes', 'changePageCode']),
        totalUnidades(item) {
            let total = 0;
            for (let i = 0; i < item.inventories.length; i++) {
                if (item.inventories[i].code_id == item.id) {
                    total += parseInt(item.inventories[i].quantity);
                }
            }
            return total;
        },
        totalPrecio(item) {
            let total = 0;

            for (let i = 0; i < item.inventories.length; i++) {
                if (item.inventories[i].code_id == item.id) {
                    total += parseInt(item.inventories[i].price * item.inventories[i].quantity);
                }
            }

            return total
        },
        calcularPromedioPreciosCompra(item) {
            let sumatoriaPrecios = 0;
            let cantidadPrecios = 0;
            let flete = 0;
            let utilidad = 0;


            if (item.inventories.length > 0) {
                for (let i = 0; i < item.inventories.length; i++) {
                    if (item.inventories[i].code_id === item.id) {
                        sumatoriaPrecios += parseInt(item.inventories[i].price);
                        cantidadPrecios++;
                    }
                }
            }

            if (item.productpagos) {
                if (item.productpagos.product_id === item.product_id) {
                    flete = parseInt(item.productpagos.flete);
                    utilidad = (parseInt(item.productpagos.utilidad) / 100) + 1;
                }
            }

            if (cantidadPrecios === 0) {
                return 0;
            }

            return ((((sumatoriaPrecios / cantidadPrecios) * 1.19) * utilidad) + flete);
        },
        encontrarPrecioCompraMasAlto(item) {
            let flete = 0;
            let utilidad = 0;

            let uniquePrices = new Set();

            if (item.inventories.length > 1) {
                for (let i = 0; i < item.inventories.length; i++) {
                    if (item.inventories[i].code_id == item.id && item.inventories[i].quantity > 0) {
                        uniquePrices.add(item.inventories[i].price);
                    }
                }
            }

            if (item.productpagos) {
                if (item.productpagos.product_id === item.product_id) {
                    flete = parseInt(item.productpagos.flete);
                    utilidad = (parseInt(item.productpagos.utilidad) / 100) + 1;
                }
            }


            if (uniquePrices.size === 0) {
                return 0;
            }


            const valorMasAlto = Math.max(...[...uniquePrices].map(Number));

            return (((valorMasAlto * 1.19) * utilidad) + flete);
        }


    },
    created() {
        loadProgressBar();
        this.$store.dispatch('getCodes', { page: 1 });
    }
}
</script>