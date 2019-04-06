import {
    CHANGE_FOOTER_HEIGHT,
    CHANGE_FOOTER_TO_TOP,
    CHANGE_S_MENU
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
    }
}