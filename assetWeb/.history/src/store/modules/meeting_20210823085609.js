import Vue from 'vue'
const meeting = {
  state: {
    placeData: []
  },
  mutations: {
    PLACE_TREE(state, placeData) {
      state.placeData = placeData
    }
  },
  actions: {
    placeTree({ commit }) {
      commit('ADD_TABLE_ENHANCE', placeData)
    }
  }
}
export default meeting
