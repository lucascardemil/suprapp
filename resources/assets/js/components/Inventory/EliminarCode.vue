<template>

    <form action="POST" v-on:submit.prevent="deleteCode">
        <div id="deleteCode" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Eliminar Código</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <h4>¿Estás seguro de eliminarlo?</h4>

                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-danger">
                            <i class="fas fa-trash-alt"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed:{
        ...mapState([]),
        ...mapGetters([])
    },
    methods:{
        ...mapActions(['deleteCode'])
    },
}
</script>
