import Vue from 'vue'
const meeting = {
  state: {
    placeTree: []
  },
  mutations: {
    PLACETREE(state, placeTree) {
        state.PLACETREE
    }
  },
  actions: {
    addEhanceRecord({ commit }, record) {
      commit('ADD_TABLE_ENHANCE', record)
    }
  }
}
export default meeting
