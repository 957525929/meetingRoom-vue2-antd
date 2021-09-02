import Vue from 'vue'
const meeting = {
  state: {
    placeTree:[]
  },
  mutations: {
PLACETREE(state,placeTree)
  },
  actions: {
    addEhanceRecord({ commit }, record) {
      commit('ADD_TABLE_ENHANCE', record)
    }
  }
}
export default meeting
