import Vue from 'vue'
const meeting = {
  state: {
    abs: '1212',
    placeData: []
  },
  mutations: {
    PLACE_TREE(state, placeData) {
      state.placeData = placeData
    }
  },
  actions: {
    placeTree({ commit }) {
      placeTree({ id: 2 }).then(response => {
        console.log(response)
        commit('PLACE_TREE', placeData)
      })
    }
  }
}
export default meeting
