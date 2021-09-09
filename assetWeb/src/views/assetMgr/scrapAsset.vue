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
            <a-form-item label="资产类型">
              <a-select v-model="queryParam.assetType" placeholder="请选择资产类型">
                <a-select-option :value="10">房屋、构筑物及土地</a-select-option>
                <a-select-option :value="20">通用设备</a-select-option>
                <a-select-option :value="30">专用设备</a-select-option>
                <a-select-option :value="50">图书、档案</a-select-option>
                <a-select-option :value="60">家具、用具</a-select-option>
                <a-select-option value="">全部</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- <a-col :md="6" :sm="8" :lg="4">
            <a-form-item label="资产状态">
              <a-select v-model="queryParam.status" placeholder="请选择资产状态">
                <a-select-option :value="1">使用中</a-select-option>
                <a-select-option :value="2">丢失</a-select-option>
                <a-select-option :value="3">多余</a-select-option>
                <a-select-option :value="4">报废</a-select-option>
                <a-select-option :value="5">待报废</a-select-option>
                <a-select-option value="">全部</a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
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
                <a-input placeholder="请输入房间号" v-model="queryParam.room"></a-input>
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



    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="待报废资产">
          <!-- 操作按钮区域 -->
          <div class="table-operator" style="border-top: 5px">
            <a-button type="primary" icon="download" @click="handleExportXls('待报废资产信息')">导出</a-button>
            <a-dropdown v-if="selectedRowKeys.length > 0">
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1">
                  <a-popconfirm title="是否确定翻转资产状态为报废?" ok-text="确定" cancel-text="取消" @confirm="confirm"
                    @cancel="cancel">
                    <a href="javascript:;" @click="batchCheckYes()">报废</a>
                  </a-popconfirm>
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

              <span slot="assetType" slot-scope="assetType">
                <span v-if="assetType==10">房屋、构筑物及土地</span>
                <span v-if="assetType==20">通用设备</span>
                <span v-if="assetType==30">专用设备</span>
                <span v-if="assetType==50">图书、档案</span>
                <span v-if="assetType==60">家具、用具</span>
              </span>

              <span slot="assetStatus" slot-scope="assetStatus">
                <span v-if="assetStatus==1">使用中</span>
                <span v-if="assetStatus==2">丢失</span>
                <span v-if="assetStatus==3">多余</span>
                <span v-if="assetStatus==4">报废</span>
                <span v-if="assetStatus==5">待报废</span>
              </span>

              <span slot="check" slot-scope="check">
                <span v-if="check==1">是</span>
                <span v-if="check==2">否</span>
              </span>

              <span slot="action" slot-scope="text, record">
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
                <a-divider type="vertical" />
                <a-popconfirm title="是否确定翻转资产状态为报废?" ok-text="确定" cancel-text="取消" @confirm="confirm" @cancel="cancel">
                  <a href="javascript:;" @click="handleCheck(record.id)">报废</a>
                </a-popconfirm>
              </span>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="报废资产" force-render>
          <!-- 操作按钮区域 -->
          <div class="table-operator" style="border-top: 5px">
            <a-button type="primary" icon="download" @click="handleExportXls('报废资产信息')">导出</a-button>
          </div>
          <!-- table区域-begin -->
          <div>
            <a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSourceScrap"
              :pagination="ipagination" :loading="loading">

              <span slot="assetType" slot-scope="assetType">
                <span v-if="assetType==10">房屋、构筑物及土地</span>
                <span v-if="assetType==20">通用设备</span>
                <span v-if="assetType==30">专用设备</span>
                <span v-if="assetType==50">图书、档案</span>
                <span v-if="assetType==60">家具、用具</span>
              </span>

              <span slot="assetStatus" slot-scope="assetStatus">
                <span v-if="assetStatus==1">使用中</span>
                <span v-if="assetStatus==2">丢失</span>
                <span v-if="assetStatus==3">多余</span>
                <span v-if="assetStatus==4">报废</span>
                <span v-if="assetStatus==5">待报废</span>
              </span>

              <span slot="check" slot-scope="check">
                <span v-if="check==1">是</span>
                <span v-if="check==2">否</span>
              </span>

              <span slot="action" slot-scope="text, record">
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </span>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <asset-in-modal :title="title" :form="form" :modalVisible="modalVisible" v-if="modalVisible"
      @close="modalVisible=false"></asset-in-modal>
    <a-modal v-model="visibleScrap" title="报废原因" @ok="handleOk">
      <a-form-model :model="formScrap" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="报废照片">
          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
            :file-list="formScrap.image" @preview="handleScrapPreview" @change="handleScrapImgChange">
            <div v-if="scrapListLength< 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisibleScrap" :footer="null" @cancel="handleImgCancel">
            <img alt="example" style="width: 100%" :src="previewImageScrap" :style="{marginTop:'20px'}" />
          </a-modal>
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-textarea v-model="formScrap.remark" placeholder="请输入备注" :auto-size="{ minRows: 3, maxRows: 5 }" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
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
  import assetInModal from './modules/entryAssetInModal'
  // const areaData = [{
  //     value: '旗山校区',
  //     label: '旗山校区',
  //     children: []
  //   },
  //   {
  //     value: '仓山校区',
  //     label: '仓山校区',
  //     children: []
  //   }
  // ]
  const areaData = [{
      value: '旗山校区',
      label: '旗山校区',
      children: [{
          value: '邵逸夫楼',
          label: '邵逸夫楼',
        },
        {
          value: '笃行楼',
          label: '笃行楼',
        },
        {
          value: '知明楼',
          label: '知明楼',
        },
        {
          value: '立城楼',
          label: '立城楼',
        },
      ]
    },
    {
      value: '仓山校区',
      label: '仓山校区',
      children: [{
        value: '地理科学学院实验楼',
        label: '地理科学学院实验楼',
      }, ]
    }
  ]

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  export default {
    mixins: [JeecgListMixin],
    components: {
      JInput,
      JDate,
      assetInModal,
    },
    data() {
      return {
        selectOptions: areaData,
        title: '',
        form: {},
        formScrap: {
          image: [],
          remark: ''
        },
        previewVisibleScrap: false,
        previewImageScrap: '',
        scrapListLength: 0,
        modalVisible: false,
        visibleScrap: false,
        dataSource: [{
            id: 4,
            name: '陈小明',
            assetType: 30,
            deviceName: '手机',
            amount: '1',
            price: '4000',
            factory: '华为',
            supply: '华为',
            payTime: '2021-06-28',
            model: 'Meta50',
            fundType: '科研',
            department: '财务大厅',
            telephone: 15880465874,
            // campus: '仓山校区',
            // tower: '黄鹤楼',
            // room: '301',
             fundSource: '地理所',
            invoice: '250611431925',
            status: 3,
            // checkTime: '2021-06-30 16:20:35',
            remark: '已损坏',
            invoiceImg: [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, ],
            image: [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
            ],
            assetStatus: 5,
            check: 2,
            coding: 'N01',
            placeName: '旗山校区.知明楼',
            room: '101',
            userName: '李明',
            userNameId: 'B001'
          },

          {
            id: 5,
            assetType: 30,
            deviceName: '电脑',
            amount: '1',
            price: '5000',
            factory: '华为',
            supply: '华为',
            payTime: '2021-06-28',
            model: 'Meta50',
            fundType: '科研',
            department: '财务大厅',
            name: '陈小明',
            telephone: 15880465874,
            // campus: '仓山校区',
            // tower: '黄鹤楼',
            // room: '301',
            fundSource: '地理所',
             invoice: '250611431925',
            status: 3,
            // checkTime: '2021-06-30 16:20:35',
            remark: '使用正常',
            invoiceImg: [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, ],
            image: [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, ],
            assetStatus: 5,
            check: 1,
            coding: 'N02',
            placeName: '旗山校区.邵逸夫楼',
            room: '103',
            userName: '李逵',
            userNameId: 'B002'
          },
        ],
        dataSourceScrap: [{
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
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, ],
            scrapImg: [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, ],
            image: [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
            ],
            assetStatus: 4,
            check: 2,
            coding: 'N01',
            placeName: '旗山校区.知明楼',
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
            invoice: '250611431925',
            status: 3,
            // checkTime: '2021-06-30 16:20:35',
            remark: '已损坏',
            invoiceImg: [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, ],
            image: [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, ],
            assetStatus: 4,
            check: 1,
            coding: 'N02',
            placeName: '旗山校区.邵逸夫楼',
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
          // {
          //   title: '报帐部门',
          //   align: "center",
          //   width: 100,
          //   dataIndex: 'department',
          // },
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
            title: '资产状态',
            align: "center",
            width: 120,
            dataIndex: 'assetStatus',
            scopedSlots: {
              customRender: 'assetStatus'
            },
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
            title: '是否需补贴条形码',
            align: "center",
            width: 120,
            dataIndex: 'check',
            scopedSlots: {
              customRender: 'check'
            },
          },
          {
            title: '使用人',
            align: "center",
            width: 100,
            dataIndex: 'userName',
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
      // firstTree() {
      //   return this.$store.state.meeting.placeData
      // },
      // firstTree1() {
      //   return this.$store.state.meeting.placeData1
      // },
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    mounted() {
      // this.$store.dispatch('placeTree')
      // this.$store.dispatch('placeTree1')
    },
    methods: {
      displayRender({
        labels
      }) {
        //  this.queryParam.placeName = labels.join('.')
        return labels.join('.')
      },

      handlePlaceTree() {
        // if (areaData[0].children.length == 0) {
        //   for (let i = 0; i < this.firstTree.length; i++) {
        //     areaData[0].children.push({
        //       label: this.firstTree[i].placeName,
        //       value: this.firstTree[i].placeName
        //     })
        //   }
        // }

        // if (areaData[1].children.length == 0) {
        //   for (let i = 0; i < this.firstTree1.length; i++) {
        //     areaData[1].children.push({
        //       label: this.firstTree1[i].placeName,
        //       value: this.firstTree1[i].placeName
        //     })
        //   }
        // }
        // console.log(areaData)
      },
      handleMenuClick(e) {
        if (e.key == 1) {
          this.batchCheckYes()
        }
      },
      batchCheckYes() {},
      handleCheck(id) {

      },
      confirm(e) {
        console.log(e);
        this.visibleScrap = true

      },
      cancel(e) {
        this.visible = true
        console.log(e)
      },
      callback(key) {
        if (key == 1) {
          console.log('待报废')
        }
        if (key == 2) {
          console.log('报废')
        }
      },
      handleDetail(record) {
        this.title = '详情'
        this.modalVisible = true
        this.form = record
      },
      async handleScrapPreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj)
        }
        this.previewImageScrap = file.url || file.preview
        this.previewVisibleScrap = true
      },
      handleImgCancel() {
        this.previewVisibleScrap = false
      },
      handleScrapImgChange({
        fileList
      }) {
        this.formScrap.image = fileList
        this.scrapListLength = fileList.length
      },
      handleOk() {
        if (this.scrapListLength > 0 || this.formScrap.remark) {
          this.$message.success('报废成功')
          this.formScrap = {}
        } else {
          this.$message.warning('照片或备注至少填一项')
        }

      }
    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>