<template>
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
  // import JInput from '@/components/jeecg/JInput'
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
      // JInput,
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
      }
    },
    created() {
      if (this.title == '详情') {
        this.form.totalPrice = parseFloat(this.form.amount) * parseFloat(this.form.price)
        this.disabledJudge = true
        this.readOnlyJudge = true
      } else if (this.title == '编辑') {
        this.readOnlyJudge = false
        this.disabledJudge = false
        this.assetListLength = this.form.image.length
         console.log(typeof (this.form.placeName))
        let a = this.form.placeName.split('.')
        // console.log('a',a)
        this.form.placeName = a
        this.invoiceImgLength = this.form.invoiceImg.length
      } else {
        this.readOnlyJudge = false
        this.disabledJudge = false
      }

    },
    mounted() {
      this.$store.dispatch('placeTree')
      this.$store.dispatch('placeTree1')
    },
    computed: {
      firstTree() {
        return this.$store.state.meeting.placeData
      },
      firstTree1() {
        return this.$store.state.meeting.placeData1
      },
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