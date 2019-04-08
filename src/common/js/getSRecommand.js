/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-07 12:39:48
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-07 13:05:36
 */

import { mapState, mapMutations } from "vuex";

import { getRecommand } from '@/api/';

export default {
    computed: {
        ...mapState([
            'sRecommand'
        ])
    },
    methods: {
        ...mapMutations([
            'CHANGE_S_RECOMMAND'
        ]),
        async getSRecommand() {
            if (this.sRecommand.length === 0) {
                const sRecommand = await getRecommand();
                this.CHANGE_S_RECOMMAND(sRecommand);
            }
            return this.sRecommand;
        }
    }
}