import Vue from 'vue'
import { placeTreeData } from '@/api/api'
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
      placeTreeData({ id: 1 }).then(response => {
        console.log(response.data)
        response.data
        console.log(placeData)
        commit('PLACE_TREE', placeData)
      })
    }
  }
}
export default meeting
