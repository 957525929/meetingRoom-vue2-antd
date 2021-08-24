<template>
  <!-- 预约管理 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>会议状态：</span>
        </a-col>
        <a-col>
          <a-select :style="{width:'200px'}" @change="handleChangeStatus" placeholder="请选择会议状态" :default-value="1"
            allowClear>
            <a-select-option :value="1">待开会</a-select-option>
            <a-select-option :value="2">开会中</a-select-option>
            <a-select-option :value="3">已完成</a-select-option>
            <a-select-option :value="4">撤销</a-select-option>
            <a-select-option :value="5">强制撤销</a-select-option>
            <a-select-option value="">全部</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>会议时间：</a-col>
        <a-col>
          <a-date-picker @change="onChangeStartTime" placeholder="请选择开始" :format="dateFormat"
            :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')" :style="{width:'200px'}"></a-date-picker>
          <span>&nbsp;~&nbsp;</span>
          <a-date-picker @change="onChangeEndTime" placeholder="请选择结束" :format="dateFormat" :style="{width:'200px'}"
            :defaultValue="defaultValueEndTime"></a-date-picker>
        </a-col>
      </a-row>
      <br />
      <a-row type="flex" align="middle">
        <a-col>
          <span>会议名称：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入会议名称" :style="{width:'200px'}" v-model="queryParam.meetingName"></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>是否需要会务安排：</span>
        </a-col>
        <a-col>
          <a-select :style="{width:'200px'}" @change="handleChangeNeedArrrangement" placeholder="请选择是否需要会务安排"
            :default-value="1" allowClear>
            <a-select-option :value="1">是</a-select-option>
            <a-select-option :value="0">否</a-select-option>
            <a-select-option value="">全部</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5"></a-col>
        <a-col>
          <a-button :style="{ background: '#49a9ee', color: 'white'}" icon="search" @click="searchQuery">查询</a-button>
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
          <a-button style="margin-left: 8px" icon="download" @click="handleExportXls('预约管理')">导出</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 查询区域-END -->
    <!-- table区域-begin -->
    <div style="margin-top:20px">
      <a-table :dataSource="dataSource" :pagination="ipagination" :loading="loading" rowKey="reserveId"
        @change="handleTableChange">
        <a-table-column title="会议编号" data-index="reserveId" align="left" width="150px" fixed="left"></a-table-column>
        <a-table-column title="会议名称" data-index="meetingName" align="center"></a-table-column>
        <a-table-column title="负责人姓名" data-index="userName" align="center"></a-table-column>
        <!-- <a-table-column title="负责人电话" data-index="dutyTel" align="center"></a-table-column> -->
        <a-table-column title="会议时间" data-index="dateDay" align="center"></a-table-column>
        <a-table-column title="午别" data-index="period" align="center">
          <template slot-scope="period">
            <span v-if="period==1">上午</span>
            <span v-if="period==2">下午</span>
            <span v-if="period==3">晚上</span>
            <span v-if="period==4">全天</span>
          </template>
        </a-table-column>
        <a-table-column title="会议地点" data-index="meetingRoomName" align="center" width="300px"></a-table-column>
        <a-table-column title="参会人数（人）" data-index="number" align="center"></a-table-column>
        <a-table-column title="会务安排" data-index="needArrangement" align="center">
          <template slot-scope="needArrangement">
            <span v-if="needArrangement==1">是</span>
            <span v-if="needArrangement==0">否</span>
          </template>
        </a-table-column>
        <!-- <a-table-column title="会议状态" data-index="state" align="center"></a-table-column> -->
        <a-table-column title="会议状态" data-index="status" align="center">
          <template slot-scope="status">
            <a-tag color="green" v-if="status ==3">
              已完成
            </a-tag>
            <a-tag color="cyan" v-if="status ==1">
              待开会
            </a-tag>
            <a-tag color="blue" v-if="status ==2">
              开会中
            </a-tag>
            <a-tag color="pink" v-if="status ==4">
              撤销
            </a-tag>
            <a-tag color="red" v-if="status ==5">
              强制撤销
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column title="操作" align="center">
          <span slot-scope="text, record">
            <span v-if="record.status == 1&&record.needArrangement==1">
              <a @click="arrangeInfor(record)">会务安排</a>
              <a-divider type="vertical" />
            </span>
            <a @click="meetingDetail(record)">详情</a>
          </span>
        </a-table-column>
      </a-table>
    </div>
    <!-- 详情页面 -->
    <a-drawer :visible="visibleAppoint" title="会议详情" @close="appointClose" width="1200px" placement="right">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="会议申请">
          <a-descriptions>
            <a-descriptions-item label="会议名称">{{selectMeeting.meetingName}}</a-descriptions-item>
            <a-descriptions-item label="负责人姓名">{{selectMeeting.userName}}</a-descriptions-item>
            <a-descriptions-item label="负责人电话">{{selectMeeting.userPhone}}</a-descriptions-item>
            <a-descriptions-item label="参会人数">{{selectMeeting.number}}</a-descriptions-item>
            <a-descriptions-item label="备注">{{selectMeeting.remark}}</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="会议地点">
          <a-descriptions>
            <a-descriptions-item label="会议时间">{{selectMeeting.dateDay}}</a-descriptions-item>
            <a-descriptions-item label="午别">
              <span v-if="selectMeeting.period==1">上午</span>
              <span v-if="selectMeeting.period==2">下午</span>
              <span v-if="selectMeeting.period==3">晚上</span>
              <span v-if="selectMeeting.period==4">全天</span>
            </a-descriptions-item>
            <a-descriptions-item label="会议地点">{{selectMeeting.meetingRoomName}}</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="会务安排">
          <a-table :data-source="dataArrange" :pagination="false" rowKey="index">
            <a-table-column title="序号" data-index="index" align="center"></a-table-column>
            <a-table-column title="姓名" data-index="name" align="center"></a-table-column>
            <a-table-column title="联系电话" data-index="phone" align="center"></a-table-column>
            <a-table-column title="安排事项" data-index="arrangeContent" align="center"></a-table-column>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
    <!-- 会务安排 -->
    <PurInModal v-if="modalVisible" :modalVisible="modalVisible" @handleCancel="handleCancel" :basicInfo="basicInfo">
    </PurInModal>
  </a-card>
</template>

<script>
  import moment from 'moment'
  import PurInModal from './PurInModal'
  import { getAction } from '@/api/manage'
  import {
    JeecgListMixin
  } from '@/mixins/JeecgListMixin'
  const data = [{
    id: 'B1207',
    budget: '5000',
    name: '安全管理会议',
    theme: '安全管理',
    dateTime: '2021年08月13日',
    range: '下午',
    address: '福建师范大学.仓山校区.1号楼.会议室203',
    members: '陈宏涛；李小玲；林诺汐；陈熙雨',
    number: '4',
    dutyName: '李小玲',
    dutyTel: '152690314587',
    state: '待开始',
    detail: '0',
    arrange: '是'
  }]
  // const dataArrange = [{
  //     index: 1,
  //     name: '李霞',
  //     phone: '13759655332',
  //     matters: '记录会议内容'
  //   },
  //   {
  //     index: 2,
  //     name: '尤晓梅',
  //     phone: '13053955537',
  //     matters: '摄影录像'
  //   }
  // ]
  export default {
    mixins: [JeecgListMixin],
    components: {
      PurInModal
    },
    data() {
      return {
        data,
        defaultValueEndTime: '',
        visibleAppoint: false,
        visibleForced: false,
        modalVisible: false,
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        },
        basicInfo: {},
        dataArrange:[],
        reason: '',
        selectMeeting: {
          meetingName: '',
        },
        // queryParam: {
        //   name: undefined,
        //   dateStart: undefined,
        //   dateEnd: undefined,
        //   state: undefined,
        //   arrange:'是'
        // },
        dateFormat: 'YYYY-MM-DD',
        url: {
          list: '/ReservationController/getReservationList',
        }
      }
    },
    created() {
      let end = moment(new Date())
        .subtract(-1, 'months')
        .format('YYYY-MM-DD')
      this.defaultValueEndTime = this.moment(end, 'YYYY-MM-DD')
      this.queryParam.reservationEndTime = this.defaultValueEndTime
      // console.log('this.queryParam.reservationEndTime', this.queryParam.reservationEndTime)
      //  this.queryParam.reservationEndTime= this.queryParam.reservationEndTime._i
      this.queryParam.needArrrangement = 1
      this.queryParam.status = 1
    },
    methods: {
      moment,
      onChangeStartTime(date, dateString) {
        this.queryParam.reservationStartTime = dateString
      },
      onChangeEndTime(date, dateString) {
        this.queryParam.reservationEndTime = dateString
      },
      handleChangeStatus(value) {
        this.queryParam.status = value
      },
      handleChangeNeedArrrangement(value) {
        this.queryParam.needArrrangement = value
      },
      // searchReset() {},
      getCurrentData() {
        let now = moment(new Date()).format('YYYY-MM-DD')
        let dat = this.moment(now, 'YYYY-MM-DD')
        this.queryParam.reservationStartTime = dat._i
        return dat._i
      },
      meetingDetail(record) {
        this.visibleAppoint = true      
        this.selectMeeting=record
        let id=record.reserveId
        // getAction('/ArrangementController/getArranmentById',{reservetionId:id}).then(res=>{
        //   if(res.code==200){
        //     this.dataArrange=res.data
        //   }else{
        //     this.$message.warning(res.message);
        //   }
        // })
      },
      handleCancel() {
        this.modalVisible = false
      },
      arrangeInfor(record) {
        this.modalVisible = true
        console.log(record)
      },
      appointClose() {
        this.$emit('close')
        this.visibleAppoint = false
      },
      CancelForced() {
        this.$emit('close')
        this.visibleForced = false
      }
    }
  }
</script>
<style scoped>
</style>