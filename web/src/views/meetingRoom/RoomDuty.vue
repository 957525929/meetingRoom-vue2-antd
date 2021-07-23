<template>
  <!--会议室管理人员 -->
  <a-card :bordered="false">
    <!-- 搜索操作区域 -->
    <div class="table-page-search-wrapper">
      <a-row type="flex" align="middle">
        <a-col>
          <span>管理员：</span>
        </a-col>
        <a-col>
          <a-input placeholder="请输入管理员姓名" v-model="queryParam.dutyName"></a-input>
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
          ></a-cascader>
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
        <a-col :span="2"></a-col>
<!--        <a-col>-->
<!--          <a-button-->
<!--            @click="addDuty()"-->
<!--            icon="plus"-->
<!--            :style="{ color: 'white', background:'orange'}"-->
<!--          >新增管理员</a-button>&nbsp;&nbsp;-->
<!--          <a-button>-->
<!--            <a-icon type="download" />导出-->
<!--          </a-button>-->
<!--        </a-col>-->
      </a-row>
    </div>
    <!-- 搜索操作区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;margin-top: 20px">
      <a-button @click="addDuty" type="primary" icon="plus">添加</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('会议室管理人员信息')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!--      <a-button type="primary" icon="hdd" @click="recycleBinVisible=true">回收站</a-button>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
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
      </a-dropdown>
    </div>
    <!-- table区域-begin -->
    <div id="dataDutyTable">
      <a-table :data-source="dataDuty" :pagination="false" rowKey="index">
        <a-table-column title="序号" data-index="index" align="left" fixed="left"></a-table-column>
        <a-table-column title="管理员" data-index="dutyName" align="center"></a-table-column>
        <a-table-column title="管理员电话" data-index="dutyTel" align="center"></a-table-column>
        <a-table-column title="管理位置" data-index="area" align="center"></a-table-column>
        <!-- <a-table-column title="备注信息" data-index="remark" align="center"></a-table-column> -->
        <a-table-column title="操作" align="center" fixed="right">
          <template slot-scope="record">
            <!-- <a-button :style="{ background: 'orange', color: 'white' }" @click="Modify(record)">修改</a-button> -->
            <a href="javascript:;" @click="Modify(record)" :style="{  color: 'blue' }">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record.index)">
              <!-- <a-button :style="{ background: 'red', color: 'white' }">删除</a-button> -->
              <a href="javascript:;" :style="{  color: 'red' }">删除</a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
      <br />
      <a-pagination size="small" :total="50" show-size-changer show-quick-jumper align="center" />
    </div>

    <!-- 新增 -->
    <a-Modal v-model="visibleAdd" title="新增会议室管理员" footer>
      <a-form-model
        ref="ruleForm"
        :model="formAdd"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="dutyName" label="管理员" prop="dutyName">
          <!-- <a-input v-model="formAdd.dutyName" placeholder="请输入管理员姓名"></a-input> -->
          <a-select
            show-search
            placeholder="请选择管理员"
            v-model="formAdd.dutyName"
            @change="ChangedutyName"
          >
            <a-select-option value="王小艳">王小艳</a-select-option>
            <a-select-option value="刘梅梅">刘梅梅</a-select-option>
            <a-select-option value="于浩浩">于浩浩</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="管理员电话" prop="dutyTel">
          <a-input v-model="formAdd.dutyTel" placeholder="管理员电话" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item ref="area" label="管理位置" prop="area">
          <a-tree-select
            v-model="formAdd.area"
            placeholder="请选择位置"
            style="width: 385px"
            :tree-data="treeData"
            tree-checkable
            :show-checked-strategy="SHOW_PARENT"
            search-placeholder="Please select"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" @click="onSubmitAdd()">创建</a-button>
          <a-button style="margin-left: 10px;" @click="resetFormAdd()">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-Modal>
    <!--修改信息 -->
    <a-Modal v-model="visibleModify" title="修改会议室管理员" footer>
      <a-form-model
        :label-col="labelCol"
        :model="formModify"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-form-model-item ref="dutyName" label="管理员" prop="dutyName">
          <!-- <a-input v-model="formModify.dutyName"></a-input> -->
          <a-select show-search v-model="formModify.dutyName" @change="ModifyDutyName">
            <a-select-option value="李霞">李霞</a-select-option>
            <a-select-option value="尤晓梅">尤晓梅</a-select-option>
            <a-select-option value="黄丽娟">黄丽娟</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="管理员电话" prop="dutyTel">
          <a-input v-model="formModify.dutyTel" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="管理位置" prop="area">
          <!-- <a-input v-model="formModify.area" disabled></a-input> -->
          <a-tree-select
            v-model="formModify.area"
            placeholder="请选择位置"
            style="width: 385px"
            :tree-data="treeData"
            tree-checkable
            :show-checked-strategy="SHOW_PARENT"
          />
        </a-form-model-item>
        <!-- <a-form-model-item label="备注信息">
          <a-input v-model="formModify.remark" type="textarea" />
        </a-form-model-item>-->
        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" @click="onSubmitModify()">修改</a-button>
          <a-button style="margin-left: 10px;" @click="CancelModify()">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-Modal>
  </a-card>
</template>

<script>
import { areaData } from './data/area.js'
import { treeData } from './data/treeData.js'
import { TreeSelect } from 'ant-design-vue'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const dataDuty = [
  {
    index: 1,
    dutyName: '李霞',
    dutyTel: '13759655332',
    area: '福建师范大学.旗山校区.1号楼'
  },
  {
    index: 2,
    dutyName: '王莉莉',
    dutyTel: '13759655348',
    area: '福建师范大学.旗山校区.2号楼'
  },
  {
    index: 3,
    dutyName: '尤晓梅',
    dutyTel: '13053955537',
    area: '福建师范大学.仓山校区.1号楼'
  },
  {
    index: 4,
    dutyName: '黄丽娟',
    dutyTel: '13659655381',
    area: '福建师范大学.仓山校区.2号楼'
  }
]

export default {
  mixins: [JeecgListMixin],
  data() {
    return {
      selectOptions: areaData,
      treeData: treeData,
      SHOW_PARENT,
      dataDuty,
      queryParam: {
        dutyName: '',
        area: ''
      },
      visibleAdd: false,
      visibleModify: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      formAdd: {
        area: [],
        dutyName: undefined,
        dutyTel: undefined
      },
      formModify: {
        area: [],
        dutyName: undefined,
        dutyTel: undefined
      },
      rules: {
        area: [
          {
            required: true,
            message: '请选择位置',
            trigger: 'blur'
          }
        ],
        dutyName: [
          {
            required: true,
            message: '请输入管理员姓名',
            trigger: 'blur'
          }
        ],
        dutyTel: [
          {
            required: true,
            message: '请输入管理员电话',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    displayRender({ labels }) {
      return labels.join('.')
    },
    areaChange(value) {
      console.log(value)
      this.formAdd.area = value
    },
    searchQuery() {},
    searchReset() {
      this.dataDuty = dataDuty
    },
    addDuty() {
      this.visibleAdd = true
    },
    ChangedutyName(value) {
      if (value == '李霞') {
        this.formAdd.dutyTel = '13859063857'
      }
      if (value == '尤晓梅') {
        this.formAdd.dutyTel = '16958745021'
      }
      if (value == '黄丽娟') {
        this.formAdd.dutyTel = '13520104879'
      }
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
      const dataDuty = [...this.dataDuty]
      this.dataDuty = dataDuty.filter(item => item.index !== index)
    },
    Download() {
      console.log('下载')
    },
    Modify(record) {
      this.visibleModify = true
      console.log(record)
      // this.formModify.area= this.treeData.filter(item=>{
      //   console.log(this.treeData.title)
      //     if(this.treeData.title==record.area){
      //       console.log(item.key)
      //      return item.key
      //     }
      // })
      this.formModify.area = record.area
      this.formModify.dutyName = record.dutyName
      this.formModify.dutyTel = record.dutyTel
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
      this.$message.success('修改成功')
    },
    CancelModify() {
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
