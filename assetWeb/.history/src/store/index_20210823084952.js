import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import enhance from './modules/enhance'
import getters from './getters'
import meeting from './modules/meeting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    enhance
    meeting
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
