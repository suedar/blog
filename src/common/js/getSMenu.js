
/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-06 20:09:24
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-07 12:40:27
 */

import { mapState, mapMutations } from "vuex";

import { getAllMenu } from '@/api/';

export default {
    computed: {
        ...mapState([
            'sMenu'
        ])
    },
    methods: {
        ...mapMutations([
            'CHANGE_S_MENU'
        ]),
        async getSMenu() {
            if (this.sMenu.length === 0) {
                const sMenu = await getAllMenu();
                this.CHANGE_S_MENU(sMenu);
            }
            return this.sMenu;
        }
    }
}