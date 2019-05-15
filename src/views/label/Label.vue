<template>
    <Model fixedColor="#91ae8c" :hasRight="true" class="label-content">
        <template v-slot:content>
            <div class="content">
                <div class="text">
                    <span class="dot">●</span>
                    你正在注视的是标签页哦
                </div>
                <div class="label-item" v-for="item in labelSort" :key="item.id">
                    <div class="tag">
                        <span :id="item" class="dot">●</span>
                        {{item}}
                    </div>
                    <div class="tag-item"
                        v-for="labelItem in label[item]" :key="labelItem.id"
                        >
                        <span class="dot">●</span>
                        <span class="date">
                            {{labelItem.date}}
                        </span>
                        <span class="title">
                            {{labelItem.title}}
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:sum-header>
            标签分类
        </template>
        <template v-slot:sum-content>
            <a v-for="item, index in labelSort" :key="item.id" :href="'#' + item">
                {{emoji[index]}} {{item}} {{emoji[index]}}
            </a>
        </template>
    </Model>
</template>

<script>
import * as EMOJI from 'node-emoji';

import {getAllMenu} from '@/api/'
import getSMenu from '@/common/js/getSMenu';

import Model from '../model/Model.vue';

export default {
    data() {
        return {
            label: {},
            labelSort: [],
            emoji: []
        }
    },
    components: {
        Model
    },
    mixins: [getSMenu],
    created() {
        this.initConfig();
    },
    methods: {
        async initConfig() {
            const label = await this.getSMenu();
            this.handleArr(label);
            this.initEmoji();
        },
        handleArr(label) {
            const labelArr = label.map(item => item.label);
            const labelSort = (Array.from([...new Set(labelArr.flat(Infinity))])).sort((a, b) => a.localeCompare(b));
            // const year = (Array.from([...new Set(arr.map(item => item.year))])).sort((a,b) => b - a);
            const obj = {};
            labelSort.forEach(item => {
                obj[item] = label.filter(arrItem => (arrItem.label.findIndex(a => a === item)) !== -1)
            })
            // console.log(obj)
            this.labelSort = labelSort;
            this.label = obj;
        },
        initEmoji() {
            const labelSort = this.labelSort;
            const emoji = labelSort.map(() => EMOJI.random().emoji);
            this.emoji = emoji;
        },
    }
}
</script>

<style lang="scss" scoped>
.label-content {
    .content {
        margin-top: 3vh;
        margin-bottom: 5vh;
        .text, .tag, .tag-item {
            height: 50px;
            line-height: 50px;
            padding-left: 3rem;
            border-left: 3px solid $greyWhite;
            position: relative;
        }
        .text {
            .dot {
                font-size: 29px;
            }
        }
        .tag {
            height: 80px;
            line-height: 70px;
            font-size: 24px;
            font-weight: 400;
            color: $anotherGrey;
            position: sticky;
            top: 10px;
            background-color: white;
            z-index: 2;
        }
        .tag-item {
            border-bottom: 1px dashed $grey;
            .date {
                font-size: 13px;
            }
            .date, .title {
                cursor: pointer;
            }
            &:hover {
                border-bottom-color: black;
                .dot {
                    color: $anotherGrey;
                }
            }
        }
        .dot {
            color: $grey;
            font-size: 16px;
            text-align: center;
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translate(-58%, -56%);
        }
    }
    .sum-header {
        font-family: 'Kaushan Script', cursive;
    }
    .sum-content {
        a {
            margin: 0 auto;
            padding: 5px 0;
            white-space: nowrap;
            &:first-of-type {
                padding-top: 10px;
            }
        }
    }
}
</style>
