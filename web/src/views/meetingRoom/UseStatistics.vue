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
          <!-- <a-date-picker placeholder="请选择开始" v-model="dateStart" :format="dateFormat"></a-date-picker>
          <span>&nbsp;~&nbsp;</span>
          <a-date-picker
            placeholder="请选择结束"
            :format="dateFormat"
            :defaultValue="moment(getCurrentData(), 'YYYY年MM月DD日')"
          ></a-date-picker> -->
          <j-date v-model="queryParam.reservationStartTime" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
            placeholder="请选择开始时间"></j-date>
          <span style="width: 10px;">~</span>
          <j-date v-model="queryParam.reservationEndTime" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
            placeholder="请选择结束时间"></j-date>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>按位置筛选：</span>
        </a-col>
        <a-col>
          <a-cascader style="width: 300px" :options="selectOptions" change-on-select placeholder="请选择位置"
            :display-render="displayRender" @click="handlePlaceTree" v-model="place" />
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>按房间号筛选：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入房间号" v-model="roomNum" allowClear></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <a-button :style="{ background: '#49a9ee', color: 'white' }" icon="search" @click="searchQuery">查询</a-button>
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-col>
      </a-row>
    </div>
    <br />
    <bar v-bind:dataSource="dataSource" v-bind:title="title" v-bind:height="height"></bar>
  </a-card>
</template>
<script>
  import {
    postAction
  } from '@/api/manage'
  import moment from 'moment'
  import Bar from '@/components/chart/Bar'
  import {
    formatDate
  } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'
  const areaDa = [{
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
    components: {
      Bar,
      JDate
    },
    data() {
      return {
        queryParam: {
          reservationStartTime: '',
          reservationEndTime: '',
          placeName: ''
        },
        place: ['旗山校区'],
        roomNum: '',
        selectOptions: areaDa,
        dateFormat: 'YYYY年MM月DD日',
        dataSource: [],
        title: '会议室预约次数',
        height: 300,
        searchValue: ''
      }
    },
    created() {
      this.init()
    },
    mounted() {
      // console.log(this.$store)
      this.$store.dispatch('placeTree')
      this.$store.dispatch('placeTree1')
    },
    computed: {
      firstTree() {
        return this.$store.state.meeting.placeData
      },
      firstTree1() {
        return this.$store.state.meeting.placeData1
      },
    },
    methods: {
      init() {
        let start = moment(new Date())
          .subtract(1, 'months')
          .format('YYYY-MM-DD')
        let dateStart = moment(start, 'YYYY-MM-DD')
        this.$set(this.queryParam, "reservationStartTime", dateStart._i)
        let now = moment(new Date()).format('YYYY-MM-DD')
        let dat = moment(now, 'YYYY-MM-DD')
        this.$set(this.queryParam, "reservationEndTime", dat._i)
        this.$set(this.queryParam, "placeName", '旗山校区')
        // this.$nextTick(() => {
        //   this.searchQuery()
        // });
        this.searchQuery()
      },
      displayRender({
        labels
      }) {
        this.queryParam.placeName = labels.join('.')
        return labels.join('.')
      },
      handleChange() {},
      searchQuery() {
        if(this.queryParam.reservationStartTime==''||this.queryParam.reservationEndTime==''){
          this.$message.warning('请选择时间')
        }
        if (this.roomNum) {
          this.queryParam.placeName = this.place.join('.')+ '.' + this.roomNum
        }
        let query = this.queryParam
        console.log('this.queryParam.placeName', this.queryParam.placeName)
        postAction('/MeetingRoomController/reservationStatis', query).then(res => {
          if (res.data.length > 0) {
            this.$message.success('查询成功')
            let array = []
            console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
              let a = {
                x: res.data[i].placeName,
                y: res.data[i].number
              }
              array.push(a)
            }
             this.queryParam.placeName = this.place.join('.')
            this.dataSource = array
            console.log('this.dataSource', this.dataSource)
          } else {
            this.$message.warning('未查询到')
            console.log('未查询到')
            this.queryParam.placeName = this.place.join('.')
            this.dataSource = []
          }
        })
      },
      searchReset() {
        this.place = ['旗山校区']
        this.init()
      },
      getCurrentData() {
        return new Date().toLocaleDateString()
      },
      handlePlaceTree() {
        if (areaDa[0].children.length == 0) {
          for (let i = 0; i < this.firstTree.length; i++) {
            areaDa[0].children.push({
              label: this.firstTree[i].placeName,
              value: this.firstTree[i].placeName,
              // children: []
            })
          }
        }

        if (areaDa[1].children.length == 0) {
          for (let i = 0; i < this.firstTree1.length; i++) {
            areaDa[1].children.push({
              label: this.firstTree1[i].placeName,
              value: this.firstTree1[i].placeName,
              // children: []
            })
          }
        }
        console.log(areaDa)
      }
    }
  }
</script>