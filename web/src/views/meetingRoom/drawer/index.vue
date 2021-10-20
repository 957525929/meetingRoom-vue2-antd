<template>
  <a-drawer
    :title="title"
    width="600px"
    :visible="visible"
    :confirmLoading="confirmLoading"
    placement="right"
    @close="drawerClose"
  >
    <a-spin :spinning="confirmLoading">
      <formIndex
        ref="commonForm"
        :formItem="form_item"
        :formData="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :formHandler="form_handler"
      >
      </formIndex>
    </a-spin>
  </a-drawer>
</template>

<script>
import JCron from '@/components/jeecg/JCron'
import formIndex from '@/components/form/index.vue'
import { addMeetingRoom, updateMeetingRoom } from '@/api/meeting'
export default {
  name: 'meeetingModal',
  components: {
    JCron,
    formIndex
  },
  props: {
    selectOptions: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    // console.log('详情传值', this.id)
  },
  data() {
    const options = [
      { value: '黑板', label: '黑板' },
      { value: '演示电脑', label: '演示电脑' },
      { value: '投影仪', label: '投影仪' },
      { value: '白板', label: '白板' }
    ]
    const radioOp = [
      { value: 0, label: '空闲' },
      { value: 2, label: '禁用' },
      { value: 1, label: '开会中' }
    ]
    return {
      title: '操作',
      buttonStyle: 'solid',
      visible: false,
      model: {},
      confirmLoading: false,
      form_item: [
        {
          type: 'cascader',
          label: '位置',
          name: 'placeName',
          options: this.selectOptions,
          required: true
        },
        {
          type: 'input',
          label: '房间号',
          name: 'room',
          required: true
        },
        {
          type: 'input',
          label: '容纳人数',
          name: 'number',
          required: true
        },
        {
          type: 'checkbox',
          label: '基本条件',
          name: 'condition',
          options: '',
          required: true
        }
      ],
      formState: {
        placeName: '',
        room: '',
        number: '',
        condition: '',
        meetingRoomState: 0
      },
      form_handler: [
        {
          label: '创建',
          key: 'submit',
          type: 'primary',
          handler: () => this.handleOk()
        },

        { label: '重置', key: 'reset' }
      ],
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
      options,
      radioOp,
      getData: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    add(record) {
      this.resetFields()
      this.form_item = this.form_item.filter(item => item.type != 'radio')
      this.form_handler[0].label = '创建'
      this.getData = record
      this.visible = true
    },
    edit(record) {
      this.resetFields()
      this.form_handler[0].label = '修改'
      this.form_item.length == 4 &&
        this.form_item.splice(2, 0, {
          type: 'radio',
          label: '状态',
          name: 'meetingRoomState',
          options: this.radioOp,
          required: true
        })
      let handlerModify = []
      if (record.pc == 1) {
        handlerModify.push('演示电脑')
      }
      if (record.projector == 1) {
        handlerModify.push('投影仪')
      }
      if (record.whiteboard == 1) {
        handlerModify.push('白板')
      }
      if (record.blackboard == 1) {
        handlerModify.push('黑板')
      }
      this.formState.condition = handlerModify
      console.log(this.formState)
      this.formState.room = record.placeName.split('.')[2]
      this.formState.number = record.number
      this.formState.meetingroomId = record.meetingroomId
      this.formState.placeName = [record.placeName.split('.')[0], record.placeName.split('.')[1]]
      this.formState.meetingRoomState = record.meetingRoomState
      this.visible = true
    },
    resetFields() {
      for (let key in this.formState) {
        this.formState[key] = ''
      }
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      this.$refs.commonForm.$refs.form.validate(valid => {
        console.log(valid)
        if (valid) {
          this.form_item.length == 4 ? this.addDrawer() : this.editDrawer()
        }
      })
    },
    drawerClose() {
      this.visible = false
    },
    getList() {
      let data = this.form_item.filter(item => item.name == 'condition')
      data[0].options = this.options
    },
    async addDrawer() {
      let parameter = {}
      parameter.whiteboard = this.formState.condition.indexOf('白板') > -1 ? 1 : 0
      parameter.blackboard = this.formState.condition.indexOf('黑板') > -1 ? 1 : 0
      parameter.projector = this.formState.condition.indexOf('投影仪') > -1 ? 1 : 0
      parameter.pc = this.formState.condition.indexOf('演示电脑') > -1 ? 1 : 0
      parameter.placeName = this.formState.placeName.join('.') + '.' + this.formState.room
      parameter.number = this.formState.number
      parameter.meetingRoomState = 0
      console.log(' parameterformAdd', parameter)
      let res = await updateMeetingRoom(parameter)

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.$emit('callbackComponent', {
          function: 'loadData',
          data: '1'
        })
        this.visible = false
      } else {
        this.$message.warning(res.message)
        this.visible = false
      }
    },
    async editDrawer() {
      let parameter = {}
      parameter.whiteboard = this.formState.condition.indexOf('白板') > -1 ? 1 : 0
      parameter.blackboard = this.formState.condition.indexOf('黑板') > -1 ? 1 : 0
      parameter.projector = this.formState.condition.indexOf('投影仪') > -1 ? 1 : 0
      parameter.pc = this.formState.condition.indexOf('演示电脑') > -1 ? 1 : 0
      parameter.placeName = this.formState.placeName.join('.') + '.' + this.formState.room
      parameter.number = this.formState.number
      parameter.meetingRoomState = this.formState.meetingRoomState
      parameter.meetingroomId = this.formState.meetingroomId
      let res = await updateMeetingRoom(parameter)
      if (res.code == 200) {
        this.$message.success('修改成功')
        this.$emit('callbackComponent', {
          function: 'loadData',
          data: '1'
        })
        this.visible = false
      } else {
        this.$message.warning(res.message)
        this.visible = false
      }
    }
  }
}
</script>

<style scoped>
.w140 {
  width: 140px;
}
</style>
