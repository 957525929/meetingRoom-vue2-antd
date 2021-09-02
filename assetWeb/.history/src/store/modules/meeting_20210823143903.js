import Vue from 'vue'
import { placeTreeData } from '@/api/api'
const meeting = {
  state: {
    abs: '1212',
    placeData: []
    placeData: []
  },
  mutations: {
    PLACE_TREE(state, placeData) {
      state.placeData = placeData
    },
    PLACE_TREE1(state, placeData) {
      state.placeData1 = placeData1
    }
  },
  actions: {
    placeTree({ commit }) {
      placeTreeData({ id: 1 }).then(response => {
        // console.log(response.data)
        this.placeData = response.data
        // console.log(this.placeData)
        commit('PLACE_TREE', this.placeData)
      })
    },
    placeTree1({ commit }) {
      placeTreeData({ id: 2 }).then(response => {
        // console.log(response.data)
        this.placeData1 = response.data
        // console.log(this.placeData)
        commit('PLACE_TREE1', this.placeData1)
      })
    }
  }
}
export default meeting
