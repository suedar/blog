<template>
    <div class="read-container" v-html="article">

    </div>
</template>

<script>

import { mapState } from 'vuex';

import { getArticleDetail } from '@/api/';

export default {
    name: 'read',
    data() {
        return {
            article: ''
        }
    },
    created() {
        this.queryArticle();
    },
    computed: {
        ...mapState([
            'id'
        ])
    },
    methods: {
        async queryArticle() {
            this.article = await getArticleDetail(this.id);
        }
    }
}
</script>

<style lang="scss">
    .read-container {
        height: 100vh;
    }
</style>
