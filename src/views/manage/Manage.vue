<template>
    <div class="manage">
        <a-menu
            style="width: 256px"
            :defaultSelectedKeys="['article']"
            mode="inline">
            <a-menu-item v-for="item in menu" :key="item.path">
                <a-icon :type="item.type" />
                {{item.text}}
            </a-menu-item>
        </a-menu>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
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
            }]
        }
    }

}
</script>

<style lang="scss" scoped>
    .manage {
        overflow: hidden;
        min-height: 100vh;
        display: flex;
        .menu {
            // width: 255px;
        }
        .content {
            flex: 1;
        }
    }
</style>
