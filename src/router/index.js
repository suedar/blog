import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import Content from '@/views/content/Main.vue';
import Menu from '@/views/menu/Menu.vue';

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Main,
        children: [{
            component: Content,
            path: '',
            name: 'main'
        }, {
            component: Menu,
            path: '/menu',
            name: 'menu'
        }, {
            redirect: { name: 'main' },
            path: '*',
        }]
    }]
})