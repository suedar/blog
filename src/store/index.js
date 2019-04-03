import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
// import actions from './actions'

Vue.use(Vuex)

const state = {
    footer: {
        height: 0,
        toTop: 0
    }
}

export default new Vuex.Store({
    state,
    mutations,
})