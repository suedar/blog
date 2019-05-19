import {
    CHANGE_FOOTER_HEIGHT,
    CHANGE_FOOTER_TO_TOP,
    CHANGE_S_MENU,
    CHANGE_S_RECOMMAND,
    CHANGE_ID,
    CHANGE_ARTICLE_LIST,
    CHANGE_LOGIN_STATUS,
    CHANGE_EDIT_ARTICLE
} from './mutation-types';

export default {
    [CHANGE_FOOTER_HEIGHT](state, footerHeight) {
        state.footer.height = footerHeight;
    },
    [CHANGE_FOOTER_TO_TOP](state, footerToTop) {
        state.footer.toTop = footerToTop;
    },
    [CHANGE_S_MENU](state, sMenu) {
        state.sMenu = sMenu;
    },
    [CHANGE_S_RECOMMAND](state, sRecommand) {
        state.sRecommand = sRecommand;
    },
    [CHANGE_ID](state, id) {
        state.id = id;
    },
    [CHANGE_ARTICLE_LIST](state, articleList) {
        state.articleList = articleList;
    },
    [CHANGE_LOGIN_STATUS](state, isLogin) {
        state.isLogin = isLogin;
    },
    [CHANGE_EDIT_ARTICLE](state, editArticle) {
        state.editArticle = editArticle;
    }
}