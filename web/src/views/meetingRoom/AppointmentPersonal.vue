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
                <j-date v-model="apply.date" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
                  placeholder="请选择开始时间" :style="{ width: '340px' }"></j-date>
              </div>
            </td>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议午别</label>
              <div class="bgc">
                <a-select placeholder="请选择午别" :style="{ width: '60%' }" :default-value="1" v-model="apply.period">
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

                <PurInTree :style="{ width: '340px' }" @displayRender="displayRender" v-model="apply.location">
                </PurInTree>
              </div>
            </td>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">会议室状态</label>
              <div class="bgc">
                <span style="color: red" v-if="roomState=='已预约'">已预约</span>
                <a-button @click="applyDetail()" type="primary" style="margin-left: 20px" v-if="roomState=='已预约'">
                  预约详情
                </a-button>
                <span v-if="roomState=='空闲'" style="color: green">空闲</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label :style="{ marginLeft: '100px' }">是否会务安排</label>
              <div class="bgc">
                <a-switch @change="onChangeArrange" v-model="checkedNeedArrangement" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <!-- 会务安排 -->
              <!-- <PurInTable v-if="modalVisible" @arrangementList="arrangementList"></PurInTable> -->
              <a-card class="puInTable" v-if="modalVisible">
                <j-editable-table ref="detailInfoForm" :columns="columns" :dataSource="dataSource" :maxHeight="300"
                  :rowNumber="true" :rowSelection="true" :actionButton="true">
                  <template v-slot:studentId="props">
                    <a-select show-search @change="changeName($event, props)" :style="{ width: '300px' }"
                      placeholder="请选择姓名">
                      <a-select-option v-for="item in optionsArrangeName" :key="item.value" :value="item.studentId">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </template>
                </j-editable-table>
              </a-card>
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
          <a-textarea placeholder="请输入强制预约原因" :auto-size="{ minRows: 3, maxRows: 5 }" style="width:450px"
            v-model="apply.cancelReason" />
        </a-col>
      </a-row>
    </a-modal>

    <!--已预约详情 -->
    <a-modal v-model="visibleApplyDetail" @ok="visibleApplyDetail=false" @cancel="visibleApplyDetail=false"
      width="500px">
      <a-descriptions title="预约详情" :column='2' v-for="item in selectMeeting" :key="item.reserveId">
        <a-descriptions-item label="预约人姓名">
          {{item.userName}}
        </a-descriptions-item>
        <a-descriptions-item label="预约人电话">
          {{item.userPhone}}
        </a-descriptions-item>
        <a-descriptions-item label="会议时间">
          {{item.dateDay}}
        </a-descriptions-item>
        <a-descriptions-item label="会议午别">
          <span v-if="item.period==1">上午</span>
          <span v-if="item.period==2">下午</span>
          <span v-if="item.period==3">晚上</span>
          <span v-if="item.period==4">全天</span>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>

  </a-card>
</template>
<script>
  import JDate from '@/components/jeecg/JDate'
  import moment from 'moment'
  import PurInTree from './PurInTree'
  import JEditableTable from '@/components/jeecg/JEditableTable'
  import {
    FormTypes
  } from '@/utils/JEditableTableUtil'
  // import PurInTable from './PurInTable'
  import {
    postAction,
    getAction,
  } from '@/api/manage'
  export default {
    components: {
      // PurInTable,
      JEditableTable,
      PurInTree,
      JDate
    },
    data() {
      return {
        apply: {
          arrangementList: [],
          meetingName: '安全管理会议',
          number: '6',
          period: 1,
          date: '',
          location: '',
          needArrangement: 0,
          remark: '',
          cancelReason: ''
        },
        checkedNeedArrangement: false,
        roomState: '',
        selectMeeting: [],
        dateFormat: 'YYYY-MM-DD',
        visibleReason: false,
        modalVisible: false,
        visibleApplyDetail: false,
        optionsArrangeName: [],
        form1: this.$form.createForm(this),
        dataSource: [],
        columns: [{
            title: '姓名',
            key: 'studentId',
            type: FormTypes.slot,
            placeholder: '请选择${title}',
            validateRules: [{
              required: true,
              message: '${title}不能为空'
            }],
            slotName: 'studentId'
          },
          {
            title: '联系电话',
            key: 'telephone',
            type: FormTypes.input,
            validateRules: [{
              required: true,
              message: '${title}不能为空'
            }],
            slotName: 'telephone',
            width: '25%'
          },
          {
            title: '安排事项',
            key: 'arrangeContent',
            type: FormTypes.input_pop,
            placeholder: '请输入${title}',
            validateRules: [{
              required: true,
              message: '${title}不能为空'
            }]
          }
        ]
      }
    },
    created() {
      getAction('/StudentController/getStudentList', {
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        // console.log('res', res)
        if (res.code == 200) {
          res.data.list.forEach(element => {
            this.optionsArrangeName.push(element)
          })
        }
      })
      let now = moment(new Date()).subtract(-1, 'days').format('YYYY-MM-DD')
      let dat = moment(now, 'YYYY-MM-DD')
      this.$set(this.apply, "date", dat._i)
    },
    watch: {
      'apply.location': {
        handler(value) {
          console.log('location', value)
          this.querypostAction()
        }
      },
      'apply.period': {
        handler(value) {
          this.querypostAction()
        }
      },
      'apply.date': {
        handler(value) {
          this.querypostAction()
        }
      }
    },
    methods: {
      displayRender(data) {
        this.apply.location = data
      },
      querypostAction() {
        if (this.apply.date && this.apply.location && this.apply.period) {
          let parameter = {
            dateDay: this.apply.date,
            meetingRoomName: this.apply.location,
            period: this.apply.period
          }
          this.selectMeeting = []
          postAction('/ReservationController/isReserved', parameter).then(res => {
            if (res.code == 200) {
              if (res.data.length) {
                res.data.forEach(element => {
                  if (element.statusName == '待开会' || element.statusName == '开会中') {
                    this.selectMeeting.push(element)
                    this.roomState = '已预约'
                  }
                })
              } else {
                this.roomState = '空闲'
              }
            }
          })
        } else {
          this.roomState = ''
        }
      },
      arrangementList(data) {
        // console.log('222', data)
        this.apply.arrangementList = []
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let a = {
              studentId: data[i].studentId,
              arrangeContent: data[i].arrangeContent
            }
            this.apply.arrangementList.push(a)
          }
        }
      },
      submitApply() {
        if (this.apply.needArrangement == 1) {
          this.form1.validateFields((err, values) => {
            if (!err) {
              this.$refs.detailInfoForm.getValues((err, values) => {
                // console.log('values', values)
                if (values.length == 0) {
                    console.log('111', values)
                  this.submitApplyOK()
                } else {
                  //再验证详细信息
                  if (!err && values.length) {
                    this.arrangementList(values)
                    this.submitApplyOK()
                  }
                }
              })
            }
          })
        } else {
          this.submitApplyOK()
        }
      },
      submitApplyOK() {
        if (this.apply.meetingName == '' || this.apply.number == '' || this.apply.date == '' || this.apply.location ==
          '') {
          this.$message.warning('会议名称、参会人数、会议时间、会议时段、会议地点均需填写')
        } else {
          if (this.roomState == '空闲') {
            let parameter = this.apply
            postAction('/ReservationController/addCompulsoryReservation', parameter).then(res => {
              if (res.code == 200) {
                this.$message.success('预约成功')
                this.resetApplyData()
              } else {
                this.$message.warning(res.message + '，预约失败')
              }
            })
          } else {
            const _this = this
            this.$confirm({
              title: '是否确定强制预约会议室',
              content: '',
              okText: '是',
              cancelText: '否',
              onOk() {
                // console.log('ok')
                _this.visibleReason = true
              },
            })
          }
        }
      },
      handleOkReason() {
        if (this.apply.cancelReason) {
          this.visibleReason = false
          // console.log('this.apply', this.apply)
          let parameter = this.apply
          postAction('/ReservationController/addCompulsoryReservation', parameter).then(res => {
            if (res.code == 200) {
              this.$message.success('强制预约成功')
              this.resetApplyData()
            } else {
              this.$message.warning(res.message + '，强制预约失败')
            }
          })
        } else {
          this.$message.warning('请输入强制预约原因')
        }
      },
      resetApplyData() {
        this.apply.arrangementList = []
        this.apply.needArrangement = 0
        this.apply.remark = ''
        this.apply.cancelReason = ''
        this.checkedNeedArrangement = false
        this.modalVisible = false
      },
      handleCancelReason() {
        this.visibleReason = false
      },
      onChangeArrange(checked) {
        if (checked) {
          this.modalVisible = true
          this.checkedNeedArrangement = true
          this.apply.needArrangement = 1
        } else {
          this.modalVisible = false
          this.checkedNeedArrangement = false
          this.apply.needArrangement = 0
        }
      },
      applyDetail() {
        this.visibleApplyDetail = true
      },
      changeName(value, props) {
        // console.log(value, props)
        // console.log(props.getValue())
        let tel = ''
        this.optionsArrangeName.forEach(item => {
          if (item.studentId == value) {
            tel = item.telephone
          }
        })
        let {
          rowId,
          target
        } = props
        target.setValues([{
            rowKey: rowId,
            values: {
              telephone: tel
            }
          },
          {
            rowKey: rowId,
            values: {
              studentId: value
            }
          },
        ])
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

  .ant-row.ant-form-item {
    margin-bottom: 12px;
  }

  .puInTable {
    margin-left: 100px;
    width: 80%;
  }
</style>