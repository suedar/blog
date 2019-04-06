import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import Content from '@/views/content/Main.vue';
import Menu from '@/views/menu/Menu.vue';
import Label from '@/views/label/Label.vue'

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
            component: Label,
            path: '/label',
            name: 'label'
        }, {
            redirect: { name: 'main' },
            path: '*',
        }]
    }]
})