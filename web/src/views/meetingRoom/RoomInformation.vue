<template>
  <!-- 会议室信息管理 -->
  <a-card :bordered="false">
    <meetingSearch :formItem="form_item" :formData="queryParam" :formHandler="form_handler" />
    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;margin-top: 20px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
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
    </div>
    <div id="dataRoomTable">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="ipagination"
        rowKey="meetingroomId"
        @change="handleTableChange"
        :loading="loading"
      >
        <template slot="rowIndex" slot-scope="text, record, index">
          {{ (ipagination.current - 1) * ipagination.pageSize + (index + 1) }}
        </template>
        <template slot="placeName" slot-scope="placeName">
          {{ placeName.split('.')[0] }}.{{ placeName.split('.')[1] }}
        </template>
        <template slot="room" slot-scope="text, record">
          {{ record.placeName.split('.')[2] }}
        </template>
        <template slot="meetingRoomState" slot-scope="meetingRoomState">
          <a-tag :color="meetingRoomState == 0 ? 'green' : meetingRoomState == 2 ? 'blue' : 'red'">
            {{ meetingRoomState == 0 ? '空闲' : meetingRoomState == 2 ? '禁用' : '开会中' }}
          </a-tag>
        </template>
        <template slot="condition" slot-scope="text, record">
          <span v-if="record.pc == 1">演示电脑&emsp;</span>
          <span v-if="record.projector == 1">投影仪&emsp;</span>
          <span v-if="record.whiteboard == 1">白板&emsp;</span>
          <span v-if="record.blackboard == 1">黑板&emsp;</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="handleEdit(record)" :style="{ color: 'blue' }">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record.meetingroomId)">
            <a href="javascript:;" :style="{ color: 'red' }">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
      <br />
    </div>
    <!-- 表单区域 -->
    <meetingDrawer
      ref="modalForm"
      :selectOptions="selectOptions"
      @callbackComponent="callbackComponent"
      :formItem="form_item"
    >
    </meetingDrawer>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { deleteMeetingRoom } from '@/api/meeting'
import meetingDrawer from './drawer/index.vue'
import meetingSearch from '@/components/search'
const areaData = [
  {
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
const radioOp = [
  { value: 0, label: '空闲' },
  { value: 2, label: '禁用' },
  { value: 1, label: '开会中' },
  { value: '', label: '全部' }
]
export default {
  mixins: [JeecgListMixin],
  components: {
    meetingDrawer,
    meetingSearch
  },
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
      columns: [
        {
          title: '序号',
          dataIndex: 'rowIndex',
          hidden: true,
          scopedSlots: { customRender: 'rowIndex' }
        },
        {
          title: '位置',
          dataIndex: 'placeName',
          align: 'center',
          scopedSlots: { customRender: 'placeName' }
        },
        {
          title: '房间号',
          dataIndex: 'room',
          align: 'center',
          scopedSlots: { customRender: 'room' }
        },
        {
          title: '状态',
          dataIndex: 'meetingRoomState',
          align: 'center',
          scopedSlots: { customRender: 'meetingRoomState' }
        },
        {
          title: '容纳人数',
          dataIndex: 'number',
          hidden: true,
          align: 'center'
        },
        {
          title: '基本条件',
          dataIndex: 'condition',
          align: 'center',
          hidden: true,
          scopedSlots: { customRender: 'condition' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          hidden: true,
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/MeetingRoomController/queryMeetingRoom',
        exportXlsUrl: '/sys/user/exportXls'
      },
      form_item: [
        {
          type: 'select',
          label: '状态',
          name: 'state',
          options: radioOp
        },
        {
          type: 'cascader',
          label: '位置',
          name: 'place',
          options: [...areaData]
        },
        {
          type: 'input',
          label: '房间号',
          name: 'room'
        }
      ],
      queryParam: {
        place: [],
        room: '',
        state: ''
      },
      form_handler: [
        {
          label: '查询',
          key: 'submit',
          type: 'primary',
          icon: 'search',
          handler: () => this.btnSearch()
        },

        { label: '重置', key: 'reset', icon: 'reload', handler: () => this.searchReset() }
      ]
    }
  },

  created() {
    this.$nextTick(() => {
      this.$store.dispatch('placeTree')
      this.$store.dispatch('placeTree1')
    })

    console.log('first11Tree', this.$store.state.meeting.placeData)
  },
  computed: {
    firstTree() {
      return this.$store.state.meeting.placeData
    },
    firstTree1() {
      return this.$store.state.meeting.placeData1
    }
  },
  watch: {
    firstTree: {
      handler(newValue, oldValue) {
        this.handlePlaceTree()
      }
    },
    firstTree1: {
      handler(newValue, oldValue) {
        this.handlePlaceTree()
      }
    }
  },
  methods: {
    callbackComponent(params) {
      console.log(params)
      if (params.function) {
        this[params.function](params.data)
      }
    },

    displayRender({ labels }) {
      this.queryParam.placeName = labels.join('.')
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
      this.formAdd.condition = checkedValues

      console.log(this.formAdd)
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
    handlePlaceTree() {
      if (areaData[0].children.length == 0) {
        for (let i = 0; i < this.firstTree.length; i++) {
          areaData[0].children.push({
            label: this.firstTree[i].placeName,
            value: this.firstTree[i].placeName
          })
        }
      }

      if (areaData[1].children.length == 0) {
        for (let i = 0; i < this.firstTree1.length; i++) {
          areaData[1].children.push({
            label: this.firstTree1[i].placeName,
            value: this.firstTree1[i].placeName
          })
        }
      }
    },
    btnSearch() {
      // this.queryParam = this.formState
      console.log(this.queryParam)
      // this.queryParam.place = this.queryParam.placeName.join('.')
      this.queryParam.placeName = this.queryParam.room
        ? this.queryParam.place.join('.') + '.' + this.queryParam.room
        : this.queryParam.place.join('.')
      this.searchQuery()
    }
  }
}
</script>
<style>
#dataRoomTable {
  margin-top: 20px;
}
</style>
