<template>
    <div class="read-container" v-html="article">
        {{ article}}

    <!-- ## 3.19
    ### <del>标题右端浮动问题</del>

    > [你需要知道的浮动二三事](https://suedar.github.io/2019/03/20/%E4%BD%A0%E9%9C%80%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E6%B5%AE%E5%8A%A8%E4%BA%8C%E4%B8%89%E4%BA%8B/)

    {% raw %}
    <p class="codepen" data-height="265" data-theme-id="0" data-default-tab="css,result" data-user="suedar" data-slug-hash="VRBXwd" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="2019-03-01">
        <span>See the Pen <a href="https://codepen.io/suedar/pen/VRBXwd/">
        2019-03-01</a> by cookie (<a href="https://codepen.io/suedar">@suedar</a>)
        on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
    {% endraw %}

    右端浮动占位 使用width失效 设置上高度即可

    ### flex布局

    宽度不定 无法使用网格布局


    ![](https://randomm.cdn.bcebos.com/display.png)


    用margin-right？ -->

    </div>
</template>

<script>

import { mapState } from 'vuex';
import marked from 'marked';

import { getArticleDetail } from '@/api/';


export default {
    name: 'read',
    data() {
        return {
            article: '',
            // marked: false
        }
    },
    created() {
        this.queryArticle();
    },
    computed: {
        ...mapState([
            'id'
        ]),
        // previewText() {
        //     marked.setOptions({
        //         renderer: new marked.Renderer(),
        //         gfm: true,
        //         tables: true,
        //         breaks: true,
        //         pedantic: false,
        //         sanitize: true,
        //         smartLists: true,
        //         smartypants: false
        //     });
        //     return marked(this.md_text)
        // }
    },
    methods: {
        async queryArticle() {
            const article = await getArticleDetail(this.id);
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false
            });
            this.article = marked(article);
            // console.log(article);
            // console.log(JSON.stringify(article))
            // const strArticle = JSON.stringify(article).slice(1, -1);
            // const replaceBr = strArticle.replace(/\\n/gi, '\\n');
            // console.log(replaceBr)
            // this.article = replaceBr;
            // this.$nextTick(() => {
            //     this.marked = true;
            // })
            // this.article = JSON.parse(article);
        }
    }
}
</script>

<style lang="scss">
    .read-container {
        height: 100vh;
        img {
            width: initial;
            height: initial;
        }
    }
</style>
