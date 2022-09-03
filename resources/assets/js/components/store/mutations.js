import axios from 'axios'
import toastr from 'toastr'
import printJS from 'print-js'

var $ = window.jQuery = require('jquery')

var urlUser = 'users'
var urlQuotationRoles = 'quotation-roles'
var urlTotalVehi = 'total-vehi'
var urlSumaVehi = 'suma-vehi'
var urlTotalCli = 'total-cli'
var urlTotalCliAdmin = 'total-cli-admin'
var urlTotalVehiAdmin = 'total-vehi-admin'
var urlCantVehicle = 'cant-vehicle-user'
var urlCantCliVehi = 'cant-cli-vehi-user'
var urlAllUser = 'users-all'
var urlAllPago = 'pagos-all'
var urlRoles = 'roles'
var urlAllRoles = 'roles-all'
var urlUserRoles = 'usersRoles'
var urlAllPermissions = 'permissions'
var urlQuotationusers = 'quotationusers'

var urlVehicle = 'vehicles'
var urlVehicleUser = 'vehicles-user'
var urlDetailVehicle = 'detailvehicles'
var urlOrdenTrabajo = 'ordentrabajo'
var urlTrabajo = 'trabajos'
var urlObservacion = 'observaciones'
var urlFotosOrdenTrabajo = 'fotosordentrabajo'
var urlSubirFotosOrdenTrabajo = 'subirfotosordentrabajo'
var urlSubirObservacion = 'subirobservacion'
var urlEliminarObservacion = 'eliminarobservacion'
var urlUpload = 'upload'

var urlVehicleBrand = 'vehiclebrands'
var urlAllVehicleBrand = 'vehiclebrands-all'
var urlSelectVehiculoMarcas = 'select-marcas'

var urlVehiculoTipo = 'vehiculotipos'
var urlAllVehiculoTipo = 'vehiculotipos-all'
var urlSelectVehiculoTipo = 'select-tipos'

var urlVehicleModel = 'vehiclemodels'
var urlAllVehicleModel = 'vehiclemodels-all'


var urlVehicleYear = 'vehicleyears'
var urlVehicleMotor = 'vehiclemotors'
var urlSelectVehiculoMotor = 'select-motor'
var urlSelectVehiculoYear = 'select-year'

var urlVBrand = 'vbrands-all'
var urlVModel = 'vmodels-all'
var urlVYear = 'vyears-all'
var urlVEngine = 'vengines-all'
var urlCiudad = 'ciudad-all'

var urlVBR = 'vbr-all'
var urlVMR = 'vmr-all'

var urlMM = 'mm-all'
var urlYM = 'ym-all'

var urlCreateQuotationUser = 'quotationuser'
var urlCreateQuotationUserExpress = 'quotationuserexpress'
var urlPendingQuotations = 'pendingquotations'

var urlCreateQuotationShipping = 'quotationshipping'
var urlCreateFacebookShipping = 'facebookshipping'

var urlNote = 'notes'

var urlQuotation = 'quotations'
var urlQuotationDetails = 'quotation-details'
var urlQuotationclient = 'quotationclients'
var urlQuotationclientform = 'quotationclientsform'
var urlQuotationclientDetails = 'quotationclient-details'
var urlQuotationPdf = 'quotation-pdf'
var urlQuotationforms = 'quotationforms'
var urlAllVehicleClient = 'vehicleclients-all'

var urlQuotationimport = 'quotationimports'
var urlQuotationimportPdf = 'quotationimport-pdf'

var urlDetail = 'details'
var urlDetailclient = 'detailclients'
var urlQuotationclientPdf = 'quotationclient-pdf'
var urlQuotationclientPdfIva = 'quotationclient-pdf-iva'
var urlQuotationShippingPdf = 'quotationshipping-pdf'
var urlGenerarReciboSales = 'generar-recibo-sale'
var urlAnularSale = 'anular-sale'
var urlCierreCajaZ = 'cierre-caja-z'

var urlImport = 'imports'
var urlImportDetails = 'import-details'
var urlDetailimport = 'detailimports'
var urlImportPdf = 'import-pdf'
var urlExportExcel = 'export-import'

var urlClient = 'clients'
var urlAllClient = 'clients-all'
var urlActivity = 'activities'

var urlProduct = 'products'
var urlAllProduct = 'products-all'
var urlAllProductSale = 'products-all-sale'
var urlTipoDePago = 'tipodepago'
var urlDescuento = 'descuento'
var urlProductTipoDePago = 'producttipopago'
var urlUtilidad = 'utilidad'


var urlProductimport = 'productimports'
var urlAllProductimport = 'productimports-all'

var urlCode = 'codes'
var urlCodeInventory = 'code-inventories'

var urlInventory = 'inventories'
var urlAllInventory = 'all-inventories'

var urlImages = 'images'

var urlUserId = 'user-id'
var urlCompany = 'companies'
var urlUpdateUtilidadDefect = 'update-utilidad-defect'
var urlUtilidadDefect = 'utilidad-defect'
var urlDescuentoDefect = 'descuento-defect'

var urlCrearCheckList = 'crearCheckList'
var urlCheckListCategorias = 'checkListCategorias'
var urlCrearIntervenciones = 'crearIntervenciones'
var urlFinalizarFormatoCheckList = 'finalizarFormatoCheckList'
var urlMostrarFormatoCheckList = 'mostrarFormatoCheckList'
var urlEditarCategoria = 'editarCategoria'
var urlEditarIntervecion = 'editarIntervencion'
var urlCrearCategoria = 'crearCategoria'
var urlCrearIntervencion = 'crearIntervencion'
var urlAgregarObservacionCheckList = 'agregarObservacionCheckList'
var urlGuardarCheckListVehicle = 'guardarCheckListVehicle'
var urlCheckListVehicles = 'checklistvehicles'
var urlMostrarCheckListVehicles = 'mostrarCheckListVehicles'

var urlMostrarCheckList = 'mostrarCheckList'

var urlMostrarCondiciones = 'mostrarCondiciones'
var urlMostrarObservaciones = 'mostrarObservaciones'
var urlCheckListRoles = 'roleschecklists'

var urlCrearFormatoCheckList = 'crearFormatoCheckList'



export default { //used for changing the state
    /******************************* */
    /****** sección vehiculos **** */
    /******************************* */
    getVehicles(state, page) {
        var url = urlVehicle + '?page=' + page + '&patent=' + state.searchVehicle.patent + '&name=' + state.searchVehicle.name + '&year=' + state.searchVehicle.year
        axios.get(url).then(response => {

            state.vehicles = response.data.vehicles.data
            state.pagination = response.data.pagination
        });
    },
    getVehiclesUser(state, page) {
        var url = urlVehicleUser + '?page=' + page
        axios.get(url).then(response => {
            state.vehicles = response.data.vehicles.data
            state.pagination = response.data.pagination
        });
    },
    createVehicle(state) {
        var id_user = null
        if (state.selectedUser != null) {
            id_user = state.selectedUser.value
        }
        var url = urlVehicle
        axios.post(url, {
            user_id: id_user,
            patent: state.newVehicle.patent,
            chasis: state.newVehicle.chasis,
            brand: state.selectedVBrand.label,
            model: state.selectedVModel.label,
            year: state.selectedVYear.label,
            engine: state.selectedVEngine.label,
            color: state.newVehicle.color,
            km: state.newVehicle.km,
        }).then(response => {
            state.newVehicle.patent = ''
            state.newVehicle.chasis = ''
            state.newVehicle.color = ''
            state.newVehicle.km = ''
            state.selectedVBrand.label = ''
            state.selectedVModel.label = ''
            state.selectedVYear.label = ''
            state.selectedVEngine.label = ''
            state.errorsLaravel = []
            $('#create').modal('hide')
            toastr.success('Vehículo generado con éxito')
        }).catch(error => {
            toastr.error(error.response.data)
        })
    },
    editVehicle(state, vehicle) {
        state.fillVehicle.id = vehicle.id
        state.fillVehicle.user_id = vehicle.user_id
        state.selectedUser = {
            label: vehicle.user.name,
            value: vehicle.user_id
        }
        state.fillVehicle.patent = vehicle.patent
        state.fillVehicle.chasis = vehicle.chasis
        state.fillVehicle.name = vehicle.name
        state.selectedVBrand.label = vehicle.brand
        state.selectedVModel.label = vehicle.model
        state.selectedVYear.label = vehicle.year
        state.selectedVEngine.label = vehicle.engine
        state.fillVehicle.color = vehicle.color
        state.fillVehicle.km = vehicle.km
        $("#edit").modal('show')
    },
    detailVehicle(state, vehicle) {
        state.details = []
        $("#detail").modal('show')
    },
    /***********************************
     * *******************************
     */
    modalRequestParts(state, vehicle) {
        // state.formCotizacion.name = vehicle.user.name
        // state.formCotizacion.email = vehicle.user.email
        // state.formCotizacion.phone = vehicle.user.phone
        state.formCotizacion.patentchasis = vehicle.patent + '/' + vehicle.chasis
        state.formCotizacion.brand = vehicle.brand
        state.formCotizacion.model = vehicle.model
        state.formCotizacion.year = vehicle.year
        state.formCotizacion.engine = vehicle.engine

        $('#requestParts').modal('show')
    },

    requestPartsVehicle(state) {

        axios.post('quotation-mechanic', {
            patentchasis: state.formCotizacion.patentchasis.toUpperCase(),
            brand: state.formCotizacion.brand,
            model: state.formCotizacion.model,
            year: state.formCotizacion.year,
            engine: state.formCotizacion.engine,
            description: state.formCotizacion.description
        })
            .then(response => {
                $('#requestParts').modal('hide')
                toastr.success('Solicitud ingresada con éxito')
            })
            .catch(error => {
                toastr.success('No se pudo enviar la solicitud')
            })

        //formCotizacion: { name:'', email:'', phone:'', patentchasis:'', brand:'', model:'', year:'', engine:'', description:'' },


    },
    modalOrdenTrabajo(state, vehicle) {
        state.newOrdenTrabajo.vehicle_id = vehicle.id
        state.newOrdenTrabajo.km_old = vehicle.km
        state.newOrdenTrabajo.km = vehicle.km
        $("#createOrdenTrabajo").modal('show')
    },


    modalFotosOrdenTrabajo(state, id) {
        state.newOrdenTrabajo.vehicle_id = id
        $("#modalFotosOrdenTrabajo").modal('show')
    },

    modalObservacion(state, id) {
        state.newOrdenTrabajo.vehicle_id = id
        $("#modalObservacion").modal('show')
    },


    guardarOrdenTrabajo(state) {
        var url = urlOrdenTrabajo

        if (state.newOrdenTrabajo.km < state.newOrdenTrabajo.km_old) {
            toastr.error('El kilometraje no puede ser menor actual')
        } else {
            axios.post(url, {
                vehicle_id: state.newOrdenTrabajo.vehicle_id,
                km: state.newOrdenTrabajo.km,
                descripcion: state.newOrdenTrabajo.descripcion,
            }).then(response => {
                state.newOrdenTrabajo.descripcion = ''
                state.newOrdenTrabajo.km = 0
                state.errorsLaravel = []
                toastr.success('Se creo la orden de trabajo correctamente')
                // $('#createOrdenTrabajo').modal('hide')

                state.trabajos = response.data
                
                axios.get('client-vehicles')
                .then((response) => {
                    state.vehicles = response.data
                })

            })
                .catch(error => {
                    toastr.error(error.response.data)
                })
        }

    },

    removeTrabajo(state, id) {
        var url = urlOrdenTrabajo + '/' + id
        axios.delete(url).then(response => {
            toastr.success('Orden de trabajo eliminada con éxito')
            state.trabajos = response.data
        })
    },

    removeObservacion(state, id) {
        var url = urlEliminarObservacion + '/' + id
        axios.delete(url).then(response => {
            toastr.success('Observacion eliminada con éxito')
            $('#modalObservacion').modal('hide')
        })
    },

    getTrabajos(state, id) {
        var url = urlTrabajo + '/' + id
        axios.get(url).then(response => {
            state.trabajos = response.data
        })
    },

    getOrdenesTrabajos(state) {
        var url = urlOrdenTrabajo
        axios.get(url).then(response => {
            state.ordenestrabajos = response.data
        })
    },

    getObservaciones(state, id) {
        var url = urlObservacion + '/' + id
        axios.get(url).then(response => {
            state.observaciones = response.data
        })
    },


    getFotosOrdenTrabajo(state, id) {
        var url = urlFotosOrdenTrabajo + '/' + id
        axios.get(url).then(response => {
            state.trabajos = response.data
        })
    },

    AgregarFotosOrdenTrabajo(state) {
        for (let i = 0; i < state.attachment.length; i++) {
            state.form.append('pics[]', state.attachment[i])
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        //vehicle_id: state.newOrdenTrabajo.vehicle_id = id,

        var url = urlSubirFotosOrdenTrabajo
        if (state.attachment.length > 0) {

            state.form.append('id', state.newOrdenTrabajo.vehicle_id)
            $("#files").val(null)

            axios.post(url, state.form, config).then(response => {
                state.newOrdenTrabajo.vehicle_id = ''
                state.errorsLaravel = []
                $('#modalFotosOrdenTrabajo').modal('hide')
                toastr.success('Imagen(es) subida(s) con éxito')
            }).catch(error => {
                state.errorsLaravel = error.response.data
            })
        }

    },

    subirFotosOrdenTrabajo(state, evt) {
        //console.log(e)
        //let selectedFile = e.target.files[0]
        state.form = new FormData()

        state.images = []
        state.attachment = []
        let selectedFiles = evt.target.files

        if (!selectedFiles.length) {
            return false
        }

        for (let i = 0; i < selectedFiles.length; i++) {
            state.attachment.push(selectedFiles[i])
        }
    },


    AgregarObservacion(state) {


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        //vehicle_id: state.newOrdenTrabajo.vehicle_id = id,

        var url = urlSubirObservacion
        if (state.attachment.length > 0 && state.newOrdenTrabajo.observacion != '') {

            for (let i = 0; i < state.attachment.length; i++) {
                state.form.append('pics_observacion[]', state.attachment[i])
            }

            state.form.append('id', state.newOrdenTrabajo.vehicle_id)
            state.form.append('observacion', state.newOrdenTrabajo.observacion)
            $("#filesObservacion").val(null)

            axios.post(url, state.form, config).then(response => {
                state.newOrdenTrabajo.vehicle_id = ''
                state.newOrdenTrabajo.observacion = ''
                state.attachment.length = []
                state.errorsLaravel = []
                $('#modalObservacion').modal('hide')
                toastr.success('Se ingreso la observacion correctamente')
            }).catch(error => {
                state.errorsLaravel = error.response.data
            })
        }

    },

    subirFotosObservacion(state, evt) {
        //console.log(e)
        //let selectedFile = e.target.files[0]
        state.form = new FormData()

        state.images = []
        state.attachment = []
        let selectedFiles = evt.target.files

        if (!selectedFiles.length) {
            return false
        }

        for (let i = 0; i < selectedFiles.length; i++) {
            state.attachment.push(selectedFiles[i])
        }
    },


    modalCrearFormatoCheckList(state, id) {
        // state.newOrdenTrabajo.vehicle_id = id
        $("#CrearFormatoCheckList").modal('show')
    },

    agregarCategoria(state) {
        state.checklists.push({
            categoria: state.checkListForm.categoria
        })
        state.checkListForm.categoria = ''
    },

    crearCheckList(state) {
        if (state.checklists.length == 0) {
            toastr.error('¡Error, Agregue una categoria!')
        } else {
            var url = urlCrearCheckList
            axios.post(url, {
                checklists: state.checklists,
            }).then(response => {

                var url = urlCheckListCategorias + '/' + response.data
                axios.get(url).then(response => {
                    state.categorias = response.data
                })

                $('#CrearFormatoCheckList').modal('hide')
                $('#CrearIntervencionCheckList').modal({ backdrop: 'static', keyboard: false })
            })
                .catch(error => {
                    toastr.error(error.response.data)
                })
        }
    },

    modalIntervencion(state, id) {
        state.intervencionForm.id_categoria = id
        $("#IntervencionCheckList").modal('show')
    },

    agregarIntervencion(state) {
        state.intervenciones.push({
            id_categoria: state.intervencionForm.id_categoria,
            intervencion: state.intervencionForm.intervencion
        })
        state.intervencionForm.intervencion = ''
    },

    modalCerrarIntervencion(state) {
        $('#CrearIntervencionCheckList').modal({ backdrop: 'static', keyboard: false })
        $("#IntervencionCheckList").modal('hide')
    },

    guardarIntervenciones(state) {
        if (state.intervenciones.length == 0) {
            toastr.error('¡Error, Agregue una intervención!')
        } else {
            var url = urlCrearIntervenciones
            axios.post(url, {
                intervenciones: state.intervenciones,
            }).then(response => {
                // var url = urlCheckListIntervenciones + '/' + response.data
                // axios.get(url).then(response => {
                //     state.intervenciones = response.data
                // })

                var url = urlCheckListCategorias + '/' + response.data[0].check_list_id
                axios.get(url).then(response => {
                    state.categorias = response.data
                })



                state.intervenciones = []
                $('#CrearIntervencionCheckList').modal({ backdrop: 'static', keyboard: false })
                $("#IntervencionCheckList").modal('hide')
                toastr.success('Se agrego la intervención correctamente')
            })
                .catch(error => {
                    toastr.error(error.response.data)
                })
        }
    },

    eliminarIntervencion(state, data) {
        state.intervenciones.splice(state.intervenciones.indexOf(data.id))
    },
    eliminarCategoria(state, data) {
        state.checklists.splice(state.checklists.indexOf(data.id))
    },

    finalizarFormatoCheckList(state) {
        var url = urlFinalizarFormatoCheckList
        axios.get(url).then(response => {
            if (response.data.intervenciones.length == 0) {
                toastr.error('¡Error, Agregue una intervención!')
            } else {
                state.checklists = []
                state.categorias = []
                state.intervenciones = []
                $("#CrearIntervencionCheckList").modal('hide')
            }
        })
    },

    modalMostrarFormatoCheckList(state) {
        axios.get(urlMostrarFormatoCheckList).then(response => {
            state.formatchecklists = response.data
        }).catch(error => {
            toastr.error(error.response.data)
        })
        $("#MostrarFormatoCheckList").modal('show')
    },

    modalEditarCategoria(state, formatchecklist) {
        state.editarCategoriaForm.categoria = formatchecklist.categoria
        state.editarCategoriaForm.id_categoria = formatchecklist.id
        $('#EditarCategoriaCheckList').modal('show')
    },

    editarCategoriaCheckList(state) {
        var url = urlEditarCategoria
        axios.post(url, {
            id_categoria: state.editarCategoriaForm.id_categoria,
            categoria: state.editarCategoriaForm.categoria,
        }).then(response => {
            var url = urlMostrarFormatoCheckList
            axios.get(url).then(response => {
                state.formatchecklists = response.data
            })
            $('#EditarCategoriaCheckList').modal('hide')
        })
            .catch(error => {
                toastr.error(error.response.data)
            })

    },

    modalEditarIntervencion(state, intervenciones) {
        state.editarIntervencionForm.intervencion = intervenciones.intervencion
        state.editarIntervencionForm.id_intervencion = intervenciones.id
        $('#EditarIntervencionCheckList').modal('show')
    },

    editarIntervencionCheckList(state) {
        var url = urlEditarIntervecion
        axios.post(url, {
            id_intervencion: state.editarIntervencionForm.id_intervencion,
            intervencion: state.editarIntervencionForm.intervencion,
        }).then(response => {
            var url = urlMostrarFormatoCheckList
            axios.get(url).then(response => {
                state.formatchecklists = response.data
            })
            $('#EditarIntervencionCheckList').modal('hide')
        })
            .catch(error => {
                toastr.error(error.response.data)
            })

    },

    modalAgregarCategoria(state) {
        $('#AgregarCategoria').modal({ backdrop: 'static', keyboard: false })
    },

    modalAgregarIntervencion(state, id) {
        state.intervencionForm.id_categoria = id
        $('#AgregarIntervencion').modal({ backdrop: 'static', keyboard: false })
    },

    crearCategoria(state) {
        if (state.checklists.length == 0) {
            toastr.error('¡Error, Agregue una categoria!')
        } else {
            var url = urlCrearCategoria
            axios.post(url, {
                checklists: state.checklists,
            }).then(response => {
                state.formatchecklists = response.data
                state.checklists = []
                $('#AgregarCategoria').modal('hide')
                toastr.success('Se agrego la categoria correctamente')
            })
                .catch(error => {
                    toastr.error(error.response.data)
                })
        }
    },

    crearIntervencion(state, id) {
        if (state.intervenciones.length == 0) {
            toastr.error('¡Error, Agregue una intervención!')
        } else {
            var url = urlCrearIntervencion + '/' + id
            axios.post(url, {
                intervenciones: state.intervenciones,
            }).then(response => {

                var url = urlMostrarFormatoCheckList
                axios.get(url).then(response => {
                    state.formatchecklists = response.data
                })
                state.intervenciones = []
                $('#AgregarIntervencion').modal('hide')
                toastr.success('Se agrego la intervención correctamente')
            })
                .catch(error => {
                    toastr.error(error.response.data)
                })
        }
    },

    cerrarCategoria(state) {
        $('#AgregarCategoria').modal('hide') -
            $('#MostrarFormatoCheckList').modal('show')
    },


    cerrarIntervencion(state) {
        $('#AgregarIntervencion').modal('hide')
        $('#MostrarFormatoCheckList').modal('show')
    },

    modalCheckList(state, vehicle) {
        state.id_vehicle = vehicle.id
        state.km_old = vehicle.km
        var url = urlMostrarCheckList + '/' + state.id_vehicle
        axios.get(url).then(response => {
            state.formatchecklists = response.data
        })
        $('#CheckListVehicle').modal('show')
    },

    modalObservacionVehicleCheckList(state, data) {
        state.columnaObservacion.id_intervencion = data.id_intervencion
        state.columnaObservacion.id_vehicle = data.id_vehicle
        $('#AgregarObservacionCheckList').modal('show')
    },

    subirFotosObservacionCheckList(state, evt) {
        state.form = new FormData()

        state.images = []
        state.attachment = []
        let selectedFiles = evt.target.files

        if (!selectedFiles.length) {
            return false
        }

        for (let i = 0; i < selectedFiles.length; i++) {
            state.attachment.push(selectedFiles[i])
        }
    },


    agregarObservacionCheckList(state) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        var url = urlAgregarObservacionCheckList
        if (state.attachment.length > 0 && state.columnaObservacion.observacion != '') {

            for (let i = 0; i < state.attachment.length; i++) {
                state.form.append('imagenes_checklist[]', state.attachment[i])
            }

            state.form.append('id_intervencion_checklist', state.columnaObservacion.id_intervencion)
            state.form.append('id_vehicle_checklist', state.columnaObservacion.id_vehicle)
            state.form.append('observacion_checklist', state.columnaObservacion.observacion)
            $("#filesObservacion").val(null)

            axios.post(url, state.form, config).then(response => {
                state.columnaObservacion.id_intervencion = ''
                state.columnaObservacion.observacion = ''
                state.columnaObservacion.id_vehicle = ''
                state.attachment.length = []
                state.errorsLaravel = []
                $('#AgregarObservacionCheckList').modal('hide')
                toastr.success('La observacion se agrego correctamente')
                toastr.success('La imagen se agrego correctamente')
            }).catch(error => {
                state.errorsLaravel = error.response.data
            })
        }else{
            toastr.error('¡Error, Agregue una observacion!')
        }

    },



    setCheckExisteSi(state, value) {
        state.checkExisteSi = value

        state.columnaExiste.push({
            id_intervencion: state.checkExisteSi,
            existe: 'si'
        })

        $("input[name='estado" + value + "']").prop('disabled', false); 
    },

    setcheckExisteNo(state, value) {
        state.checkExisteNo = value

        state.columnaExiste.push({
            id_intervencion: state.checkExisteNo,
            existe: 'no',
        })
        
        $("input[name='estado" + value + "']").prop('disabled', true); 

    },


    setCheckEstadoBueno(state, value) {
        state.checkEstadoBueno = value

        state.columnaEstado.push({
            id_intervencion: state.checkEstadoBueno,
            estado: 'bueno',
        })
    },
    setCheckEstadoRegular(state, value) {
        state.checkEstadoRegular = value

        state.columnaEstado.push({
            id_intervencion: state.checkEstadoRegular,
            estado: 'regular',
        })
    },
    setCheckEstadoMalo(state, value) {
        state.checkEstadoMalo = value

        state.columnaEstado.push({
            id_intervencion: state.checkEstadoMalo,
            estado: 'malo',
        })
    },

    setKilometraje(state, value) {
        state.kilometraje = value
    },


    guardarCheckList(state) {
        var url = urlGuardarCheckListVehicle

        if (state.kilometraje <= state.km_old) {
            toastr.error('El kilometraje no puede ser menor o igual al actual')
        } else {
            axios.post(url, {
                id_vehicle: state.id_vehicle,
                existe: state.columnaExiste,
                estado: state.columnaEstado,
                kilometraje: state.kilometraje
            }).then(response => {
                state.columnaExiste = [];
                state.columnaEstado = [];
                $('input[type="radio"]').prop('checked', false);
                $('#CheckListVehicle').modal('hide')
                toastr.success('El check list se ingreso correctamente')
            }).catch(error => {
                state.errorsLaravel = error.response.data
            })
        }
    },

    getCheckListVehicles(state) {
        var url = urlCheckListVehicles
        axios.get(url).then(response => {
            state.checklistvehicles = response.data
        })
    },

    modalMostrarCheckListVehicle(state, id) {
        state.id_checklist = id
        var url = urlMostrarCheckListVehicles + '/' + id
        axios.get(url).then(response => {
            state.mostrarchecklistvehicles = response.data
        })
        $("#MostrarCheckListVehicle").modal({ backdrop: 'static', keyboard: false })
    },

    mostrarCondiciones(state, data) {
        var url = urlMostrarCondiciones
        axios.get(url, {
            params: {
                id_categoria: data.id_categoria
            }
        }).then(response => {
            state.intervenciones = response.data
        })
    },

    modalMostrarObservacion(state, data) {
        var url = urlMostrarObservaciones
        axios.get(url, {
            params: {
                id_intervencion: data.id_intervencion,
                id_vehicle: data.id_vehicle
            }
        }).then(response => {
            state.observaciones = response.data
        })
        $('#MostrarObservacion').modal('show')
    },

    cerrarMostrarObservacion(state) {
        $('#MostrarObservacion').modal('hide')
    },

    cerrarMostrarCheckListVehicle(state) {
        $('.collapse').collapse("hide")
    },

    getCheckListRoles(state) {
        var url = urlCheckListRoles
        axios.get(url).then(response => {
            state.roleschecklists = response.data
        })
    },



    modalDetailVehicle(state, vehicle) {
        state.newDetailVehicle.vehicle_id = vehicle[0].id
        state.newDetailVehicle.rol = vehicle[1]
        state.newDetailVehicle.km = vehicle[0].km
        $("#createDetail").modal('show')
    },

    createDetailVehicle(state) {
        for (let i = 0; i < state.attachment.length; i++) {
            state.form.append('pics[]', state.attachment[i])
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        var url = urlDetailVehicle
        axios.post(url, {
            vehicle_id: state.newDetailVehicle.vehicle_id,
            km: state.newDetailVehicle.km,
            note: state.newDetailVehicle.note,
        }).then(response => {
            state.newDetailVehicle.vehicle_id = ''
            state.newDetailVehicle.km = ''
            state.newDetailVehicle.note = ''
            state.details = []
            state.errorsLaravel = []

            
            $('#createDetail').modal('hide')
            toastr.success('Detalle del vehículo generado con éxito')

            
            if (state.attachment.length > 0) {
                var url2 = urlUpload
                state.form.append('id', response.data)
                axios.post(url2, state.form, config).then(response => {
                    toastr.success('Imagen(es) subida(s) con éxito')
                    $("#files").val(null)
                }).catch(error => {
                    toastr.error(error.response.data)
                })
            }

        }).catch(error => {
            toastr.error(error.response.data)
        })

    },
    onFileChange(state, evt) {
        state.import_file = evt.target.files[0]
    },
    createProductsPagos(state) {
        let formData = new FormData();
        formData.append('import_file', state.import_file);
        formData.append('client', state.selectedClient.value);
        formData.append('pago', state.selectedPago.label);
        formData.append('utilidad', state.selectedPago.utilidad);

        var url = urlProduct
        axios.post(url, formData, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then(response => {
            if (response.status === 200) {
                $('#createProducts').modal('hide')
                toastr.success('Los Productos se subieron correctamente!')
            }
        }).catch(error => {
            $('#createProducts').modal('hide')
            toastr.error(error.response.data)
        });
    },

    updateVehicle(state, id) {
        var url = urlVehicle + '/' + id
        axios.put(url, {
            id: state.fillVehicle.id,
            patent: state.fillVehicle.patent,
            chasis: state.fillVehicle.chasis,
            brand: state.selectedVBrand.label,
            model: state.selectedVModel.label,
            year: state.selectedVYear.label,
            engine: state.selectedVEngine.label,
            color: state.fillVehicle.color,
            km: state.fillVehicle.km
        }).then(response => {
            state.fillVehicle.id = ''
            state.fillVehicle.patent = ''
            state.fillVehicle.chasis = ''
            state.fillVehicle.color = ''
            state.fillVehicle.km = ''
            state.selectedVBrand.label = '',
                state.selectedVBrand.value = '',
                state.selectedVModel.label = '',
                state.selectedVModel.value = '',
                state.selectedVYear.label = '',
                state.selectedVYear.value = '',
                state.selectedVEngine.label = '',
                state.selectedVEngine.value = '',
                state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Vehículo actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    getDetails(state, detail) {
        var url = urlVehicle + '/' + detail.id
        axios.get(url).then(response => {
            state.details = response.data
            /*state.vehicleDetails = response.data
            state.vehicleDetails.forEach((detail) => {
                state.details = detail.detail_vehicles
            })*/
        })
    },
    fileChange(state, evt) {
        //console.log(e)
        //let selectedFile = e.target.files[0]
        state.form = new FormData()

        state.images = []
        state.attachment = []
        let selectedFiles = evt.target.files

        if (!selectedFiles.length) {
            return false
        }

        for (let i = 0; i < selectedFiles.length; i++) {
            state.attachment.push(selectedFiles[i])
        }
    },
    getPhotos(state, id) {
        if (id != null)
            state.idDetailvehicle = id
        var url = urlDetailVehicle + '/' + state.idDetailvehicle
        axios.get(url).then(response => {
            state.images = []
            state.docs = []
            state.records = response.data
            $('#detail').modal('hide')
            $('#photo').modal('show')
            state.records.forEach((record) => {
                var url = record.url
                if (url.includes(".jpeg") || url.includes(".jpg") || url.includes(".png"))
                    state.images.push(record)
                if (url.includes(".pdf") || url.includes(".doc") ||
                    url.includes(".docx") || url.includes(".docx") ||
                    url.includes(".xls") || url.includes(".xlsx"))
                    state.docs.push(record)
            })
            //state.vehicleDetails = response.data
            /*state.vehicleDetails.forEach((detail) => {
                state.details = detail.detail_vehicles
            })*/
        })
    },
    deleteImage(state, id) {
        var url = urlImages + '/' + id
        axios.delete(url).then(response => {
            toastr.success('Imagen eliminada con éxito')
            $('#photo').modal('hide')
        })
    },
    getVehiculoTipos(state, page_tipo) {
        var url = 'vehiculotipos-all?page=' + page_tipo
        axios.get(url).then(response => {
            state.vehiculotipos = response.data.vehiculotipos.data
            state.pagination_tipo = response.data.pagination_tipo
        })
    },
    createVehiculoTipo(state) {
        var url = 'newvehiculotipo'
        axios.post(url, {
            tipo_vehiculo: state.newVehiculoTipo.tipo_vehiculo.toUpperCase()
        }).then(response => {
            state.newVehiculoTipo = {
                tipo_vehiculo: ''
            },
                state.errorsLaravel = []
            $('#create').modal('hide')
            toastr.success('Tipo de vehiculo creado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editVehiculoTipo(state, vehiculotipo) {
        state.fillVehiculoTipo.id = vehiculotipo.id
        state.fillVehiculoTipo.tipo_vehiculo = vehiculotipo.tipo_vehiculo.toUpperCase()
        $("#edit_tipo").modal('show')
    },
    updateVehiculoTipo(state, id) {
        var url = urlVehiculoTipo + '/' + id
        axios.put(url, state.fillVehiculoTipo).then(response => {
            state.fillVehicle = {
                id: '',
                tipo_vehiculo: '',
            }
            state.errorsLaravel = []
            $('#edit_tipo').modal('hide')
            toastr.success('Tipo de vehiculo actualizada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    getVehicleBrands(state, page) {
        var url = 'vehiclebrands-all?page=' + page

        axios.get(url).then(response => {
            state.vehiclebrands = response.data.vehiclebrands.data
            state.pagination_marca = response.data.pagination_marca

        })
    },
    createVehicleBrand(state) {
        var url = 'newvehiclebrand'
        axios.post(url, {
            brand: state.newVehicleBrand.brand.toUpperCase()
            //model: state.newVehicleBrand.model.toUpperCase(),
            //tipo_id: state.selectedVehiculoTipo.value
        }).then(response => {
            state.newVehicleBrand = {
                brand: ''
                //model: '',
                //tipo_id: ''
            },
                state.errorsLaravel = []
            $('#create').modal('hide')
            toastr.success('Marca y Modelo generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editVehicleBrand(state, vehiclebrand) {
        state.fillVehicleBrand.id = vehiclebrand.id
        state.fillVehicleBrand.brand = vehiclebrand.brand.toUpperCase()
        $("#edit").modal('show')
    },
    updateVehicleBrand(state, id) {
        var url = urlVehicleBrand + '/' + id
        axios.put(url, state.fillVehicleBrand).then(response => {
            state.fillVehicle = {
                id: '',
                brand: '',
                model: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Marca actualizada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    getVehicleModels(state, page) {
        var url = urlVehicleModel + '?page=' + page //+ '&model=' + state.searchVehicleBrand.model
        axios.get(url).then(response => {
            state.vehiclemodels = response.data.vehiclemodels.data
            state.pagination_modelo = response.data.pagination_modelo
        });
    },
    createVehicleModel(state) {
        var url = 'newvehiclemodelo'
        axios.post(url, {
            //brand_id: state.selectedVehicleBrand.value,
            model: state.newVehicleModelo.model.toUpperCase(),
            brand_id: state.selectedVehicleBrand.value,
            tipo_id: state.selectedVehiculoTipo.value
        }).then(response => {
            state.newVehicleModelo = {
                model: '',
                brand_id: '',
                tipo_id: ''
            },
                state.errorsLaravel = []
            $('#create').modal('hide')
            toastr.success('Modelo generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editVehicleModel(state, vehiclemodel) {
        state.optionsVehicleBrand.forEach(brand => {
            if (brand.label == vehiclemodel.brand) {
                state.selectedVehicleBrand = brand
            }
        })
        state.optionsTiposVehiculo.forEach(tipo_vehiculo => {
            if (tipo_vehiculo.label == vehiclemodel.tipo) {
                state.selectedVehiculoTipo = tipo_vehiculo
            }
        })
        state.fillVehicleModel.id = vehiclemodel.id
        state.fillVehicleModel.model = vehiclemodel.model.toUpperCase()
        $("#edit_modelo").modal('show')
    },
    updateVehicleModel(state, id) {
        var url = urlVehicleModel + '/' + id
        state.fillVehicleModel.brand_id = state.selectedVehicleBrand.value
        state.fillVehicleModel.tipo_id = state.selectedVehiculoTipo.value
        axios.put(url, state.fillVehicleModel).then(response => {
            state.fillVehicleModel = {
                id: '',
                model: '',
                brand_id: '',
                tipo_id: ''
            },
                state.errorsLaravel = []
            $('#edit_modelo').modal('hide')
            toastr.success('Modelo actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    createVehicleYear(state) {
        var url = 'newvehicleyear'
        axios.post(url, {
            v_id: state.selectedVMR.value,
            v_year: state.newVehicleYear.v_year.toUpperCase()
        }).then(response => {
            state.newVehicleYear = {
                v_id: '',
                v_year: ''
            },
                state.errorsLaravel = []
            $('#create').modal('hide')
            toastr.success('Modelo generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editVehicleYear(state, vehicleyear) {
        /*state.optionsVehicleModel.forEach(model => {
            if (model.label == vehicleyear.model) {
                state.selectedVehicleModel = model
            }
        })*/
        state.fillVehicleYear.id = vehicleyear.id
        state.fillVehicleYear.v_year = vehicleyear.year
        $("#edit_year").modal('show')
    },
    updateVehicleYear(state, id) {
        var url = urlVehicleYear + '/' + id
        //state.fillVehicleYear.model = state.selectedVehicleModel.value
        axios.put(url, state.fillVehicleYear).then(response => {
            state.fillVehicleYear = {
                id: '',
                v_year: ''
                //model: ''
            },
                state.errorsLaravel = []
            $('#edit_year').modal('hide')
            toastr.success('Modelo actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    getVehicleYears(state, page) {
        var url = 'vehicleyears-all?page=' + page
        axios.get(url).then(response => {
            state.vehicleyears = response.data.vehicleyears.data
            state.pagination_year = response.data.pagination_year
        });
    },

    createVehicleMotor(state) {
        var url = 'newvehiclemotor'
        axios.post(url, {
            v_engine: state.newVehicleMotor.v_engine.toUpperCase(),
            year_id: state.selectedYM.value
        }).then(response => {
            state.newVehicleMotor = {
                year_id: '',
                v_engine: ''
            },
                state.errorsLaravel = []
            $('#create').modal('hide')
            toastr.success('Motor agregado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    updateVehicleMotor(state, id) {
        var url = urlVehicleMotor + '/' + id
        //state.fillVehicleMotor.year_id = state.selectedVehicleYear.value
        axios.put(url, state.fillVehicleMotor).then(response => {
            state.fillVehicleMotor = {
                id: '',
                //year_id: '',
                v_engine: ''
            },
                state.errorsLaravel = []
            $('#edit_motor').modal('hide')
            toastr.success('Motor actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    editVehiculoMotor(state, vehiclemotor) {
        /*state.optionsYear.forEach(year => {
            if (year.label == vehiclemotor.year) {
                state.selectedVehicleYear = year
            }
        })*/
        state.fillVehicleMotor.id = vehiclemotor.id
        state.fillVehicleMotor.v_engine = vehiclemotor.motor
        $("#edit_motor").modal('show')
    },

    getVehiculoMotors(state, page) {
        var url = 'vehiclemotors-all?page=' + page
        axios.get(url).then(response => {
            state.vehiclemotors = response.data.vehiclemotors.data
            state.pagination_motor = response.data.pagination_motor
        });
    },


    /******************************* */
    /****** sección notas **** */
    /******************************* */
    getNotes(state, page) {
        var url = urlNote + '?page=' + page
        axios.get(url).then(response => {
            state.notes = response.data.notes.data
            state.pagination = response.data.pagination
        });
    },
    createNote(state) {
        var url = urlNote
        axios.post(url, {
            price: state.newNote.price,
            detail: state.newNote.detail,
        }).then(response => {
            state.newNote.price = ''
            state.newNote.detail = ''
            state.errorsLaravel = []
            $('#create').modal('hide')
            toastr.success('Nota generada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editNote(state, note) {
        state.fillNote.id = note.id
        state.fillNote.price = note.price
        state.fillNote.detail = note.detail
        $("#edit").modal('show')
    },
    updateNote(state, id) {
        var url = urlNote + '/' + id
        axios.put(url, state.fillNote).then(response => {
            state.fillNote = {
                id: '',
                price: '',
                detail: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Nota actualizada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    deleteNote(state, id) {
        var url = urlNote + '/' + id
        axios.delete(url).then(response => {
            toastr.success('Nota eliminada con éxito')
        })
    },
    /******************************* */
    /****** sección cotizaciones **** */
    /******************************* */
    getQuotations(state, page) {
        var url = urlQuotation + '?page=' + page
        axios.get(url).then(response => {
            state.quotations = response.data.quotations.data
            state.pagination = response.data.pagination
        });
    },
    getQuotationDetails(state) {
        var url = urlQuotationDetails + '/' + state.idQuotation
        axios.get(url).then(response => {
            state.details = response.data
            var total = 0
            state.details.forEach(detail => {
                total += parseInt(detail.price)
            })
            state.totalQuotation = total
            state.totalQuotationIVA = Math.round(total * 1.19)
        });
    },
    createQuotation(state) {
        var url = urlQuotation
        axios.post(url, {
            client: state.newQuotation.client,
            vehicle: state.newQuotation.vehicle,
            patent: state.newQuotation.patent,
            state: 'Pendiente',
        }).then(response => {
            state.newQuotation = {
                client: '',
                vehicle: '',
                patent: '',
                state: ''
            }
            state.errorsLaravel = []
            $('#create').modal('hide')
            $('#btn-quotation-card').click()
            toastr.success('Cotización generada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editQuotation(state, quotation) {
        state.fillQuotation.id = quotation.id
        state.fillQuotation.client = quotation.client
        state.fillQuotation.vehicle = quotation.vehicle
        state.fillQuotation.patent = quotation.patent
        state.fillQuotation.state = quotation.state
        $("#edit").modal('show')
    },
    updateQuotation(state, id) {
        var url = urlQuotation + '/' + id
        axios.put(url, state.fillQuotation).then(response => {
            state.fillQuotation = {
                id: '',
                client: '',
                vehicle: '',
                patent: '',
                state: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('cotización actualizada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    deleteQuotation(state, id) {
        var url = urlQuotation + '/' + id
        axios.delete(url).then(response => {
            toastr.success('cotización eliminada con éxito')
        })
    },
    pdfQuotation(state) {
        var url = urlQuotationPdf + '/' + state.idQuotation
        window.location.href = url;
    },
    /******************************* */
    /****** sección detalles **** */
    /******************************* */

    createDetail(state) {
        var url = urlDetail
        var priceSet = state.newDetail.price
        priceSet = priceSet.replace('.', '')
        axios.post(url, {
            quotation_id: state.idQuotation,
            product: state.newDetail.product,
            price: priceSet,
        }).then(response => {
            state.newDetail = {
                quotation_id: '',
                detail: '',
                price: 1
            }
            state.errorsLaravel = []
            toastr.success('Detalle generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editDetail(state, detail) {
        state.fillDetail.id = detail.id
        state.fillDetail.quotation_id = detail.quotation_id
        state.fillDetail.detail = detail.detail
        state.fillDetail.price = detail.price
        $("#edit").modal('show')
    },
    updateDetail(state, id) {
        var url = urlDetail + '/' + id
        axios.put(url, state.fillDetail).then(response => {
            state.fillDetail = {
                id: '',
                quotation_id: '',
                detail: '',
                price: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Detalle actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    deleteDetail(state, id) {
        var url = urlDetail + '/' + id
        axios.delete(url).then(response => {
            toastr.success('Detalle eliminado con éxito')
        })
    },
    /******************************* */
    /****** sección clientes **** */
    /******************************* */
    getClients(state, page) {
        var url = urlClient + '?page=' + page
        axios.get(url).then(response => {
            state.clients = response.data.clients.data
            state.pagination = response.data.pagination
        });
    },
    detailClient(state, client) {
        state.client.id = client.id
        state.client.name = client.name
        state.client.rut = client.rut
        state.client.razonSocial = client.razonSocial
        state.client.email = client.email
        state.client.phone = client.phone
        state.client.address = client.address
        state.client.comuna = client.comuna
        state.client.giro = client.giro
        state.client.type = client.type
        state.client.activities = client.activities
        $("#detail").modal('show')
    },
    createClient(state) {
        var url = urlClient
        axios.post(url, {
            user_id: state.newClient.type,
            name: state.newClient.name,
            rut: state.newClient.rut,
            razonSocial: state.newClient.razonSocial,
            email: state.newClient.email,
            phone: state.newClient.phone,
            address: state.newClient.address,
            comuna: state.newClient.comuna,
            giro: state.newClient.giro,
            type: state.newClient.type,
        }).then(response => {

            var url = urlActivity
            var idClient = response.data

            if (state.newClient.activity != null) {
                state.newClient.activity.forEach(actividad => {
                    axios.post(url, {
                        client_id: idClient,
                        name: actividad.actividadEconomica,
                    }).then(response => {
                        toastr.success('Giro Ingresado con éxito')
                    })
                })
            }

            state.newClient = {
                rut: '',
                razonSocial: '',
                email: '',
                phone: '',
                address: '',
                comuna: '',
                giro: '',
                type: '',
                activities: {}
            }
            state.errorsLaravel = []
            $('#create').modal('hide')
            $('#btn-client-card').click()
            toastr.success('Cliente generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editClient(state, client) {
        state.fillClient.id = client.id
        state.fillClient.user_id = client.user_id
        state.fillClient.name = client.name
        state.fillClient.rut = client.rut
        state.fillClient.razonSocial = client.razonSocial
        state.fillClient.email = client.email
        state.fillClient.phone = client.phone
        state.fillClient.address = client.address
        state.fillClient.comuna = client.comuna
        state.fillClient.giro = client.giro
        state.fillClient.type = client.type
        $("#edit").modal('show')
    },
    updateClient(state, id) {
        var url = urlClient + '/' + id
        axios.put(url, state.fillClient).then(response => {
            state.fillUser = {
                id: '',
                user_id: '',
                name: '',
                rut: '',
                razonSocial: '',
                email: '',
                phone: '',
                address: '',
                comuna: '',
                type: '',
                activities: {}
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Cliente actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    modalDeleteClient(state, id) {
        state.fillClient.id = id
        $('#deleteClient').modal('show')
    },
    deleteClient(state) {
        var url = urlClient + '/' + state.fillClient.id
        axios.delete(url).then(response => {
            toastr.success('cliente eliminado con éxito')
            $('#deleteClient').modal('hide')
        })
    },
    /******************************* */
    /****** sección cotizaciones clientes**** */
    /******************************* */


    getQuotationclients(state, page) {
        var id = state.searchQuotationClient.id
        var razonSocial = state.searchQuotationClient.razonSocial
        var client = state.searchQuotationClient.client
        var vehicle = state.searchQuotationClient.vehicle
        var day = state.searchQuotationClient.day
        var month = state.searchQuotationClient.month
        var year = state.searchQuotationClient.year

        var url = urlQuotationclient + '?page=' + page + '&id=' + id + '&razonSocial=' + razonSocial + '&client=' + client + '&vehicle=' + vehicle + '&day=' + day + '&month=' + month + '&year=' + year

        axios.get(url).then(response => {
            state.quotationclients = response.data.quotationclients.data
            state.pagination = response.data.pagination
        });
    },

    getQuotationclientsform(state, page) {
        var id = state.searchQuotationClientForm.id
        var razonSocial = state.searchQuotationClientForm.razonSocial
        var client = state.searchQuotationClientForm.client
        var vehicle = state.searchQuotationClientForm.vehicle
        var day = state.searchQuotationClientForm.day
        var month = state.searchQuotationClientForm.month
        var year = state.searchQuotationClientForm.year

        var url = urlQuotationclientform + '?page=' + page + '&id=' + id + '&razonSocial=' + razonSocial + '&client=' + client + '&vehicle=' + vehicle + '&day=' + day + '&month=' + month + '&year=' + year


        axios.get(url).then(response => {
            state.quotationclientsform = response.data.quotationclientsform.data
            state.pagination_form = response.data.pagination_form
        });
    },

    getQuotationlinkenvio(state) {
        var url = 'quotationlinkenvio'
        axios.get(url).then(response => {
            state.linkenvio.url = window.location.host + "/cotizar-envio/" + response.data
        });
    },


    getQuotationShipping(state, page) {
        var id = state.searchShipping.id
        var url = 'quotationshipping?page=' + page + '&id=' + id
        axios.get(url).then(response => {
            state.quotationshipping = response.data.quotationshipping.data
            state.pagination_shipping = response.data.pagination_shipping

            // state.quotationshipping.forEach(shipping => {  
            //     if(shipping.enviado > 0){
            //         state.checkEnviado = shipping.id
            //     }else{
            //         state.checkEnviado = 0
            //     }
            // })

        });
    },


    setcheckRealizado(state, value) {
        state.checkRealizado = value

        var url = 'checkRealizado'
        axios.post(url, {
            check: state.checkRealizado
        }).then(response => {
            state.checkRealizado = [];
            state.errorsLaravel = [];
            toastr.success('El trabajo se realizo correctamente')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    deleteRealizado(state, id) {
        var url = 'deleteRealizado/' + id
        axios.post(url, {
            check: id
        }).then(response => {
            toastr.error('El trabajo no se a realizado')
        })
    },

    setCheckEnviado(state, value) {
        state.checkEnviado = value

        var url = 'checkEnviado'
        axios.post(url, {
            check: state.checkEnviado
        }).then(response => {
            state.checkEnviado = [];
            state.errorsLaravel = [];
            toastr.success('El producto se envio correctamente')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    deleteEnviado(state, id) {
        var url = 'deleteEnviado/' + id
        axios.post(url, {
            check: id
        }).then(response => {
            toastr.error('El producto no se a enviado')
        })
    },



    showModalDetail(state, id) {
        state.idforms = id
        $('#detalleCliente').modal('show')
    },
    showModalDetailMechanic(state, id) {
        state.idforms = id
        $('#detalleClienteMechanic').modal('show')
    },

    showModalDetailUserMechanic(state, id) {
        state.idforms = id
        $('#modalCreateUserMechanic').modal('show')
    },
    getQuotationforms(state) {
        var url = urlQuotationforms + '/' + state.idforms
        axios.get(url).then(response => {
            state.quotationforms = response.data
        });
    },
    showModalDetailclient(state, id) {
        state.idQuotationclient = id
        $('#modalQuotationclient').modal('show')
    },
    showModalDetailclientMechanic(state, id) {
        state.idQuotationclient = id
        $('#modalQuotationclientMechanic').modal('show')
    },
    getQuotationclientDetails(state) {
        var url = urlQuotationclientDetails + '/' + state.idQuotationclient
        axios.get(url).then(response => {
            state.detailclients = response.data
            var totalUtilidad = 0
            var totalTransporte = 0
            var totalAdicional = 0
            var total = 0
            state.detailclients.forEach(detailclient => {
                //total += parseInt(detailclient.price) *
                /*state.newDetailclient.quotationclient_id = detailclient.quotationclient_id
                state.newDetailclient.product = detailclient.product
                state.newDetailclient.price = detailclient.price
                state.newDetailclient.quantity = detailclient.quantity
                state.newDetailclient.percentage = detailclient.percentage
                state.newDetailclient.aditional = detailclient.aditional
                state.newDetailclient.transport = detailclient.transport
                state.newDetailclient.utility = detailclient.utility
                state.newDetailclient.total = detailclient.total*/
                totalUtilidad += parseInt(detailclient.utility)
                totalTransporte += parseInt(detailclient.transport)
                totalAdicional += parseInt(detailclient.aditional)
                total += parseInt(detailclient.total)
            })
            state.totalUtilidad = totalUtilidad
            state.totalTransporte = totalTransporte
            state.totalAdicional = totalAdicional
            state.totalQuotationclient = total
            state.totalQuotationclientIVA = Math.round(parseInt(total * 1.19))
        });
    },
    createQuotationclient(state) {
        var url = urlQuotationclient
        if (state.newQuotationclient.cliente_part == true) {
            state.selectedClient.value = 1
        }
        axios.post(url, {
            client_id: state.selectedClient.value,
            state: 'Pendiente',
            payment: state.selectedPago.value,
            client_text: state.newQuotationclient.client_text,
            cliente_part: state.newQuotationclient.cliente_part,
            url: state.newQuotationclient.url,
            vehicle: state.selectedVBrand.label + ' ' + state.selectedVModel.label + ' ' + state.selectedVYear.label + ' ' + state.selectedVEngine.label
        }).then(response => {
            state.newQuotationclient = {
                client_id: '',
                client_text: '',
                state: '',
                payment: '',
                url: ''
            }
            state.errorsLaravel = []
            toastr.success('Cotización formal generada con éxito')
            event.target.reset();
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editQuotationclient(state, quotationclient) {
        state.fillQuotationclient.id = quotationclient.id
        state.fillQuotationclient.client_id = quotationclient.client_id
        state.fillQuotationclient.state = quotationclient.state
        $("#edit").modal('show')
    },
    updateQuotationclient(state, id) {
        var url = urlQuotationclient + '/' + id
        axios.put(url, state.fillQuotationclient).then(response => {
            state.fillQuotation = {
                id: '',
                client_id: '',
                state: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Cotización formal actualizada con éxito')
        }).catch(error => {
        })
    },
    showModalDeleteQuotationclient(state, id) {
        state.idQuotationclient = id
        $('#modalDeleteQuotationClient').modal('show')
    },
    showdeleteQuotationShipping(state, id) {
        state.idQuotationShipping = id
        $('#modaldeleteQuotationShipping').modal('show')
    },
    showQuotationShipping(state, id) {
        state.fillQuotationShipping.id = id
        $('#modalQuotationShipping').modal('show')
    },
    editFacebook(state, facebookshipping) {
        state.fillFacebookShipping.id = facebookshipping.id
        state.fillFacebookShipping.url = facebookshipping.url
        $('#modalEditFacebook').modal('show')
    },
    deleteQuotationclient(state, id) {
        var url = urlQuotationclient + '/' + state.idQuotationclient
        axios.delete(url).then(response => {
            toastr.success('Cotización formal eliminada con éxito')
            $('#modalDeleteQuotationClient').modal('hide')
            state.idQuotationclient = null
        })
    },
    deleteQuotationShipping(state, id) {
        var url = urlCreateQuotationShipping + '/' + state.idQuotationShipping
        axios.delete(url).then(response => {
            toastr.success('Envio eliminado con éxito')
            $('#modaldeleteQuotationShipping').modal('hide')
            state.idQuotationShipping = null
        })
    },
    pdfQuotationclient(state) {
        var url = urlQuotationclientPdf + '/' + state.idQuotationclient
        window.location.href = url;
    },
    pdfQuotationShipping(state, id) {
        var url = urlQuotationShippingPdf + '/' + id
        window.location.href = url;
    },
    pdfIvaQuotationclient(state) {
        var url = urlQuotationclientPdfIva + '/' + state.idQuotationclient
        window.location.href = url;
    },

    /******************************* */
    /****** sección detalles de cotizaciones de clientes**** */
    /******************************* */

    createDetailclient(state) {
        var url = urlDetailclient

        var priceSet = "" + state.newDetailclient.price
        priceSet = priceSet.split('.').join('')

        var aditionalSet = "" + state.newDetailclient.aditional
        aditionalSet = aditionalSet.split('.').join('')

        var transportSet = "" + state.newDetailclient.transport
        transportSet = transportSet.split('.').join('')

        axios.post(url, {
            quotationclient_id: state.idQuotationclient,
            product: state.newDetailclient.product,
            detail: state.newDetailclient.detail,
            days: state.newDetailclient.days,
            price: priceSet,
            quantity: state.newDetailclient.quantity,
            percentage: state.newDetailclient.percentage,
            aditional: aditionalSet,
            transport: transportSet,
            utility: state.newDetailclient.utility,
            total: state.newDetailclient.total,
        }).then(response => {
            state.selectedProduct = []
            state.newDetailclient = {
                quotationclient_id: '',
                product: '',
                price: 0,
                quantity: 1,
                percentage: 35,
                aditional: 0,
                transport: 0,
                utility: 0,
                total: 0
            }
            state.errorsLaravel = []
            toastr.success('Detalle generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editDetailclient(state, detailclient) {
        state.fillDetailclient.id = detailclient.id
        state.fillDetailclient.quotationclient_id = detailclient.quotationclient_id
        state.fillDetailclient.product = detailclient.product
        state.fillDetailclient.detail = detailclient.detail
        state.fillDetailclient.price = detailclient.price
        state.fillDetailclient.quantity = detailclient.quantity
        state.fillDetailclient.percentage = detailclient.percentage
        state.fillDetailclient.aditional = detailclient.aditional
        state.fillDetailclient.transport = detailclient.transport
        state.fillDetailclient.utility = detailclient.utility
        state.fillDetailclient.total = detailclient.total
        state.fillDetailclient.totalIVA = Math.round(detailclient.total * 1.19)
        state.fillDetailclient.days = detailclient.days

        $("#editDetailClient").modal('show')
    },
    editDetailclientMechanic(state, detailclient) {
        state.fillDetailclient.id = detailclient.id
        state.fillDetailclient.quotationclient_id = detailclient.quotationclient_id
        state.fillDetailclient.product = detailclient.product
        state.fillDetailclient.detail = detailclient.detail
        state.fillDetailclient.price = detailclient.price
        // state.fillDetailclient.quantity = detailclient.quantity
        // state.fillDetailclient.percentage = detailclient.percentage
        // state.fillDetailclient.aditional = detailclient.aditional
        // state.fillDetailclient.transport = detailclient.transport
        // state.fillDetailclient.utility = detailclient.utility
        state.fillDetailclient.total = detailclient.total
        state.fillDetailclient.totalIVA = Math.round(detailclient.total * 1.19)
        state.fillDetailclient.days = detailclient.days

        $("#editDetailClientMechanic").modal('show')
    },
    updateDetailclient(state, id) {
        var url = urlDetailclient + '/' + id
        //detailclient es similar a fillDetailclient pero sin el totalIva
        //  totalIva es utilizado para mostrarlo en la tabla solamente, mas no para insertarlo en la bd
        let detailclient = {
            id: state.fillDetailclient.id,
            quotationclient_id: state.fillDetailclient.quotationclient_id,
            product: state.fillDetailclient.product,
            detail: state.fillDetailclient.detail,
            price: state.fillDetailclient.price,
            quantity: state.fillDetailclient.quantity,
            percentage: state.fillDetailclient.percentage,
            aditional: state.fillDetailclient.aditional,
            transport: state.fillDetailclient.transport,
            utility: state.fillDetailclient.utility,
            total: state.fillDetailclient.total
        }
        axios.put(url, detailclient).then(response => {
            state.fillDetailclient = {
                id: '',
                quotationclient_id: '',
                product: '',
                detail: '',
                price: 1,
                quantity: 1,
                percentage: 35,
                aditional: 0,
                transport: 0,
                utility: 0,
                total: 1,
                totalIVA: 1.19
            }
            state.errorsLaravel = []
            $('#editDetailClient').modal('hide')
            toastr.success('Detalle actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    deleteDetailclient(state, id) {
        var url = urlDetailclient + '/' + id
        axios.delete(url).then(response => {
            toastr.success('Detalle eliminado con éxito')
        })
    },
    /******************************* */
    /****** sección importaciones **** */
    /******************************* */
    getImports(state, page) {
        var url = urlImport + '?page=' + page
        axios.get(url).then(response => {
            state.imports = response.data.imports.data
            state.pagination = response.data.pagination
        });
    },
    getImportDetails(state) {
        var url = urlImportDetails + '/' + state.idImport
        axios.get(url).then(response => {
            state.detailimports = response.data
            var total = 0
            var price = 0
            var totalValue = 0
            var totalNacional = 0
            var totalInternacional = 0
            var totalNeto = 0
            var totalCosto = 0
            state.detailimports.forEach(detailimport => {
                totalValue += parseFloat(detailimport.total)
                totalNeto += parseFloat(detailimport.price)
                totalNacional += parseFloat(detailimport.nacional)
                totalInternacional += parseFloat(detailimport.internacional)
                totalCosto += parseFloat(detailimport.nacional) + parseFloat(detailimport.internacional)
                total += parseFloat(detailimport.utility)
                price += parseFloat(detailimport.price) * parseInt(detailimport.quantity)
            })
            state.totalPriceImport = price
            state.totalValue = totalValue
            state.totalNacional = totalNacional
            state.totalInternacional = totalInternacional
            state.totalNeto = totalNeto
            state.totalCosto = totalCosto
            state.totalImport = total
            state.totalImportIVA = Math.round(parseFloat(total * 1.19))


        });
    },
    getTotalImport(state) {
        var price = 0
        var total = 0

        state.detailimports.forEach(detailimport => {
            total += parseFloat(detailimport.utility)
            price += parseFloat(detailimport.price) * parseFloat(detailimport.quantity)
        })
        state.totalPriceImport = price
        state.totalImport = total
        state.totalImportIVA = Math.round(parseFloat(total * 1.19))
    },
    createImport(state) {
        var url = urlImport
        axios.post(url, {
            name: state.newImport.name,
        }).then(response => {
            state.newImport = {
                name: '',
                dolar: '',
                safe: '',
                transport: '',
                internment: '',
                other1: '',
                other2: '',
                total: ''
            }
            state.errorsLaravel = []
            $('#btn-import-card').click()
            $('#import').modal('show')
            toastr.success('Importación generada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    showImport(state) {
        var url = urlImport + '/' + state.idImport
        axios.get(url).then(response => {
            state.import = response.data
            state.detailImport.dolar = state.import.dolar
            state.detailImport.embarque = state.import.embarque
            state.detailImport.fee = state.import.fee
            state.detailImport.fleteUsa = state.import.fleteUsa
            state.detailImport.bankusa = state.import.bankusa
            state.detailImport.bankchile = state.import.bankchile
            state.detailImport.transferencia = state.import.transferencia
            state.detailImport.otro = state.import.otro
            state.detailImportNacional.aduana1 = state.import.aduana1
            state.detailImportNacional.aduana2 = state.import.aduana2
            state.detailImportNacional.manipuleo = state.import.manipuleo
            state.detailImportNacional.bodega = state.import.bodega
            state.detailImportNacional.guia = state.import.guia
            state.detailImportNacional.retiro = state.import.retiro
            state.detailImportNacional.fleteChile = state.import.fleteChile

            if (state.detailImport.dolar == 0)
                state.detailImport.dolar = 700
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editImport(state, localImport) {
        state.fillImport.id = localImport.id
        state.fillImport.client = localImport.client
        state.fillImport.vehicle = localImport.vehicle
        state.fillImport.patent = localImport.patent
        state.fillImport.state = localImport.state
        //$("#edit").modal('show')
    },
    updateImport(state, id) {
        var url = urlImport + '/' + id
        axios.put(url, state.fillImport).then(response => {
            state.fillImport = {
                id: '',
                name: '',
                dolar: '',
                safe: '',
                transport: '',
                internment: '',
                other1: '',
                other2: '',
                total: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Importación actualizada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    showModalDeleteImport(state, id) {
        state.idImport = id
        $('#modalDeleteImport').modal('show')
    },
    deleteImport(state) {
        var url = urlImport + '/' + state.idImport
        axios.delete(url).then(response => {
            toastr.success('Importación eliminada con éxito')
            //state.idImport = null
            $('#modalDeleteImport').modal('hide')
        })
    },
    pdfImport(state) {
        var url = urlImportPdf + '/' + state.idImport
        window.location.href = url
    },
    excelImport(state, id) {
        var url = urlExportExcel + '/' + id
        window.location.href = url
    },
    /******************************* */
    /****** sección detalles de importaciones**** */
    /******************************* */
    showModalDetailimport(state, id) {
        state.detailimports = []
        state.idImport = id
        $('#modalImport').modal('show')
    },
    createDetailimport(state) {

        //state.newDetailimport.price = state.newDetailimport.price.replace('.', ',')

        var url = urlDetailimport

        var adicional = parseFloat(state.newDetailimport.aditional) * parseFloat(state.detailImport.dolar)

        // var usa = parseFloat(state.newDetailimport.usa / 100) /* + 1*/

        // var seguro = parseFloat(state.newDetailimport.seguro / 100) /* + 1*/

        var usa = (parseFloat(state.newDetailimport.price) * parseFloat(state.detailImport.dolar)) * parseFloat(state.newDetailimport.usa / 100)

        var seguro = ((parseFloat(state.newDetailimport.price) * parseFloat(state.detailImport.dolar)) + usa) * parseFloat(state.newDetailimport.usa / 100)

        var precio = parseFloat(state.newDetailimport.price) /** parseFloat(state.detailImport.dolar)*/ /* usa * seguro*/
        /* + adicional*/

        var precio_dolar = parseFloat(state.newDetailimport.price) * parseFloat(state.detailImport.dolar)
        //var dolar = parseFloat(state.detailImport.dolar)

        axios.put(urlImport + '/' + state.idImport, {
            dolar: state.detailImport.dolar,
        }).then(response => {
            toastr.success('Importación actualizada')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })

        axios.post(url, {
            import_id: state.idImport,
            product: state.newDetailimport.product,
            detail: state.newDetailimport.detail,
            price: precio,
            price_dolar: precio_dolar,
            quantity: state.newDetailimport.quantity,
            //usa: state.newDetailimport.usa,
            //dolar: dolar,
            usa: usa,
            seguro: seguro,
            valorem: state.newDetailimport.valorem,
            aditional: adicional,
        }).then(response => {

            state.errorsLaravel = []


            var url = urlProductimport

            axios.post(url, {
                name: state.newDetailimport.product,
                detail: state.newDetailimport.detail,
                //type: 0,
            }).then(response => {
                state.selectedProductimport = []

                state.newDetailimport = {
                    import_id: '',
                    product: '',
                    detail: '',
                    price: 1,
                    quantity: 1,
                    usa: 0,
                    seguro: 1,
                    valorem: 0,
                    aditional: 0,
                    embarque: 0,
                    fee: 0,
                    fleteUsa: 0,
                    bankusa: 0,
                    bankchile: 0,
                    transferencia: 0,
                    otro: 0,
                    aduana1: 0,
                    aduana2: 0,
                    manipuleo: 0,
                    bodega: 0,
                    guia: 0,
                    retiro: 0,
                    fleteChile: 0,
                    percentage: 0,
                    internacional: 0,
                    nacional: 0,
                    costoTotal: 0,
                    valueChile: 0,
                    unitario: 0,
                    utility: 0,
                    total: 0
                }

                toastr.success('Producto agregado con éxito')
            }).catch(error => {
                state.errorsLaravel = error.response.data
            })

        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editDetailimport(state, detailimport) {
        state.fillDetailimport.id = detailimport.id
        state.fillDetailimport.import_id = detailimport.import_id
        state.fillDetailimport.product = detailimport.product
        state.fillDetailimport.detail = detailimport.detail
        state.fillDetailimport.price = detailimport.price
        state.fillDetailimport.quantity = detailimport.quantity
        state.fillDetailimport.valorem = detailimport.valorem
        state.fillDetailimport.aditional = detailimport.aditional

        state.fillDetailimport.embarque = detailimport.embarque
        state.fillDetailimport.seguro = detailimport.seguro
        state.fillDetailimport.fee = detailimport.fee
        state.fillDetailimport.fleteUsa = detailimport.fleteUsa
        state.fillDetailimport.bankusa = detailimport.bankusa
        state.fillDetailimport.bankchile = detailimport.bankchile
        state.fillDetailimport.transferencia = detailimport.transferencia

        state.fillDetailimport.aduana1 = detailimport.aduana1
        state.fillDetailimport.aduana2 = detailimport.aduana2
        state.fillDetailimport.manipuleo = detailimport.manipuleo
        state.fillDetailimport.bodega = detailimport.bodega
        state.fillDetailimport.guia = detailimport.guia
        state.fillDetailimport.retiro = detailimport.retiro
        state.fillDetailimport.fleteChile = detailimport.fleteChile

        state.fillDetailimport.percentage = detailimport.percentage
        state.fillDetailimport.internacional = detailimport.internacional
        state.fillDetailimport.nacional = detailimport.nacional
        state.fillDetailimport.costoTotal = detailimport.costoTotal
        state.fillDetailimport.valueChile = detailimport.valueChile
        state.fillDetailimport.utility = detailimport.utility
        state.fillDetailimport.total = detailimport.total

        $("#editDetailImport").modal('show')
    },
    updateDetailimport(state, id) {
        var url = urlDetailimport + '/' + id
        axios.put(url, state.fillDetailimport).then(response => {
            state.fillDetailimport = {
                id: '',
                import_id: '',
                product: '',
                detail: '',
                price: 1,
                quantity: 1,
                usa: 0,
                seguro: 1,
                valorem: 0,
                aditional: 0,
                embarque: 0,
                fee: 0,
                fleteUsa: 0,
                bankusa: 0,
                bankchile: 0,
                transferencia: 0,
                otro: 0,
                aduana1: 0,
                aduana2: 0,
                manipuleo: 0,
                bodega: 0,
                guia: 0,
                retiro: 0,
                fleteChile: 0,
                percentage: 0,
                internacional: 0,
                nacional: 0,
                costoTotal: 0,
                valueChile: 0,
                unitario: 0,
                utility: 0,
                total: 0
            },
                state.errorsLaravel = []
            $('#editDetailImport').modal('hide')
            toastr.success('Detalle actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    deleteDetailimport(state, id) {
        var url = urlDetailimport + '/' + id
        axios.delete(url).then(response => {
            toastr.success('Detalle eliminado con éxito')
        })
    },
    finishDetailimport(state) {

        var idImport = state.idImport
        state.detailimports.forEach(localImport => {
            var url = urlDetailimport + '/' + localImport.id
            idImport = localImport.import_id
            axios.put(url, localImport).then(response => {
                //toastr.success('Detalle actualizado con éxito')
            }).catch(error => {
                state.errorsLaravel = error.response.data
            })
        })

        var url = urlImport + '/' + idImport
        axios.put(url, {
            dolar: state.detailImport.dolar,
            embarque: state.detailImport.embarque,
            fee: state.detailImport.fee,
            fleteUsa: state.detailImport.fleteUsa,
            bankusa: state.detailImport.bankusa,
            bankchile: state.detailImport.bankchile,
            transferencia: state.detailImport.transferencia,
            otro: state.detailImport.otro,
            aduana1: state.detailImportNacional.aduana1,
            aduana2: state.detailImportNacional.aduana2,
            manipuleo: state.detailImportNacional.manipuleo,
            bodega: state.detailImportNacional.bodega,
            guia: state.detailImportNacional.guia,
            retiro: state.detailImportNacional.retiro,
            fleteChile: state.detailImportNacional.fleteChile,
        }).then(response => {
            toastr.success('Importación actualizada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })

    },
    /******************************* */
    /****** sección cotización de importaciones**** */
    /******************************* */
    showQuotationimport(state, id) {
        state.detailimports = []
        state.idImport = id
        $('#modalQuotationImport').modal('show')
    },
    createQuotationimport(state) {
        var url = urlQuotationimport
        axios.post(url, {
            import_id: state.idImport,
            client_id: state.selectedClient.value,
            payment: state.newQuotationimport.payment,
            state: 'Pendiente',
        }).then(response => {
            state.newQuotationimport = {
                import_id: '',
                user_id: '',
                client_id: '',
                payment: '',
                state: ''
            }
            state.errorsLaravel = []
            $('#btn-quotationimport-card').click()
            $('#modalQuotationImport').modal('hide')
            toastr.success('Cotización generada con éxito')
            var url = urlQuotationimportPdf + '/' + response.data
            window.location.href = url
            //state.idImport = null
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    /******************************* */
    /****** sección productos **** */
    /******************************* */

    updateProductsUtilidad(state) {
        var url = urlProduct
        //state.newAllUtilidad.select = state.checkedSelect2
        axios.post(url, {
            check: state.checkedSelect2,
            pago: state.selectedPago.label,
            utilidad: state.selectedPago.utilidad
        }).then(response => {
            state.newAllUtilidad = {
                check: [],
                pago: '',
                utilidad: ''
            }
            state.errorsLaravel = [];
            toastr.success('Se actualizo la forma de pago')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    updateRole(state, id) {
        var url = urlRoles + '/' + id
        state.fillRole.special = state.checkedSpecialRole
        state.fillRole.permissions = state.checkedPermissions
        axios.put(url, state.fillRole).then(response => {
            state.fillRole = {
                id: '',
                name: '',
                description: ''
            }
            state.errorsLaravel = [];
            $('#edit').modal('hide')
            toastr.success('Rol actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    createDescuento(state) {
        var url = urlDescuento
        axios.post(url, {
            descuento: state.newDescuento.descuento
        }).then(response => {
            state.newDescuento = {
                descuento: 0
            }
            state.errorsLaravel = []
            toastr.success('El Descuento se creo correctamente')
            $('#createDescuento').modal('hide')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    descuento(state, detailimport) {
        state.fillDetailimport.id = detailimport.id
    },

    createTipoPago(state) {
        var url = urlTipoDePago
        axios.post(url, {
            pago: state.newTipoPago.pago,
            utilidad: state.newTipoPago.utilidad
        }).then(response => {
            state.newTipoPago = {
                pago: '',
                utilidad: ''
            }
            state.errorsLaravel = []
            toastr.success('El tipo de pago se creo correctamente')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    getTiposPagos(state) {
        var url = urlTipoDePago
        axios.get(url).then(response => {
            state.tipospagos = response.data
        });
    },

    editTiposPagos(state, tipospagos) {
        state.fillTipoPago.id = tipospagos.id
        state.fillTipoPago.pago = tipospagos.pago
        state.fillTipoPago.utilidad = tipospagos.utilidad
        $("#edit").modal('show')
    },

    updateTiposPagos(state, id) {
        var url = urlUtilidad + '/' + id
        axios.put(url, state.fillTipoPago).then(response => {
            state.fillTipoPago = {
                id: '',
                pago: '',
                utilidad: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('El Forma de Pago se a actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    updateUtilidad(state, id) {
        var url = urlTipoDePago + '/' + id
        axios.put(url, {
            id: state.fillTipoPago.id,
            pago: state.selectedPago.label,
            utilidad: state.selectedPago.utilidad
        }).then(response => {
            state.fillTipoPago = {
                id: '',
                pago: '',
                utilidad: ''
            }
            state.errorsLaravel = []
            $('#editUtilidad').modal('hide')
            toastr.success('El producto se a actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },




    getProducts(state, page) {
        var url = urlProduct + '?page=' + page + '&name=' + state.searchProduct.name
        axios.get(url).then(response => {
            state.products = response.data.products.data
            state.pagination = response.data.pagination
        });
    },

    createProduct(state) {
        var url = urlProduct
        axios.post(url, {
            name: state.newProduct.name,
            detail: state.newProduct.detail,
            client_id: state.selectedClient.value,
            codebar: state.newProduct.codebar
        }).then(response => {
            state.newProduct = {
                name: '',
                detail: '',
                codebar: ''
            }
            state.errorsLaravel = []
            $('#create').modal('hide')
            $('#btn-product-card').click()

            toastr.success('Producto generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editProduct(state, product) {
        state.fillProduct.id = product.id
        state.fillProduct.name = product.name
        state.fillProduct.detail = product.detail
        $("#edit").modal('show')
    },
    updateProduct(state, id) {
        var url = urlProduct + '/' + id
        axios.put(url, state.fillProduct).then(response => {
            state.fillProduct = {
                id: '',
                name: '',
                detail: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Producto actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    modalDeleteProduct(state, id) {
        state.fillProduct.id = id
        $('#deleteProduct').modal('show')
    },
    deleteProduct(state) {
        var url = urlProduct + '/' + state.fillProduct.id
        axios.delete(url).then(response => {
            toastr.success('Producto eliminado con éxito')
            $('#deleteProduct').modal('hide')
        })
    },
    /******************************* */
    /****** sección productos de importacion **** */
    /******************************* */
    getProductimports(state, page) {
        var url = urlProductimport + '?page=' + page
        axios.get(url).then(response => {
            state.products = response.data.products.data
            state.pagination = response.data.pagination
        });
    },
    /******************************* */
    /****** sección codigos **** */
    /******************************* */
    getCodes(state, page) {
        var url = urlCode + '?page=' + page + '&name=' + state.search.name
        axios.get(url).then(response => {
            state.codes = response.data.codes.data
            state.pagination = response.data.pagination
        });
    },

    createCode(state) {
        var url = urlCode
        state.newCode.client_id = state.selectedClient.value
        state.newCode.product_id = state.selectedProduct.value

        axios.post(url, {
            client_id: state.newCode.client_id,
            product_id: state.newCode.product_id,
            codebar: state.newCode.codebar,
            atributo: state.newCode.atributo,
            is_activate: state.newCode.is_activate,
        }).then(response => {

            state.selectedClient = {
                label: '',
                value: ''
            }
            state.selectedProduct = {
                label: '',
                value: ''
            }
            state.newCode = {
                client_id: '',
                product_id: '',
                codebar: '',
                atributo: 0,
                is_activate: 1
            }
            state.errorsLaravel = []
            $('#create').modal('hide')
            $('#btn-code-card').click()

            toastr.success('Código generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editCode(state, code) {
        state.fillCode.id = code.id
        state.fillCode.client_id = code.client_id
        state.fillCode.product_id = code.product_id
        state.fillCode.codebar = code.codebar
        state.fillCode.atributo = code.atributo
        state.fillCode.is_activate = code.is_activate
        state.fillCode.utilidad = code.productpagos.utilidad



        state.optionsProduct.forEach(product => {
            if (product.value == state.fillCode.product_id) {
                state.selectedProductCode.value = product.value
                state.selectedProductCode.label = product.label
            }
        })

        state.optionsClient.forEach(client => {
            if (client.value == state.fillCode.client_id) {
                state.selectedClientCode.value = client.value
                state.selectedClientCode.label = client.label
            }
        })



        $("#edit").modal('show')
    },
    updateCode(state, id) {
        var url = urlCode + '/' + id

        state.fillCode.client_id = state.optionsClient.value
        state.fillCode.product_id = state.optionsProduct.value

        axios.put(url, state.fillCode).then(response => {
            state.fillCode = {
                id: '',
                client_id: '',
                product_id: '',
                codebar: '',
                atributo: 0,
                is_activate: 1,
                utilidad: 0
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Código actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    modalDeleteCode(state, id) {
        state.fillCode.id = id
        $('#deleteCode').modal('show')
    },
    deleteCode(state) {
        var url = urlCode + '/' + state.fillCode.id
        axios.delete(url).then(response => {
            toastr.success('Código eliminado con éxito')
            $('#deleteCode').modal('hide')
        })
    },
    getCodeInventories(state) {
        var url = urlCodeInventory + '/' + state.fillCode.id
        state.totalInventory = 0

        axios.get(url).then(response => {
            state.inventories = response.data

            state.inventories.forEach(inventory => {
                state.totalInventory += parseInt(inventory.quantity)
            })
        })
    },

    updateUtilidadDefect(state) {
        var url = urlUpdateUtilidadDefect

        axios.put(url, state.newUtilidad).then(response => {
            state.errorsLaravel = []
            toastr.success('Utilidad por defecto a sido actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    /******************************* */
    /****** sección inventariado **** */
    /******************************* */
    modalInventory(state, id) {
        state.fillCode.id = id
        state.inventories = []
        $('#inventory').modal('show')
    },
    createInventory(state) {
        var url = urlInventory
        state.newInventory.code_id = state.fillCode.id

        axios.post(url, {
            code_id: state.newInventory.code_id,
            price: state.newInventory.price,
            quantity: state.newInventory.quantity,
        }).then(response => {

            state.newInventory = {
                code_id: '',
                price: 0,
                quantity: 1
            }
            state.errorsLaravel = []
            $('#create').modal('hide')
            $('#btn-code-card').click()

            toastr.success('Código generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    modalDeleteInventory(state, id) {
        state.fillInventory.id = id
        $('#deleteInventory').modal('show')
    },
    deleteInventory(state) {
        var url = urlInventory + '/' + state.fillInventory.id
        axios.delete(url).then(response => {
            toastr.success('Inventariado eliminado con éxito')
            $('#deleteInventory').modal('hide')
        })
    },
    allInventories(state) {
        var url = urlAllInventory

        state.allInventory = {
            price: 0,
            quantity: 0
        }

        axios.get(url).then(response => {

            response.data.forEach((inventory) => {
                state.allInventory.price += parseInt(inventory.price)
                state.allInventory.quantity += parseInt(inventory.quantity)
            });
        });
    },
    /******************************* */
    /****** sección usuarios **** */
    /******************************* */
    getUsers(state, page) {
        var url = urlUser + '?page=' + page
        axios.get(url).then(response => {
            state.users = response.data.users.data
            state.pagination = response.data.pagination
        });
    },

    getRolesQuotation(state) {
        var url = urlQuotationRoles
        axios.get(url).then(response => {
            state.quotationRoles = response.data
        });
    },

    // getIdUserRoles(state, user){
    //     var url = urlUser + '/' + user.id + '/' + urlRoles
    //     axios.get(url).then(response => {
    //         state.userRoles = response.data
    //     });
    // },
    showUser(state) {
        var url = urlUserId
        axios.get(url).then(response => {
            var url = urlUser + '/' + response.data
            axios.get(url).then(response => {
                state.fillUser = response.data
                state.idUser = state.fillUser.id
            })
        })
    },
    createUser(state) {
        var url = urlUser
        axios.post(url, {
            id: state.idUser,
            name: state.newUser.name,
            email: state.newUser.email,
            password: state.newUser.password,
            //cant_client: state.newUser.cant_client,
            cant_vehicle: state.newUser.cant_vehicle
            //url: window.location.host + "/acceso/" + md5(state.newUser.password)
        }).then(response => {
            state.newUser = {
                id: '',
                name: '',
                email: '',
                password: '',
                url: ''
            }
            state.errorsLaravel = []
            toastr.success('Usuario generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },



    editUser(state, user) {
        state.fillUser.id = user.id
        state.fillUser.name = user.name
        state.fillUser.email = user.email
        state.fillUser.password = user.password
        state.fillUser.url = window.location.host + "/acceso/" + user.url
        state.fillUser.logo = user.logo
        state.fillUser.cantidad = user.cantidad
        $("#edit").modal('show')
    },
    updateUserShow(state) {
        var url = urlUser + '/' + state.idUser
        axios.put(url, state.fillUser).then(response => {
            //state.fillUser = { id:'', name:'', email: '', password: '' }
            state.errorsLaravel = []

            toastr.success('Usuario actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    updateUser(state, id) {
        var url = urlUser + '/' + id
        axios.put(url, state.fillUser).then(response => {
            state.fillUser = {
                id: '',
                name: '',
                email: '',
                password: '',
                logo: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Usuario actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    updateCantCliVehi(state, id) {
        var url = urlCantCliVehi + '/' + id
        axios.put(url, state.fillCantCliVehi).then(response => {
            state.fillCantCliVehi = {
                id: '',
                cant_client: 0,
                cant_vehicle: 0
            }
            state.errorsLaravel = []
            $('#editCantCliVehi').modal('hide')
            toastr.success('Se han actualizado las cantidades con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    updateCantVehicle(state, id) {
        var url = urlCantVehicle + '/' + id
        axios.put(url, state.fillCantVehicle).then(response => {
            state.fillCantVehicle = {
                id: '',
                cant_vehicle: 0
            }
            state.errorsLaravel = []
            $('#editCantVehicle').modal('hide')
            toastr.success('La cantidad se actualizado con éxito')
        }).catch(error => {
            toastr.error(error.response.data)
        })
    },
    modalDeleteUser(state, id) {
        state.fillUser.id = id
        $('#deleteUser').modal('show')
    },
    deleteUser(state) {
        var url = urlUser + '/' + state.fillUser.id
        axios.delete(url).then(response => {
            toastr.success('usuario eliminada con éxito')
            $('#deleteUser').modal('hide')
        })
    },
    /******************************* */
    /****** sección empresas **** */
    /******************************* */
    createCompany(state) {
        var url = urlUser
        axios.post(url, {
            rut: state.newCompany.rut,
            razonSocial: state.newCompany.razonSocial,
            email: state.newCompany.email,
            phone: state.newCompany.phone,
            address: state.newCompany.address,
            comuna: state.newCompany.comuna,
            giro: state.newCompany.giro,
            type: 'Mi Empresa',
        }).then(response => {
            state.newUser = {
                name: '',
                email: '',
                password: ''
            }
            state.errorsLaravel = []
            $('#create').modal('hide')
            $('#btn-user-card').click()
            toastr.success('Usuario generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editCompany(state, user) {
        state.fillUser.id = user.id
        state.fillUser.name = user.name
        state.fillUser.email = user.email
        state.fillUser.password = user.password
        $("#edit").modal('show')
    },
    updateCompany(state, id) {
        var url = urlUser + '/' + id
        axios.put(url, state.fillUser).then(response => {
            state.fillUser = {
                id: '',
                name: '',
                email: '',
                password: ''
            }
            state.errorsLaravel = []
            $('#edit').modal('hide')
            toastr.success('Usuario actualizado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    modalDeleteCompany(state, id) {
        state.fillUser.id = id
        $('#deleteUser').modal('show')
    },
    deleteCompany(state) {
        var url = urlUser + '/' + state.fillUser.id
        axios.delete(url).then(response => {
            toastr.success('usuario eliminada con éxito')
            $('#deleteUser').modal('hide')
        })
    },
    /**************************** */
    /******************************* */
    /****** sección de control de roles **** */
    /******************************* */
    getRoles(state, page) {
        var url = urlRoles + '?page=' + page
        axios.get(url).then(response => {
            state.roles = response.data.roles.data
            state.pagination = response.data.pagination
        });
    },
    createRole(state) {
        var url = urlRoles
        axios.post(url, {
            name: state.newRole.name,
            description: state.newRole.description,
        }).then(response => {
            state.newRole.name = ''
            state.newRole.description = ''
            state.errorsLaravel = []
            $('#create').modal('hide')
            toastr.success('Rol generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    editRole(state, role) {
        var permissions = []
        state.checkedSpecialRole = ''
        state.checkedPermissions = []
        state.fillRole.id = role.id
        state.fillRole.name = role.name
        state.fillRole.description = role.description
        state.checkedSpecialRole = role.special
        role.permissions.forEach(permission => {
            permissions.push(permission.id)
        })
        state.checkedPermissions = permissions
        $("#edit").modal('show')
    },
    deleteRole(state, id) {
        var url = urlRoles + '/' + id
        axios.delete(url).then(response => {
            toastr.success('Rol eliminado con éxito');
        })
    },
    getAllRoles(state) {
        var url = urlAllRoles
        axios.get(url).then(response => {
            state.roles = response.data
        });
    },
    // getUserRoles(state, id) {
    //     var url = urlUser + '/' + id + '/' + urlRoles
    //     axios.get(url).then(response => {
    //         state.userRoles = response.data
    //         $("#showRoles").modal('show')
    //     });
    // },
    editCantCliVehi(state, user) {

        if (user.roles[0] === undefined) {
            toastr.error('Debe asignar un rol a este usuario')
        } else {
            state.fillCantCliVehi.id = user.id
            //state.cantCliVehiAdmin.cant_client = user.cant_client
            //state.cantCliVehiAdmin.cant_vehicle = user.cant_vehicle
            state.fillCantCliVehi.cant_client = user.cant_client
            state.fillCantCliVehi.cant_vehicle = user.cant_vehicle
            state.fillCantCliVehi.rol = user.roles[0].name
            $("#editCantCliVehi").modal('show')
        }
    },
    editCantVehicle(state, user) {
        state.fillCantVehicle.id = user.id
        state.fillCantVehicle.cant_vehicle = user.cant_vehicle

        var url = urlTotalVehi + '/' + user.id
        axios.get(url).then(response => {
            state.totalvehi = response.data
        });

        $("#editCantVehicle").modal('show')
    },
    editarUtilidad(state, user) {
        state.fillTipoPago.id = user.id
        if (user.productpagos != null) {
            state.selectedPago.label = user.productpagos.forma_pago
        } else {
            state.selectedPago.label = ""
        }

        $("#editUtilidad").modal('show')
    },
    editUserRoles(state, user) {
        //var roles = [user.role_id]
        var roles = []
        state.checkedRoles = []
        state.fillUserRoles.id = user.id
        state.fillUserRoles.name = user.name
        user.roles.forEach(role => {
            roles.push(role.id)
        })
        state.checkedRoles = roles
        $("#editRoles").modal('show')
    },
    updateUserRoles(state, id) {
        var url = urlUserRoles + '/' + id;
        axios.put(url, state.checkedRoles).then(response => {
            state.checkedRoles = []
            $('#editRoles').modal('hide')
            toastr.success('Roles asignados con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    updateQuotationShipping(state, id) {
        var url = urlCreateQuotationShipping + '/' + id
        axios.put(url, state.fillQuotationShipping).then(response => {
            state.fillQuotationShipping = {
                direccion: ''
            }
            state.errorsLaravel = [];
            $('#modalQuotationShipping').modal('hide')
            toastr.success('Se agrego la dirección correctamente')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    updateFacebookShipping(state, id) {
        var url = urlCreateFacebookShipping + '/' + id
        axios.put(url, state.fillFacebookShipping).then(response => {
            state.fillFacebookShipping = {
                url: ''
            }
            state.errorsLaravel = [];
            $('#modalEditFacebook').modal('hide')
            toastr.success('Se agrego la url correctamente')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },
    getAllPermissions(state) {
        var url = urlAllPermissions
        axios.get(url).then(response => {
            state.permissions = response.data
        });
    },
    setRoles(state, arr) {
        state.checkedRoles = arr
    },
    setCheckedSelect(state, value) {
        state.checkedSelect2 = [];
        if (value) {
            state.products.forEach(function (product) {
                state.checkedSelect2.push(product.id);
            });
        }

        state.checkedSelect2 = state.checkedSelect2;
    },
    setCheckedSelect2(state, value) {
        state.checkedSelect2 = value;
    },
    setSpecialRole(state, value) {
        if (value === 'no-access') {
            state.checkedPermissions = []
            $('input[name="permission"]').prop('disabled', true)
        } else if (value === 'all-access') {
            state.checkedPermissions = [1, 2, 3, 4, 5, 6, 7, 9, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
            $('input[name="permission"]').prop('disabled', true)
        } else {
            state.checkedPermissions = []
            $('input[name="permission"]').prop('disabled', false)
        }
        state.checkedSpecialRole = value
    },
    setPermissions(state, arr) {
        state.checkedSpecialRole = ''
        state.checkedPermissions = arr
    },
    /****** sección select **** */
    /******************************* */
    allPagos(state) {
        var url = urlAllPago
        axios.get(url).then(response => {
            state.optionsPago = []
            response.data.forEach((pago) => {
                state.optionsPago.push({
                    label: pago.pago,
                    value: pago.id,
                    utilidad: pago.utilidad
                })
            });
        });
    },
    setPagos(state, pago) {
        state.selectedPago = pago
    },

    utilidadDefect(state) {
        var url = urlUtilidadDefect
        axios.get(url).then(response => {
            response.data.forEach((pago) => {
                state.newUtilidad.utilidad = pago.utilidad
            });
        });
    },

    descuentoDefect(state) {
        var url = urlDescuentoDefect
        axios.get(url).then(response => {
            response.data.forEach((descuento) => {
                state.newDescuento.descuento = descuento.descuento
            });
        });
    },

    allUsers(state) {
        var url = urlAllUser
        axios.get(url).then(response => {
            state.optionsUser = []
            response.data.forEach((user) => {
                state.optionsUser.push({
                    label: user.name,
                    value: user.id
                })
            });
        });
    },
    setUser(state, user) {
        state.selectedUser = user
    },
    allClients(state, type) {
        var url = urlAllClient + '?type=' + type
        axios.get(url).then(response => {
            state.optionsClient = []
            response.data.forEach((client) => {
                state.optionsClient.push({
                    label: client.razonSocial,
                    value: client.id
                })
            });
        });
    },
    setClient(state, client) {
        state.selectedClient = client
        state.newQuotationclient.client_text = state.selectedClient.label
    },
    allVehicleBrands(state) {
        var url = urlSelectVehiculoMarcas
        axios.get(url).then(response => {
            state.optionsVehicleBrand = []
            response.data.forEach((vehiclebrand) => {
                state.optionsVehicleBrand.push({
                    label: vehiclebrand.brand,
                    value: vehiclebrand.id
                })
            });
        });
    },
    setVehicleBrand(state, vehiclebrand) {
        state.selectedVehicleBrand = vehiclebrand
    },
    allVehicleModels(state) {
        var url = urlAllVehicleModel + '?brand_id=' + state.selectedVehicleBrand.value
        axios.get(url).then(response => {
            state.optionsVehicleModel = []
            if (response.data != null) {
                response.data.forEach((vehiclemodel) => {
                    state.optionsVehicleModel.push({
                        label: vehiclemodel.model,
                        value: vehiclemodel.id
                    })
                });
            }
        });
    },
    setVehicleModel(state, vehiclemodel) {
        state.selectedVehicleModel = vehiclemodel
    },

    allTiposVehiculos(state) {
        var url = urlSelectVehiculoTipo
        axios.get(url).then(response => {
            state.optionsTiposVehiculo = []
            response.data.forEach((vehiculotipo) => {
                state.optionsTiposVehiculo.push({
                    label: vehiculotipo.tipo_vehiculo,
                    value: vehiculotipo.id
                })
            });
        });
    },

    setVehiculoTipo(state, vehiculotipo) {
        state.selectedVehiculoTipo = vehiculotipo
    },


    allVehicleMotors(state) {
        var url = urlSelectVehiculoMotor
        axios.get(url).then(response => {
            state.optionsMotores = []
            response.data.forEach((vehiclemotor) => {
                state.optionsMotores.push({
                    label: vehiclemotor.v_engine,
                    value: vehiclemotor.id
                })
            });
        });
    },

    setVehicleMotor(state, vehiclemotor) {
        state.selectedVehicleMotor = vehiclemotor
    },

    allVehicleYears(state) {
        var url = urlSelectVehiculoYear
        axios.get(url).then(response => {
            state.optionsYear = []
            response.data.forEach((vehicleyear) => {
                state.optionsYear.push({
                    label: vehicleyear.v_year,
                    value: vehicleyear.id
                })
            });
        });
    },

    setVehicleYear(state, vehicleyear) {
        state.selectedVehicleYear = vehicleyear
    },
    /****************SELECT RELACIONADOS ****************************************/
    allVBR(state) {
        var url = urlVBR
        axios.get(url).then(response => {
            state.optionsVBR = []
            response.data.forEach((vbr) => {
                state.optionsVBR.push({
                    label: vbr.brand,
                    value: vbr.id
                })
            });
        });
    },
    setVBR(state, brand) {
        state.selectedVBR = brand
    },
    allVMR(state) {
        if (state.selectedVBR.label != '') {
            var url = urlVMR + '/' + state.selectedVBR.value
            axios.get(url).then(response => {
                state.optionsVMR = []
                if (response.data != null) {
                    response.data.forEach((vmr) => {
                        state.optionsVMR.push({
                            label: vmr.model,
                            value: vmr.id
                        })
                    });
                }
            }).catch(error => {

            })
        }
    },
    setVMR(state, model) {
        state.selectedVMR = model
    },

    allMM(state) {
        var url = urlMM
        axios.get(url).then(response => {
            state.optionsMM = []
            response.data.forEach((mm) => {
                state.optionsMM.push({
                    label: mm.model,
                    value: mm.id
                })
            });
        });
    },
    setMM(state, model) {
        state.selectedMM = model
    },
    allYM(state) {
        if (state.selectedMM.label != '') {
            var url = urlYM + '/' + state.selectedMM.value
            axios.get(url).then(response => {
                state.optionsYM = []
                if (response.data != null) {
                    response.data.forEach((ym) => {
                        state.optionsYM.push({
                            label: ym.v_year,
                            value: ym.id
                        })
                    });
                }
            }).catch(error => {

            })
        }
    },
    setYM(state, v_year) {
        state.selectedYM = v_year
    },




    /****************formulario de cotizacion ****************************************/

    allCiudad(state) {
        var url = urlCiudad
        axios.get(url).then(response => {
            state.optionsCiudad = []
            response.data.forEach((ciudad) => {
                state.optionsCiudad.push({
                    label: ciudad.nombre,
                    value: ciudad.id
                })
            });
        });
    },
    setCiudad(state, ciudad) {
        state.selectedCiudad = ciudad
    },

    allVBrands(state) {
        var url = urlVBrand
        axios.get(url).then(response => {
            state.optionsVBrand = []
            response.data.forEach((vbrand) => {
                state.optionsVBrand.push({
                    label: vbrand.brand,
                    value: vbrand.id
                })
            });
        });
    },
    setVBrand(state, brand) {
        state.selectedVBrand = brand
    },
    allVModels(state) {
        if (state.selectedVBrand.label != '') {
            var url = urlVModel + '/' + state.selectedVBrand.value
            axios.get(url).then(response => {
                state.optionsVModel = []
                if (response.data != null) {
                    response.data.forEach((vmodel) => {
                        state.optionsVModel.push({
                            label: vmodel.model,
                            value: vmodel.id
                        })
                    });
                }
            }).catch(error => {

            })
        }
    },
    setVModel(state, model) {
        state.selectedVModel = model
    },
    allVYears(state) {
        if (state.selectedVModel.label != '') {
            var url = urlVYear + '/' + state.selectedVModel.value
            axios.get(url).then(response => {
                state.optionsVYear = []
                if (response.data != null) {
                    response.data.forEach((vyear) => {
                        state.optionsVYear.push({
                            label: vyear.year,
                            value: vyear.id
                        })
                    });
                }
            }).catch(error => {

            })
        }
    },
    setVYear(state, year) {
        state.selectedVYear = year
    },
    allVEngines(state) {
        if (state.selectedVYear.label != '') {
            var url = urlVEngine + '/' + state.selectedVYear.value
            axios.get(url).then(response => {
                state.optionsVEngine = []
                if (response.data != null) {
                    response.data.forEach((vengine) => {
                        state.optionsVEngine.push({
                            label: vengine.engine,
                            value: vengine.id
                        })
                    });
                }
            })
        }
    },
    setVEngine(state, engine) {
        state.selectedVEngine = engine
    },
    createQuotationUser(state) {
        var url = urlCreateQuotationUser
        axios.post(url, {
            name: state.formCotizacion.name,
            email: state.formCotizacion.email,
            phone: state.formCotizacion.phone,
            patentchasis: state.formCotizacion.patentchasis.toUpperCase(),
            brand: state.selectedVBrand.label,
            model: state.selectedVModel.label,
            year: state.selectedVYear.label,
            engine: state.selectedVEngine.label,
            description: state.formCotizacion.description
        }).then(response => {
            state.formCotizacion = {
                name: '',
                email: '',
                phone: '',
                patentchasis: '',
                brand: '',
                model: '',
                year: '',
                engine: '',
                description: ''
            },
                state.errorsLaravel = []
            alert('Solicitud ingresada con éxito')
            return true
        }).catch(error => {
            state.errorsLaravel = []
            if (error.response.status === 422) {
                if (error.response.data.errors) {
                    for (let key in error.response.data.errors) {
                        state.errorsLaravel.push({
                            field: key,
                            msg: String(error.response.data.errors[key])
                        })
                    }
                }
            }
            return false
        })

    },

    createQuotationUserExpress(state) {
        var url = urlCreateQuotationUserExpress
        axios.post(url, {
            patentchasis: state.formCotizacionExpress.patentchasis.toUpperCase(),
            brand: state.selectedVBrand.label,
            model: state.selectedVModel.label,
            year: state.selectedVYear.label,
            engine: state.selectedVEngine.label,
            description: state.formCotizacionExpress.description
        }).then(response => {
            state.formCotizacionExpress = {
                patentchasis: '',
                brand: '',
                model: '',
                year: '',
                engine: '',
                description: ''
            },
                state.errorsLaravel = []
            toastr.success('Solicitud ingresada con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },


    createQuotationEnvio(state) {
        var url = urlCreateQuotationShipping
        var cadena = window.location.href
        var id = cadena.split("/")



        axios.post(url, {
            id: id[4],
            nombre: state.formQuotationShipping.nombre,
            rut: state.formQuotationShipping.rut,
            telefono: state.formQuotationShipping.telefono,
            ciudad: state.selectedCiudad.value,
            // direccion: state.formQuotationShipping.direccion,
            sucursal: state.formQuotationShipping.sucursal
        }).then(response => {
            state.formQuotationShipping = {
                id: '',
                nombre: '',
                rut: '',
                telefono: '',
                ciudad: '',
                // direccion: '',
                sucursal: ''
            }
            state.errorsLaravel = []
            window.location.href = 'enviado/' + response.data.numero_envio
        }).catch(error => {
            state.errorsLaravel = []
            if (error.response.status === 422) {
                if (error.response.data.errors) {
                    for (let key in error.response.data.errors) {
                        state.errorsLaravel.push({
                            field: key,
                            msg: String(error.response.data.errors[key])
                        })
                    }
                }
            }
            return false
        })

    },

    getPendingQuotations(state, page) {
        var day = state.searchQuotationClient.day
        var month = state.searchQuotationClient.month
        var year = state.searchQuotationClient.year

        var url = urlPendingQuotations + '?page=' + page + '&id=' + state.searchQuotationClient.id + '&client=' + state.searchQuotationClient.client_text + '&day=' + day + '&month=' + month + '&year=' + year

        axios.get(url).then(response => {
            state.pendingQuotations = response.data.quotations.data
            state.pagination = response.data.pagination
        });
    },
    /******************************************************************************** */


    allProductsSale(state) {
        var url = urlAllProductSale
        axios.get(url).then(response => {
            state.optionsProductSale = []
            response.data.forEach((productsale) => {
                state.optionsProductSale.push({
                    label: productsale.name,
                    value: productsale.id,
                    price: productsale.price,
                    code_id: productsale.code_id,
                    quantity: productsale.quantity,
                    inventory_id: productsale.inventory_id,
                    utilidad: productsale.utilidad
                })
            });
        });
    },
    setProductSale(state, productsale) {
        state.selectedProductSale = productsale
        if (state.selectedProductSale != null) {
            state.productForm.product = state.selectedProductSale.label
            state.productForm.price = state.selectedProductSale.price

            state.productForm.code_id = state.selectedProductSale.code_id
            state.productForm.inventory_id = state.selectedProductSale.inventory_id

            state.productForm.utility = state.selectedProductSale.utilidad


            var total = Math.round(parseFloat(state.productForm.price) * parseFloat(state.productForm.quantity))

            var total_utilidad = Math.round(total * parseFloat(state.productForm.utility / 100))

            state.productForm.value = Math.round(total + total_utilidad)

            state.productForm.total = Math.round(state.productForm.value * 1.19)

        } else {
            state.productForm.product = ''
            state.productForm.price = 0
            state.productForm.total = 0
        }
    },

    sumTotalProductSale(state) {
        var total = Math.round(parseFloat(state.productForm.price) * parseFloat(state.productForm.quantity))

        var total_utilidad = Math.round(total * parseFloat(state.productForm.utility / 100))

        state.productForm.value = Math.round(total + total_utilidad)

        state.productForm.total = Math.round(state.productForm.value * 1.19)
    },

    allProducts(state) {
        var url = urlAllProduct
        axios.get(url).then(response => {
            state.optionsProduct = []
            response.data.forEach((product) => {
                state.optionsProduct.push({
                    label: product.name,
                    value: product.id,
                    price: product.price,
                    utilidad: product.utilidad,
                    codigo: product.detail
                })
            });
        });
    },
    setProduct(state, product) {
        state.selectedProduct = product
        if (state.selectedProduct != null) {
            state.newDetailclient.product = state.selectedProduct.label
            state.productForm.product = state.selectedProduct.label
            state.newDetailclient.price = state.selectedProduct.price
            state.newDetailclient.detail = state.selectedProduct.codigo

            state.newDetailclient.percentage = state.selectedProduct.utilidad

            state.newDetailclient.utility = Math.round(parseFloat((parseFloat(state.newDetailclient.price) *
                ((parseFloat(state.newDetailclient.percentage) / 100) + 1) +
                parseFloat(state.newDetailclient.aditional) -
                parseFloat(state.newDetailclient.price)) *
                parseFloat(state.newDetailclient.quantity)))

            state.newDetailclient.total = Math.round(parseFloat(((
                parseFloat(state.newDetailclient.price) *
                ((parseFloat(state.newDetailclient.percentage) / 100) + 1)) +
                parseFloat(state.newDetailclient.aditional) +
                parseFloat(state.newDetailclient.transport)) *
                parseFloat(state.newDetailclient.quantity)))

        } else {
            state.newDetailclient.product = ''
            state.productForm.product = ''
            state.newDetailclient.price = 0
            state.newDetailclient.utility = 0
            state.newDetailclient.total = 0
        }
    },
    allProductimports(state) {
        var url = urlAllProductimport
        axios.get(url).then(response => {
            state.optionsProductimport = []
            response.data.forEach((product) => {
                state.optionsProductimport.push({
                    label: product.name + ' - ' + product.detail,
                    value: product.id,
                    name: product.name,
                    detail: product.detail
                })
            })
        });
    },
    setProductimport(state, productimport) {
        state.selectedProductimport = productimport
        if (state.selectedProductimport != null) {
            state.newDetailimport.product = state.selectedProductimport.name
            state.newDetailimport.detail = state.selectedProductimport.detail
        } else {
            state.newDetailimport.product = ''
            state.newDetailimport.detail = ''
        }
    },
    /*allProductsImport(state){
        var url = urlAllProduct
        axios.get(url).then(response => {
            state.optionsProduct = []
            response.data.forEach((product) => {
                state.optionsProduct.push( { label: product.name, value: product.detail } )
            });
        });
    },
    setProductImport(state, product) {
        state.selectedProductImport = product
        if(state.selectedProductImport != null)
        {
            state.newDetailimport.product = state.selectedProductImport.label
            state.newDetailimport.detail = state.selectedProductImport.value
        }
        else{
            state.newDetailimport.product = ''
            state.newDetailimport.detail = ''
        }
    },*/


    /****** sección paginacion **** */
    /******************************* */
    paginate(state, page) {
        state.pagination.current_page = page
    },
    searchSii(state) {
        var rutSii = state.newClient.rut
        rutSii = rutSii.split('.').join('')
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dev-api.haulmer.com/v2/dte/taxpayer/" + rutSii,
            "method": "GET",
            "headers": {
                "apikey": "928e15a2d14d4a6292345f04960f4bd3"
            }
        }

        $.ajax(settings).done(function (response) {
            state.newClient.razonSocial = response.razonSocial
            state.newClient.email = response.email
            state.newClient.phone = response.telefono
            state.newClient.address = response.direccion
            state.newClient.comuna = response.comuna
            state.newClient.giro = response.actividades[0].giro
            state.newClient.activity = response.actividades
            //result.actividades.forEach(actividad => {
            //console.log(response)
        });
    },
    sumTotalProductMechanic(state) {
        state.newDetailclient.total = state.newDetailclient.price
    },
    sumTotalEditProductMechanic(state) {
        state.fillDetailclient.total = state.fillDetailclient.price
        state.fillDetailclient.totalIVA = Math.round(state.fillDetailclient.total * 1.19)
    },
    sumTotalProduct(state) {
        state.newDetailclient.utility = Math.round(parseFloat((parseFloat(state.newDetailclient.price) *
            ((parseFloat(state.newDetailclient.percentage) / 100) + 1) +
            parseFloat(state.newDetailclient.aditional) -
            parseFloat(state.newDetailclient.price)) *
            parseFloat(state.newDetailclient.quantity)))

        state.newDetailclient.total = Math.round(parseFloat(((
            parseFloat(state.newDetailclient.price) *
            ((parseFloat(state.newDetailclient.percentage) / 100) + 1)) +
            parseFloat(state.newDetailclient.aditional) +
            parseFloat(state.newDetailclient.transport)) *
            parseFloat(state.newDetailclient.quantity)))
    },
    sumTotalEditProduct(state) {
        state.fillDetailclient.utility = Math.round(parseFloat((parseFloat(state.fillDetailclient.price) *
            ((parseFloat(state.fillDetailclient.percentage) / 100) + 1) +
            parseFloat(state.fillDetailclient.aditional) -
            parseFloat(state.fillDetailclient.price)) *
            parseFloat(state.fillDetailclient.quantity)))

        state.fillDetailclient.total = Math.round(parseFloat(((
            parseFloat(state.fillDetailclient.price) *
            ((parseFloat(state.fillDetailclient.percentage) / 100) + 1)) +
            parseFloat(state.fillDetailclient.aditional) +
            parseFloat(state.fillDetailclient.transport)) *
            parseFloat(state.fillDetailclient.quantity)))
        state.fillDetailclient.totalIVA = Math.round(state.fillDetailclient.total * 1.19)
    },
    distributionImport(state) {
        state.detailimports.forEach(detailImport => {

            var embarque = parseFloat(state.detailImport.embarque)
            var seguro = parseFloat(detailImport.seguro) + 1
            var usa = parseFloat(detailImport.usa) + 1
            var fee = parseFloat(state.detailImport.fee)
            var fleteUsa = parseFloat(state.detailImport.fleteUsa)
            var bankusa = parseFloat(state.detailImport.bankusa)
            var bankchile = parseFloat(state.detailImport.bankchile)
            var transferencia = parseFloat(state.detailImport.transferencia)
            var otro = parseFloat(state.detailImport.otro)
            var utilidad = "" + detailImport.valueChile

            var percentage = parseFloat((parseFloat(detailImport.price) * parseInt(detailImport.quantity) * 100) / state.totalPriceImport)

            detailImport.percentage = percentage

            detailImport.embarque = parseFloat(percentage / 100 * embarque) * parseFloat(state.detailImport.dolar)

            detailImport.seguro = parseFloat(percentage / 100 * seguro) * parseFloat(state.detailImport.dolar)

            detailImport.fee = parseFloat(percentage / 100 * fee) * parseFloat(state.detailImport.dolar)

            detailImport.fleteUsa = parseFloat(percentage / 100 * fleteUsa) * parseFloat(state.detailImport.dolar)

            detailImport.bankusa = parseFloat(percentage / 100 * bankusa) * parseFloat(state.detailImport.dolar)

            detailImport.bankchile = parseFloat(percentage / 100 * bankchile) * parseFloat(state.detailImport.dolar)

            detailImport.transferencia = parseInt(percentage / 100 * transferencia) * parseFloat(state.detailImport.dolar)

            detailImport.otro = parseInt(percentage / 100 * otro) * parseFloat(state.detailImport.dolar)


            detailImport.aduana1 = parseFloat(percentage / 100 * state.detailImportNacional.aduana1)
            detailImport.aduana2 = parseFloat(percentage / 100 * state.detailImportNacional.aduana2)
            detailImport.manipuleo = parseFloat(percentage / 100 * state.detailImportNacional.manipuleo)
            detailImport.bodega = parseFloat(percentage / 100 * state.detailImportNacional.bodega)
            detailImport.guia = parseFloat(percentage / 100 * state.detailImportNacional.guia)
            detailImport.retiro = parseFloat(percentage / 100 * state.detailImportNacional.retiro)
            detailImport.fleteChile = parseFloat(percentage / 100 * state.detailImportNacional.fleteChile)

            detailImport.price_dolar = parseFloat(detailImport.price) * parseFloat(state.detailImport.dolar)

            if (detailImport.valorem == 1) {

                detailImport.total = parseFloat(parseFloat(detailImport.price_dolar) *
                    parseFloat(seguro) *
                    parseFloat(usa) *
                    parseFloat(detailImport.quantity)
                ) +
                    parseFloat(detailImport.embarque) +
                    //parseFloat( detailImport.seguro ) +
                    parseFloat(detailImport.fee) +
                    parseFloat(detailImport.fleteUsa) +
                    parseFloat(detailImport.bankusa) +
                    parseFloat(detailImport.bankchile) +
                    parseFloat(detailImport.transferencia) +
                    parseFloat(detailImport.otro)

                var advalorem = parseFloat(detailImport.total * 0.06)

                detailImport.total = detailImport.total + advalorem

            }

            if (detailImport.valorem == 0) {

                detailImport.total = parseFloat(parseFloat(detailImport.price_dolar) *
                    parseFloat(seguro) *
                    parseFloat(usa) *
                    parseFloat(detailImport.quantity)
                ) +
                    parseFloat(detailImport.embarque) +
                    parseFloat(detailImport.fee) +
                    parseFloat(detailImport.fleteUsa) +
                    parseFloat(detailImport.bankusa) +
                    parseFloat(detailImport.bankchile) +
                    parseFloat(detailImport.transferencia) +
                    parseFloat(detailImport.otro)
            }

            var totalInternacional =
                parseFloat(detailImport.embarque) +
                parseFloat(detailImport.fee) +
                parseFloat(detailImport.fleteUsa) +
                parseFloat(detailImport.bankusa) +
                parseFloat(detailImport.bankchile) +
                parseFloat(detailImport.transferencia) +
                parseFloat(detailImport.otro)

            var totalNacional =
                parseFloat(state.detailImportNacional.aduana1) +
                parseFloat(state.detailImportNacional.aduana2) +
                parseFloat(state.detailImportNacional.manipuleo) +
                parseFloat(state.detailImportNacional.bodega) +
                parseFloat(state.detailImportNacional.guia) +
                parseFloat(state.detailImportNacional.retiro) +
                parseFloat(state.detailImportNacional.fleteChile)


            detailImport.internacional = totalInternacional
            detailImport.nacional = parseFloat(percentage / 100 * totalNacional)

            detailImport.costTotal = parseFloat(detailImport.internacional) + parseFloat(detailImport.nacional)

            detailImport.total = parseFloat(detailImport.total) + parseFloat(detailImport.nacional)

            detailImport.utility = parseFloat(utilidad) - parseFloat(detailImport.total / detailImport.quantity)

            detailImport.unitario =
                // parseFloat(detailImport.price_dolar * (usa) * (seguro) )
                //                                    + parseFloat( detailImport.costTotal / detailImport.quantity)
                parseFloat(detailImport.total / detailImport.quantity)

        })
    },
    sumUtility(state) {
        state.detailimports.forEach(detailImport => {
            detailImport.utility = parseFloat(detailImport.valueChile) -
                parseFloat(detailImport.total / detailImport.quantity)
        })
    },
    sumTotalImport(state) { },

    addToCart(state) {
        if (state.productForm.quantity > state.selectedProductSale.quantity) {
            toastr.error('¡Error, Supera la cantidad disponibles!')
        } else {
            state.cart.push({
                product: {
                    label: state.selectedProductSale.label,
                    value: state.selectedProductSale.value,
                    price: state.selectedProductSale.price,
                    code_id: state.selectedProductSale.code_id,
                    inventory_id: state.selectedProductSale.inventory_id
                },
                // code: {
                //     label: state.selectedCode.label,
                //     value: state.selectedCode.value
                // },
                // price: {
                //     label: state.selectedPrice.label,
                //     value: state.selectedPrice.value
                // },
                utility: state.productForm.utility,
                quantity: state.productForm.quantity,
                value: state.productForm.value,
                total: state.productForm.total
            })
            state.cartValue += state.productForm.value
            state.cartTotal += state.productForm.total

            state.aplicardescuento = 0

            state.productForm = {
                product_id: 0,
                code_id: 0,
                inventory_id: 0,
                price: 0,
                utility: 35,
                quantity: 1,
                value: 0,
                total: 0,
                code: '',
                product: '',
                max_quantity: 99
            }
        }
    },


    agregarFormaPago(state) {
        state.formapago = state.selectedPago.label
        $('#formaPago').modal('hide')
    },

    aplicarDescuento(state) {
        state.aplicardescuento = state.newDescuento.descuento
    },

    allCodes(state) {
        if (state.selectedProduct.label != '') {
            axios.get('product-codes/' + state.selectedProduct.value)
                .then(response => {
                    state.optionsCode = []
                    response.data.forEach((code) => {
                        state.optionsCode.push({
                            label: code.codebar,
                            value: code.id
                        })
                    })
                }).catch(error => {
                    //console.log(error)
                })
        }
    },

    setCode(state, code) {
        state.selectedCode = code
    },

    allPrices(state) {
        if (state.selectedCode.label != '') {
            axios.get('code-inventories/' + state.selectedCode.value).then(response => {
                state.optionsPrice = []
                response.data.forEach((price) => {
                    state.optionsPrice.push({
                        label: price.price,
                        value: price.id
                    })
                })
            })
        }
    },

    setPrice(state, price) {
        state.selectedPrice = price
    },

    updateUtility(state, data) {
        state.productForm.utility = data.target.value
    },

    updateQuantity(state, data) {
        state.productForm.quantity = data.target.value
    },

    updateTotal(state) {
        state.productForm.value = Math.round(parseFloat(state.selectedPrice.label) *
            parseFloat((state.productForm.utility / 100) + 1) *
            parseFloat(state.productForm.quantity))
        state.productForm.total = Math.round(state.productForm.value * 1.19)
    },

    newSale(state) {
        if (state.formapago == '') {
            toastr.error('¡Error, Selecione la forma de pago!')
        } else {
            let saleDetails = {
                //client_id: 5, //particular
                total: state.cartTotal,
                formapago: state.formapago,
                descuento: state.aplicardescuento
            }

            let sale = {
                sale: saleDetails,
                products: state.cart
            }

            if (state.cartValue > 0) {
                axios.post('sale', sale)
                    .then(response => {
                        state.cart = []
                        state.cartTotal = 0
                        state.cartValue = 0
                        toastr.success('Venta generada con exito!')
                        $('#create').modal('hide')
                    })
                    .catch(error => {
                        toastr.error(error.response.data)
                    })
            }
        }
    },

    allSalesCalendar(state, page) {
        axios.get('all-sales?page=' + page + '&calendar=' + state.calendar.search)
            .then(response => {
                state.sales = response.data.sales.data
                state.pagination = response.data.pagination
                // //esto se debe arreglar
                // //encontrar una forma de guardar los nombres de los productos en el query de ventas
                // state.sales.forEach(sale => {
                //     sale.products.forEach(product => {
                //         axios.get('product-search/' + product.code_id)
                //             .then(response => {
                //                 product.code_id = response.data.name
                //             })
                //     })
                // })
            })
            .catch(error => {
                //console.log(error.response.data)
            })
    },

    cierreCajaZ(state) {
        if (state.calendar.search) {
            var url = urlCierreCajaZ + '/' + state.calendar.search
            window.location.href = url;
        }
    },


    allSales(state, page) {
        state.calendar.search = ''
        axios.get('all-sales?page=' + page + '&calendar=')
            .then(response => {
                state.sales = response.data.sales.data
                state.pagination = response.data.pagination
                //esto se debe arreglar
                //encontrar una forma de guardar los nombres de los productos en el query de ventas
                state.sales.forEach(sale => {
                    sale.products.forEach(product => {
                        axios.get('product-search/' + product.code_id)
                            .then(response => {
                                product.code_id = response.data.name
                            })
                    })
                })
            })
            .catch(error => {
                //console.log(error.response.data)
            })

    },

    generarRecibo(state, id) {
        var url = urlGenerarReciboSales + '/' + id
        window.location.href = url;
    },

    eliminarVenta(state, id) {
        var url = urlAnularSale + '/' + id
        axios.delete(url).then(response => {
            toastr.success('La Venta fue anulada con éxito')
        })
    },


    // allSales(state) {
    //     var url = 'all-sales'
    //     axios.get(url).then(response => {
    //         state.sales = response.data
    //     });
    // },

    searchCode(state) {
        if (state.productForm.code !== '') {
            axios.get('code-search/' + state.productForm.code)
                .then(response => {
                    state.productForm.product_id = response.data.product_id
                    state.productForm.code_id = response.data.id
                    state.productForm.inventory_id = response.data.inventories[0].id
                    state.productForm.price = response.data.inventories[0].price
                    state.productForm.product = response.data.product.name
                    state.productForm.max_quantity = response.data.inventories[0].quantity
                    state.productForm.value = Math.round(parseFloat(state.productForm.price) *
                        parseFloat((state.productForm.utility / 100) + 1) *
                        parseFloat(state.productForm.quantity))
                    state.productForm.total = Math.round(state.productForm.value * 1.19)
                })
                .catch(error => {
                    //console.log(error)
                })
        }
    },

    updateCodeFields(state) {

        if (state.selectedCode.label !== '' || state.productForm.code !== '') {
            state.productForm.value = Math.round(parseFloat(state.productForm.price) *
                parseFloat((state.productForm.utility / 100) + 1) *
                parseFloat(state.productForm.quantity))
            state.productForm.total = Math.round(state.productForm.value * 1.19)
        }


    },

    removeFromCart(state, data) {
        let product = state.cart.find(p => p.product.label == data.id)

        state.cartValue = state.cartValue - product.value
        state.cartTotal = state.cartTotal - product.total

        state.cart.splice(state.cart.indexOf(data.id))
    },

    removeDescuento(state) {
        state.aplicardescuento = 0
    },

    getMechanicClients(state) {
        axios.get('mechanic-clients')
            .then((response) => {
                state.users = response.data
                state.optionsMechanicClient = []
                response.data.forEach((user) => {
                    state.optionsMechanicClient.push({
                        label: user.name,
                        value: user.id
                    })
                });
            })
    },

    getTotalVehi(state) {
        var url = urlTotalVehi + '/' + state.fillCantVehicle.id
        //var url = urlTotalVehi
        axios.get(url).then(response => {
            state.totalvehi = response.data
        });
    },

    getSumaVehi(state) {
        var url = urlSumaVehi
        axios.get(url).then(response => {
            state.sumavehi = response.data
        });
    },

    getTotalCli(state, user) {
        var url = urlTotalCli
        axios.get(url).then(response => {
            state.totalcli = response.data
        });
    },

    getTotalCliAdmin(state, user) {
        var url = urlTotalCliAdmin + '/' + user.id
        axios.get(url).then(response => {
            state.totalcliadmin = response.data
        });
    },

    getTotalVehiAdmin(state, user) {
        var url = urlTotalVehiAdmin + '/' + user.id
        axios.get(url).then(response => {
            state.totalvehiadmin = response.data
        });
    },

    createMechanicClient(state) {

        axios.post('mechanic-client/' + state.idforms, {
            // axios.post('mechanic-client',{
            name: state.newUser.name,
            email: state.newUser.email,
            password: state.newUser.password,
        }).then(response => {
            state.newUser = {
                id: '',
                name: '',
                email: '',
                password: ''
            }
            state.errorsLaravel = []
            $('#modalCreateUserMechanic').modal('hide')
            toastr.success('Usuario generado con éxito')
        }).catch(error => {
            state.errorsLaravel = error.response.data
        })
    },

    createMechanicClient2(state) {

        axios.post('mechanic-client2', {
            name: state.newUser.name,
            email: state.newUser.email,
            password: state.newUser.password,
            //cant_vehicle: state.newUser.cant_vehicle
        }).then(response => {
            state.newUser = {
                id: '',
                name: '',
                email: '',
                password: ''
                //cant_vehicle: ''
            }
            state.errorsLaravel = []
            toastr.success('Usuario generado con éxito')
        }).catch(error => {
            toastr.error(error.response.data)
        })
    },

    getClientVehicles(state) {
        axios.get('client-vehicles')
            .then((response) => {
                state.vehicles = response.data
            })
    },

    setMechanicClient(state, client) {
        state.selectedMechanicClient = client
    },

    createVehicleMechanicClient(state) {
        var id_user = null
        if (state.selectedMechanicClient != null) {
            id_user = state.selectedMechanicClient.value

            // if (!state.selectedVYear.label) {
            //     state.selectedVYear.label = '1'
            //     state.selectedVEngine.label = 'INDEFINIDO'
            // }
            axios.post('vehicles-mechanic', {
                user_id: id_user,
                patent: state.newVehicle.patent,
                chasis: state.newVehicle.chasis,
                brand: state.selectedVBrand.label,
                model: state.selectedVModel.label,
                year: state.selectedVYear.label,
                engine: state.selectedVEngine.label,
                color: state.newVehicle.color,
                km: state.newVehicle.km,
            }).then(response => {
                state.newVehicle.patent = ''
                state.newVehicle.chasis = ''
                state.newVehicle.color = ''
                state.newVehicle.km = ''
                state.errorsLaravel = []
                $('#create').modal('hide')
                toastr.success('Vehículo generado con éxito')
            }).catch(error => {
                toastr.error(error.response.data)
            })
        }
    },

    getQuotationUsers(state) {
        var url = urlQuotationusers + '/' + state.idUser
        axios.get(url).then(response => {
            state.quotationusers = response.data
        });
    },

    getQuotationUsersMechanic(state) {
        var url = 'quotationUserMechanic/' + state.idforms
        axios.get(url).then(response => {
            state.quotationUserMechanic = response.data
        });
    },

    modalCreateUserFromQuotation(state, id) {
        state.idUser = id
        $('#modalCreateUser').modal('show')
    },



    //AQUI COMENZAR EL EVENTO:

    juntarDatos(state) {
        var prueba
        var contador = 1
        var sumaTotal
        var sumaTotalBoleta = 0
        var lineaCompleta = ''

        if (state.arrayBoleta.length != 0) {
            state.arrayBoleta.map(function (bar) {
                if (contador == state.arrayBoleta.length) {
                    sumaTotal = 1 * bar.precio
                    contador = contador + 1
                    sumaTotalBoleta = sumaTotalBoleta + sumaTotal
                    sumaTotal = 0
                } else {
                    sumaTotal = 1 * bar.precio
                    contador = contador + 1
                    sumaTotalBoleta = sumaTotalBoleta + sumaTotal
                    sumaTotal = 0
                }
                lineaCompleta = lineaCompleta + prueba
            })

            axios.post('/Invoice/Generator', {
                resultado: state.resultado,
                sumaTotalBoleta: sumaTotalBoleta,
                lineaCompleta: lineaCompleta,
                abrirPDF: state.abrirPDF,
                fecha: state.data1.fecha,
                giroEmisor: state.data1.giroEmisor,
                dirOrigen: state.data1.dirOrigen,
                rutReceptor: state.data1.rutReceptor,
                producto: state.data1.producto,
                cantidad: state.data1.cantidad,
                precio: state.data1.precio
            }).then((response) => {
                state.resultado = response.data
                state.arrayBoleta = []
                printJS({
                    printable: 'invoice/' + response.data,
                    type: 'pdf'
                });
            })
            state.enlace = "Archivo Generado"

        } else {
            state.resultado = "Falta agregar producto"
        }
    },

    crearArreglo(state) {
        var sumaTotal = 0
        var sumaTotalBoleta = 0
        if (state.data2.precio >= 180) {
            state.arrayBoleta.push({
                precio: state.data2.precio,
                total: sumaTotalBoleta == 0 ? state.data2.precio : sumaTotalBoleta
            })
            state.arrayBoleta.map(function (bar) {
                sumaTotal = 1 * bar.precio
                sumaTotalBoleta = sumaTotalBoleta + sumaTotal
                sumaTotal = 0
            })
            sumaTotalBoleta: state.sumaTotalBoleta
            state.data2.precio = ''
        }
    },
}
