/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-23 15:55:30
 * @Last Modified by:   sunchao
 * @Last Modified time: 2019-04-23 15:55:30
 */

import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
