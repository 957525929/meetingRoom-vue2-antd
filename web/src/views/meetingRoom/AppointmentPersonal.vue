<template>
  <!-- 会议室预约 -->
  <a-card :bordered="false">
    <div class="meetingApply">
      <table class="meetingInfoPer">
        <tbody>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">负责人姓名</label>
              <div class="bgc">
                <a-input placeholder="请输入负责人姓名" :style="{ width: '80%' }" v-model="responsibleName"></a-input>
              </div>
            </td>
            <td>
              <label :style="{ marginLeft: '100px' }">负责人电话</label>
              <div class="bgc">
                <a-input placeholder="请输入负责人电话" :style="{ width: '80%' }" v-model="responsibleTel"></a-input>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议名称</label>
              <div class="bgc">
                <a-input placeholder="请输入会议名称" :style="{ width: '80%' }" v-model="meetingName"></a-input>
              </div>
            </td>
            <td>
              <label :style="{ marginLeft: '100px' }">参会人数</label>
              <div class="bgc">
                <a-input placeholder="请输入参会人数" :style="{ width: '80%' }" v-model="meetingNumber"></a-input>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议时间</label>
              <div class="bgc">
                <a-date-picker
                  placeholder="请选择会议时间"
                  :style="{ width: '430px' }"
                  :format="dateFormat"
                  :defaultValue="moment(getCurrentData(), 'YYYY年MM月DD日')"
                ></a-date-picker>
              </div>
            </td>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议午别</label>
              <div class="bgc">
                <a-select v-model="meetingRange" placeholder="请选择午别" :style="{ width: '80%' }">
                  <a-select-option value="上午">上午</a-select-option>
                  <a-select-option value="下午">下午</a-select-option>
                  <a-select-option value="晚上">晚上</a-select-option>
                  <a-select-option value="全天">全天</a-select-option>
                </a-select>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议地点</label>
              <div class="bgc">
                <a-cascader
                  :options="optionsRoom"
                  placeholder="请选择会议室"
                  v-model="meetingRoom"
                  @change="onChangeRoom"
                  style="width: 425px"
                  :display-render="displayRender"
                />
              </div>
            </td>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议室状态</label>
              <div class="bgc">
                <span v-if="busyRoom" style="color: red">已预约</span>
                <span v-if="noneRoom" style="color: green">空闲</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">是否会务安排</label>
              <div class="bgc">
                <a-switch @change="onChangeArrange" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <!-- 会务安排 -->
              <PurInTable
                v-if="modalVisible"
              ></PurInTable>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <label :style="{ marginLeft: '100px' }">备注</label>
              <div class="bgc">
                <a-textarea
                  v-model="meetingComments"
                  placeholder="请输入会议备注信息"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                  :style="{ width: '80%' }"
                />
              </div>
            </td>
          </tr>
          <br />
          <tr>
            <td colspan="3">
              <a-button
                @click="submitApply"
                shape="round"
                size="large"
                type="primary"
                :style="{ width: '150px', marginLeft: '40%' }"
                >提交申请</a-button
              >
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
          <a-textarea
            placeholder="请输入强制预约原因"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            :style="{ width: '400px' }"
          />
        </a-clo>
      </a-row>
    </a-modal>
  </a-card>
</template>
<script>
import moment from 'moment'
import PurInTable from './PurInTable'
import { dataRoom } from './data/dataRoom.js'
// const plainOptions = ['茶水', '白板', '空调', '投影仪', '电脑', '摄像机']
const optionsRoom = [
  {
    value: '福建师范大学',
    label: '福建师范大学',
    children: [
      {
        value: '旗山校区',
        label: '旗山校区',
        children: [
          {
            value: '1号楼',
            label: '1号楼',
            children: [
              {
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
            children: [
              {
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
        children: [
          {
            value: '1号楼',
            label: '1号楼',
            children: [
              {
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
    ],
  },
]
export default {
  components: {
    PurInTable,
  },
  data() {
    return {
      responsibleName: '王安',
      responsibleTel: '15877875112',
      meetingName: '安全管理会议',
      meetingNumber: '6',
      meetingRange: '全天',
      dateFormat: 'YYYY年MM月DD日', //会议时间
      meetingComments: '',
      // plainOptions,
      // indeterminate: true,
      // checkAll: false,
      // meetingCondition: ['茶水', '白板', '空调'],
      optionsRoom,
      meetingRoom: [],
      busyRoom: false,
      noneRoom: false,
      visibleReason: false,
       modalVisible: false,
       dataRoom:dataRoom
    }
  },
  created() {
    // console.log(this.optionsRoom)
    // let a, a1
    // this.optionsRoom[0].children.forEach((item1) => {
    //   console.log('item1', item1)
    //   a = this.optionsRoom[0].value + '.' + item1.value
    //   item1.children.forEach((item2) => {
    //     console.log('item2', item2)
    //     a1 = a + '.' + item2.value
    //     console.log(a1)
    //   })
    // })
  },
  methods: {
    moment,
    getCurrentData() {
      return new Date().toLocaleDateString()
    },
    displayRender({ labels }) {
      return labels.join('.')
    },
    onChangeRoom(value) {
      let areaValue = value[0] + '.' + value[1] + '.' + value[2]
      this.dataRoom.forEach((element) => {
        if (areaValue == element.area && element.room == value[3]) {
          console.log(element.state)
          if (element.state == '空闲') {
            this.noneRoom = true
            this.busyRoom = false
          }
          if (element.state == '已预约') {
            this.noneRoom = false
            this.busyRoom = true
          }
        }
      })
    },
    submitApply() {
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
      if(checked){
        this.modalVisible=true
      }else{
         this.modalVisible=false
      }
    },
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
