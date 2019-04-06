<template>
    <Model :hasRight="true" class="label-content">
        <template v-slot:content>
            <div class="content">
                <div class="text">
                    <span class="dot">●</span>
                    🐾 🐾🐾 这块地方 一共有{{length}}篇文章 🎉 🎉 🎉
                </div>
                <div class="label-item" v-for="item in year" :key="item.id">
                    <div class="year">
                        <span :id="item" class="dot">●</span>
                        {{item}}
                    </div>
                    <div class="year-item" v-for="menuItem in label[item]" :key="menuItem.id">
                        <span class="dot">●</span>
                        <span class="date">
                            {{menuItem.date}}
                        </span>
                        <span class="title">
                            {{menuItem.title}}
                        </span>
                        <span class="label">
                            <span class="label-item" v-for="labelItem in menuItem.label" :key="labelItem.id">
                                {{labelItem}}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:sum-header>
            目录分类
        </template>
        <template v-slot:sum-content>
            <a v-for="item, index in year" :key="item.id" :href="'#' + item">
                {{emoji[index]}} {{item}} {{emoji[index]}}
            </a>
        </template>
    </Model>
</template>

<script>
import * as EMOJI from 'node-emoji';

import {getAllMenu} from '@/api/'
import Model from '../model/Model.vue';

export default {
    data() {
        return {
            label: {},
            year: [],
            length: 0,
            emoji: []
        }
    },
    components: {
        Model
    },
    created() {
        this.initConfig();
    },
    methods: {
        async initConfig() {
            const label = await getAllMenu();
            const curMenu = label.map(item => {
                const arr = item.date.split('-');
                const year = arr.shift();
                const date = arr.join('-');
                return {
                    year, date,
                    title: item.title,
                    id: item.id,
                    label: item.label
                }
            })
            this.length = curMenu.length;
            this.handleArr(curMenu);
            this.initEmoji();
        },
        handleArr(arr) {
            const year = (Array.from([...new Set(arr.map(item => item.year))])).sort((a,b) => b - a);
            const obj = {};
            year.forEach(item => {
                obj[item] = arr.filter(arrItem => arrItem.year === item);
            })
            console.log(obj);
            this.year = year;
            this.label = obj;
        },
        initEmoji() {
            const year = this.year;
            const emoji = year.map(item => EMOJI.random().emoji);
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
        .text, .year, .year-item {
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
        .year {
            height: 120px;
            line-height: 110px;
            font-size: 24px;
            font-weight: 400;
            color: $anotherGrey;
            position: sticky;
            top: 10px;
            background-color: white;
            z-index: 2;
        }
        .year-item {
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
            .label {
                font-size: 6px;
                .label-item {
                    border: 1px solid $otherGrey;
                    padding: 2px;
                    margin-left: 6px;
                    border-radius: 3px;
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
        // font-family: '微软雅黑';
        font-family: 'Kaushan Script', cursive;
    }
    .sum-content {
        a {
            margin: 0 auto;
            padding: 5px 0;
            &:first-of-type {
                padding-top: 10px;
            }
        }
    }
}
</style>
