<template>
  <!--会议室管理人员 -->
  <a-card :bordered="false">
    <!-- 搜索操作区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>发送主题：</span>
        </a-col>
        <a-col>
          <a-select placeholder="请选择发送主题" style="width: 200px" v-model="queryParam.noticeType">
            <a-select-option value="0">预约成功</a-select-option>
            <a-select-option value="1">强制预约成功</a-select-option>
            <a-select-option value="2">预约失败</a-select-option>
            <a-select-option value="3">被强制预约</a-select-option>
            <a-select-option value="4">强制预约失败</a-select-option>
             <a-select-option value="">全部</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>接受人：</span>
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
    <div id="dataDutyTable">
      <a-table :data-source="dataTeacher" :pagination="false" rowKey="index" >
         <!-- <a-table-column title="#" data-index="" align="left" fixed="left" width="50px" key="rowIndex" scopedSlots:{ customRender:
          function(t, r, index) { return parseInt(index) + 1}}></a-table-column> -->
        <a-table-column title="#" data-index="index" align="left" fixed="left" width="50px"></a-table-column>
        <a-table-column title="发送类型" data-index="noticeType" align="left" width="120px"></a-table-column>
        <a-table-column title="发送时间" data-index="noticeTime" align="left" width="200px" :sorter='true'></a-table-column>
        <a-table-column title="接收人" data-index="recipientName" align="left" width="120px"></a-table-column>
        <a-table-column title="接收人电话" data-index="recipientTel" align="left" width="120px"></a-table-column>
        <a-table-column title="发送主题" data-index="noticeTheme" align="left" width="120px">
          <template slot-scope="noticeTheme">
            <a-tag color="green" v-if="noticeTheme=='0'"> 预约成功</a-tag>
            <a-tag color="green" v-if="noticeTheme=='1'"> 强制预约成功</a-tag>
            <a-tag color="red" v-if="noticeTheme=='2'"> 预约失败</a-tag>
            <a-tag color="red" v-if="noticeTheme=='3'"> 被强制预约</a-tag>
            <a-tag color="red" v-if="noticeTheme=='4'"> 强制预约失败</a-tag>
            
          </template>
        </a-table-column>
        <a-table-column title="通知内容" data-index="notice" align="left"></a-table-column>
        <a-table-column title="发送状态" data-index="noticeState" align="left" width="120px"></a-table-column>
      </a-table>
      <br />
      <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" />
    </div>

  </a-card>
</template>

<script>
  const dataTeacher = [{
      index: 1,
      noticeType:'消息通知',
      noticeTheme: '0',
      noticeTime: '2021-08-18 23:01:31',
      recipientName: '李帅',
      recipientTel: '13759655332',
      notice: '您已成功预约2021年8月25日全天福建师范大学.旗山校区.1号楼.会议室203，请知晓',
      noticeState:'发送成功'
    },
    {
      index: 2,
      noticeType:'消息通知',
      noticeTheme: '2',    
      noticeTime: '2021-08-18 17:46:26',
      recipientName: '张晓',
      recipientTel: '15879623045',
      notice: '您申请的2021年8月25日全天福建师范大学.旗山校区.1号楼.会议室204未成功预约，请知晓',
      noticeState:'发送成功'
    },
    {
      index: 3,
      noticeType:'消息通知',
      noticeTheme: '3',
      noticeTime: '2021-08-18 15:00:18',
      recipientName: '于光',
      recipientTel: '18963210456',
      notice: '您申请的2021年8月25日全天福建师范大学.旗山校区.1号楼.会议室204已被强制预约，请知晓',
      noticeState:'发送失败'
    },
    {
      index: 4,
      noticeType:'消息通知',
      noticeTheme: '1',
      noticeTime: '2021-08-18 15:00:18',
      recipientName: '游斌',
      recipientTel: '13625894706',
      notice: '您已成功强制预约2021年8月25日全天福建师范大学.旗山校区.2号楼.会议室203，请知晓',
        noticeState:'发送失败'
    },
    {
      index: 5,
      noticeType:'消息通知',
      noticeTheme: '4',
      noticeTime: '2021-08-18 13:00:18',
      recipientName: '陈雨',
      recipientTel: '15489632104',
      notice: '您申请的2021年8月25日全天福建师范大学.旗山校区.2号楼.会议室203未成功强制预约，请知晓',
      noticeState:'发送成功'
    },
  ]
  export default {
    data() {
      return {
        tokenHeader: undefined,
        dataTeacher,
        queryParam: {
          recipientName: '',
          noticeType: '全部'
        },
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
<style>
  #dataDutyTable {
    margin-top: 20px;
  }
</style>