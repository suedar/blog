import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import MainContent from '@/views/content/Main.vue';
import menu from '@/views/menu/menu.vue';

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Main,
        children: [{
            component: MainContent,
            path: '',
            name: 'main'
        }, {
            component: menu,
            path: '/menu',
            name: 'menu'
        }]
    }]
})