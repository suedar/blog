<template>
    <div class="edit-article">
        <new-article ref="article"></new-article>
    </div>
</template>

<script>
import NewArticle from './NewArticle';

import { getArticleDetail } from "@/api/";

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
        this.queryArticle(data.id);
    },
    methods: {
        async queryArticle(id = this.$route.params.id) {
            const article = await getArticleDetail({id});
            this.$refs.article.data = article;
            this.$refs.article.initMdContent(article.chapterContent);
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
