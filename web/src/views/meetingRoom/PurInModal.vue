<template>
  <j-modal :title="'会务安排'" :width="'1200px'" :visible="modalVisible" :maskClosable="false" @cancel="handleCancel">
    <j-editable-table ref="detailInfoForm" :columns="columns" :dataSource="dataSource" :maxHeight="300"
      :rowNumber="true" :rowSelection="true" :actionButton="true">
      <template v-slot:studentId="props">
        <a-select show-search @change="changeName($event, props)" :style="{ width: '342px' }" placeholder="请选择姓名">
          <a-select-option v-for="item in optionsArrangeName" :key="item.value" :value="item.studentId">{{ item.name }}
          </a-select-option>
        </a-select>
      </template>
    </j-editable-table>
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="reset" @click="handleReset">重置</a-button>
      <a-button key="submit" type="primary" @click="handleOk">提交</a-button>
    </template>
  </j-modal>
</template>

<script>
  import JEditableTable from '@/components/jeecg/JEditableTable'
  import {
    FormTypes
  } from '@/utils/JEditableTableUtil'
  import moment from 'moment'
  import {
    getAction,
    postAction
  } from '@/api/manage'
  export default {
    name: 'PurInModal',
    components: {
      JEditableTable
    },

    props: {
      modalVisible: Boolean,
      basicInfo: Object
    },
    created() {
      getAction('/StudentController/getStudentList', {
          pageNum: 1,
          pageSize: 10
        }).then(res => {
          console.log('res', res)
          if (res.code == 200) {
            res.data.list.forEach(element => {
              // console.log(element)
              this.optionsArrangeName.push(element)
            })
          }
        })
    },
    computed: {},
    mounted() {},
    data() {
      return {
        isAdd: false,
        optionsArrangeName: [],
        form1: this.$form.createForm(this),
        basicInfoForm: {},
        detailsInfoForm: {},
        dataSource: [],
        columns: [{
            title: '姓名',
            key: 'studentId',
            type: FormTypes.slot,
            placeholder: '请选择${title}',
            validateRules: [{
              required: true,
              message: '${title}不能为空'
            }],
            slotName: 'studentId',
          },
          {
            title: '联系电话',
            key: 'telephone',
            type: FormTypes.input,
            validateRules: [{
              required: true,
              message: '${title}不能为空'
            }],
            slotName: 'telephone',
            width: '25%'
          },

          {
            title: '安排事项',
            key: 'arrangeContent',
            type: FormTypes.input_pop,
            placeholder: '请输入${title}',
            validateRules: [{
              required: true,
              message: '${title}不能为空'
            }]
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
                console.log("basicInfo", this.basicInfo)
                let arrangementList = []
                for (let i = 0; i < this.detailsInfoForm.length; i++) {
                  let a = {
                    reservationId: this.basicInfo.reservationId,
                    studentId: this.detailsInfoForm[i].studentId,
                    arrangeContent: this.detailsInfoForm[i].arrangeContent
                  }
                  arrangementList.push(a)
                }
                console.log('arrangementList', arrangementList)
                postAction('/ArrangementController/addArrangement', arrangementList).then(res => {
                  if (res.code == 200) {
                    this.$message.success('会务安排添加成功')
                  } else {
                    this.$message.warning(res.message)
                  }
                })
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
        let tel = ''
        this.optionsArrangeName.forEach(item => {
          if (item.studentId == value) {
            tel = item.telephone
          }
        })
        let {
          rowId,
          target
        } = props
        target.setValues([{
            rowKey: rowId,
            values: {
              telephone: tel
            }
          },
          {
            rowKey: rowId,
            values: {
              studentId: value
            }
          },
        ])

      }
    }
  }
</script>

<style lang="less" scoped>
  .ant-row.ant-form-item {
    margin-bottom: 12px;
  }
</style>