<template>
  <!--会务安排员 -->
  <a-card :bordered="false">
    <!-- 搜索操作区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <!-- <a-col>
          <span>编号：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入安排员编号" v-model="queryParam.studentId"></a-input>
        </a-col>
        <a-col :span="1"></a-col> -->
        <a-col>
          <span>姓名：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入安排员姓名" v-model="queryParam.name"></a-input>
        </a-col>
        <a-col :span="1"></a-col>

        <a-col>
          <a-button :style="{ background: '#49a9ee', color: 'white'}" icon="search" @click="searchQuery">查询</a-button>
          <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 搜索操作区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;margin-top: 20px">
      <a-button @click="myHandleAdd" type="primary" icon="plus">添加</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('会务安排员信息')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
        @change="handleImportExcel">
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
      <a-table :dataSource="dataSource" :pagination="ipagination" rowKey="studentId" :loading="loading">
        <!-- <a-table-column title="编号" data-index="studentId" align="center"></a-table-column> -->
        <a-table-column title="#" data-index="rowIndex" align="center">
          <template slot-scope="text,record,index">
            <span>{{ (ipagination.current-1)*ipagination.pageSize+(index+1) }}</span>
          </template>
        </a-table-column>
        <a-table-column title="姓名" data-index="name" align="center"></a-table-column>
        <a-table-column title="联系电话" data-index="telephone" align="center"></a-table-column>
        <a-table-column title="银行账号" data-index="bankAccount" align="center"></a-table-column>
        <a-table-column title="开户行" data-index="bankName" align="center"></a-table-column>
        <a-table-column title="操作" align="center" fixed="right">
          <template slot-scope="record">
            <a href="javascript:;" @click="Modify(record)" :style="{  color: 'blue' }">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.studentId)">
              <a href="javascript:;" :style="{  color: 'red' }">删除</a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
      <!-- <br />
      <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" /> -->
    </div>

    <!-- 新增 -->
    <a-drawer :visible="visible" :title="title" @close="close" width="600px" placement="right">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="姓名" prop="name" ref="name">
          <a-input v-model="form.name" placeholder="请输入姓名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="登陆密码" prop="password" ref="password">
          <a-input v-model="form.password" placeholder="请输入联系电话"></a-input>
        </a-form-model-item>
        <a-form-model-item label="微信号" prop="openId" ref="openId">
          <a-input v-model="form.openId" placeholder="请输入联系电话"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="telephone" ref="telephone">
          <a-input v-model="form.telephone" placeholder="请输入联系电话"></a-input>
        </a-form-model-item>
        <a-form-model-item label="银行账号" prop="bankAccount" ref="bankAccount">
          <a-input v-model="form.bankAccount" placeholder="请输入银行账号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="开户行" prop="bankName" ref="bankName">
          <a-input v-model="form.bankName" placeholder="请输入开户行"></a-input>
        </a-form-model-item>
      </a-form-model>
      <a-button type="primary" @click="onSubmit()" style="margin-left:30%">确定</a-button>
      <a-button style="margin-left: 10px;" @click="resetForm()">重置</a-button>
    </a-drawer>
  </a-card>
</template>

<script>
  import {
    postAction
  } from '@/api/manage'
  import {
    deletePostAction
  } from '@/api/msg'
  import {
    JeecgListMixin
  } from '@/mixins/JeecgListMixin'
  export default {
    mixins: [JeecgListMixin],
    data() {
      return {
        methodType: '',
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 19
        },
        visible: false,
        title: '',
        form: {},
        rules: {
          // studentId: [{
          //   required: true,
          //   message: '请输入学号',
          //   trigger: 'blur'
          // }],
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入登陆密码',
            trigger: 'blur'
          }],
          openId: [{
            required: true,
            message: '请输入微信号',
            trigger: 'blur'
          }],
          telephone: [{
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }],
          bankAccount: [{
            required: true,
            message: '请输入银行账号',
            trigger: 'blur'
          }],
          bankName: [{
            required: true,
            message: '请输入开户行',
            trigger: 'blur'
          }]
        },
        url: {
          // syncUser: "/process/extActProcess/doSyncUser",
          list: "/StudentController/getStudentList",
          delete: "/StudentController/deleteStudent",
          // deleteBatch: "/sys/user/deleteBatch",
          exportXlsUrl: '/sys/user/exportXls',
          importExcelUrl: 'sys/user/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.methodType = 'get';
    },
    methods: {
      searchQuery() {},
      handleImportExcel() {},
      searchReset() {
        this.queryParam.arrangeID = ''
        this.queryParam.arrangeName = ''
        this.dataArrange = dataArrange
      },
      myHandleAdd() {
        this.visible = true
        this.title = "新增会务安排员"
        this.form = {
          bankAccount: '',
          bankName: '',
          name: '',
          openId: '',
          password: '',
          telephone: ''
        };
      },
      onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (this.title == '新增会务安排员') {
              let parameter = this.form
              postAction('/StudentController/addStudent', parameter).then((res) => {
                if (res.code == 200) {
                  this.$message.success('添加成功!')
                  console.log(parameter)
                  this.loadData(1);
                }
              })
            }
            if (this.title == '修改会务安排员') {
              let parameter = this.form
              console.log(parameter)
              postAction('/StudentController/updateStudentInfo', parameter).then((res) => {
                if (res.code == 200) {
                  this.$message.success('修改成功!')
                  console.log(parameter)
                  this.loadData(1);
                }
              })

            }
            this.visible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },

      Download() {
        console.log('下载')
      },
      Modify(record) {
        this.visible = true
        this.title = "修改会务安排员"
        console.log(record)
        this.form = record
      },
      close() {
        this.visible = false
      },
      handleDelete(id) {
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        deletePostAction(this.url.delete, {
          studentId: id
        }).then((res) => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.loadData();
          } else {
            this.$message.warning(res.message);
          }
        });
      },
    }
  }
</script>
<style>
  #dataDutyTable {
    margin-top: 20px;
  }
</style>