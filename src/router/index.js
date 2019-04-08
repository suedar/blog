import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import Content from '@/views/content/Main.vue';
import Menu from '@/views/menu/Menu.vue';
import Label from '@/views/label/Label.vue'
import Link from '@/views/link/Link.vue'
import About from '@/views/about/About.vue';
import Read from '@/views/read/Read.vue';

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
            component: Link,
            path: '/link',
            name: 'link'
        }, {
            component: About,
            path: '/about',
            name: 'about'
        }, {
            component: Read,
            path: '/read',
            name: 'read'
        }, {
            redirect: { name: 'main' },
            path: '*',
        }]
    }]
})