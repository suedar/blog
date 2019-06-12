import { mapActions, mapState, mapMutations } from 'vuex';

import { getStore } from './storage';

export default {
    computed: {
        ...mapState(['articleList'])
    },
    methods: {
        ...mapActions([
            'queryArticleList'
        ]),
        ...mapMutations(['CHANGE_ARTICLE_LIST']),
        initArticleList() {
            let articleList = this.articleList;
            if (articleList.length > 0) {
                return;
            }

            // articleList = getStore('articleList'); // 这里不能走缓存
            // console.log(articleList)
            if (!articleList || articleList.length === 0) {
                this.queryArticleList();
            }
        }
    },
}