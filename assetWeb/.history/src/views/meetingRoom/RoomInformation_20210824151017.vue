<template>
  <!-- 会议室信息管理 -->
  <a-card :bordered="false">
    <!-- 搜索操作区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>状态：</span>
        </a-col>
        <a-col>
          <a-select placeholder="请选择会议室状态" style="width: 200px" allowClear v-model="queryParam.state">
            <a-select-option value="0">空闲</a-select-option>
            <a-select-option value="1">开会中</a-select-option>
            <a-select-option value="2">禁用</a-select-option>
            <a-select-option value="">全部</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>位置：</span>
        </a-col>
        <a-col>
          <a-cascader
            style="width: 300px"
            :options="selectOptions"
            change-on-select
            @click="handlePlaceTree"
            placeholder="请选择位置"
            :display-render="displayRender"
          />
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>房间号：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入房间号" v-model="queryParam.roomNum"></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <!-- <a-col>
          <span>管理员：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入管理员姓名" v-model="queryParam.dutyName"></a-input>
        </a-col>
        <a-col :span="1"></a-col> -->
        <a-col>
          <a-button :style="{ background: '#49a9ee', color: 'white' }" icon="search" @click="searchQuery"
            >查询</a-button
          >
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-col>
        <!--        <a-col>-->
        <!--          <a-button-->
        <!--            @click="addRoom()"-->
        <!--            icon="plus"-->
        <!--            :style="{ color: 'white', background:'orange'}"-->
        <!--          >新增会议室</a-button>&nbsp;&nbsp;-->
        <!--          <a-button>-->
        <!--            <a-icon type="download" />导出-->
        <!--          </a-button>-->
        <!--        </a-col>-->
      </a-row>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;margin-top: 20px">
      <a-button @click="addRoom" type="primary" icon="plus">添加</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('会议室信息')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        @change="handleImportExcel"
      >
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!--      <a-button type="primary" icon="hdd" @click="recycleBinVisible=true">回收站</a-button>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <div id="dataRoomTable">
      <a-table
        :data-source="this.handlerTable"
        :pagination="ipagination"
        rowKey="meetingroomId"
        @change="handleTableChange"
      >
        <a-table-column title="#" data-index="meetingroomId" align="center" fixed="left" width="150px"></a-table-column>
        <a-table-column title="位置" data-index="placeName" align="center"></a-table-column>
        <a-table-column title="房间号" data-index="room" align="center"></a-table-column>
        <a-table-column title="状态" data-index="meetingRoomState" align="center">
          <template slot-scope="meetingRoomState">
            <span v-if="meetingRoomState == 0">
              <a-tag color="green">
                空闲
              </a-tag>
            </span>
            <span v-else-if="meetingRoomState == 2">
              <a-tag color="blue">
                禁用
              </a-tag>
            </span>
            <span v-else>
              <a-tag color="red">
                开会中
              </a-tag>
            </span>
          </template>
        </a-table-column>
        <a-table-column title="容纳人数" data-index="number" align="center"></a-table-column>
        <a-table-column title="基本条件" data-index="condition" align="center">
          <template slot-scope="condition">
            <span v-if="condition.split(',')[0] == '1'">黑板 </span>
            <span v-if="condition.split(',')[1] == '1'">演示电脑 </span>
            <span v-if="condition.split(',')[2] == '1'">投影仪 </span>
            <span v-if="condition.split(',')[3] == '1'">白板 </span>
          </template>
        </a-table-column>
        <a-table-column title="操作" align="center">
          <template slot-scope="record">
            <!-- <a href="javascript:;" @click="detail(record)" :style="{  color: 'orange' }">详情</a>
            <a-divider type="vertical" /> -->
            <a href="javascript:;" @click="Modify(record)" :style="{ color: 'blue' }">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record。meetingroomId)">
              <a href="javascript:;" :style="{ color: 'red' }">删除</a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
      <br />
      <!-- <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" /> -->
    </div>

    <!-- 新增 -->
    <a-drawer :visible="visibleAdd" title="新增会议室" width="600px" placement="right" @close="addClose">
      <a-form-model ref="ruleForm" :model="formAdd" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item ref="area" label="位置" prop="placeName" placeholder="请选择位置">
          <a-cascader
            style="width: 410px"
            :options="selectOptions"
            v-model="formAdd.placeName"
            change-on-select
            @change="areaChange"
            placeholder="请选择位置"
            :display-render="displayRender"
            @click="handlePlaceTree"
          />
        </a-form-model-item>
        <a-form-model-item ref="room" label="房间号" prop="room">
          <a-input v-model="formAdd.room" placeholder="请输入房间号"></a-input>
        </a-form-model-item>
        <a-form-model-item ref="number" label="容纳人数" prop="number">
          <a-input v-model="formAdd.number" placeholder="请输入房间容纳人数"></a-input>
        </a-form-model-item>
        <a-form-model-item label="基本条件" ref="condition" prop="condition">
          <a-checkbox-group @change="onChangeCon" v-model="formAdd.condition">
            <a-row>
              <a-col :span="8">
                <a-checkbox value="黑板" v-model="formAdd.blackboard">
                  黑板
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="演示电脑" v-model="formAdd.pc">
                  演示电脑
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="投影仪" v-model="formAdd.projector">
                  投影仪
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="白板" v-model="formAdd.whiteboard">
                  白板
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item ref="dutyName" label="管理员" prop="dutyName">
          <!-- <a-input v-model="formAdd.dutyName" placeholder="请输入管理员"></a-input> -->
          <a-select showSearch v-model="formAdd.dutyName" placeholder="请选择管理员" @change="addDutyName">
            <a-select-option value="李霞">李霞</a-select-option>
            <a-select-option value="尤晓梅">尤晓梅</a-select-option>
            <a-select-option value="黄丽娟">黄丽娟</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="管理员电话" prop="dutyTel">
          <a-input v-model="formAdd.dutyTel" placeholder="请输入管理员电话" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" @click="onSubmitAdd()">创建</a-button>
          <a-button style="margin-left: 10px;" @click="resetFormAdd()">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>

    <!--修改信息 -->
    <a-drawer :visible="visibleModify" title="修改会议室信息" @close="modifyClose" width="600px" placement="right">
      <a-form-model ref="ruleForm" :model="formModify" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="位置" prop="placeName">
          <a-input v-model="formModify.placeName" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="房间号" prop="room">
          <a-input v-model="formModify.room" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="formModify.state" :disabled="disabledState" @change="changeKey">
            <a-radio :value="0">
              空闲
            </a-radio>
            <a-radio :value="2">
              禁用
            </a-radio>
            <a-radio :value="1" disabled>
              开会中
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="容纳人数" prop="number">
          <a-input v-model="formModify.number"></a-input>
        </a-form-model-item>
        <a-form-model-item label="基本条件" prop="condition">
          <a-checkbox-group @change="onChangeCon" v-model="formModify.condition">
            <a-row>
              <a-col :span="8">
                <a-checkbox value="黑板">
                  黑板
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="演示电脑">
                  演示电脑
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="投影仪">
                  投影仪
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="白板">
                  白板
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" @click="onSubmitModify()">修改</a-button>
          <a-button style="margin-left: 10px;" @click="CancelModify()">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
  </a-card>
</template>

<script>
import { areaData } from './data/area.js'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { addMeetingRoom, deleteMeetingRoom } from '@/api/meeting'

export default {
  mixins: [JeecgListMixin],
  data() {
    return {
      selectOptions: areaData,
      visibleAdd: false,
      visibleModify: false,
      handlerTable: [],
      handlerModify: [],
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
      handleFormAddData: [],
      formAdd: {
        placeName: [],
        room: '',
        number: '',
        dutyName: '',
        dutyTel: '',
        condition: [],
        blackboard: '',
        pc: '',
        projector: '',
        whiteboard: '',
        meetingRoomSize: '',
        meetingRoomState: '',
        meetingRoomStateName: '',
        meetingroomId: ''
        // remark: ''
      },
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      formModify: {
        number: '',
        // placeName: '',
        dutyTel: '',
        condition: [],
        state: ''
      },
      rules: {
        condition: [
          {
            required: true,
            message: '请选择基本条件',
            trigger: 'change'
          }
        ],
        placeName: [
          {
            required: true,
            message: '请选择位置',
            trigger: 'change'
          }
        ],
        room: [
          {
            required: true,
            message: '请输入房间号',
            trigger: 'blur'
          }
        ],
        number: [
          {
            required: true,
            message: '请输入容纳人数（个）',
            trigger: 'blur'
          }
        ],
        dutyName: [
          {
            required: true,
            message: '请输入管理员',
            trigger: 'blur'
          }
        ],
        dutyTel: [
          {
            required: true,
            message: '请输入管理员电话',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入地点',
            trigger: 'blur'
          }
        ]
      },
      visibleDetail: false,
      // formDetail: {},
      disabledState: false,
      url: {
        list: '/MeetingRoomController/queryMeetingRoom',
        exportXlsUrl: '/sys/user/exportXls'
      }
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
    getTableData() {
      return this.dataSource
    }
  },
  methods: {
    displayRender({ labels }) {
      this.queryParam.placeName = labels.join('.')
      return labels.join('.')
    },
    areaChange(value) {
      console.log(value)
    },
    onChangeCon(checkedValues) {
      console.log('checked = ', checkedValues)
      // console.log('value = ', this.value)
      this.checkedValuesData = checkedValues
    },
    searchReset() {
      // this.dataRoom = dataRoom
      this.queryParam.IDName = ''
      // console.log('this.$store.state.token',this.$store.state.user.token)
      // let params={id:1}
      // getAction('/MeetingRoomController/getPlaceByPid', params).then((res) => {
      // console.log('1',res)
      // })
    },
    addRoom() {
      this.visibleAdd = true
      // console.log(this.dataSource)

      // console.log(this.handlerTable)
    },
    addDutyName(value) {
      if (value == '李霞') {
        this.formAdd.dutyTel = '13759655332'
      }
      if (value == '尤晓梅') {
        this.formAdd.dutyTel = '13053955537'
      }
      if (value == '黄丽娟') {
        this.formAdd.dutyTel = '13659655381'
      }
    },
    onSubmitAdd() {
      this.$refs.ruleForm.validate(valid => {
        this.checkedValuesData.map(item => {
          if (item == '白板') {
            this.formAdd.whiteboard = 1
          } else {
            this.formAdd.whiteboard = 0
          }
          if (item == '黑板') {
            this.formAdd.blackboard = 1
          } else {
            this.formAdd.blackboard = 0
          }
          if (item == '投影仪') {
            this.formAdd.projector = 1
          } else {
            this.formAdd.projector = 0
          }
          if (item == '演示电脑') {
            this.formAdd.pc = 1
          } else {
            this.formAdd.pc = 0
          }
        })
        this.handleFormAddData.push({
          meetingroomId: this.ipagination.total + 1,
          whiteboard: this.formAdd.whiteboard,
          blackboard: this.formAdd.blackboard,
          number: this.formAdd.number,
          projector: this.formAdd.projector,
          pc: this.formAdd.pc,
          meetingRoomState: 0,
          meetingRoomStateName: null,
          placeName: this.formAdd.placeName.join('.'),
          meetingRoomSize: this.formAdd.meetingRoomSize
        })
        if (valid) {
          // let length = this.dataHotel.length;
          // this.dataHotel[length] = this.formAdd;
          // this.dataRoom.push(this.formAdd)

          console.log('11111')

          addMeetingRoom(this.handleFormAddData[0])
            .then(response => {
              if (response.code == 200) {
                this.$message.success('添加成功!')
                this.loadData()
              }
              // this.formAdd = {}
            })
            .catch(err => {
              console.log('报错')
              console.log(this.handleFormAddData)
            })

          this.visibleAdd = false
          // console.log(this.handleFormAddData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetFormAdd() {
      this.$refs.ruleForm.resetFields()
    },
    onDelete(index) {
      console.log(index)
      // deleteMeetingRoom({ id: index }).then(response => {
      //   this.$message.success('添加成功!')
      //   this.loadData()
      // })
    },
    Download() {
      console.log('下载')
    },
    changeKey(value) {
      console.log(value)
    },
    Modify(record) {
      this.visibleModify = true
      // console.log(record.condition.split(','))
      this.handlerModify = []
      if (record.condition.split(',')[0] == '1') {
        this.handlerModify.push('黑板')
      }
      if (record.condition.split(',')[1] == '1') {
        this.handlerModify.push('演示电脑')
      }
      if (record.condition.split(',')[2] == '1') {
        this.handlerModify.push('投影仪')
      }
      if (record.condition.split(',')[3] == '1') {
        this.handlerModify.push('白板')
      }
      console.log('1212111')
      console.log(record.meetingRoomState)
      this.formModify.area = record.area
      this.formModify.room = record.room
      this.formModify.number = record.number
      this.formModify.placeName = record.placeName
      this.formModify.condition = this.handlerModify
      // this.formModify.dutyTel = record.dutyTel
      this.formModify.state = record.meetingRoomState
      console.log(this.formModify.state)
      if (record.meetingRoomState == '1') {
        this.disabledState = true
      } else {
        this.disabledState = false
      }
      console.log(this.formModify.condition)
      //this.formModify.condition = record.condition
    },
    ModifyDutyName(value) {
      if (value == '李霞') {
        this.formModify.dutyTel = '13759655332'
      }
      if (value == '尤晓梅') {
        this.formModify.dutyTel = '13053955537'
      }
      if (value == '黄丽娟') {
        this.formModify.dutyTel = '13659655381'
      }
    },
    onSubmitModify() {
      this.visibleModify = false
      // this.dataHotel.dutyName = this.formModify.dutyName;
      // this.dataHotel.dutyTel = this.formModify.dutyTel;
      // this.dataHotel.address = this.formModify.address;
      // this.dataHotel.remark = this.formModify.remark;
      this.$message.success('修改成功')
    },
    CancelModify() {
      this.visibleModify = false
    },
    // detail(record) {
    //   this.visibleDetail = true
    //   console.log(record)
    //   this.formDetail.area = record.area
    //   this.formDetail.room = record.room
    //   this.formDetail.number = record.number
    //   this.formDetail.state = record.state
    //   this.formDetail.dutyName = record.dutyName
    //   this.formDetail.condition = record.condition.split('，')
    //   this.formDetail.dutyTel = record.dutyTel
    // },
    // detailClose() {
    //   this.$emit('close')
    //   this.visibleDetail = false
    // },
    addClose() {
      this.$emit('close')
      this.visibleAdd = false
    },
    modifyClose() {
      this.$emit('close')
      this.visibleModify = false
    },
    handlePlaceTree() {
      if (areaData[0].children.length == 0) {
        for (let i = 0; i < this.firstTree.length; i++) {
          areaData[0].children.push({
            label: this.firstTree[i].placeName,
            value: this.firstTree[i].placeName,
            children: []
          })
        }
      }

      if (areaData[0].children[0].children.length == 0) {
        for (let i = 0; i < this.placeTreeTwo.length; i++) {
          areaData[0].children[0].children.push({
            label: this.placeTreeTwo[i].placeName,
            value: this.placeTreeTwo[i].placeName
          })
        }
      }

      if (areaData[0].children[1].children.length == 0) {
        for (let i = 0; i < this.placeTreeTwo2.length; i++) {
          areaData[0].children[1].children.push({
            label: this.placeTreeTwo2[i].placeName,
            value: this.placeTreeTwo2[i].placeName
          })
        }
      }

      if (areaData[0].children[2].children.length == 0) {
        for (let i = 0; i < this.placeTreeTwo3.length; i++) {
          areaData[0].children[2].children.push({
            label: this.placeTreeTwo3[i].placeName,
            value: this.placeTreeTwo3[i].placeName
          })
        }
      }

      if (areaData[0].children[3].children.length == 0) {
        for (let i = 0; i < this.placeTreeTwo4.length; i++) {
          areaData[0].children[3].children.push({
            label: this.placeTreeTwo4[i].placeName,
            value: this.placeTreeTwo4[i].placeName
          })
        }
      }

      if (areaData[1].children.length == 0) {
        for (let i = 0; i < this.firstTree1.length; i++) {
          areaData[1].children.push({
            label: this.firstTree1[i].placeName,
            value: this.firstTree1[i].placeName,
            children: []
          })
        }
      }

      if (areaData[1].children[0].children.length == 0) {
        for (let i = 0; i < this.placeTreeTwo1.length; i++) {
          areaData[1].children[0].children.push({
            label: this.placeTreeTwo1[i].placeName,
            value: this.placeTreeTwo1[i].placeName
          })
        }
      }
      console.log(areaData)
    },
    handlerTableData() {
      // console.log('00000000000000000000000')
      // console.log(this.dataSource)
      this.dataSource.map(item => {
        this.handlerTable.push({
          blackboard: item.blackboard,
          meetingRoomSize: item.meetingRoomSize,
          meetingRoomState: item.meetingRoomState,
          meetingRoomStateName: item.meetingRoomStateName,
          meetingroomId: item.meetingroomId,
          number: item.number,
          pc: item.pc,
          placeName: item.placeName,
          projector: item.projector,
          whiteboard: item.blackboard,
          room: item.placeName.split('.')[2],
          condition: item.blackboard + ',' + item.pc + ',' + item.projector + ',' + item.whiteboard
        })
        // console.log(item)
      })
    }
  },
  watch: {
    dataSource: 'handlerTableData'
  }
}
</script>
<style>
#dataRoomTable {
  margin-top: 20px;
}
</style>
