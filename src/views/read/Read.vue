<template>
    <div class="read">
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    data() {
        return {
        }
    },
    created() {
        console.log(this.id);
    },
    computed: {
        ...mapState([
            'id'
        ])
    }
}
</script>

<style>

</style>
