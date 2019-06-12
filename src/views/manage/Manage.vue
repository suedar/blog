<template>
    <div class="manage">
        <a-menu
            style="width: 256px"
            :defaultSelectedKeys="defaultKey"
            mode="inline"
            @select="item => $router.push({name: item.key})">
            <a-menu-item v-for="item in menu" :key="item.path">
                <a-icon :type="item.type" />
                {{item.text}}
            </a-menu-item>
        </a-menu>
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="back" @click="toMain">
            <div class="back-wrapper">
                <font-awesome-icon icon="reply-all">
                </font-awesome-icon>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            menu: [{
                path: 'article',
                text: '文章管理',
                type: 'file-sync'
            }, {
                path: 'recommand',
                text: '推荐管理',
                type: 'fire'
            }, {
                path: 'introduction',
                text: '个人介绍',
                type: 'user'
            }],
            defaultKey: ['article']
        }
    },
    computed: {
        ...mapState(['isLogin'])
    },
    created() {
        if (!this.isLogin) {
            this.$router.push({name: 'main'});
        }
        const key = this.$route.name;
        this.defaultKey = [key];
    },
    methods: {
        ...mapActions([
            'queryArticleList'
        ]),
        async toMain() {
            await this.queryArticleList();
            this.$router.push({name: 'main'});
        }
    }
}
</script>

<style lang="scss" scoped>
    .manage {
        position: relative;
        // height: 200vh;
        // overflow: scroll;
        min-height: 100vh;
        display: flex;
        .menu {
            // width: 255px;
        }
        .content {
            flex: 1;
            // overflow: scroll;
        }
        .back {
            color: $grey;
            font-size: 1.1rem;
            position: absolute;
            left: 40px;
            bottom: 40px;
            cursor: pointer;
            .back-wrapper {
                border-radius: 50%;
                border: 1px solid $grey;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
            }
            &:hover {
                color: $blue;
                .back-wrapper {
                    border-color: $blue;
                }
            }
        }
    }
</style>
