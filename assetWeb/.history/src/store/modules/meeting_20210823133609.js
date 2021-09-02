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
      placeTreeData({ id: 0 }).then(response => {
        console.log(response.data)
        this.placeData = response.data
        console.log(this.placeData)
        commit('PLACE_TREE', this.placeData)
      })
    }
  }
}
export default meeting
