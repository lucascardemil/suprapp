<template>
    <div>
        <form action="POST" v-on:submit.prevent="updateFleteDefect">
            <div class="form-row">
                <div class="form-group col-lg-6">
                    <label for="flete">Flete</label>
                    <input required type="number" name="flete" class="form-control" v-model="newFlete.flete">
                </div>
            </div>

            <button type="submit" class="btn btn-success">
                <i class="fas fa-plus-square"></i> Guardar
            </button>

        </form>
    </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState(['newFlete'])
    },
    methods: {
        ...mapActions(['updateFleteDefect'])
    },
    created(){
        this.$store.dispatch('fleteDefect')
    }
}
</script>