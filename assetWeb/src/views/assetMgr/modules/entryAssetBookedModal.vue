<template>
  <a-drawer :title="title" :maskClosable="true" :width="600" placement="right" :closable="true" @close="handleCancel"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;" :visible="modalVisible">
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="领用人" prop="name" ref="name">
        <a-input v-model="form.name" placeholder="请输入姓名" :readOnly="readOnlyJudge"></a-input>
      </a-form-model-item>
      <a-form-model-item label="审核状态" v-if="title!='添加'">
        <a-input v-model="form.statusName" placeholder="请输入审核状态" :readOnly="readOnlyJudge"></a-input>
      </a-form-model-item>
      <a-form-model-item label="审核时间" prop="checkTime" ref="checkTime" v-if="title!='添加'">
        <a-input v-model="form.checkTime" :readOnly="true"></a-input>
      </a-form-model-item>
      <a-form-model-item label="位置" prop="placeName" ref="placeName" v-if="title!='添加'">
        <a-cascader style="width: 360px" :options="selectOptions" @click="handlePlaceTree" placeholder="请选择位置"
          v-model="form.area" :display-render="displayRender" :allowClear='false' :disabled="disabledJudge"
          @change="onChangePlaceName" />
      </a-form-model-item>
      <a-form-model-item label="房间号" v-if="title!='添加'">
        <a-input v-model="form.room" placeholder="请输入房间号" :readOnly="readOnlyJudge"></a-input>
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
      <a-form-model-item label="资产照片">
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
          :file-list="form.image" @preview="handlePreview" @change="handleAssetImgChange">
          <div v-if="assetListLength< 3&&title!='详情'">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleImgCancel">
          <img alt="example" style="width: 100%" :src="previewImage" :style="{marginTop:'20px'}" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item label="数量" prop="amount" ref="amount">
        <a-input v-model="form.amount" placeholder="请输入数量" :readOnly="readOnlyJudge"></a-input>
      </a-form-model-item>
      <a-form-model-item label="单价（元）" prop="price" ref="price">
        <a-input v-model="form.price" placeholder="请输入单价（元）" :readOnly="readOnlyJudge"></a-input>
      </a-form-model-item>
      <a-form-model-item label="金额（元）" prop="totalPrice" ref="totalPrice" v-if="title=='详情'">
        <a-input v-model="form.totalPrice" placeholder="请输入金额" readOnly></a-input>
      </a-form-model-item>
      <a-form-model-item label="厂家名称" prop="factory" ref="factory">
        <a-input v-model="form.factory" placeholder="请输入厂家名称" :readOnly="readOnlyJudge"></a-input>
      </a-form-model-item>
      <a-form-model-item label="供应商名称" prop="supply" ref="supply">
        <a-input v-model="form.supply" placeholder="请输入供应商名称" :readOnly="readOnlyJudge"></a-input>
      </a-form-model-item>
      <a-form-model-item label="购置日期" prop="payTime" ref="payTime">
        <j-date v-model="form.payTime" :showTime="true" date-format="YYYY-MM-DD" style="width:360px"
          placeholder="请选择购置日期" :readOnly="readOnlyJudge"></j-date>
      </a-form-model-item>
      <a-form-model-item label="型号规格" prop="model" ref="model">
        <a-input v-model="form.model" placeholder="请输入型号规格" :readOnly="readOnlyJudge"></a-input>
      </a-form-model-item>
      <a-form-model-item label="经费科目">
        <a-select v-model="form.fundType" placeholder="请选择经费科目" :disabled="disabledJudge">
          <a-select-option :value="1">科研</a-select-option>
          <a-select-option :value="2">教学</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="报帐部门">
        <a-select v-model="form.department" placeholder="请选择报帐部门" :disabled="disabledJudge">
          <a-select-option :value="1">财务大厅</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-item label="经费来源" prop="fundSource" ref="fundSource">
        <a-input v-model="form.fundSource" placeholder="请输入经费来源" :readOnly="readOnlyJudge" />
      </a-form-item>
      <a-form-model-item label="发票编号" prop="invoice" ref="invoice">
        <a-input v-model="form.invoice" placeholder="请输入发票编号" :readOnly="readOnlyJudge"></a-input>
      </a-form-model-item>
      <a-form-model-item label="发票照片">
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
          :file-list="form.invoiceImg" @preview="handlePreview" @change="handleInvoiceImgChange">
          <div v-if="invoiceImgLength < 2&&title!='详情'">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleImgCancel">
          <img alt="example" style="width: 100%" :src="previewImage" :style="{marginTop:'20px'}" />
        </a-modal>
      </a-form-model-item>
    </a-form-model>
    <a-button type="primary" @click="onSubmit()" style="margin-left:30%" v-if="title!='详情'">确定</a-button>
    <a-button style="margin-left: 10px;" @click="cancel()" v-if="title!='详情'">取消</a-button>
  </a-drawer>
</template>

<script>
  import JDate from '@/components/jeecg/JDate'
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
    name: "UserModal",
    props: {
      modalVisible: Boolean,
      form: Object,
      title: String,
    },
    components: {
      JDate,
    },
    data() {
      return {
        selectOptions: areaData,
        readOnlyJudge: false,
        disabledJudge: false,
        previewVisible: false,
        previewImage: '',
        assetListLength: 0,
        invoiceImgLength: 0,
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
          }],
          factory: [{
            required: true,
            message: '请输入厂家名称',
            trigger: 'blur'
          }],
          supply: [{
            required: true,
            message: '请输入供应商名称',
            trigger: 'blur'
          }],
          model: [{
            required: true,
            message: '请输入型号规格',
            trigger: 'blur'
          }],
          fundSource: [{
            required: true,
            message: '请输入经费来源',
            trigger: 'blur'
          }],
          invoice: [{
            required: true,
            message: '请输入发票编号',
            trigger: 'blur'
          }]
        },
      }
    },
    created() {

      if (this.title == '详情') {
        this.form.totalPrice = parseFloat(this.form.amount) * parseFloat(this.form.price)
        this.disabledJudge = true
        this.readOnlyJudge = true
        this.form.area = this.form.placeName.split('.')
      } else if (this.title == '编辑') {
        this.readOnlyJudge = false
        this.disabledJudge = false
        this.assetListLength = this.form.image.length
        this.form.area = this.form.placeName.split('.')
        //  console.log(typeof (this.form.placeName))
        // this.form.placeName =this.form.placeName.split('.')
        this.invoiceImgLength = this.form.invoiceImg.length
      } else {
        this.readOnlyJudge = false
        this.disabledJudge = false
      }

    },
    mounted() {
      // this.$store.dispatch('placeTree')
      // this.$store.dispatch('placeTree1')
    },
    computed: {
      // firstTree() {
      //   return this.$store.state.meeting.placeData
      // },
      // firstTree1() {
      //   return this.$store.state.meeting.placeData1
      // },
    },
    methods: {
      onChangePlaceName(value) {
        console.log(value)
        this.form.placeName = value.join('.')
      },
      displayRender({
        labels
      }) {
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
      handleCancel() {
        this.$emit('close', false)

      },
      handleImgCancel() {
        this.previewVisible = false
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
      },
      handleAssetImgChange({
        fileList
      }) {
        if (this.title != '详情') {
          this.form.image = fileList
          this.assetListLength = fileList.length
        }

      },
      handleInvoiceImgChange({
        fileList
      }) {
        if (this.title != '详情') {
          this.form.invoiceImg = fileList
          this.invoiceImgLength = fileList.length
        }

      },
      onSubmit() {
        console.log(this.form.placeName)
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$emit('close', false)
          }
        })
      },
      cancel() {
        this.$emit('close', false)
      },
    }
  }
</script>

<style scoped>

</style>