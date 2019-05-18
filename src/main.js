/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-01 12:43:48
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-25 17:20:21
 */

import Vue from 'vue'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './plugins/fontawesome';
import App from './App.vue'
import router from './router/'
import store from './store/'

// Vue.use(ElementUI);
Vue.use(Antd);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')