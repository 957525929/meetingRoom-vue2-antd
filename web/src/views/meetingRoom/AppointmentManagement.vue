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
          <a-select :style="{width:'200px'}" @change="handleChange" placeholder="请选择会议状态" v-model="queryParam.state">
            <a-select-option value="1">待开会</a-select-option>
            <a-select-option value="2">开会中</a-select-option>
            <a-select-option value="3">已完成</a-select-option>
             <a-select-option value="4">撤销</a-select-option>
             <a-select-option value="5">强制撤销</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>会议时间：</a-col>
        <a-col>
          <a-date-picker
            @change="onChange"
            placeholder="请选择开始"
            :format="dateFormat"
            v-model="queryParam.dateStart"
            :defaultValue="moment(getCurrentData(), 'YYYY年MM月DD日')"
            :style="{width:'200px'}"
          ></a-date-picker>
          <span>&nbsp;~&nbsp;</span>
          <a-date-picker
            @change="onChange"
            placeholder="请选择结束"
            :format="dateFormat"
            v-model="queryParam.dateEnd"
            :style="{width:'200px'}"
          ></a-date-picker>
        </a-col>
      </a-row>
      <br />
      <a-row type="flex" align="middle">
        <a-col>
          <span>会议名称：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入会议名称" :style="{width:'200px'}" v-model="queryParam.name"></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>是否需要会务安排：</span>
        </a-col>
        <a-col>
          <a-select :style="{width:'200px'}"   v-model="queryParam.arrange" placeholder="请选择是否需要会务安排">
            <a-select-option value="0">是</a-select-option>
            <a-select-option value="1">否</a-select-option>
            <a-select-option value="2">全部</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5"></a-col>
        <a-col>
          <a-button
            :style="{ background: '#49a9ee', color: 'white'}"
            icon="search"
            @click="searchQuery"
          >查询</a-button>
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
          <a-button style="margin-left: 8px" icon="download" @click="handleExportXls('预约管理')">导出</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 查询区域-END -->
    <!-- table区域-begin -->
    <div id="dataMeeting">
      <a-table :data-source="data" :pagination="false" rowKey="id">
        <a-table-column title="会议编号" data-index="id" align="left" width="150px" fixed="left"></a-table-column>
        <!-- <a-table-column title="会议主题" data-index="theme" align="center"></a-table-column> -->
        <a-table-column title="会议名称" data-index="name" align="center"></a-table-column>
        <a-table-column title="负责人姓名" data-index="dutyName" align="center"></a-table-column>
        <!-- <a-table-column title="负责人电话" data-index="dutyTel" align="center"></a-table-column> -->
        <a-table-column title="会议时间" data-index="dateTime" align="center"></a-table-column>
        <a-table-column title="午别" data-index="range" align="center"></a-table-column>
        <a-table-column title="会议地点" data-index="address" align="center" width="300px"></a-table-column>
        <a-table-column title="参会人数（人）" data-index="number" align="center"></a-table-column>
        <a-table-column title="会务安排" data-index="arrange" align="center"></a-table-column>
        <!-- <a-table-column title="会议状态" data-index="state" align="center"></a-table-column> -->
        <a-table-column title="会议状态" data-index="state" align="center">
          <template slot-scope="state">
            <div v-if="state == '待审核'">
              <span :style="{ color: 'blue' }">待审核</span>
            </div>
            <div v-else-if="state == '进行中'">
              <span :style="{ color: 'green' }">进行中</span>
            </div>
            <div v-else-if="state == '待开始'">
              <span :style="{ color: 'green' }">待开始</span>
            </div>
            <div v-else-if="state == '已完成'">
              <span :style="{ color: 'green' }">已完成</span>
            </div>
            <div v-else-if="state == '未通过'">
              <span :style="{ color: 'red' }">未通过</span>
            </div>
          </template>
        </a-table-column>
        <a-table-column title="操作" align="center">
          <span slot-scope="text, record">
            <span v-if="record.state == '待开始'&&record.arrange=='是'">
              <a @click="arrangeInfor(record)">会务安排</a>
              <a-divider type="vertical" />
              <!-- <a :style="{  color: 'orange' }" @click="roomForced(record)">强制预约</a>
              <a-divider type="vertical" />-->
            </span>
            <a @click="appointRoom(record)">详情</a>
          </span>
        </a-table-column>
      </a-table>
      <br />
      <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" />
    </div>
    <!-- 详情页面 -->
    <a-drawer
      :visible="visibleAppoint"
      title="会议详情"
      @close="appointClose"
      width="1200px"
      placement="right"
    >
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="会议申请">
          <a-descriptions>
            <a-descriptions-item label="会议主题">安全管理</a-descriptions-item>
            <a-descriptions-item label="会议名称">安全管理会议</a-descriptions-item>
            <a-descriptions-item label="会议预算（元）">1000</a-descriptions-item>
            <a-descriptions-item label="负责人姓名">陈宏涛</a-descriptions-item>
            <a-descriptions-item label="负责人电话">152690314587</a-descriptions-item>
            <a-descriptions-item label="会议时间">2021年07月20日</a-descriptions-item>
            <a-descriptions-item label="会议地点">总公司机关</a-descriptions-item>
            <a-descriptions-item label="参会人数">4</a-descriptions-item>
            <a-descriptions-item label="备注">需提供话筒</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="会议地点">
          <a-descriptions>
            <a-descriptions-item label="会议时间">2021年07月20日</a-descriptions-item>
            <a-descriptions-item label="午别">上午</a-descriptions-item>
            <a-descriptions-item label="会议地点">福建师范大学.仓山校区.1号楼.会议室203</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="会务安排">
          <a-table :data-source="dataArrange" :pagination="false" rowKey="index">
            <a-table-column title="序号" data-index="index" align="center"></a-table-column>
            <a-table-column title="姓名" data-index="name" align="center"></a-table-column>
            <a-table-column title="联系电话" data-index="phone" align="center"></a-table-column>
            <a-table-column title="安排事项" data-index="matters" align="center"></a-table-column>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
    <!-- 会务安排 -->
    <PurInModal
      v-if="modalVisible"
      :modalVisible="modalVisible"
      @handleCancel="handleCancel"
      :basicInfo="basicInfo"
    ></PurInModal>
  </a-card>
</template>

<script>
import moment from 'moment'
import PurInModal from './PurInModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
const data = [
  // {
  //   id: 'B1203',
  //   budget: '5000',
  //   name: '行政管理会议',
  //   theme: '行政管理',
  //   dateTime: '2021年07月27日',
  //   range: '上午',
  //   address: '福建师范大学.旗山校区.2号楼.会议室205',
  //   members: '陈宏涛；李小玲；林诺汐；陈熙雨',
  //   number: '4',
  //   dutyName: '李小玲',
  //   dutyTel: '152690314587',
  //   state: '进行中',
  //   detail: '1',
  //   arrange: '否'
  // },
  {
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
  }
  // {
  //   id: 'B1204',
  //   budget: '3000',
  //   name: '安全管理会议',
  //   theme: '安全管理',
  //   dateTime: '2021年08月01日~2021年08月01日',
  //   range:'下午',
  //   address: '中国烟草总公司福建省公司机关.A区域.2号楼.204会议室',
  //   members: '陈宏涛；李小玲；林诺汐；陈熙雨',
  //   number: '4',
  //   dutyName: '陈宏涛',
  //   dutyTel: '152690314587',
  //   state: '待审核',
  //   detail: '0'
  // },

  // {
  //   id: 'B1205',
  //   budget: '2000',
  //   name: '零售项目开展会议',
  //   theme: '项目会议',
  //   dateTime: '2021年07月20日~2021年07月20日',
  //   range:'上午',
  //   address: '中国烟草总公司福建省公司机关.A区域.1号楼.205会议室',
  //   members: '陈宏涛；李小玲；林诺汐；陈熙雨',
  //   number: '4',
  //   dutyName: '陈宏涛',
  //   dutyTel: '152690314587',
  //   state: '已完成',
  //   detail: '1'
  // },
  // {
  //   id: 'B1202',
  //   budget: '5000',
  //   name: '安全管理会议',
  //   theme: '安全管理',
  //   dateTime: '2021年07月30日~2021年07月30日',
  //   range:'全天',
  //   address: '中国烟草总公司福建省公司机关.B区域.2号楼.204会议室',
  //   members: '陈宏涛；李小玲；林诺汐；陈熙雨',
  //   number: '4',
  //   dutyName: '陈熙雨',
  //   dutyTel: '152690314587',
  //   state: '未通过',
  //   detail: '0'
  // }
]
const dataArrange = [
  {
    index: 1,
    name: '李霞',
    phone: '13759655332',
    matters: '记录会议内容'
  },
  {
    index: 2,
    name: '尤晓梅',
    phone: '13053955537',
    matters: '摄影录像'
  }
]
export default {
  mixins: [JeecgListMixin],
  components: {
    PurInModal
  },
  data() {
    return {
      data,
      visibleAppoint: false,
      visibleForced: false,
      modalVisible: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formForced: {
        id: undefined,
        theme: undefined,
        name: undefined,
        dateStart: undefined,
        dateEnd: undefined,
        range: undefined,
        address: undefined,
        number: undefined,
        arrange: undefined
      },
      rules: {
        theme: [
          {
            required: true,
            message: '请选择会议主题',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入会议名称',
            trigger: 'blur'
          }
        ],
        number: [
          {
            required: true,
            message: '请输入参会人数',
            trigger: 'blur'
          }
        ]
      },
      basicInfo: {},
      dataArrange,
      reason: '',
      // queryParam: {
      //   name: undefined,
      //   dateStart: undefined,
      //   dateEnd: undefined,
      //   state: undefined,
      //   arrange:'是'
      // },
      dateFormat: 'YYYY年MM月DD日',
      url: {
        list: '/sys/user/list',
        exportXlsUrl: '/sys/user/exportXls'
      }
    }
  },
  created() {
    let end = moment(new Date())
      .subtract(-1, 'months')
      .format('YYYY-MM-DD')
    this.queryParam.dateEnd = this.moment(end, 'YYYY-MM-DD')
    let dateNow = moment(new Date().toLocaleDateString(), 'YYYY年MM月DD日')
    this.data[0].dateTime = dateNow.format('YYYY年MM月DD日')
    this.queryParam.arrange='0'
    this.queryParam.state='1'
  },
  methods: {
    moment,
    onChange() {},
    handleChange() {},
    searchReset() {
      this.data = data
      this.queryParam.IDName = ''
      this.queryParam.dateStart = undefined
      this.queryParam.dateEnd = undefined
    },
    getCurrentData() {
      return new Date().toLocaleDateString()
    },
    appointRoom(record) {
      this.visibleAppoint = true
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
    roomForced(record) {
      this.visibleForced = true
      this.formForced.id = record.id
      this.formForced.theme = record.theme
      this.formForced.name = record.name
      this.formForced.address = record.address
      this.formForced.arrange = record.arrange
      this.formForced.number = record.number
      let dateA = record.dateTime.split('~')
      this.formForced.dateStart = this.moment(dateA[0], 'YYYY年MM月DD日')
      this.formForced.dateEnd = this.moment(dateA[1], 'YYYY年MM月DD日')
      this.formForced.range = record.range
    },
    themeForced(value) {
      this.formForced.name = value
    },
    closeForced() {
      this.$emit('close')
      this.visibleForced = false
    },
    onSubmitForced() {
      this.$message.success('强制预约成功')
      this.visibleForced = false
      this.data.filter(item => {
        if (item.id == this.formForced.id) {
          item.state = '强制撤销'
        }
      })
      let dateT =
        this.formForced.dateStart.format('YYYY年MM月DD日') + '~' + this.formForced.dateEnd.format('YYYY年MM月DD日')
      let a = {
        id: '#',
        theme: this.formForced.theme,
        name: this.formForced.name,
        dateTime: dateT,
        range: this.formForced.range,
        dutyName: '管理员',
        dutyTel: '管理员电话',
        address: this.formForced.address,
        arrange: this.formForced.arrange,
        number: this.formForced.number,
        state: '待开始'
      }
      this.data.push(a)
    },
    CancelForced() {
      this.$emit('close')
      this.visibleForced = false
    }
  }
}
</script>
<style scoped>
#dataMeeting {
  margin-top: 20px;
}
</style>