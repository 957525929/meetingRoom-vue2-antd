<template>
  <!--会议室管理人员 -->
  <a-card :bordered="false">
    <!-- 搜索操作区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>发送时间：</span>
        </a-col>
        <a-col>
          <j-date v-model="queryParam.reservationStartTime" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
            placeholder="请选择开始时间"></j-date>
          <span style="width: 10px;">~</span>
          <j-date v-model="queryParam.reservationEndTime" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
            placeholder="请选择结束时间"></j-date>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>接收人：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入接受人姓名" v-model="queryParam.recipientName"></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <a-button :style="{ background: '#49a9ee', color: 'white'}" icon="search" @click="searchQuery">查询</a-button>
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-col>
      </a-row>
    </div>


    <!-- table区域-begin -->
    <div style="margin-top:20px">
      <a-table :data-source="dataSource" :pagination="ipagination" rowKey="noticeTime">
        <a-table-column title="序号" data-index="rowIndex" align="left" width="50px">
          <template slot-scope="text,record,index">
            <span>{{(ipagination.current-1)*ipagination.pageSize+(index+1)}}</span>
          </template>
        </a-table-column>
        <!-- <a-table-column title="发送类型" data-index="noticeType" align="left" width="120px"></a-table-column> -->
        <a-table-column title="发送时间" data-index="noticeTime" align="left" width="200px"></a-table-column>
        <a-table-column title="接收人" data-index="recipientName" align="left" width="120px"></a-table-column>
        <a-table-column title="接收人电话" data-index="recipientTel" align="left" width="120px"></a-table-column>
        <a-table-column title="标题" data-index="noticeTheme" align="left" width="120px">
        </a-table-column>
        <a-table-column title="内容" data-index="notice" align="left" width="300px">
          <template slot-scope="text">
            <j-ellipsis :value="text" :length="20"> </j-ellipsis>
          </template>
        </a-table-column>
        <a-table-column title="发送状态" data-index="noticeState" align="left" width="120px">
          <template slot-scope="noticeState">
            <a-tag color="red" v-if="noticeState==0"> 失败</a-tag>
            <a-tag color="green" v-if="noticeState==1"> 成功</a-tag>
          </template>
        </a-table-column>
      </a-table>
      <br />
      <!-- <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" /> -->
    </div>

  </a-card>
</template>

<script>
  import JEllipsis from "@/components/jeecg/JEllipsis"
  import JDate from '@/components/jeecg/JDate'
  import {
    JeecgListMixin
  } from '@/mixins/JeecgListMixin'
  const dataSource = [{
      index: 1,
      noticeType: '消息通知',
      noticeTheme: '预约成功',
      noticeTime: '2021-08-18 23:01:31',
      recipientName: '李帅',
      recipientTel: '13759655332',
      notice: '您已成功预约2021年8月25日全天福建师范大学.旗山校区.1号楼.会议室203，请知晓',
      noticeState: 1
    },
    {
      index: 2,
      noticeType: '消息通知',
      noticeTheme: '预约失败',
      noticeTime: '2021-08-18 17:46:26',
      recipientName: '张晓',
      recipientTel: '15879623045',
      notice: '您申请的2021年8月25日全天福建师范大学.旗山校区.1号楼.会议室204未成功预约，请知晓',
      noticeState: 1
    },
    {
      index: 3,
      noticeType: '消息通知',
      noticeTheme: '被强制预约',
      noticeTime: '2021-08-18 15:00:18',
      recipientName: '于光',
      recipientTel: '18963210456',
      notice: '您申请的2021年8月25日全天福建师范大学.旗山校区.1号楼.会议室204已被强制预约，请知晓',
      noticeState: 0
    },
    {
      index: 4,
      noticeType: '消息通知',
      noticeTheme: '强制预约成功',
      noticeTime: '2021-08-18 15:09:18',
      recipientName: '游斌',
      recipientTel: '13625894706',
      notice: '您已成功强制预约2021年8月25日全天福建师范大学.旗山校区.2号楼.会议室203，请知晓',
      noticeState: 0
    },
    {
      index: 5,
      noticeType: '消息通知',
      noticeTheme: '强制预约失败',
      noticeTime: '2021-08-18 13:00:18',
      recipientName: '陈雨',
      recipientTel: '15489632104',
      notice: '您申请的2021年8月25日全天福建师范大学.旗山校区.2号楼.会议室203未成功强制预约，请知晓',
      noticeState: 1
    },
  ]
  export default {
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JDate
    },
    data() {
      return {
        dataSource,

      }
    },
    computed: {},
    methods: {
      searchQuery() {},
      searchReset() {
        this.queryParam.teacherID = ''
        this.queryParam.recipientName = ''
      },
    }
  }
</script>