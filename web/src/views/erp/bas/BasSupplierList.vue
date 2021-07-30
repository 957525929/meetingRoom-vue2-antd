<template>
  <!--会议室管理人员 -->
  <a-card :bordered="false">
    <!-- 搜索操作区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>工号：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入教师工号" v-model="queryParam.teacherID"></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>姓名：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入教师姓名" v-model="queryParam.teacherName"></a-input>
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
    <!-- 搜索操作区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;margin-top: 20px">
      <a-button @click="addTeacher" type="primary" icon="plus">添加</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('教师人员信息')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!--      <a-button type="primary" icon="hdd" @click="recycleBinVisible=true">回收站</a-button>-->
      <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>-->
    </div>
    <!-- table区域-begin -->
    <div id="dataDutyTable">
      <a-table :data-source="dataTeacher" :pagination="false" rowKey="index">
        <a-table-column title="#" data-index="index" align="left" fixed="left"></a-table-column>
        <a-table-column title="工号" data-index="teacherID" align="center"></a-table-column>
        <a-table-column title="姓名" data-index="teacherName" align="center"></a-table-column>
        <a-table-column title="联系电话" data-index="teacherTel" align="center"></a-table-column>
        <a-table-column title="操作" align="center" fixed="right">
          <template slot-scope="record">
            <a href="javascript:;" @click="Modify(record)" :style="{  color: 'blue' }">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record.index)">
              <a href="javascript:;" :style="{  color: 'red' }">删除</a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
      <br />
      <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" />
    </div>

    <!-- 新增 -->
    <a-drawer :visible="visibleAdd" title="新增教师" @close="closeAdd" width="600px" placement="right">
      <a-form-model
        ref="ruleForm"
        :model="formAdd"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="teacherID" label="工号" prop="teacherID">
          <a-input v-model="formAdd.teacherID" placeholder="请输入教师工号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="teacherName" ref="teacherName">
          <a-input v-model="formAdd.teacherName" placeholder="请输入教师姓名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="teacherTel" ref="teacherTel">
          <a-input v-model="formAdd.teacherTel" placeholder="请输入联系电话"></a-input>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" @click="onSubmitAdd()">创建</a-button>
          <a-button style="margin-left: 10px;" @click="resetFormAdd()">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
    <!--修改信息 -->
    <a-drawer
      :visible="visibleModify"
      title="修改教师信息"
      @close="closeModify"
      width="600px"
      placement="right"
    >
      <a-form-model
        :label-col="labelCol"
        :model="formModify"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-form-model-item ref="teacherID" label="工号" prop="teacherID">
          <a-input v-model="formModify.teacherID" placeholder="请输入教师工号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="teacherName" ref="teacherName">
          <a-input v-model="formModify.teacherName" placeholder="请输入教师姓名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="teacherTel" ref="teacherTel">
          <a-input v-model="formModify.teacherTel" placeholder="请输入联系电话"></a-input>
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
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
const dataTeacher = [
  {
    index: 1,
    teacherID: 'A01',
    teacherName: '李霞',
    teacherTel: '13759655332'
  },
  {
    index: 2,
    teacherID: 'A02',
    teacherName: '王莉莉',
    teacherTel: '13759655348'
  },
  {
    index: 3,
    teacherID: 'A03',
    teacherName: '尤晓梅',
    teacherTel: '13053955537'
  }
]
export default {
  mixins: [JeecgListMixin],
  data() {
    return {
      tokenHeader: undefined,
      dataTeacher,
      queryParam: {
        teacherName: '',
        teacherID: ''
      },
      visibleAdd: false,
      visibleModify: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      formAdd: {
        teacherID: undefined,
        teacherName: undefined,
        teacherTel: undefined
      },
      formModify: {
        teacherID: undefined,
        teacherName: undefined,
        teacherTel: undefined
      },
      rules: {
        teacherID: [
          {
            required: true,
            message: '请输入教师工号',
            trigger: 'blur'
          }
        ],
        teacherName: [
          {
            required: true,
            message: '请输入教师姓名',
            trigger: 'blur'
          }
        ],
        teacherTel: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }
        ]
      },
      url: {
        // syncUser: "/process/extActProcess/doSyncUser",
        // //list: "/sys/user/list",
        // delete: "/sys/user/delete",
        // deleteBatch: "/sys/user/deleteBatch",
        exportXlsUrl: '/sys/user/exportXls',
        importExcelUrl: 'sys/user/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    searchQuery() {},
    handleImportExcel() {},
    searchReset() {
      this.queryParam.teacherID = ''
      this.queryParam.teacherName = ''
      this.dataTeacher = dataTeacher
    },
    addTeacher() {
      this.visibleAdd = true
    },
    onSubmitAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // let length = this.dataHotel.length;
          // this.dataHotel[length] = this.formAdd;
          //this.dataHotel.push(this.formAdd)
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
      const dataTeacher = [...this.dataTeacher]
      this.dataTeacher = dataTeacher.filter(item => item.index !== index)
    },
    Download() {
      console.log('下载')
    },
    Modify(record) {
      this.visibleModify = true
      console.log(record)
      this.formModify.teacherID = record.teacherID
      this.formModify.teacherName = record.teacherName
      this.formModify.teacherTel = record.teacherTel
    },
    onSubmitModify() {
      this.visibleModify = false
      this.$message.success('修改成功')
    },
    CancelModify() {
      this.visibleModify = false
    },
    closeAdd() {
      this.$emit('close')
      this.visibleAdd = false
    },
    closeModify() {
      this.$emit('close')
      this.visibleModify = false
    }
  }
}
</script>
<style >
#dataDutyTable {
  margin-top: 20px;
}
</style>
