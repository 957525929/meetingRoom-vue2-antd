<template>
  <a-form-model layout="inline" :model="formData">
    <a-form-model-item
      v-for="item in formItem"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
      :rules="item.rules"
    >
      <a-select
        v-if="item.type === 'select'"
        style="width: 200px"
        :placeholder="`${type_msg[item.type]}${item.label}`"
        v-model="formData[item.name]"
      >
        <a-select-option v-for="x in item.options" :key="x.value">
          {{ x.label }}
        </a-select-option>
      </a-select>
      <a-input
        v-if="item.type === 'input'"
        :placeholder="`${type_msg[item.type]}${item.label}`"
        v-model="formData[item.name]"
      ></a-input>
      <a-cascader
        v-if="item.type === 'cascader'"
        :options="item.options"
        :placeholder="`${type_msg[item.type]}${item.label}`"
        v-model="formData[item.name]"
        :display-render="displayRender"
        :load-data="loadData"
      />
    </a-form-model-item>
    <!--按钮-->
    <a-form-item>
      <a-button
        v-for="item in formHandler"
        :key="item.key"
        :type="item.type"
        :icon="item.icon"
        @click="item.handler && item.handler()"
        style="margin-right: 10px"
        >{{ item.label }}</a-button
      >
    </a-form-item>
  </a-form-model>

  <!-- <a-button :style="{ background: '#49a9ee', color: 'white' }" icon="search" @click="searchQuery">查询</a-button>
        <a-button @click="searchReset()" icon="reload" style="margin-left: 8px">重置</a-button> -->
</template>

<script>
import { placeTreeData } from '@/api/api'
import { f } from '../../../public/cdn/babel-polyfill/polyfill_7_2_5'
export default {
  props: {
    formItem: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => []
    },
    //按钮
    formHandler: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      //是否存在必填规则
      type_msg: {
        input: '请填写',
        select: '请选择',
        textarea: '请填写',
        picker: '请选择',
        cascader: '请选择',
        checkbox: '请选择'
      },
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
  },
  methods: {
    initFormData() {
      console.log(this.formItem)
      this.formItem.forEach(item => {
        //rules规则
        if (item.required) {
          this.rules(item)
        }
        //自定义规则
        if (item.validator) {
          item.rules = item.validator
        }
      })
    },
    rules(item) {
      const requestRules = [
        {
          required: true,
          message: `${this.type_msg[item.type]}${item.label}`,
          trigger: 'change'
        }
      ]
      //其他的rules的规则
      if (item.rules && item.rules.length > 0) {
        item.rules = requestRules.concat(item.rules)
      } else {
        item.rules = requestRules
      }
      console.log(item.rules)
    },
    displayRender({ labels }) {
      console.log('labels', labels)

      // this.formData.placeName = labels.join('.')
      console.log('formData', this.formData)
      return labels.join('.')
    },
    async loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      let data = targetOption.placeId
      let res = await placeTreeData({ id: data })
      console.log('data', res.data)
      let hadData = this.getOption(res.data)
      let cas = this.formItem.filter(item => item.type == 'cascader')
      // load options lazily
      setTimeout(() => {
        targetOption.loading = false
        targetOption.children = [...hadData]
        cas[0].options = [...cas[0].options]
      }, 1000)
    },
    getOption(params) {
      return params.map(item => {
        return {
          label: item.placeName,
          value: item.placeId,
          placeId: item.placeId,
          isLeaf: item.placeType == 1 ? false : true
        }
      })
    }
  },
  watch: {
    formItem: {
      handler(newValue) {
        this.initFormData()
      },
      immediate: true
    }
  }
}
</script>

<style></style>
