import Vue from 'vue'
import { placeTreeData } from '@/api/api'
const meeting = {
  state: {
    abs: '1212',
    placeData: [],
    placeData1: [],
    placeDataTwo: [],
    placeDataTwo1: [],
    placeDataTwo2: []
  },
  mutations: {
    PLACE_TREE(state, placeData) {
      state.placeData = placeData
    },
    PLACE_TREE1(state, placeData) {
      state.placeData1 = placeData
    },
    PLACE_TREE_TWO(state, placeData) {
      state.placeDataTwo = placeData
    },
    PLACE_TREE_TWO1(state, placeData) {
      state.placeDataTwo1 = placeData
    },
    PLACE_TREE_TWO2(state, placeData) {
      state.placeDataTwo2 = placeData
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
    },
    placeTreeTwo({ commit }) {
      placeTreeData({ id: 3 }).then(response => {
        // console.log(response.data)
        this.placeDataTwo = response.data
        // console.log(this.placeData)
        commit('PLACE_TREE_TWO', this.placeDataTwo)
      })
    },
    placeTreeTwo1({ commit }) {
      placeTreeData({ id: 4 }).then(response => {
        // console.log(response.data)
        this.placeDataTwo = response.data
        // console.log(this.placeData)
        commit('PLACE_TREE_TWO1', this.placeDataTwo)
      })
    },
    placeTreeTwo2({ commit }) {
      placeTreeData({ id: 8 }).then(response => {
        // console.log(response.data)
        this.placeDataTwo = response.data
        // console.log(this.placeData)
        commit('PLACE_TREE_TWO2', this.placeDataTwo)
      })
    },
    placeTreeTwo2({ commit }) {
      placeTreeData({ id: 13 }).then(response => {
        // console.log(response.data)
        this.placeDataTwo = response.data
        // console.log(this.placeData)
        commit('PLACE_TREE_TWO2', this.placeDataTwo)
      })
    },
    placeTreeTwo2({ commit }) {
      placeTreeData({ id: 8 }).then(response => {
        // console.log(response.data)
        this.placeDataTwo = response.data
        // console.log(this.placeData)
        commit('PLACE_TREE_TWO2', this.placeDataTwo)
      })
    }
  }
}
export default meeting
