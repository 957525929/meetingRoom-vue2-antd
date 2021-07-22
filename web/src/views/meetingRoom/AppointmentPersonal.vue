<template>
  <!-- 个人预约会议总览 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>会议状态：</span>
        </a-col>
        <a-col>
          <a-select :style="{width:'200px'}" @change="handleChange" placeholder="请选择会议状态">
            <a-select-option value="已完成">已完成</a-select-option>
             <a-select-option value="待安排">待开始</a-select-option>
             <a-select-option value="进行中">进行中</a-select-option>
            <!-- <a-select-option value="待审核">待审核</a-select-option>           -->
            <!-- <a-select-option value="未通过">未通过</a-select-option> -->
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
          <span>编号：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入会议编号" v-model="queryParam.id"></a-input>
        </a-col>
        <a-col :span="5"></a-col>
        <a-col>
          <a-button
            :style="{ background: '#49a9ee', color: 'white'}"
            icon="search"
            @click="searchQuery"
          >查询</a-button>
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
          <a-button style="margin-left: 8px">
            <a-icon type="download" />导出
          </a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 查询区域-END -->
    <!-- table区域-begin -->
    <div id="dataMeeting">
      <a-table :data-source="data" :pagination="false" rowKey="id">
        <a-table-column title="会议编号" data-index="id" align="left" width="150px" fixed="left"></a-table-column>
        <a-table-column title="会议主题" data-index="theme" align="center"></a-table-column>
        <a-table-column title="会议名称" data-index="name" align="center"></a-table-column>
        <a-table-column title="负责人姓名" data-index="dutyName" align="center"></a-table-column>
        <!-- <a-table-column title="负责人电话" data-index="dutyTel" align="center"></a-table-column> -->
        <a-table-column title="会议时间" data-index="dateTime" align="center"></a-table-column>
        <a-table-column title="时段" data-index="range" align="center"></a-table-column>
        <a-table-column title="会议地点" data-index="address" align="center" width="300px"></a-table-column>
        <a-table-column title="参会人数（人）" data-index="number" align="center"></a-table-column>
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
        <a-table-column title="操作"  align="center">
         <span  slot-scope="text, record" >
         
              
               <a   @click="arrangeInfor(record)" >会务安排</a>
             <!-- <router-link
            :to="{ path: '/meetingRoom/PersonalDetil', query: { record }}"
          >
            <a :style="{  color: 'blue' }">详情</a>
          </router-link>          -->
            <span v-if="record.state == '进行中'||record.state == '待开始'">
              <a-divider type="vertical" />
              <a  :style="{  color: 'orange' }" @click="cancleRoom(record)" >强制撤销</a>
            </span>    
            <a-divider type="vertical" />     
                <a   @click="appointRoom(record)" >详情</a>
        </span>
        </a-table-column>
      </a-table>
      <br />
      <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" />
    </div>

    <!-- 撤销原因 -->
    <a-modal  v-model="visibleReason"   title="强制撤销" @ok="handleOkReason">
        <a-row type="flex" align="middle">
         <a-col :span="4">
         <span>撤销原因：</span>
        </a-col>
        <a-col :span="18">
        <a-input v-model="reason" type="textarea" required/>
        </a-col>
        </a-row>     
    </a-modal>
<!-- 详情页面 -->
  <a-modal  v-model="visibleAppoint"   title="会议详情" @ok="handleOkReason" :style="{width:'2000px'}">
       <!-- <a-descriptions>
            <a-descriptions-item label="会议名称">安全管理会议</a-descriptions-item>
            <a-descriptions-item label="会议预算">1000</a-descriptions-item>
            <a-descriptions-item label="负责人姓名">陈宏涛</a-descriptions-item>
            <a-descriptions-item label="负责人电话">152690314587</a-descriptions-item>
            <a-descriptions-item label="会议时间">2021年07月20日~2021年07月20日</a-descriptions-item>
            <a-descriptions-item label="会议地点">总公司机关</a-descriptions-item>
            <a-descriptions-item label="会议安排成员">陈宏涛；李小玲；林诺汐；陈熙雨</a-descriptions-item>
            <a-descriptions-item label="备注">安全管理</a-descriptions-item>
          </a-descriptions> -->
    </a-modal>
  </a-card>
</template>

<script>
import moment from 'moment'
const data = [
  {
    id: 'B1203',
    budget: '5000',
    name: '物流管理会议',
    theme: '物流管理',
    dateTime: '2021年07月27日~2021年07月27日',
    range:'上午',
    address: '福建师范大学.旗山校区.2号楼.会议室205',

    members: '陈宏涛；李小玲；林诺汐；陈熙雨',
    number: '4',
    dutyName: '李小玲',
    dutyTel: '152690314587',
    state: '进行中',
    detail: '1'
  },
  {
    id: 'B1207',
    budget: '5000',
    name: '安全管理会议',
    theme: '安全管理',
    dateTime: '2021年08月03日~2021年08月03日',
    range:'下午',
    address: '福建师范大学.仓山校区.1号楼.会议室203',
    members: '陈宏涛；李小玲；林诺汐；陈熙雨',
    number: '4',
    dutyName: '李小玲',
    dutyTel: '152690314587',
    state: '待开始',
    detail: '0'
  },
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
export default {
  data() {
    return {
      data,
      visibleReason: false,
      visibleAppoint:false,
      reason:'',
      queryParam: {
        id: undefined,
        name: undefined,
        dateStart: undefined,
        dateEnd: undefined,
        state: undefined
      },
      dateFormat: 'YYYY年MM月DD日'
    }
  },
  created() {
    // let start = moment(new Date())
    //   .subtract(15, 'days')
    //   .format('YYYY-MM-DD')
    // this.queryParam.dateStart = this.moment(start, 'YYYY-MM-DD')
    let end=moment(new Date())
      .subtract(-1, 'months')
      .format('YYYY-MM-DD')
    this.queryParam.dateEnd= this.moment(end, 'YYYY-MM-DD')
    let dateNow=moment(new Date().toLocaleDateString(), 'YYYY年MM月DD日')
    // console.log(dateNow.format('YYYY年MM月DD日'))
      this.data[0].dateTime=dateNow.format('YYYY年MM月DD日')+"~"+dateNow.format('YYYY年MM月DD日')
  },
  methods: {
    moment,
    onChange() {},
    handleChange() {},
    searchQuery() {
    },
    searchReset() {
      this.data = data
      this.queryParam.IDName = ''
      this.queryParam.dateStart = undefined
      this.queryParam.dateEnd = undefined
    },
    getCurrentData() {
      return new Date().toLocaleDateString()
    },
    cancleRoom(record){
         this.visibleReason = true
    },
    handleOkReason(){
        this.visibleReason = false
    },
       getCurrentData() {
      return new Date().toLocaleDateString()
    },
    appointRoom(record){
      this.visibleAppoint=true
    }
  }
}
</script>
<style scoped>
#dataMeeting {
  margin-top: 20px;
}
</style>