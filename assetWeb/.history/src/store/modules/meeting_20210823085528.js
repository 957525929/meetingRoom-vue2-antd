import Vue from 'vue'
const meeting = {
  state: {
    placeData: []
  },
  mutations: {
    PLACETREE(state, placeTree) {
      state.placeTree = placeTree
    }
  },
  actions: {
    placeTree({ commit }, record) {
      commit('ADD_TABLE_ENHANCE', record)
    }
  }
}
export default meeting
