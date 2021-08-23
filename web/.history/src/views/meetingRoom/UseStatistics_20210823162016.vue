<template>
  <!-- 会议统计 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>按日期筛选：</span>
        </a-col>
        <a-col>
          <a-date-picker placeholder="请选择开始" v-model="dateStart" :format="dateFormat"></a-date-picker>
          <span>&nbsp;~&nbsp;</span>
          <a-date-picker
            placeholder="请选择结束"
            :format="dateFormat"
            :defaultValue="moment(getCurrentData(), 'YYYY年MM月DD日')"
          ></a-date-picker>
          <!-- <j-date v-model="queryParam.time_begin" :showTime="true" date-format="YYYY-MM-DD" style="width:45%" placeholder="请选择开始时间" ></j-date> -->
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>按位置筛选：</span>
        </a-col>
        <a-col>
          <a-cascader
            style="width: 300px"
            :options="selectOptions"
            change-on-select
            @change="areaChange"
            :default-value="defaultT"
            placeholder="请选择位置"
            :display-render="displayRender"
          />
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>按房间号筛选：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入房间号" v-model="searchValue"></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <a-button :style="{ background: '#49a9ee', color: 'white' }" icon="search" @click="searchQuery"
            >查询</a-button
          >
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-col>
      </a-row>
    </div>

    <!-- 查询区域-END -->
    <!-- table区域-begin -->
    <!-- <div style="margin-top: 20px">
      <a-table :data-source="dataSta" :pagination="false" rowKey="theme">
        <a-table-column title="会议主题" data-index="theme" align="center"></a-table-column>
        <a-table-column title="会议次数" data-index="number" align="center"></a-table-column>
        <a-table-column title="与会人数" data-index="membersNumber" align="center"></a-table-column>
        <a-table-column title="会议预算" data-index="budget" align="center"></a-table-column>
      </a-table>
    </div>-->
    <br />
    <bar v-bind:dataSource="dataSource" v-bind:title="title" v-bind:height="height"></bar>
  </a-card>
</template>
<script>
import moment from 'moment'
import Bar from '@/components/chart/Bar'
import { formatDate } from '@/utils/util'
import JDate from '@/components/jeecg/JDate'
import { areaData } from './data/area.js'
const dataSta = [
  {
    theme: '福建烟草公司机关A区域1号楼',
    number: '30',
    membersNumber: '90',
    budget: '12500'
  },
  {
    theme: '福建烟草公司机关A区域2号楼',
    number: '4',
    membersNumber: '12',
    budget: '900'
  },
  {
    theme: '福建烟草公司机关B区域1号楼',
    number: '9',
    membersNumber: '30',
    budget: '18000'
  },
  {
    theme: '福建烟草公司机关B区域2号楼',
    number: '1',
    membersNumber: '30',
    budget: '21000'
  }
]
const dataSource = [
  {
    x: '会议室203',
    y: 10
  },
  {
    x: '会议室204',
    y: 3
  },
  {
    x: '会议室205',
    y: 3
  },
  {
    x: '会议室207',
    y: 8
  },
  {
    x: '会议室208',
    y: 17
  },
  {
    x: '会议室209',
    y: 10
  }
]
export default {
  components: {
    Bar,
    JDate
  },
  data() {
    return {
      selectOptions: areaData,
      defaultT: ['0', '01', '011'],
      dateFormat: 'YYYY年MM月DD日',
      dataSta,
      dateStart: undefined,
      dataSource,
      title: '会议室预约次数',
      height: 300,
      searchValue: ''
    }
  },
  created() {
    let start = moment(new Date())
      .subtract(1, 'months')
      .format('YYYY-MM-DD')
    this.dateStart = this.moment(start, 'YYYY-MM-DD')
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
    }
  },
  methods: {
    moment,
    displayRender({ labels }) {
      return labels.join('.')
    },
    areaChange(value) {
      console.log(value)
    },
    handleChange() {},
    searchQuery() {
      // console.log(formatDate(new Date().getTime()-2*24*3600*1000,"YYYY年MM月DD日"))
      // console.log(
      //   moment(new Date())
      //     .subtract(1, 'months')
      //     .format('YYYY-MM-DD')
      // )
      let roomSelect = []
      dataSource.filter(item => {
        if (item.x.includes(this.searchValue)) {
          roomSelect.push(item)
        }
      })
      this.dataSource = roomSelect
    },
    searchReset() {
      this.dataSource = dataSource
      this.searchValue = ''
    },
    getCurrentData() {
      return new Date().toLocaleDateString()
    },
    getStartData() {
      // const d=new Date().getTime()-30*24*3600*1000
      // console.log(d)
      //, return d.toDateString();
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
    },
  }
}
</script>
