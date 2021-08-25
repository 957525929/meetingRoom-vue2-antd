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
                  :defaultValue="moment(getCurrentData(),'YYYY-MM-DD')" @change="onChangeTime">
                </a-date-picker>
              </div>
            </td>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议午别</label>
              <div class="bgc">
                <a-select placeholder="请选择午别" :style="{ width: '60%' }" @change="handleChangePeriod" :default-value="4">
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
                <PurInTree :style="{ width: '340px' }" @displayRender="displayRender">
                </PurInTree>
              </div>
            </td>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议室状态</label>
              <div class="bgc">
                <span style="color: red" v-if="this.roomState">{{roomState}}</span>
                <a-button @click="applyDetail()" type="primary" style="margin-left: 20px" v-if="this.roomState=='已预约'">
                  预约详情
                </a-button>
                <!-- <span v-if="roomState==0" style="color: green">空闲</span> -->
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">是否会务安排</label>
              <div class="bgc">
                <a-switch @change="onChangeArrange" :default-checked="false" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <!-- 会务安排 -->
              <PurInTable v-if="modalVisible" @arrangementList="arrangementList"></PurInTable>
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
                :style="{ width: '150px', marginLeft: '40%' }" >提交申请</a-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--强制预约原因 -->
    <a-modal v-model="visibleReason" title="强制预约原因" @ok="handleOkReason" @cancel="handleCancelReason">
      <a-row type="flex" align="middle">
        <!-- <a-col>
          <span>原因：</span>
        </a-col> -->
        <a-col>
          <a-textarea placeholder="请输入强制预约原因" :auto-size="{ minRows: 3, maxRows: 5 }" style="width:450px"
            v-model="apply.cancelReason" />
        </a-col>
      </a-row>
    </a-modal>

    <!--已预约详情 -->
    <a-modal v-model="visibleApplyDetail" @ok="visibleApplyDetail=false" @cancel="visibleApplyDetail=false"
      width="500px">
      <a-descriptions title="预约详情" :column='2'>
        <a-descriptions-item label="预约人姓名">
          {{selectMeeting.userName}}
        </a-descriptions-item>
        <a-descriptions-item label="预约人电话">
          {{selectMeeting.userPhone}}
        </a-descriptions-item>
        <a-descriptions-item label="会议时间">
          {{selectMeeting.dateDay}}
        </a-descriptions-item>
        <a-descriptions-item label="会议午别">
          <span v-if="selectMeeting.period==1">上午</span>
          <span v-if="selectMeeting.period==2">下午</span>
          <span v-if="selectMeeting.period==3">晚上</span>
          <span v-if="selectMeeting.period==4">全天</span>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>

  </a-card>
</template>
<script>
  import moment from 'moment'
  import PurInTree from './PurInTree'
  import PurInTable from './PurInTable'
  import {
    postAction
  } from '@/api/manage'
  export default {
    components: {
      PurInTable,
      PurInTree,
    },
    data() {
      return {
        apply: {
          arrangementList:[],
          meetingName: '安全管理会议',
          number: '6',
          period: 4,
          date: '',
          location: '',
          needArrangement: 0,
          remark: '',
          cancelReason: ''
        },
        roomState: '',
        selectMeeting: {},
        dateFormat: 'YYYY-MM-DD',
        visibleReason: false,
        modalVisible: false,
        visibleApplyDetail: false,
      }
    },
    created() {},
    watch: {
      'apply.location': {
        handler(value) {
          // console.log('location', value)
          this.querypostAction()
        }
      },
      'apply.period': {
        handler(value) {
          // console.log('period', value)
          this.querypostAction()
        }
      },
      // 'apply.date': {
      //   handler(value) {
      //     console.log('date1', value)
      //     //  this.apply.date=value
      //      this.querypostAction()
      //   }
      // }
    },
    methods: {
      moment,
      getCurrentData() {
        let now = moment(new Date()).format('YYYY-MM-DD')
        let dat = this.moment(now, 'YYYY-MM-DD')
        this.apply.date = dat._i
        return dat._i
        //  this.apply.date = new Date().toLocaleDateString().split('/').join('-');
        //  let dat=new Date().toLocaleDateString()
        //  console.log(dat)
        // return new Date().toLocaleDateString()
      },
      onChangeTime(date, dateString) {
        //console.log(dateString);
        this.apply.date = dateString
        this.querypostAction()
      },
      handleChangePeriod(value) {
        this.apply.period = value
      },
      displayRender(data) {
        this.apply.location = data
      },
      querypostAction() {
        let parameter = {
          dateDay: this.apply.date,
          meetingRoomName: this.apply.location,
          period: this.apply.period
        }
        console.log('parameter', parameter)
        postAction('/ReservationController/isReserved', parameter).then(res => {
          console.log(res)
          if (res.code == 200) {
            if (res.data.statusName == '待开会') {
              this.selectMeeting=res.data
              this.roomState = '已预约'
            } else {
              this.roomState = '空闲'
            }
          } else {
            this.roomState = '空闲'
            //  this.$message.warning(res.message);
          }
        })
      },
      arrangementList(data){
        // data.forEach(element => {
        //   this.apply.arrangementList.studentId=element.studentId
        //    this.apply.arrangementList.arrangeContent=element.arrangeContent
        // });
         this.apply.arrangementList=data
      },
      submitApply() {
        console.log('this.apply', this.apply)
        const _this = this
        this.$confirm({
          title: '是否确定强制预约会议室',
          content: '',
          okText: '是',
          cancelText: '否',
          onOk() {
            console.log('ok')
            _this.visibleReason = true
          },
        })
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