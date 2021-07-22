<template>
  <!-- 会议室预约审核 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>预约类型：</span>
        </a-col>
        <a-col>
          <a-select :style="{width:'150px'}" @change="handleChange" placeholder="请选择预约方式">
            <a-select-option value="公司会议">公司会议</a-select-option>
            <a-select-option value="个人">个人</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>位置：</span>
        </a-col>
        <a-col>
          <a-cascader
            style="width: 350px"
            :options="selectOptions"
            change-on-select
            @change="areaChange"
            placeholder="请选择位置"
            :display-render="displayRender"
          />
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>房间号：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入房间号"></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <a-button
            :style="{ background: '#49a9ee', color: 'white'}"
            icon="search"
            @click="searchQuery"
          >查询</a-button>
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 查询区域-END -->
    <!-- table区域-begin -->
    <div id="RoomAudit">
      <a-table rowKey="index" :data-source="data" :columns="columns" :pagination="false">
        <!-- <a-table-column title="序号" data-index="index" align="left"></a-table-column>
        <a-table-column title="会议名称" data-index="name" align="center"></a-table-column>
        <a-table-column title="会议时间" data-index="dateTime" align="center"></a-table-column>
        <a-table-column title="时段" data-index="range" align="center"></a-table-column>
        <a-table-column title="会议地点" data-index="address" align="center"></a-table-column>
        <a-table-column title="参会人数" data-index="number" align="center"></a-table-column>
        <a-table-column title="会议室容纳人数" data-index="numberA" align="center"></a-table-column>
        <a-table-column title="预约负责人" data-index="dutyName" align="center"></a-table-column>
        <a-table-column title="预约负责人电话" data-index="dutyTel" align="center"></a-table-column>
        <a-table-column title="预约类型" data-index="type" align="center"></a-table-column>
        <a-table-column title="操作" align="center" data-index="audit">
          <template slot-scope="audit,record,index">
            <div v-if="audit=='0'">
              <a
                href="javascript:;"
                @click="ignoreClick(record.id,index)"
                :style="{  color: 'red' }"
              >不通过</a>
              <a-divider type="vertical" />
              <a
                href="javascript:;"
                @click="sureClick(record.id,index)"
                :style="{  color: 'green' }"
              >通过</a>
            </div>
          </template>
        </a-table-column>-->
        <span slot="operation" slot-scope="audit,record,index">
          <a @click="ignoreClick(record.id,index)" :style="{  color: 'red' }">不通过</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="sureClick(record.id,index)" :style="{  color: 'green' }">通过</a>
        </span>
        <a-table
          slot="expandedRowRender"
          slot-scope="record"
          :columns="innerColumns"
          :data-source="record.innerData"
          :pagination="false"
          size="small"
        ></a-table>
      </a-table>
      <br />
      <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" />
    </div>
    <!-- 不通过填写原因 -->
    <a-modal
      v-model="visibleReason"
      title="不通过原因填写"
      @ok="handleOkReason"
      @cancel="handleCancelReason"
    >
      <a-form-model
        ref="ruleForm"
        :model="formReason"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="原因" prop="reason">
          <a-input v-model="formReason.reason" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
</template>

<script>
import moment from 'moment'
import { areaData } from './data/area.js'
const data = [
  {
    id: 'A1202',
    index: '1',
    name: '零售项目开展会议',
    dateTime: '2021年07月30日~2021年07月30日',
    range: '上午',
    address: '中国烟草总公司福建省公司机关.A区域.1号楼.会议室203',
    members: '陈宏涛；李小玲；林诺汐；陈熙雨',
    remark: '项目会议',
    number: '4',
    numberA: '5-6',
    dutyName: '李小玲',
    dutyTel: '152690314587',
    type: '个人',
    audit: '0',
    innerData: [
      {
        key: 11,
        dateTime: '2021年07月30日~2021年07月30日',
        range: '上午',
        address: '中国烟草总公司福建省公司机关.A区域.1号楼.会议室203',
        numberA: '6-8',
        condition: '茶水，投影仪，电脑'
      }
    ]
  },
  {
    id: 'A1203',
    index: '2',
    name: '物流管理会议',
    dateTime: '2021年07月25日~2021年07月26日',
    range: '',
    address: '中国烟草总公司福建省公司机关',
    members: '陈宏涛；李小玲；林诺汐；陈熙雨',
    remark: '物流管理',
    number: '4',
    numberA: '6-8',
    dutyName: '林诺汐',
    dutyTel: '152690314587',
    type: '公司会议',
    audit: '0',
    innerData: [
      {
        key: 21,
        dateTime: '2021年07月25日~2021年07月25日',
        range: '全天',
        address: '中国烟草总公司福建省公司机关.B区域.1号楼.会议室203',
        numberA: '6-8',
        condition: '茶水，投影仪，电脑，空调'
      },
      {
        key: 22,
        dateTime: '2021年07月26日~2021年07月26日',
        range: '上午',
        address: '中国烟草总公司福建省公司机关.B区域.1号楼.会议室204',
        numberA: '6-8',
        condition: '茶水，投影仪，电脑，空调'
      }
    ]
  }
]
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'left'
  },
  {
    title: '会议名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '会议时间',
    dataIndex: 'dateTime',
    align: 'center'
  },
  {
    title: '参会人数',
    dataIndex: 'number',
    align: 'center'
  },
  {
    title: '预约负责人',
    dataIndex: 'dutyName',
    align: 'center'
  },
  {
    title: '预约负责人电话',
    dataIndex: 'dutyTel',
    align: 'center'
  },
  {
    title: '预约类型',
    dataIndex: 'type',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'operation' }
  }
]
const innerColumns = [
  {
    title: '会议时间',
    dataIndex: 'dateTime',
    key: 'dateTime',
    align: 'center'
    // width: '180px'
  },
  {
    title: '时段',
    dataIndex: 'range',
    key: 'range',
    align: 'center'
    // width: '120px'
  },
  {
    title: '会议地点',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    width: '350px'
  },
  {
    title: '会议室容纳人数',
    dataIndex: 'numberA',
    key: 'numberA',
    align: 'center'
    // width: '200px'
  },
  {
    title: '会议室基本条件',
    dataIndex: 'condition',
    key: 'condition',
    align: 'center'
  }
]
export default {
  data() {
    return {
      data,
      columns,
      innerColumns,
      selectOptions: areaData,
      visibleReason: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
      queryParam: {
        IDName: ''
      },
      dateFormat: 'YYYY年MM月DD日',
      formReason: {
        reason: '',
        index: '',
        id: ''
      },
      rules: {
        reason: [
          {
            required: true,
            message: '请输入原因',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    let start = moment(new Date())
      .subtract(1, 'months')
      .format('YYYY-MM-DD')
    this.dateStart = this.moment(start, 'YYYY-MM-DD')
  },
  methods: {
    moment,
         displayRender({ labels }){
      return  labels.join('.')
    },
    areaChange(value) {
      console.log(value)
    },
    // onChange(date, dateString) {
    //   console.log(date, dateString)
    // },
    handleChange() {},
    searchQuery() {
      // let IDName = this.queryParam.IDName
      // let newListData = []
      // let date1 = this.queryParam.dateOne
      // let date2 = this.queryParam.dateTwo
      // if (IDName && date1 && date2) {
      //   let dateSearch = date1.format('YYYY年MM月DD日') + '~' + date2.format('YYYY年MM月DD日')
      //   this.data.filter(item => {
      //     if ((item.id.includes(IDName) || item.name.includes(IDName)) && item.dateTime.includes(dateSearch)) {
      //       newListData.push(item)
      //     }
      //   })
      //   this.data = newListData
      // } else {
      //   if (IDName) {
      //     this.data.filter(item => {
      //       if (item.id.includes(IDName) || item.name.includes(IDName)) {
      //         newListData.push(item)
      //       }
      //     })
      //     this.data = newListData
      //   }
      //   if (date1 && date2) {
      //     let dateSearch = date1.format('YYYY年MM月DD日') + '~' + date2.format('YYYY年MM月DD日')
      //     //console.log(dateSearch);
      //     this.data.filter(item => {
      //       if (item.dateTime.includes(dateSearch)) {
      //         console.log(111)
      //         newListData.push(item)
      //       }
      //     })
      //     this.data = newListData
      //   }
      // }
    },
    searchReset() {
      this.data = data
    },
    onChange() {},
    ignoreClick(id, index) {
      this.visibleReason = true
      this.formReason.index = index
      this.formReason.id = id
    },
    sureClick(id, index) {
      this.data[index].audit = '已通过'
      const data = [...this.data]
      this.data = data.filter(item => item.id !== id)
    },
    handleCancelReason() {
      this.visibleReason = false
    },
    handleOkReason() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let index = this.formReason.index
          let id = this.formReason.id
          this.data[index].audit = '未通过'
          const data = [...this.data]
          this.data = data.filter(item => item.id !== id)
          this.visibleReason = false
          this.formReason.reason = ''
        }
      })
    }
  }
}
</script>
<style scoped>
#RoomAudit {
  margin-top: 20px;
}
</style>