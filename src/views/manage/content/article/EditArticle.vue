<template>
    <div class="edit-article">
        <new-article ref="article"></new-article>
    </div>
</template>

<script>
import NewArticle from './NewArticle';
import { mapState } from 'vuex';
export default {
    components: {
        NewArticle
    },
    computed: {
        ...mapState(['editArticle']),
    },
    mounted() {
        const data = this.editArticle;
        this.$refs.article.data = data;
    }
}
</script>

<style lang="scss" scoped>

</style>
