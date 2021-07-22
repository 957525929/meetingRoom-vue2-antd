<template>
  <div>
    <a-card>
      <div class="table-operator">
        <a-button @click="handleAdd">新增</a-button>
        <a-modal v-model="addVisible" title="新增" @ok="addOk">
          <a-row type="flex" align="middle">
            <a-col :span="4">名称：</a-col>
            <a-col :span="10">
              <a-input style="width: 100%" placeholder="请输入名称" v-model="name" allowClear></a-input>
            </a-col>
          </a-row>
        </a-modal>
      </div>
      <a-table :columns="columns" :data-source="dataSource" :expandedRowsChange="expandedRowKeys">
        <span slot="action" slot-scope="text, record">
          <a @click="nextAdd(record)">添加下级</a>
          <a-modal v-model="nextAddVisible" title="添加下级" @ok="nextAddOk">
            <a-row type="flex" align="middle">
              <a-col :span="4">名称：</a-col>
              <a-col :span="14">
                <a-input style="width: 100%" placeholder="请输入名称" v-model="nextName" allowClear></a-input>
              </a-col>
            </a-row>
            <br />
            <a-row type="flex" align="middle" v-if="rowRecord.value == 2 || rowRecord.value == 3">
              <a-col :span="4">上级名称：</a-col>
              <a-col :span="14">
                <a-input style="width: 100%" v-model="rowRecord.upName" allowClear></a-input>
              </a-col>
            </a-row>
          </a-modal>

          <a-divider type="vertical" />

          <a @click="edit(record)">编辑</a>
          <a-modal v-model="editVisible" title="编辑" @ok="editOk">
            <a-row type="flex" align="middle">
              <a-col :span="4">名称：</a-col>
              <a-col :span="14">
                <a-input style="width: 100%" v-model="rowRecord.name" allowClear></a-input>
              </a-col>
            </a-row>
            <br />

            <a-row type="flex" align="middle" v-if="rowRecord.value == 2 || rowRecord.value == 3">
              <a-col :span="4">上级名称：</a-col>
              <a-col :span="14">
                <a-input style="width: 100%" v-model="rowRecord.upName" allowClear></a-input>
              </a-col>
            </a-row>
          </a-modal>

          <a-divider type="vertical" />

          <a-popconfirm title="确定删除吗？" ok-text="确定" cancel-text="取消" @confirm="confirm" @cancel="cancel">
            <a href="#" v-if="record.value != 1">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import { data } from './data/areaData.js'

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name', width: '40%' },
  { title: '操作', dataIndex: 'action', scopedSlots: { customRender: 'action' } },
]

export default {
  data() {
    return {
      columns: columns,
      expandedRowKeys: [],
      dataSource: data,
      addVisible: false,
      name: '',
      editVisible: false,
      rowRecord: '',
      nextAddVisible: false,
      count: 2,
      nextName: '',
      upName: '',
    }
  },
  methods: {
    handleAdd() {
      this.addVisible = true
    },
    addOk() {
      this.addVisible = false
      if (this.name != '') {
        const newData = {
          key: this.count,
          name: this.name,
          value: 1,
          children: [],
        }
        this.dataSource = [...this.dataSource, newData]
        this.count = this.count + 1
      }
    },
    addChange(e) {
      // console.log('radio checked', e.target.value)
    },
    edit(value) {
      this.editVisible = true
      this.rowRecord = value
    },
    editOk() {
      this.editVisible = false
    },
    nextAdd(value) {
      this.nextAddVisible = true
      this.rowRecord = value
    },
    nextAddOk() {
      this.nextAddVisible = false

      if (this.nextName != '') {
        const newData = {
          key: this.count * 10,
          name: this.nextName,
          value: 2,
          upName: this.upName,
          children: [],
        }
        this.rowRecord.children = [...this.rowRecord.children, newData]
        this.count = this.count * 10 + 1
      }
    },
    confirm() {},
    cancel() {},
  },
}
</script>
<style>
</style>