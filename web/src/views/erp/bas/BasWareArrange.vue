<template>
  <!--会务安排员 -->
  <a-card :bordered="false">
    <!-- 搜索操作区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>学号：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入安排员学号" v-model="queryParam.arrangeID"></a-input>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <span>姓名：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入安排员姓名" v-model="queryParam.arrangeName"></a-input>
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
      <a-button @click="addArrange" type="primary" icon="plus">添加</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('会务安排员信息')">导出</a-button>
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
      <a-table :data-source="dataArrange" :pagination="false" rowKey="index">
        <a-table-column title="#" data-index="index" align="left" fixed="left"></a-table-column>
        <a-table-column title="学号" data-index="arrangeID" align="center"></a-table-column>
        <a-table-column title="姓名" data-index="arrangeName" align="center"></a-table-column>
        <a-table-column title="联系电话" data-index="arrangeTel" align="center"></a-table-column>
        <a-table-column title="银行账号" data-index="arrangeBank" align="center"></a-table-column>
        <a-table-column title="开户行" data-index="whereBank" align="center"></a-table-column>
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
    <a-drawer
      :visible="visibleAdd"
      title="新增会务安排员"
      @close="closeAdd"
      width="600px"
      placement="right"
    >
      <a-form-model
        ref="ruleForm"
        :model="formAdd"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="arrangeID" label="学号" prop="arrangeID">
          <a-input v-model="formAdd.arrangeID" placeholder="请输入学号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="arrangeName" ref="arrangeName">
          <a-input v-model="formAdd.arrangeName" placeholder="请输入姓名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="arrangeTel" ref="arrangeTel">
          <a-input v-model="formAdd.arrangeTel" placeholder="请输入联系电话"></a-input>
        </a-form-model-item>
        <a-form-model-item label="银行账号" prop="arrangeBank" ref="arrangeBank">
          <a-input v-model="formAdd.arrangeBank" placeholder="请输入银行账号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="开户行" prop="whereBank" ref="whereBank">
          <a-input v-model="formAdd.whereBank" placeholder="请输入开户行"></a-input>
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
      title="修改安排员信息"
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
        <a-form-model-item ref="arrangeID" label="学号" prop="arrangeID">
          <a-input v-model="formModify.arrangeID" placeholder="请输入学号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="arrangeName" ref="arrangeName">
          <a-input v-model="formModify.arrangeName" placeholder="请输入姓名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="arrangeTel" ref="arrangeTel">
          <a-input v-model="formModify.arrangeTel" placeholder="请输入联系电话"></a-input>
        </a-form-model-item>
        <a-form-model-item label="银行账号" prop="arrangeBank" ref="arrangeBank">
          <a-input v-model="formModify.arrangeBank" placeholder="请输入联系电话"></a-input>
        </a-form-model-item>
        <a-form-model-item label="开户行" prop="whereBank" ref="whereBank">
          <a-input v-model="formModify.whereBank" placeholder="请输入开户行"></a-input>
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
const dataArrange = [
  {
    index: 1,
    arrangeID: 'B001',
    arrangeName: '李小娟',
    arrangeTel: '15059655332',
    arrangeBank: '6228480068882423498',
    whereBank: '农行福州洪山支行'
  },
  {
    index: 2,
    arrangeID: 'B002',
    arrangeName: '王菲菲',
    arrangeTel: '13859655348',
    arrangeBank: '6228480068885932881',
    whereBank: '农行福州洪山支行'
  }
]
export default {
  mixins: [JeecgListMixin],
  data() {
    return {
      tokenHeader: undefined,
      dataArrange,
      queryParam: {
        arrangeName: '',
        arrangeID: ''
      },
      visibleAdd: false,
      visibleModify: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      formAdd: {
        arrangeID: undefined,
        arrangeName: undefined,
        arrangeTel: undefined
      },
      formModify: {
        arrangeID: undefined,
        arrangeName: undefined,
        arrangeTel: undefined
      },
      rules: {
        arrangeID: [
          {
            required: true,
            message: '请输入学号',
            trigger: 'blur'
          }
        ],
        arrangeName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        arrangeTel: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }
        ],
        arrangeBank: [
          {
            required: true,
            message: '请输入银行账号',
            trigger: 'blur'
          }
        ],
        whereBank: [
          {
            required: true,
            message: '请输入开户行',
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
      this.queryParam.arrangeID = ''
      this.queryParam.arrangeName = ''
      this.dataArrange = dataArrange
    },
    addArrange() {
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
      const dataArrange = [...this.dataArrange]
      this.dataArrange = dataArrange.filter(item => item.index !== index)
    },
    Download() {
      console.log('下载')
    },
    Modify(record) {
      this.visibleModify = true
      console.log(record)
      this.formModify.arrangeID = record.arrangeID
      this.formModify.arrangeName = record.arrangeName
      this.formModify.arrangeTel = record.arrangeTel
      this.formModify.arrangeBank = record.arrangeBank
      this.formModify.whereBank = record.whereBank
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
