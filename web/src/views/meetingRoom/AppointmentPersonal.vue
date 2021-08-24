<template>
  <!-- 会议室预约 -->
  <a-card :bordered="false">
    <div class="meetingApply">
      <table class="meetingInfoPer">
        <tbody>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议名称</label>
              <div class="bgc">
                <a-input placeholder="请输入会议名称" :style="{ width: '60%' }" v-model="apply.meetingName"></a-input>
              </div>
            </td>
            <td>
              <label :style="{ marginLeft: '100px' }">参会人数</label>
              <div class="bgc">
                <a-input placeholder="请输入参会人数" :style="{ width: '60%' }" v-model="apply.number"></a-input>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议时间</label>
              <div class="bgc">
                <a-date-picker placeholder="请选择会议时间" :style="{ width: '340px' }"
                  :defaultValue="moment(getCurrentData())" @change="onChangeTime">
                </a-date-picker>
              </div>
            </td>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议午别</label>
              <div class="bgc">
                <a-select v-model="apply.period" placeholder="请选择午别" :style="{ width: '60%' }">
                  <a-select-option :value="1">上午</a-select-option>
                  <a-select-option :value="2">下午</a-select-option>
                  <a-select-option :value="3">晚上</a-select-option>
                  <a-select-option :value="4">全天</a-select-option>
                </a-select>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议地点</label>
              <div class="bgc">
                <!-- <a-cascader :options="selectOptions" placeholder="请选择会议室" v-model="meetingRoom" @change="handlePlaceTree"
                  style="width: 340px" :display-render="displayRender"  @click="handlePlaceTree"/> -->
                <PurInTree :style="{ width: '340px' }" @displayRender="displayRender" v-model="apply.location">
                </PurInTree>
              </div>
            </td>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议室状态</label>
              <div class="bgc">
                <span v-if="busyRoom" style="color: red">已预约</span>
                <a-button v-if="busyRoom" @click="applyDetail()" type="primary" style="margin-left: 20px">预约详情
                </a-button>
                <span v-if="noneRoom" style="color: green">空闲</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">是否会务安排</label>
              <div class="bgc">
                <a-switch @change="onChangeArrange" v-model="apply.needArrangement" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <!-- 会务安排 -->
              <PurInTable v-if="modalVisible"></PurInTable>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <label :style="{ marginLeft: '100px' }">备注</label>
              <div class="bgc">
                <a-textarea v-model="apply.remark" placeholder="请输入会议备注信息" :auto-size="{ minRows: 3, maxRows: 5 }"
                  :style="{ width: '80%' }" />
              </div>
            </td>
          </tr>
          <br />
          <tr>
            <td colspan="3">
              <a-button @click="submitApply" shape="round" size="large" type="primary"
                :style="{ width: '150px', marginLeft: '40%' }">提交申请</a-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--强制预约原因 -->
    <a-modal v-model="visibleReason" title="强制预约原因" @ok="handleOkReason" @cancel="handleCancelReason">
      <a-row type="flex" align="middle">
        <a-col>
          <span>原因：</span>
        </a-col>
        <a-clo>
          <a-textarea placeholder="请输入强制预约原因" :auto-size="{ minRows: 3, maxRows: 5 }" :style="{ width: '400px' }" v-model="apply.cancelReason"/>
        </a-clo>
      </a-row>
    </a-modal>

    <!--已预约详情 -->
    <a-modal v-model="visibleApplyDetail" @ok="visibleApplyDetail=false" @cancel="visibleApplyDetail=false"
      width="500px">
      <a-descriptions title="预约详情" :column='2'>
        <a-descriptions-item label="预约人姓名">
          周唐
        </a-descriptions-item>
        <a-descriptions-item label="预约人电话">
          18652140306
        </a-descriptions-item>
        <a-descriptions-item label="会议时间">
          2021年8月15日
        </a-descriptions-item>
        <a-descriptions-item label="会议午别">
          全天
        </a-descriptions-item>
      </a-descriptions>
      <!-- <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="预约详情">
          <a-descriptions :column='2'>
            <a-descriptions-item label="预约人姓名">周唐</a-descriptions-item>
            <a-descriptions-item label="预约人电话">18652140306</a-descriptions-item>
            <a-descriptions-item label="会议时间"> 2021年8月15日</a-descriptions-item>
            <a-descriptions-item label="会议午别"> 全天</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs> -->
    </a-modal>

  </a-card>
</template>
<script>
  import {
    areaData
  } from './data/area.js'
  import moment from 'moment'
  import PurInTree from './PurInTree'
  import PurInTable from './PurInTable'
  import {
    getAction
  } from '@/api/manage'
  import {
    dataRoom
  } from './data/dataRoom.js'
  const optionsRoom = [{
    value: '福建师范大学',
    label: '福建师范大学',
    children: [{
        value: '旗山校区',
        label: '旗山校区',
        children: [{
            value: '1号楼',
            label: '1号楼',
            children: [{
                value: '会议室203',
                label: '会议室203',
              },
              {
                value: '会议室204',
                label: '会议室204',
              },
            ],
          },
          {
            value: '2号楼',
            label: '2号楼',
            children: [{
                value: '会议室204',
                label: '会议室204',
              },
              {
                value: '会议室205',
                label: '会议室205',
              },
            ],
          },
        ],
      },
      {
        value: '仓山校区',
        label: '仓山校区',
        children: [{
          value: '1号楼',
          label: '1号楼',
          children: [{
              value: '会议室204',
              label: '会议室204',
            },
            {
              value: '会议室205',
              label: '会议室205',
            },
          ],
        }, ],
      },
    ],
  }, ]
  export default {
    components: {
      PurInTable,
      PurInTree,
    },
    data() {
      return {
        apply: {
          meetingName: '安全管理会议',
          number: '6',
          period: '全天',
          date: '',
          location: '',
          needArrangement: 0,
          remark: '',
          cancelReason:''
        },       
        dateFormat: 'YYYY-MM-DD',
        busyRoom: false,
        noneRoom: false,
        visibleReason: false,
        modalVisible: false,
        dataRoom: dataRoom,
        visibleApplyDetail: false
      }
    },
    created() {},
    methods: {
      moment,
      getCurrentData() {
        let end = moment(new Date()).format('YYYY-MM-DD')
        let dat = this.moment(end, 'YYYY-MM-DD')
        console.log(dat)
        this.apply.date = dat._i
        return dat._i
        // let date = new Date();
        // let seperator1 = "-";
        // let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // let strDate = date.getDate();
        // if (month >= 1 && month <= 9) {
        //   month = "0" + month;
        // }
        // if (strDate >= 0 && strDate <= 9) {
        //   strDate = "0" + strDate;
        // }
        // let currentdate = year + seperator1 + month + seperator1 + strDate;
        // this.apply.date = currentdate
        // return currentdate;
        //  this.apply.date = new Date().toLocaleDateString().split('/').join('-');
        //  let dat=new Date().toLocaleDateString()
        //  console.log(dat)
        // return new Date().toLocaleDateString()
      },
      onChangeTime(date, dateString) {
        console.log(dateString);
        this.apply.date = dateString
      },
      displayRender(data) {
        this.apply.location = data
        // getAction('/MeetingRoomController/getMeetingRoomList')
      },
      // onChangeRoom(value) {
      //   let areaValue = value[0] + '.' + value[1] + '.' + value[2]
      //   this.dataRoom.forEach((element) => {
      //     if (areaValue == element.area && element.room == value[3]) {
      //       console.log(element.state)
      //       if (element.state == '空闲') {
      //         this.noneRoom = true
      //         this.busyRoom = false
      //       }
      //       if (element.state == '已预约') {
      //         this.noneRoom = false
      //         this.busyRoom = true
      //       }
      //     }
      //   })
      // },
      submitApply() {
        console.log('this.apply', this.apply)
        if (this.noneRoom) {
          this.$message.success('您已成功预约会议室')
        }
        if (this.busyRoom) {
          const _this = this
          this.$confirm({
            title: '是否强制预约会议室',
            content: '',
            okText: '是',
            cancelText: '否',
            onOk() {
              console.log('ok')
              _this.visibleReason = true
            },
          })
        }
      },
      handleOkReason() {
        this.visibleReason = false
      },
      handleCancelReason() {
        this.visibleReason = false
      },
      onChangeArrange(checked) {
        console.log(checked)
        if (checked) {
          this.modalVisible = true
          this.apply.needArrangement = 1
        } else {
          this.modalVisible = false
          this.apply.needArrangement = 0
        }
      },
      applyDetail() {
        this.visibleApplyDetail = true
      }
    },
  }
</script>

<style>
  .meetingApply {
    width: 80%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    margin-top: 20px;
  }

  .meetingInfoPer {
    flex: 5;
    font-size: 14px;
    font-weight: bold;
    border-collapse: separate;
  }

  .meetingInfoPer tr td {
    margin-right: 10px;
  }

  .meetingInfoPer tr:nth-of-type(1) td {
    width: 40%;
    margin-top: 20px;
  }

  .meetingInfoPer tr td .bgc {
    padding: 6px 6px;
    border-radius: 10px;
    margin-left: 80px;
    font-weight: normal;
  }
</style>