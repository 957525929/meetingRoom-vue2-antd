<template>
  <a-cascader style="width: 300px" :options="selectOptions"  @change="handlePlaceTree"
    @click="handlePlaceTree" placeholder="请选择位置" :display-render="displayRender" />
</template>


<script>
const areaData = [
  {
    value: '旗山校区',
    label: '旗山校区',
    children: []
  },
  {
    value: '仓山校区',
    label: '仓山校区',
    children: []
  }
]

  export default {
    name: 'PurInTree',
    data() {
      return {
        selectOptions: areaData,
      }
    },
    mounted() {
      // console.log(this.$store)
      this.$store.dispatch('placeTree')
      this.$store.dispatch('placeTree1')
      this.$store.dispatch('placeTreeTwo')
      this.$store.dispatch('placeTreeTwo1')
      this.$store.dispatch('placeTreeTwo2')
      this.$store.dispatch('placeTreeTwo3')
      this.$store.dispatch('placeTreeTwo4')
      // this.handlePlaceTree()
    },
    computed: {
      firstTree() {
        return this.$store.state.meeting.placeData
      },
      firstTree1() {
        return this.$store.state.meeting.placeData1
      },
      placeTreeTwo() {
        return this.$store.state.meeting.placeDataTwo
      },
      placeTreeTwo1() {
        return this.$store.state.meeting.placeDataTwo1
      },
      placeTreeTwo2() {
        return this.$store.state.meeting.placeDataTwo2
      },
      placeTreeTwo3() {
        return this.$store.state.meeting.placeDataTwo3
      },
      placeTreeTwo4() {
        return this.$store.state.meeting.placeDataTwo4
      },
    },
    methods: {
      displayRender({
        labels
      }) {
         this.$emit('displayRender', labels.join('.'))
        return labels.join('.')
      },
      handlePlaceTree() {
        if (areaData[0].children.length == 0) {
          for (let i = 0; i < this.firstTree.length; i++) {
            areaData[0].children.push({
              label: this.firstTree[i].placeName,
              value: this.firstTree[i].placeName,
              children: [],
            })
          }
        }

        if (areaData[0].children[0].children.length == 0) {
          for (let i = 0; i < this.placeTreeTwo.length; i++) {
            areaData[0].children[0].children.push({
              label: this.placeTreeTwo[i].placeName,
              value: this.placeTreeTwo[i].placeName,
            })
          }
        }

        if (areaData[0].children[1].children.length == 0) {
          for (let i = 0; i < this.placeTreeTwo2.length; i++) {
            areaData[0].children[1].children.push({
              label: this.placeTreeTwo2[i].placeName,
              value: this.placeTreeTwo2[i].placeName,
            })
          }
        }

        if (areaData[0].children[2].children.length == 0) {
          for (let i = 0; i < this.placeTreeTwo3.length; i++) {
            areaData[0].children[2].children.push({
              label: this.placeTreeTwo3[i].placeName,
              value: this.placeTreeTwo3[i].placeName,
            })
          }
        }

        if (areaData[0].children[3].children.length == 0) {
          for (let i = 0; i < this.placeTreeTwo4.length; i++) {
            areaData[0].children[3].children.push({
              label: this.placeTreeTwo4[i].placeName,
              value: this.placeTreeTwo4[i].placeName,
            })
          }
        }


        if (areaData[1].children.length == 0) {
          for (let i = 0; i < this.firstTree1.length; i++) {
            areaData[1].children.push({
              label: this.firstTree1[i].placeName,
              value: this.firstTree1[i].placeName,
              children: [],
            })
          }
        }

        if (areaData[1].children[0].children.length == 0) {
          for (let i = 0; i < this.placeTreeTwo1.length; i++) {
            areaData[1].children[0].children.push({
              label: this.placeTreeTwo1[i].placeName,
              value: this.placeTreeTwo1[i].placeName,
            })
          }
        }
        console.log(areaData)
      },
    }
  }
</script>

<style lang="less" scoped>
  .ant-row.ant-form-item {
    margin-bottom: 12px;
  }
</style>