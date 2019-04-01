/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-01 12:43:48
 * @Last Modified by:   sunchao
 * @Last Modified time: 2019-04-01 12:43:48
 */

import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router/'
import store from './store/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
