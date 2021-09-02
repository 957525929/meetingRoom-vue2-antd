import Vue from 'vue'
const meeting = {
  state: {
    placeData: []
  },
  mutations: {
    PLACETREE(state, placeData) {
      state.placeData = placeData
    }
  },
  actions: {
    placeTree({ commit }) {
      commit('ADD_TABLE_ENHANCE', record)
    }
  }
}
export default meeting
