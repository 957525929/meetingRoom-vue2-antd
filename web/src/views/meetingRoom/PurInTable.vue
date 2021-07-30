
<template>
<a-card class="puInTable">
    <j-editable-table
      ref="detailInfoForm"
      :columns="columns"
      :dataSource="dataSource"
      :maxHeight="300"
      :rowNumber="true"
      :rowSelection="true"
      :actionButton="true"
    >
      <template v-slot:name="props">
        <a-select
          show-search
          @change="changeName($event, props,value)"
          :style="{width:'342px'}"
          placeholder="请选择姓名"
        >
          <a-select-option value="李霞">李霞</a-select-option>
          <a-select-option value="尤晓梅">尤晓梅</a-select-option>
          <a-select-option value="黄丽娟">黄丽娟</a-select-option>
        </a-select>
      </template>
    </j-editable-table>
    <br>
    <template >
      <!-- <a-button key="cancel" @click="handleCancel" style="marginRight:20px">取消</a-button> -->
      <a-button key="reset" @click="handleReset" style="marginRight:20px">重置</a-button>
      <a-button key="submit" type="primary" @click="handleOk" style="marginRight:20px">提交</a-button>
    </template>
 </a-card>
</template>

<script>
import JEditableTable from '@/components/jeecg/JEditableTable'
import { FormTypes } from '@/utils/JEditableTableUtil'
import moment from 'moment'

export default {
  name: 'PurInModal',
  components: {
    JEditableTable
  },

  props: {
    modalVisible: Boolean,
    basicInfo: Object
  },
  computed: {},
  mounted() {},
  data() {
    return {
      basicInfo1: {},
      isAdd: false,
      items11: ['jack', 'lucy'],
      form1: this.$form.createForm(this),
      basicInfoForm: {},
      detailsInfoForm: {},
      dataSource: [],
      columns: [
        {
          title: '姓名',
          key: 'name',
          type: FormTypes.slot,
          placeholder: '请选择${title}',
          validateRules: [{ required: true, message: '${title}不能为空' }],
          slotName: 'name',
          options: [
            { title: '李霞', value: '李霞' },
            { title: '尤晓梅', value: '尤晓梅' },
            { title: '黄丽娟', value: '黄丽娟' }
          ]
        },
        {
          title: '联系电话',
          key: 'phone',
          type: FormTypes.input,
          validateRules: [{ required: true, message: '${title}不能为空' }],
          slotName: 'phone',
          width: '25%'
        },

        {
          title: '安排事项',
          key: 'matters',
          type: FormTypes.input_pop,
          placeholder: '请输入${title}',
          validateRules: [{ required: true, message: '${title}不能为空' }]
        }
      ]
    }
  },
  methods: {

    handleCancel() {
      this.$emit('handleCancel', false)
    },
    handleReset() {
      this.form1.resetFields() //重置基本信息
      this.$refs.detailInfoForm.getValues((err, values) => {
        //重置详细信息
        let rowId = Array.from(values, x => x.id)
        this.$refs.detailInfoForm.removeRows(rowId)
      })
    },
    handleOk() {
      this.form1.validateFields((err, values) => {
        if (!err) {
          //先验证基本信息
          this.basicInfoForm = values
          // this.basicInfoForm.purchaseDate = moment(this.basicInfoForm.purchaseDate).format('YYYY-MM-SS')
          // this.basicInfoForm.checkoutDate = moment(this.basicInfoForm.checkoutDate).format('YYYY-MM-SS')
          console.log('基本信息：', this.basicInfoForm)

          this.$refs.detailInfoForm.getValues((err, values) => {
            //再验证详细信息
            if (!err && values.length) {
              this.detailsInfoForm = values
              console.log('详细信息：', this.detailsInfoForm)
              this.$emit('handleCancel', false) //关闭窗口
              this.handleReset() //重置表单
            }
          })
        }
      })
    },
    changeName(value, props) {
      console.log(value, props)
      console.log(props.getValue())
      let tel = '';
       if (value == '李霞') {
        tel = '13759655332'
      }
      if (value == '尤晓梅') {
        tel = '13053955537'
      }
      if (value == '黄丽娟') {
        tel = '13659655381'
      }
       let { rowId, target } = props
      target.setValues([
        {
          rowKey: rowId,
          values: {
            'phone': tel
           
          }
        },
        {
          rowKey: rowId,
          values: {
            'name': value
          }
        }
      ])
     
    }
  }
}
</script>

<style lang="less" scoped>
.ant-row.ant-form-item {
  margin-bottom: 12px;
}
.puInTable{
  margin-left: 100px;
  width: 80%;
}
</style>