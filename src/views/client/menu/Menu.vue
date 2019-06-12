<template>
    <Model fixedColor="#bcdeee" :hasRight="true" class="menu-content">
        <template v-slot:content>
            <div class="content">
                <div class="text">
                    <span class="dot">●</span>
                    🐾 🐾🐾 这块地方 一共有{{length}}篇文章 🎉 🎉 🎉
                </div>
                <div class="menu-item" v-for="item in year" :key="item.id">
                    <div class="year">
                        <span :id="item" class="dot">●</span>
                        {{item}}
                    </div>
                    <div class="year-item"
                        v-for="menuItem in menu[item]"
                        :key="menuItem.id"
                        @click="read(menuItem.id)">
                        <span class="dot">●</span>
                        <span class="date">
                            {{menuItem.created}}
                        </span>
                        <span class="title">
                            {{menuItem.title}}
                        </span>
                        <span class="label">
                            <span class="label-item"
                                v-for="labelItem in menuItem.label"
                                :key="labelItem.id"
                                >
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
import getSMenu from '@/common/js/getSMenu';

import Model from '../model/Model.vue';

export default {
    data() {
        return {
            menu: {},
            year: [],
            length: 0,
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
            const menu = await this.getSMenu();
            const curMenu = menu.map(item => {
                item.created = item.created.slice(0, 19).replace(/T/, ' ')
                item.date = item.created.slice(0, 10);
                const arr = item.date.split('-');
                const year = arr.shift();
                const date = arr.join('-');
                return {
                    year, date,
                    title: item.title,
                    id: item.id,
                    label: item.labelList,
                    created: item.created,
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
            this.year = year;
            this.menu = obj;
        },
        initEmoji() {
            const year = this.year;
            const emoji = year.map(() => EMOJI.random().emoji);
            this.emoji = emoji;
        },
        read(id) {
            this.$router.push({name: 'read', params: { id }});
            this.$parent.changeComponents();
        }
    }
}
</script>

<style lang="scss" scoped>
.menu-content {
    .content {
        margin-top: 3vh;
        margin-bottom: 5vh;
        .text, .year, .year-item {
            height: 50px;
            line-height: 50px;
            padding-left: 3rem;
            border-left: 3px solid $greyWhite;
            position: relative;
            @media screen and (max-width: 800px) {
                height: auto;
            }
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
            &::after {
                content: '';
                width: 90%;
                height: 120px;
                position: absolute;
                left: 30px;
                top: 50%;
                transform: translateY(-50%);
                // background-color: white;
                z-index: 1;
            }
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
                font-size: 10px;
                .label-item {
                    // display: inline-flex;
                    // justify-content: center;
                    // align-items: center;
                    // width: 20px;
                    // height: 20px;
                    border: .6px solid $otherGrey;
                    padding: 2px;
                    // text-align: center;
                    margin-left: 6px;
                    border-radius: 3px;
                }
            }
        }
        .year .dot{
            &::after {
                position: absolute;
                background-color: #fff;
                width: 10px;
                height: 60px;
                right: 7px;
                top: -10px;
                content: '';
            }
            &::before {
                position: absolute;
                background-color: #fff;
                width: 10px;
                height: 60px;
                right: 7px;
                bottom: -10px;
                content: '';
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
        @media screen and (max-width: 800px) {
            .year {
                font-size: 19px;
                height: 80px;
                line-height: 80px;
                .dot {
                    &::before {
                        position: absolute;
                        background-color: #fff;
                        width: 10px;
                        height: 50px;
                        right: 7px;
                        bottom: -20px;
                        content: '';
                    }
                }
            }
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
