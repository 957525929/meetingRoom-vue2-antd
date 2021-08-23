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
          <a-cascader style="width: 300px" :options="selectOptions" change-on-select @change="areaChange"
            placeholder="请选择位置" :display-render="displayRender" />

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
          <a-button :style="{ background: '#49a9ee', color: 'white'}" icon="search" @click="searchQuery">查询</a-button>
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
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
        @change="handleImportExcel">
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
      <a-table :data-source="dataSource" :pagination="ipagination" rowKey="index" @change="handleTableChange">
        <a-table-column title="#" data-index="index" align="left" fixed="left" width="150px" scopedSlots:{ customRender:
          function(t, r, index) { return parseInt(index) + 1}}></a-table-column>
        <a-table-column title="位置" data-index="placeName" align="center"></a-table-column>
        <a-table-column title="房间号" data-index="room" align="center"></a-table-column>
        <a-table-column title="状态" data-index="meetingRoomState" align="center">
          <template slot-scope="meetingRoomState">
            <span v-if="meetingRoomState=='空闲'">
              <a-tag color="green">
                空闲
              </a-tag>
            </span>
            <span v-else-if="meetingRoomState=='禁用'">
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
        </a-table-column>
        <a-table-column title="操作" align="center">
          <template slot-scope="record">
            <!-- <a href="javascript:;" @click="detail(record)" :style="{  color: 'orange' }">详情</a>
            <a-divider type="vertical" /> -->
            <a href="javascript:;" @click="Modify(record)" :style="{  color: 'blue' }">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record.index)">
              <a href="javascript:;" :style="{  color: 'red' }">删除</a>
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
        <a-form-model-item ref="area" label="位置" prop="area" placeholder="请选择位置">
          <a-cascader style="width: 410px" :options="selectOptions" v-model="formAdd.area" change-on-select
            @change="areaChange" placeholder="请选择位置" :display-render="displayRender" />
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
                <a-checkbox value="黑板">
                  黑板
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="白板">
                  白板
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="投影仪">
                  投影仪
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="演示电脑">
                  演示电脑
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
        <a-form-model-item label="位置" prop="area">
          <a-input v-model="formModify.area" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="房间号" prop="room">
          <a-input v-model="formModify.room" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="formModify.state" :disabled="disabledState">
            <a-radio value="空闲">
              空闲
            </a-radio>
            <a-radio value="禁用">
              禁用
            </a-radio>
            <a-radio value="已预约" disabled>
              已预约
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
                <a-checkbox value="白板">
                  白板
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="投影仪">
                  投影仪
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="演示电脑">
                  演示电脑
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-model-item>
        <!-- <a-form-model-item ref="dutyName" label="管理员" prop="dutyName">
          <a-select   show-search v-model="formModify.dutyName" @change="ModifyDutyName">
            <a-select-option value="李霞">李霞</a-select-option>
            <a-select-option value="尤晓梅">尤晓梅</a-select-option>
            <a-select-option value="黄丽娟">黄丽娟</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="管理员电话" prop="dutyTel">
          <a-input v-model="formModify.dutyTel" disabled></a-input>
        </a-form-model-item> -->
        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" @click="onSubmitModify()">修改</a-button>
          <a-button style="margin-left: 10px;" @click="CancelModify()">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
    <!-- 会议室详情 -->
    <!-- <a-drawer :visible="visibleDetail" title="会议室详情" @close="detailClose" placement="right" width="600px">
      <a-form
        :model="formDetail"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
         <a-form-item label="位置" >
          <a-input v-model="formDetail.area"  disabled></a-input>
        </a-form-item>
        <a-form-item label="房间号" >
          <a-input v-model="formDetail.room" disabled></a-input>
        </a-form-item>
         <a-form-item label="容纳人数">
          <a-input v-model="formDetail.number" disabled></a-input>
        </a-form-item>
         <a-form-item label="状态">
          <a-input v-model="formDetail.state" disabled></a-input>
        </a-form-item>
        <a-form-item label="基本条件">
           <a-checkbox-group @change="onChangeCon" v-model="formDetail.condition" disabled>
           <a-row>
          <a-col :span="8">
            <a-checkbox value="黑板">
              黑板
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="白板">
              白板
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="投影仪">
              投影仪
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="演示电脑">
              演示电脑
            </a-checkbox>
          </a-col>
        </a-row>
        </a-checkbox-group>
        </a-form-item>
        <a-form-item ref="dutyName" label="管理员"  >
          <a-select   show-search v-model="formDetail.dutyName" disabled>
            <a-select-option value="李霞">李霞</a-select-option>
            <a-select-option value="尤晓梅">尤晓梅</a-select-option>
            <a-select-option value="黄丽娟">黄丽娟</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="管理员电话" >
          <a-input v-model="formDetail.dutyTel" disabled></a-input>
        </a-form-item>
      </a-form>
    </a-drawer> -->
  </a-card>
</template>

<script>
  import {
    areaData
  } from './data/area.js'
  import {
    JeecgListMixin
  } from '@/mixins/JeecgListMixin'

  const dataRoom = [{
      index: 1,
      placeName: '福建师范大学.旗山校区.1号楼',
      number: '5-6',
      dutyName: '李霞',
      dutyTel: '13759655332',
      room: '会议室203',
      meetingRoomStateName: '空闲',
      condition: '投影仪，白板，黑板',
    },
    {
      index: 2,
      placeName: '福建师范大学.旗山校区.2号楼',
      number: '6-8',
      dutyName: '王莉莉',
      dutyTel: '13759655348',
      room: '会议室204',
      meetingRoomStateName: '禁用',
      condition: '投影仪，白板',
    },
    {
      index: 3,
      placeName: '福建师范大学.仓山校区.1号楼',
      number: '3-4',
      dutyName: '尤晓梅',
      dutyTel: '13053955537',
      room: '会议室205',
      meetingRoomStateName: '已预约',
      condition: '演示电脑，投影仪，黑板',
    },
    {
      index: 4,
      placeName: '福建师范大学.仓山校区.2号楼',
      number: '4-6',
      dutyName: '黄丽娟',
      dutyTel: '13659655381',
      room: '会议室206',
      meetingRoomStateName: '空闲',
      condition: '投影仪，演示电脑，白板',
    },
  ]
  const columns = [{
      title: '序号',
      dataIndex: '',
      key: 'rowIndex',
      fixed: 'left',
      width: 100,
      align: 'center',
      customRender: function (t, r, index) {
        return parseInt(index) + 1
      },
    },
    {
      title: '位置',
      align: 'center',
      dataIndex: 'placeName',
    },
    {
      title: '房间号',
      align: 'center',
      dataIndex: 'room',
    },
    {
      title: '容纳人数',
      align: 'center',
      dataIndex: 'number',
    },
    {
      title: '负责人',
      align: 'center',
      dataIndex: 'dutyName',
    },
    {
      title: '负责人电话',
      align: 'center',
      dataIndex: 'dutyTel',
    },
    {
      title: '基本条件',
      align: 'center',
      dataIndex: 'condition',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'action',
    },
  ]
  export default {
    mixins: [JeecgListMixin],
    data() {
      return {
        selectOptions: areaData,
        dataRoom,
        columns,
        visibleAdd: false,
        visibleModify: false,
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        },
        formAdd: {
          area: [],
          room: undefined,
          number: undefined,
          dutyName: undefined,
          dutyTel: undefined,
          condition: [],
          remark: '',
        },
        radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        },
        formModify: {
          number: '',
          dutyName: '',
          dutyTel: '',
          condition: [],
          state: '',
        },
        rules: {
          condition: [{
            required: true,
            message: '请选择基本条件',
            trigger: 'change',
          }, ],
          area: [{
            required: true,
            message: '请选择位置',
            trigger: 'change',
          }, ],
          room: [{
            required: true,
            message: '请输入房间号',
            trigger: 'blur',
          }, ],
          number: [{
            required: true,
            message: '请输入容纳人数（个）',
            trigger: 'blur',
          }, ],
          dutyName: [{
            required: true,
            message: '请输入管理员',
            trigger: 'blur',
          }, ],
          dutyTel: [{
            required: true,
            message: '请输入管理员电话',
            trigger: 'blur',
          }, ],
          address: [{
            required: true,
            message: '请输入地点',
            trigger: 'blur',
          }, ],
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
    mounted(){

    },
    methods: {
      displayRender({
        labels
      }) {
        this.queryParam.placeName = labels.join('.')
        return labels.join('.')
      },
      areaChange(value) {
        console.log(value)

      },
      onChangeCon(checkedValues) {
        console.log('checked = ', checkedValues)
        console.log('value = ', this.value)
      },
      searchReset() {
        this.dataRoom = dataRoom
        this.queryParam.IDName = ''
        // console.log('this.$store.state.token',this.$store.state.user.token)
        // let params={id:1}
        // getAction('/MeetingRoomController/getPlaceByPid', params).then((res) => {
        // console.log('1',res)
        // })
      },
      addRoom() {
        this.visibleAdd = true
  
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
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            // let length = this.dataHotel.length;
            // this.dataHotel[length] = this.formAdd;
            // this.dataRoom.push(this.formAdd)
            this.$message.success('添加成功!')
            this.formAdd = {}
            this.visibleAdd = false
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
        const dataRoom = [...this.dataRoom]
        this.dataRoom = dataRoom.filter((item) => item.index !== index)
      },
      Download() {
        console.log('下载')
      },
      Modify(record) {
        this.visibleModify = true
        console.log(record)
        this.formModify.area = record.area
        this.formModify.room = record.room
        this.formModify.number = record.number
        this.formModify.dutyName = record.dutyName
        this.formModify.condition = record.condition.split('，')
        this.formModify.dutyTel = record.dutyTel
        this.formModify.state = record.state
        if (record.state == "已预约") {
          this.disabledState = true
        } else {
          this.disabledState = false
        }
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
    },
  }
</script>
<style>
  #dataRoomTable {
    margin-top: 20px;
  }
</style>