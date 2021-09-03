<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="领用人">
              <!--<a-input placeholder="请输入账号查询" v-model="queryParam.username"></a-input>-->
              <j-input placeholder="输入领用人姓名模糊查询" v-model="queryParam.username"></j-input>
            </a-form-item>
          </a-col>

          <a-col :md="10" :sm="12">
            <a-form-item label="创建时间" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
              <j-date v-model="queryParam.createTime_begin" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
                placeholder="请选择开始时间"></j-date>
              <span style="width: 10px;">~</span>
              <j-date v-model="queryParam.createTime_end" :showTime="true" date-format="YYYY-MM-DD" style="width:30%"
                placeholder="请选择结束时间"></j-date>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-select v-model="queryParam.status" placeholder="请选择单位">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">待审核</a-select-option>
                <a-select-option value="2">合格</a-select-option>
                <a-select-option value="3">不合格</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="单位">
              <a-select v-model="queryParam.department" placeholder="请选择单位">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">地理所</a-select-option>
                <a-select-option value="2">地科院</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="">
                <a-input placeholder="请输入资产名称" v-model="queryParam.realname"></a-input>
              </a-form-item>
            </a-col>

            <!--            <a-col :md="6" :sm="8">
              <a-form-item label="手机号码">
                <a-input placeholder="请输入手机号码查询" v-model="queryParam.phone"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="报帐部门">
                <a-select v-model="queryParam.status" placeholder="请选择">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">冻结</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>-->
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
      <a-button type="primary" icon="download" @click="handleExportXls('入帐资产信息')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
        @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!--      <a-button type="primary" icon="hdd" @click="recycleBinVisible=true">回收站</a-button>-->
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

        <template slot="avatarslot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user" />
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
          <!-- <a @click="handleEdit(record)" v-has="'user:edit'">编辑</a>-->
          <a href="javascript:;" @click="handleDetail(record)">详情</a>
          <span style="margin:0 10px ">|</span>
          <a-popconfirm title="提交审核结果?" ok-text="合格" cancel-text="不合格" @confirm="confirm" @cancel="cancel">
            <a href="javascript:;" @click="handleCheck(record.id)">审核</a>
          </a-popconfirm>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleEdit(record)">编辑</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>


            </a-menu>
          </a-dropdown>
        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <asset-modal ref="modalForm" @ok="modalFormOk"></asset-modal>


    <sys-user-agent-modal ref="sysUserAgentModal"></sys-user-agent-modal>

    <!-- 用户回收站 -->
    <!--    <user-recycle-bin-modal :visible.sync="recycleBinVisible" @ok="modalFormOk"/>-->
    <a-modal v-model="visible" title="审核不合格" @ok="handleOk">
      <a-input placeholder="请填写审核不合格原因" />
    </a-modal>
  </a-card>

</template>

<script>
  import assetModal from './modules/entryAssetModal'
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
  import SysUserAgentModal from "./modules/SysUserAgentModal";
  import JInput from '@/components/jeecg/JInput'
  import UserRecycleBinModal from './modules/UserRecycleBinModal'
  import JDate from '@/components/jeecg/JDate'

  export default {
    name: "UserList",
    mixins: [JeecgListMixin],
    components: {
      SysUserAgentModal,
      assetModal,
      JInput,
      UserRecycleBinModal,
      JDate
    },
    data() {
      return {
        visible: false,
        description: '入帐资产管理页面',
        queryParam: {
          status: '待审核'
        },
        recycleBinVisible: false,
        dataSource: [{
            id: 2,
            assetType: '专用设备',
            deviceName: '手机',
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
            campus: '仓山校区',
            tower: '黄鹤楼',
            room: '301',
            fundSource: '地理所',
            invoice: '250611431925',
            status: 3,
            statusName: '待审核',
            checkTime: '2021-06-30 16:20:35',
            reason: '学校已经没有经费了',
            invoiceImg: [{
              url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg'
            }],
            image: [{
              url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg',
            }]
          },

          {
            id: 3,
            assetType: '专用设备',
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
            campus: '仓山校区',
            tower: '黄鹤楼',
            room: '301',
            fundSource: '地理所',
            invoice: '250611431925',
            status: 3,
            statusName: '合格',
            checkTime: '2021-06-30 16:20:35',
            reason: '学校已经没有经费了',
            invoiceImg: [{
              url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg'
            }],
            image: [{
              url: 'http://www.juimg.com/tuku/yulantu/140703/330746-140F301555752.jpg',
            }]
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
            title: '状态',
            align: "center",
            width: 120,
            dataIndex: 'statusName',
          },
          {
            title: '资产类型',
            align: "center",
            width: 100,
            dataIndex: 'assetType',
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
            title: '购置日期',
            align: "center",
            width: 180,
            dataIndex: 'payTime'
          },
          {
            title: '审核时间',
            align: "center",
            width: 180,
            dataIndex: 'checkTime'
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
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    mounted() {},
    methods: {
      getAvatarView: function (avatar) {
        return getFileAccessHttpUrl(avatar)
      },
      handleMenuClick(e) {
        if (e.key == 1) {
          this.batchDel();
        }
      },
      handleCheck(id) {

      },
      confirm(e) {
        console.log(e);
        this.$message.success('审核合格');

      },
      cancel(e) {
        this.visible = true;
        console.log(e);
        // this.$message.error('审核合格');
      },
    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>