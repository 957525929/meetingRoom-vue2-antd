import Vue from 'vue'
const meeting = {
  state: {
    abs:'1212',
    placeData: []
  },
  mutations: {
    PLACE_TREE(state, placeData) {
      state.placeData = placeData
    }
  },
  actions: {
    placeTree({ commit }) {
      commit('PLACE_TREE', placeData)
    }
  }
}
export default meeting
