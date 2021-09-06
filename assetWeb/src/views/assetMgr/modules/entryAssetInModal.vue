<template>
  <a-drawer :title="title" :maskClosable="true" :width="700" placement="right" :closable="true" @close="handleCancel"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;" :visible="modalVisible">

    <!-- <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>
    </template> -->

    <!-- <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="领用人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入领用人姓名" v-decorator.trim="[ 'name', validatorRules.username]"
            :readOnly="!!model.id" />
        </a-form-item>
        <template v-if="!!model.id">
          <a-form-item label="审核状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入审核状态" v-decorator.trim="[ 'statusName', validatorRules.realname]" />
          </a-form-item>
          <a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入发审核时间" v-decorator.trim="[ 'checkTime', validatorRules.realname]" />
          </a-form-item>
          <a-form-item label="位置" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="[ 'campus', {}]" placeholder="请选择校区"
              :getPopupContainer="(target) => target.parentNode">
              <a-select-option :value="1">仓山校区</a-select-option>
            </a-select>
            <a-select v-decorator="[ 'tower', {}]" placeholder="请选择楼"
              :getPopupContainer="(target) => target.parentNode">
              <a-select-option :value="1">A楼</a-select-option>
              <a-select-option :value="2">B楼</a-select-option>
            </a-select>
            <a-select v-decorator="[ 'room', {}]" placeholder="请选择房间"
              :getPopupContainer="(target) => target.parentNode">
              <a-select-option :value="1">102</a-select-option>
              <a-select-option :value="2">105</a-select-option>
            </a-select>
          </a-form-item>
        </template>
        <a-form-item label="资产类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'assetType', {}]" placeholder="请选择资产类型"
            :getPopupContainer="(target) => target.parentNode">
            <a-select-option :value="1">房屋、构筑物及土地</a-select-option>
            <a-select-option :value="2">通用设备</a-select-option>
            <a-select-option :value="3">专用设备</a-select-option>
            <a-select-option :value="4">图书、档案</a-select-option>
            <a-select-option :value="5">家具、用具</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="资产名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入资产名称" v-decorator.trim="[ 'deviceName', validatorRules.realname]" />
        </a-form-item>
        <a-form-item label="数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入设备名称" v-decorator.trim="[ 'amount', validatorRules.realname]" />
        </a-form-item>
        <a-form-item label="单价" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入设备名称" v-decorator.trim="[ 'price', validatorRules.realname]" />
        </a-form-item>
        <a-form-item label="厂家名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入厂家名称" v-decorator.trim="[ 'factory', validatorRules.realname]" />
        </a-form-item>
        <a-form-item label="供应商名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入供应商名称" v-decorator.trim="[ 'supply', validatorRules.realname]" />
        </a-form-item>
        <a-form-item label="购置日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker style="width: 100%" placeholder="请选择购置日期"
            v-decorator="['payTime', {initialValue:!model.payTime?null:moment(model.payTime,dateFormat)}]"
            :getCalendarContainer="node => node.parentNode" />
        </a-form-item>
        <a-form-item label="型号规格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入型号规格" v-decorator.trim="[ 'model', validatorRules.realname]" />
        </a-form-item>
        <a-form-item label="经费科目" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'fundType', {}]" placeholder="请选择经费科目"
            :getPopupContainer="(target) => target.parentNode">
            <a-select-option :value="1">科研</a-select-option>
            <a-select-option :value="2">教学</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="报帐部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'department', {}]" placeholder="请选择报帐部门"
            :getPopupContainer="(target) => target.parentNode">
            <a-select-option :value="1">财务大厅</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="经费来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入经费来源" v-decorator.trim="[ 'fundSource', validatorRules.realname]" />
        </a-form-item>
        <a-form-item label="发票号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入发票号" v-decorator.trim="[ 'invoice', validatorRules.realname]" />
        </a-form-item>
        <a-form-item label="照片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
            :file-list="fileList" @preview="handlePreview" @change="handleImgChange">
            <div v-if="fileList.length < 4">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleImgCancel">
            <img alt="example" style="width: 100%" :src="previewImage" :style="{marginTop:'20px'}" />
          </a-modal>
        </a-form-item>

      </a-form>
    </a-spin>
    <depart-window ref="departWindow" @ok="modalFormOk"></depart-window>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleImgCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div> -->
  </a-drawer>
</template>

<script>
  export default {
    name: "UserModal",
    props: {
      modalVisible: Boolean,
      basicInfo: Object,
      title:String,
    },
    components: {

    },
    data() {
      return {
      }
    },
    created() {
      console.log(this.modalVisible)

    },
    computed: {

    },
    methods: {
      handleCancel() {
        this.modalVisible=false
      }
    }
  }
</script>

<style scoped>

</style>