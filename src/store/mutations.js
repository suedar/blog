import {
    CHANGE_FOOTER_HEIGHT,
    CHANGE_FOOTER_TO_TOP
} from './mutation-types';

export default {
    [CHANGE_FOOTER_HEIGHT](state, footerHeight) {
        state.footer.height = footerHeight;
    },
    [CHANGE_FOOTER_TO_TOP](state, footerToTop) {
        state.footer.toTop = footerToTop;
    }
}