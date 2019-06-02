<template>
    <Model bgColor="#f5f5f5" fixedColor="#8360bf" :hasRight="false" class="about-content">
        <template v-slot:content>
            <div class="main">
                <div class="decoration">
                    <div class="big-circle"></div>
                    <div class="left-line"></div>
                    <div class="small-circle"></div>
                    <div class="right-line"></div>
                </div>
                <div class="intro">
                    <div class="content">
                        <div class="avatar">
                            <img :src="data.headPic" alt="">
                        </div>
                        <div class="text">
                            {{data.introduction}}
                        </div>
                        <div class="contact">
                            联系我:
                            <a href="mailto:690372513@qq.com" target="_blank">
                                690372513@qq.com
                            </a>
                        </div>
                        <div class="icon">
                            <a href="https://juejin.im/user/5a21473d6fb9a0451170eefe" target="_blank">
                                <img src="../../../assets/img/juejin.svg" alt="">
                            </a>
                            <a href="https://github.com/suedar" target="_blank">
                                <img src="../../../assets/img/github.svg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Model>
</template>

<script>

import Model from '../model/Model.vue';

import { getPersonalInfo } from '@/api/';

export default {
    data() {
        return {
            data: {
            }
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
            const data = await getPersonalInfo();
            this.data = data;
        }
    }

}
</script>

<style lang="scss" scoped>
.about-content {
    .main {
        // height: 80vh;
        margin-bottom: 3vh;
        .decoration {
            position: relative;
            z-index: 1;
            > div {
                position: absolute;
                background-color: $blue;
                // border: 1px solid $white;
            }
            .big-circle {
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            .left-line {
                left: 15px;
                top: 33px;
                width: 30px;
                height: 3px;
                transform: rotate(50deg);
            }
            .small-circle {
                top: 40px;
                left: 33px;
                width: 18px;
                height: 18px;
                border-radius: 50%;
            }
            .right-line {
                left: 44px;
                top: 57px;
                width: 30px;
                height: 3px;
                transform: rotate(23deg);
            }
        }
        .intro {
            z-index: 2;
            margin: 0 75px;
            padding-top: 60px;
            .content {
                height: 50vh;
                background-color: #fff;
                border-radius: 10px;
                overflow: hidden;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                flex-direction: column;
                .avatar {
                    width: 80px;
                    height: 80px;
                    background-color: #d1e0dd;
                    box-shadow: 0px 0px 3px .3px #d1e0dd;
                    border-radius: 50%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .contact {
                    a {
                        color: $grey;
                    }
                }
                .icon {
                    width: 100px;
                    display: flex;
                    justify-content: space-evenly;
                }
            }
        }
        @media screen and (max-width: 800px) {
            .decoration {
                display: none;
            }
            .intro {
                padding: 20px 0;
                margin: 0 40px;
                // .icon {}
            }
        }
    }
}
</style>
