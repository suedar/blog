import { getBrief } from '@/api/';
import { setStore } from '@/common/js/storage';

import { CHANGE_ARTICLE_LIST } from './mutation-types';

export default {
    async queryArticleList({ commit }) {
        const { data: articleList, page } = await getBrief({ pageNum: 1, pageSize: 999 });
        setStore('articleList', articleList);
        commit(CHANGE_ARTICLE_LIST, articleList);
    }
}