<template>
    <Model fixedColor="#8360bf" :hasRight="false" class="link-content">
        <template v-slot:content>
            <div class="main">
                <div class="text">
                    😋 这些东西推荐你去看看哦
                </div>
                <div class="link-item" v-for="(item, index) in recommand" :key="item.id">
                    <a :href="item.link">
                        <span>></span> {{item.text}}
                    </a>
                </div>
            </div>
        </template>
    </Model>
</template>

<script>

import Model from '../model/Model.vue';

import getSRecommand from '@/common/js/getSRecommand'

export default {
    data() {
        return {
            recommand: []
        }
    },
    components: {
        Model
    },
    mixins: [getSRecommand],
    computed: {
        displayLabel(arr) {
        }
    },
    created() {
        this.initConfig();
    },
    methods: {
        async initConfig() {
            const recommand = await this.getSRecommand();
            this.recommand = recommand;
        }
    }

}
</script>

<style lang="scss" scoped>
.link-content {
    min-height: 60.5vh;
    .main {
        display: flex;
        flex-direction: column;
        padding-bottom: 4vh;
        .text{
            padding: 3vh 0 5vh;
            font-size: 20px;
        }
        @media screen and (max-width: 800px) {
            .text {
                font-size: 14px;
            }
        }
        .link-item {
            padding: 10px 0;
            a {
                color: $green;
            }
            span {
                padding: 0 10px;
                color: $grey;
            }
        }
    }
}
</style>
