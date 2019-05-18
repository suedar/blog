import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/client/Main.vue'

import Content from '@/views/client/content/Main.vue';
import Menu from '@/views/client/menu/Menu.vue';
import Label from '@/views/client/label/Label.vue'
import Link from '@/views/client/link/Link.vue'
import About from '@/views/client/about/About.vue';
import Read from '@/views/client/read/Read.vue';
// import Login from '@/views/client/Login.vue';

import Manage from '@/views/manage/Manage';
import Article from '@/views/manage/content/article/Article';
import EditArticle from '@/views/manage/content/article/EditArticle';
import NewArticle from '@/views/manage/content/article/NewArticle';

Vue.use(Router);

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
    }, {
        component: Manage,
        path: '/manage',
        children: [{
            component: Article,
            path: 'article',
            name: 'article'
        }]
    }, {
        component: NewArticle,
        path: '/new/article',
        name: 'new-article'
    }, {
        component: EditArticle,
        path: '/edit/article',
        name: 'edit-article'
    }]
})