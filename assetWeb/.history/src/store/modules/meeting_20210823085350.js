import Vue from 'vue'
const meeting = {
  state: {
    placeTree:[]
  },
  mutations: {

  },
  actions: {
    addEhanceRecord({ commit }, record) {
      commit('ADD_TABLE_ENHANCE', record)
    }
  }
}
export default meeting
