<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8" :lg="4">
            <a-form-item label="领用人">
              <j-input placeholder="输入领用人姓名模糊查询" v-model="queryParam.username"></j-input>
            </a-form-item>
          </a-col>

          <a-col :md="10" :sm="12" :lg="8">
            <a-form-item label="购置时间">
              <j-date v-model="queryParam.createTime_begin" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
                placeholder="请选择开始时间"></j-date>
              <span style="width: 10px;">~</span>
              <j-date v-model="queryParam.createTime_end" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
                placeholder="请选择结束时间"></j-date>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" :lg="5">
            <a-form-item label="资产状态">
              <a-select v-model="queryParam.status" placeholder="请选择资产状态">
                <a-select-option value="">全部</a-select-option>
                <a-select-option :value="1">使用中</a-select-option>
                <a-select-option :value="2">丢失</a-select-option>
                <a-select-option :value="3">多余</a-select-option>
                <a-select-option :value="4">报废</a-select-option>
                <a-select-option :value="5">待报废</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="6" :sm="8" :lg="6">
            <a-form-item label="位置">
              <a-cascader style="width: 300px" :options="selectOptions" @click="handlePlaceTree" placeholder="请选择位置"
                v-model="queryParam.placeName" :display-render="displayRender" />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8" :lg="4">
              <a-form-item label="">
                <a-input placeholder="请输入房间号" v-model="queryParam.realname"></a-input>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('入库资产信息')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
        @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a
          style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource"
        :pagination="ipagination" :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" @change="handleTableChange">

        <template slot="avatarslot" slot-scope="text, record">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user" />
          </div>
        </template>

        <span slot="assetType" slot-scope="assetType">
          <span v-if="assetType==10">房屋、构筑物及土地</span>
          <span v-if="assetType==20">通用设备</span>
          <span v-if="assetType==30">专用设备</span>
          <span v-if="assetType==50">图书、档案</span>
          <span v-if="assetType==60">家具、用具</span>
        </span>

        <span slot="statusName" slot-scope="statusName">
          <span v-if="statusName==1">使用中</span>
          <span v-if="statusName==2">丢失</span>
          <span v-if="statusName==3">多余</span>
          <span v-if="statusName==4">报废</span>
          <span v-if="statusName==5">待报废</span>
        </span>

        <span slot="check" slot-scope="check">
          <span v-if="check==1">是</span>
          <span v-if="check==2">否</span>
        </span>

        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <a-drawer :title="title" :maskClosable="true" :width="600" placement="right" :closable="true" @close="handleCancel"
      style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;" :visible="modalVisible">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="领用人" prop="name" ref="name">
          <a-input v-model="form.name" placeholder="请输入姓名" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="所属单位" prop="department" ref="department">
          <a-input v-model="form.department" placeholder="请输入所属单位" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="资产类型" prop="assetType" ref="assetType">
          <a-select v-model="form.assetType" placeholder="请选择资产类型" :disabled="disabledJudge">
            <a-select-option :value="10">房屋、构筑物及土地</a-select-option>
            <a-select-option :value="20">通用设备</a-select-option>
            <a-select-option :value="30">专用设备</a-select-option>
            <a-select-option :value="50">图书、档案</a-select-option>
            <a-select-option :value="60">家具、用具</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="资产名称" prop="deviceName" ref="deviceName">
          <a-input v-model="form.deviceName" placeholder="请输入资产名称" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="资产编码" prop="coding" ref="coding">
          <a-input v-model="form.coding" placeholder="请输入资产编码" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="资产照片">
          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
            :file-list="fileList" @preview="handlePreview" @change="handleChange">
            <div v-if="fileList.length < 4">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-model-item>
        <a-form-model-item label="资产状态" prop="statusName" ref="statusName">
          <a-select v-model="form.statusName" placeholder="请选择资产状态" :disabled="disabledJudge">
            <a-select-option :value="1">使用中</a-select-option>
            <a-select-option :value="2">丢失</a-select-option>
            <a-select-option :value="3">多余</a-select-option>
            <a-select-option :value="4">报废</a-select-option>
            <a-select-option :value="5">待报废</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="资产状态原因">
          <a-textarea placeholder="请输入资产状态原因" :auto-size="{ minRows: 3, maxRows: 5 }" style="width:450px"
            v-model="form.remark" :readOnly="readOnlyJudge" />
        </a-form-model-item>
        <a-form-model-item label="单价（元）" prop="price" ref="price">
          <a-input v-model="form.price" placeholder="请输入单价（元）" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="数量" prop="amount" ref="amount">
          <a-input v-model="form.amount" placeholder="请输入数量" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="金额（元）" prop="totalPrice" ref="totalPrice" v-if="title=='详情'">
          <a-input v-model="form.totalPrice" placeholder="请输入金额" readOnly></a-input>
        </a-form-model-item>
        <a-form-model-item label="购置日期" prop="payTime" ref="payTime">
          <j-date v-model="form.payTime" :showTime="true" date-format="YYYY-MM-DD" style="width:360px"
            placeholder="请选择购置日期" :readOnly="readOnlyJudge"></j-date>
        </a-form-model-item>
        <a-form-model-item label="是否需补条形码">
          <a-select v-model="form.check" placeholder="请选择是否需补条形码" :disabled="disabledJudge">
            <a-select-option :value="1">是</a-select-option>
            <a-select-option :value="2">否</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="位置" prop="placeName" ref="placeName">
          <a-input v-model="form.placeName" :readOnly="readOnlyJudge" v-if="title=='详情'"></a-input>
          <a-cascader style="width: 360px" :options="selectOptions" @click="handlePlaceTree" placeholder="请选择位置"
            v-model="form.placeName" :display-render="displayRender" :allowClear='false' :readOnly="readOnlyJudge"
            v-if="title!='详情'" />
        </a-form-model-item>
        <a-form-model-item label="房间号">
          <a-input v-model="form.room" placeholder="请输入房间号" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="使用人">
          <a-input v-model="form.userName" placeholder="请输入使用人" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="工号">
          <a-input v-model="form.userNameId" placeholder="请输入使用人工号" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="发票编号">
          <a-input v-model="form.invoice" placeholder="请输入发票编号" :readOnly="readOnlyJudge"></a-input>
        </a-form-model-item>
        <a-form-model-item label="发票照片">
          <!-- <a-input v-model="form.invoice" placeholder="请输入发票编号" :readOnly="readOnlyJudge"></a-input> -->
        </a-form-model-item>
      </a-form-model>
      <a-button type="primary" @click="onSubmit()" style="margin-left:30%" v-if="title!='详情'">确定</a-button>
      <a-button style="margin-left: 10px;" @click="cancel()" v-if="title!='详情'">取消</a-button>
    </a-drawer>
  </a-card>
</template>
<script>
  import {
    putAction,
    getFileAccessHttpUrl
  } from '@/api/manage';
  import {
    frozenBatch
  } from '@/api/api'
  import {
    JeecgListMixin
  } from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JDate from '@/components/jeecg/JDate'
  const areaData = [{
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
  export default {
    mixins: [JeecgListMixin],
    components: {
      JInput,
      JDate,
    },
    data() {
      return {
        selectOptions: areaData,
        modalVisible: false,
        readOnlyJudge: false,
        disabledJudge: false,
        title: '',
        form: {},
        fileList:[],
        dataSource: [{
            id: 2,
            name: '姚明',
            assetType: 30,
            deviceName: '手机',
            amount: '1',
            price: '4350',
            // factory: '华为',
            // supply: '华为',
            payTime: '2021-06-28',
            // model: 'Meta50',
            // fundType: '科研',
            department: '财务大厅',
            telephone: 15880465874,
            // campus: '仓山校区',
            // tower: '黄鹤楼',
            // room: '301',
            // fundSource: '地理所',
            invoice: '250611431925',
            status: 3,
            // checkTime: '2021-06-30 16:20:35',
            remark: '已损坏',
            invoiceImg: [{
              url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg'
            }],
            image: [{
              url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg',
            }],
            statusName: 4,
            check: 2,
            coding: 'N01',
            placeName: '旗山校区.逸夫楼',
            room: '101',
            userName: '李明',
            userNameId: 'B001'
          },

          {
            id: 3,
            assetType: 30,
            deviceName: '电脑',
            amount: '1',
            price: '4350',
            factory: '华为',
            supply: '华为',
            payTime: '2021-06-28',
            model: 'Meta50',
            fundType: '科研',
            department: '财务大厅',
            name: '姚明',
            telephone: 15880465874,
            // campus: '仓山校区',
            // tower: '黄鹤楼',
            // room: '301',
            // fundSource: '地理所',
            // invoice: '250611431925',
            status: 3,
            // checkTime: '2021-06-30 16:20:35',
            remark: '使用正常',
            invoiceImg: [{
              url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg'
            }],
            image: [{
                url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg',
              },
              {
                url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg',
              }
            ],
            statusName: 1,
            check: 1,
            coding: 'N02',
            placeName: '旗山校区.逸夫楼',
            room: '103',
            userName: '李逵',
            userNameId: 'B002'
          },
        ],
        columns: [
          /*{
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },*/
          {
            title: '领用人',
            align: "center",
            dataIndex: 'name',
            width: 120
          },
          {
            title: '所属单位',
            align: "center",
            width: 100,
            dataIndex: 'department',
          },
          {
            title: '资产类型',
            align: "center",
            width: 100,
            dataIndex: 'assetType',
            scopedSlots: {
              customRender: 'assetType'
            },
          },
          {
            title: '资产名称',
            align: "center",
            width: 100,
            dataIndex: 'deviceName',
          },
          {
            title: '数量',
            align: "center",
            width: 80,
            dataIndex: 'amount'
          },
          {
            title: '单价(元)',
            align: "center",
            width: 100,
            dataIndex: 'price'
          },
          {
            title: '资产状态',
            align: "center",
            width: 120,
            dataIndex: 'statusName',
            scopedSlots: {
              customRender: 'statusName'
            },
          },
          {
            title: '购置日期',
            align: "center",
            width: 180,
            dataIndex: 'payTime'
          },
          {
            title: '是否需要补条形码',
            align: "center",
            width: 120,
            dataIndex: 'check',
            scopedSlots: {
              customRender: 'check'
            },
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {
              customRender: 'action'
            },
            align: "center",
            width: 170
          }
        ],
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 5
          },
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          },
        },
        rules: {
          name: [{
            required: true,
            message: '请输入领用人',
            trigger: 'blur'
          }],
          department: [{
            required: true,
            message: '请输入所属单位',
            trigger: 'blur'
          }],
          assetType: [{
            required: true,
            message: '请选择资产类型',
            trigger: 'change'
          }],
          deviceName: [{
            required: true,
            message: '请输入资产名称',
            trigger: 'blur'
          }],
          coding: [{
            required: true,
            message: '请输入资产编码',
            trigger: 'blur'
          }],
          statusName: [{
            required: true,
            message: '请选择资产状态',
            trigger: 'change'
          }],
          price: [{
            required: true,
            message: '请输入单价（元）',
            trigger: 'blur'
          }],
          amount: [{
            required: true,
            message: '请输入数量',
            trigger: 'blur'
          }],
          payTime: [{
            required: true,
            message: '请输入购置日期',
            trigger: 'blur'
          }]
        },
        url: {
          syncUser: "/process/extActProcess/doSyncUser",
          //list: "/sys/user/list",
          delete: "/sys/user/delete",
          deleteBatch: "/sys/user/deleteBatch",
          exportXlsUrl: "/sys/user/exportXls",
          importExcelUrl: "sys/user/importExcel",
        },
      }
    },
    computed: {
      firstTree() {
        return this.$store.state.meeting.placeData
      },
      firstTree1() {
        return this.$store.state.meeting.placeData1
      },
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    mounted() {
      this.$store.dispatch('placeTree')
      this.$store.dispatch('placeTree1')
    },
    methods: {
      displayRender({
        labels
      }) {
        //  this.queryParam.placeName = labels.join('.')
        return labels.join('.')
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
        console.log(areaData)
      },
      handleMenuClick(e) {
        if (e.key == 1) {
          this.batchDel();
        }
      },
      handleDetail(record) {
        this.modalVisible = true
        this.readOnlyJudge = true
        this.disabledJudge = true
        this.title = "详情"
        this.form = record
        this.form.totalPrice = parseFloat(record.amount) * parseFloat(record.price)
        this.fileList=record.image
        console.log(this.form)
      },
      handleEdit(record) {
        this.modalVisible = true
        this.readOnlyJudge = false
        this.disabledJudge = false
        this.title = "编辑"
        this.form = record
        this.form.placeName = [record.placeName.split('.')[0], record.placeName.split('.')[1]]
      },
      handleAdd() {
        this.modalVisible = true
        this.readOnlyJudge = false
        this.disabledJudge = false
        this.title = "添加"
        this.form = {}
      },
      handleCancel() {
        this.modalVisible = false
      },
      onSubmit() {
        console.log(this.form.placeName)
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.modalVisible = false
          }
        })
      },
      cancel() {
        this.modalVisible = false
      }
    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>