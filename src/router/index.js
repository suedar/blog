import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/client/Main.vue'
import Content from '@/views/client/content/Main.vue';
import Menu from '@/views/client/menu/Menu.vue';
import Label from '@/views/client/label/Label.vue'
import Link from '@/views/client/link/Link.vue'
import About from '@/views/client/about/About.vue';
import Read from '@/views/client/read/Read.vue';

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
            path: 'menu',
            name: 'menu'
        }, {
            component: Label,
            path: 'label',
            name: 'label'
        }, {
            component: Link,
            path: 'link',
            name: 'link'
        }, {
            component: About,
            path: 'about',
            name: 'about'
        }, {
            component: Read,
            path: 'read/:id',
            name: 'read'
        }, {
            redirect: { name: 'main' },
            path: '*',
        }]
    }]
})