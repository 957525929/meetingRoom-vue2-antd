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
            <a-select-option :value="0">空闲</a-select-option>
            <a-select-option :value="1">开会中</a-select-option>
            <a-select-option :value="2">禁用</a-select-option>
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
            @click="handlePlaceTree"
            placeholder="请选择位置"
            v-model="queryParam.place"
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
      <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
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
      </a-dropdown> -->
    </div>

    <div id="dataRoomTable">
      <a-table
        :dataSource="dataSource"
        :pagination="ipagination"
        rowKey="meetingroomId"
        @change="handleTableChange"
        :loading="loading"
      >
        <a-table-column
          title="#"
          data-index="meetingroomId"
          align="center"
          fixed="left"
          width="150px"
        
        ></a-table-column>
        <a-table-column title="位置" data-index="placeName" align="center">
          <template slot-scope="placeName">
            <span>{{ placeName.split('.')[0] }}.{{ placeName.split('.')[1] }}</span>
          </template>
        </a-table-column>
        <a-table-column title="房间号" align="center">
          <template slot-scope="record">
            <span>{{ record.placeName.split('.')[2] }}</span>
          </template>
        </a-table-column>
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
        <a-table-column title="基本条件" align="center">
          <template slot-scope="record">
            <span v-if="record.pc == 1">演示电脑&emsp;</span>
            <span v-if="record.projector == 1">投影仪&emsp;</span>
            <span v-if="record.whiteboard == 1">白板&emsp;</span>
            <span v-if="record.blackboard == 1">黑板&emsp;</span>
          </template>
        </a-table-column>
        <a-table-column title="操作" align="center">
          <template slot-scope="record">
            <a href="javascript:;" @click="Modify(record)" :style="{ color: 'blue' }">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record.meetingroomId)">
              <a href="javascript:;" :style="{ color: 'red' }">删除</a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
      <br />
    </div>

    <!-- 新增 -->
    <a-drawer :visible="visibleAdd" title="新增会议室" width="600px" placement="right" @close="addClose">
      <a-form-model ref="ruleForm" :model="formAdd" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item ref="placeName" label="位置" prop="placeName">
          <a-cascader
            style="width: 410px"
            :options="selectOptions"
            v-model="formAdd.placeName"
            placeholder="请选择位置"
            :display-render="displayRenderAdd"
            @click="handlePlaceTree"
          />
        </a-form-model-item>
        <a-form-model-item label="房间号" ref="room" prop="room">
          <a-input v-model="formAdd.room" placeholder="请输入房间号"></a-input>
        </a-form-model-item>
        <!-- <a-form-model-item label="状态">
          <a-radio-group v-model="formAdd.meetingRoomState">
            <a-radio :value="0">
              空闲
            </a-radio>
            <a-radio :value="2">
              禁用
            </a-radio>
            <a-radio :value="1">
              开会中
            </a-radio>
          </a-radio-group>
        </a-form-model-item> -->
        <a-form-model-item ref="number" label="容纳人数" prop="number">
          <a-input v-model="formAdd.number" placeholder="请输入房间容纳人数"></a-input>
        </a-form-model-item>
        <a-form-model-item label="基本条件" ref="condition" prop="condition">
          <a-checkbox-group @change="onChangeConAdd" v-model="formAdd.condition">
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
          <a-button type="primary" @click="onSubmitAdd()">创建</a-button>
          <a-button style="margin-left: 10px;" @click="resetFormAdd()">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>

    <!--修改信息 -->
    <a-drawer :visible="visibleModify" title="修改会议室信息" @close="modifyClose" width="600px" placement="right">
      <a-form-model ref="ruleForm" :model="formModify" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="位置" prop="placeName">
          <a-cascader
            style="width: 410px"
            :options="selectOptions"
            placeholder="请选择位置"
            :display-render="displayRenderModify"
            @click="handlePlaceTree"
            v-model="formModify.placeName"
          />
        </a-form-model-item>
        <a-form-model-item label="房间号" prop="room">
          <a-input v-model="formModify.room" placeholder="请输入房间号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="formModify.meetingRoomState">
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
          <a-checkbox-group v-model="formModify.condition">
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
import { addMeetingRoom, deleteMeetingRoom, updateMeetingRoom } from '@/api/meeting'
import { postAction } from '@/api/manage'
// import { deleteMeetingRoom } from '@/api/api'
// import { deletePostAction } from '@/api/msg'

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
      formAdd: {
        placeName: [],
        number: '',
        meetingRoomState: 0,
        condition: [],
        room: ''
      },
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      formModify: {
        number: '',
        placeName: [],
        room: '',
        condition: [],
        meetingRoomState: ''
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
        address: [
          {
            required: true,
            message: '请输入地点',
            trigger: 'blur'
          }
        ]
      },
      // formDetail: {},
      // disabledState: false,
      url: {
        list: '/MeetingRoomController/queryMeetingRoom',
        exportXlsUrl: '/sys/user/exportXls'
        // delete: '/MeetingRoomController/deleteMeetingRoomById'
      }
    }
  },

  mounted() {
    // console.log(this.$store)
    this.$store.dispatch('placeTree')
    this.$store.dispatch('placeTree1')
    // this.$store.dispatch('placeTreeTwo')
    // this.$store.dispatch('placeTreeTwo1')
    // this.$store.dispatch('placeTreeTwo2')
    // this.$store.dispatch('placeTreeTwo3')
    // this.$store.dispatch('placeTreeTwo4')
  },
  computed: {
    firstTree() {
      return this.$store.state.meeting.placeData
    },
    firstTree1() {
      return this.$store.state.meeting.placeData1
    }
    // placeTreeTwo() {
    //   return this.$store.state.meeting.placeDataTwo
    // },
    // placeTreeTwo1() {
    //   return this.$store.state.meeting.placeDataTwo1
    // },
    // placeTreeTwo2() {
    //   return this.$store.state.meeting.placeDataTwo2
    // },
    // placeTreeTwo3() {
    //   return this.$store.state.meeting.placeDataTwo3
    // },
    // placeTreeTwo4() {
    //   return this.$store.state.meeting.placeDataTwo4
    // },
    // getTableData() {
    //   return this.dataSource
    // }
  },
  watch: {},
  methods: {
    displayRender({ labels }) {
      this.queryParam.placeName = labels.join('.')
      // this.$set(this.queryParam, "placeName", labels.join('.'))
      return labels.join('.')
    },
    displayRenderModify({ labels }) {
      return labels.join('.')
    },
    displayRenderAdd({ labels }) {
      return labels.join('.')
    },
    onChangeConAdd(checkedValues) {
      console.log('checked = ', checkedValues)
      // console.log('value = ', this.value)
      // this.checkedValuesData = checkedValues
      this.formAdd.condition = checkedValues

      console.log(this.formAdd)
    },
    addRoom() {
      this.visibleAdd = true
    },
    onSubmitAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let parameter = {}
          parameter.whiteboard = this.formAdd.condition.indexOf('白板') > -1 ? 1 : 0
          parameter.blackboard = this.formAdd.condition.indexOf('黑板') > -1 ? 1 : 0
          parameter.projector = this.formAdd.condition.indexOf('投影仪') > -1 ? 1 : 0
          parameter.pc = this.formAdd.condition.indexOf('演示电脑') > -1 ? 1 : 0
          parameter.placeName = this.formAdd.placeName.join('.') + '.' + this.formAdd.room
          parameter.number = this.formAdd.number
          parameter.meetingRoomState = this.formAdd.meetingRoomState
          console.log(' parameterformAdd', parameter)
          postAction('/MeetingRoomController/addMeetingRoom', parameter).then(res => {
            if (res.code == 200) {
              this.$message.success('添加成功')
              this.loadData(1)
              this.formAdd = {
                placeName: [],
                number: '',
                meetingRoomState: 0,
                condition: [],
                room: ''
              }
            } else {
              this.$message.warning(res.message)
            }
          })
          this.visibleAdd = false
        }
      })
    },
    resetFormAdd() {
      this.$refs.ruleForm.resetFields()
    },
    onDelete(index) {
      deleteMeetingRoom({
        id: index
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('删除成功')
          this.loadData()
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    Download() {
      console.log('下载')
    },
    changeKey(value) {
      console.log(value)
    },
    Modify(record) {
      console.log(record)
      this.visibleModify = true
      let handlerModify = []
      if (record.pc == 1) {
        handlerModify.push('演示电脑')
      }
      if (record.projector == 1) {
        handlerModify.push('投影仪')
      }
      if (record.whiteboard == 1) {
        handlerModify.push('白板')
      }
      if (record.blackboard == 1) {
        handlerModify.push('黑板')
      }
      this.formModify.condition = handlerModify
      this.formModify.room = record.placeName.split('.')[2]
      this.formModify.number = record.number
      this.formModify.meetingroomId = record.meetingroomId
      this.formModify.placeName = [record.placeName.split('.')[0], record.placeName.split('.')[1]]
      this.formModify.meetingRoomState = record.meetingRoomState
      console.log('处理数据')
      // console.log(this.formModify.condition.indexOf('白板'))
    },
    onSubmitModify() {
      let parameter = {}
      parameter.whiteboard = this.formModify.condition.indexOf('白板') > -1 ? 1 : 0
      parameter.blackboard = this.formModify.condition.indexOf('黑板') > -1 ? 1 : 0
      parameter.projector = this.formModify.condition.indexOf('投影仪') > -1 ? 1 : 0
      parameter.pc = this.formModify.condition.indexOf('演示电脑') > -1 ? 1 : 0
      parameter.placeName = this.formModify.placeName.join('.') + '.' + this.formModify.room
      parameter.number = this.formModify.number
      parameter.meetingRoomState = this.formModify.meetingRoomState
      parameter.meetingroomId = this.formModify.meetingroomId

      console.log(' parameterformModify', parameter)
      // return false
      postAction('/MeetingRoomController/updateMeetingRoom', parameter).then(res => {
        if (res.code == 200) {
          this.$message.success('修改成功')
          this.loadData(1)
        } else {
          this.$message.warning(res.message)
        }
      })
      this.visibleModify = false
    },
    CancelModify() {
      this.visibleModify = false
    },

    addClose() {
      this.visibleAdd = false
    },
    modifyClose() {
      this.visibleModify = false
    },
    handlePlaceTree() {
      if (areaData[0].children.length == 0) {
        for (let i = 0; i < this.firstTree.length; i++) {
          areaData[0].children.push({
            label: this.firstTree[i].placeName,
            value: this.firstTree[i].placeName
            // children: []
          })
        }
      }

      // if (areaData[0].children[0].children.length == 0) {
      //   for (let i = 0; i < this.placeTreeTwo.length; i++) {
      //     areaData[0].children[0].children.push({
      //       label: this.placeTreeTwo[i].placeName,
      //       value: this.placeTreeTwo[i].placeName
      //     })
      //   }
      // }

      // if (areaData[0].children[1].children.length == 0) {
      //   for (let i = 0; i < this.placeTreeTwo2.length; i++) {
      //     areaData[0].children[1].children.push({
      //       label: this.placeTreeTwo2[i].placeName,
      //       value: this.placeTreeTwo2[i].placeName
      //     })
      //   }
      // }

      // if (areaData[0].children[2].children.length == 0) {
      //   for (let i = 0; i < this.placeTreeTwo3.length; i++) {
      //     areaData[0].children[2].children.push({
      //       label: this.placeTreeTwo3[i].placeName,
      //       value: this.placeTreeTwo3[i].placeName
      //     })
      //   }
      // }

      // if (areaData[0].children[3].children.length == 0) {
      //   for (let i = 0; i < this.placeTreeTwo4.length; i++) {
      //     areaData[0].children[3].children.push({
      //       label: this.placeTreeTwo4[i].placeName,
      //       value: this.placeTreeTwo4[i].placeName
      //     })
      //   }
      // }

      if (areaData[1].children.length == 0) {
        for (let i = 0; i < this.firstTree1.length; i++) {
          areaData[1].children.push({
            label: this.firstTree1[i].placeName,
            value: this.firstTree1[i].placeName
            // children: []
          })
        }
      }

      // if (areaData[1].children[0].children.length == 0) {
      //   for (let i = 0; i < this.placeTreeTwo1.length; i++) {
      //     areaData[1].children[0].children.push({
      //       label: this.placeTreeTwo1[i].placeName,
      //       value: this.placeTreeTwo1[i].placeName
      //     })
      //   }
      // }
      console.log(areaData)
    }
  }
}
</script>
<style>
#dataRoomTable {
  margin-top: 20px;
}
</style>
