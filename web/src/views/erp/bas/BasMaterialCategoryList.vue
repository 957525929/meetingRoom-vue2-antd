<template>
  <div>
    <a-card>
      <a-table :columns="columns" :data-source="dataSource" :expandedRowsChange="expandedRowKeys" rowKey="placeId" :defaultExpandedRowKeys="defaultExpandedRowKeys" :pagination="false">
        <span slot="action" slot-scope="text, record">
          <a @click="nextAdd(record)" v-if="record.typeId==0||record.typeId==1">添加下级</a>
          <a-modal v-model="nextAddVisible" title="添加下级" @ok="nextAddOk" :mask="false">
            <a-row type="flex" align="middle">
              <a-col :span="5">本级名称：</a-col>
              <a-col :span="14">
                <a-input style="width: 100%" v-model="rowRecord.placeName" readOnly></a-input>
              </a-col>
            </a-row>
            <br />
            <a-row type="flex" align="middle">
              <a-col :span="5">添加下级名称：</a-col>
              <a-col :span="14">
                <a-input style="width: 100%" placeholder="请输入名称" v-model="nextName" allowClear></a-input>
              </a-col>
            </a-row>
          </a-modal>

          <a-divider type="vertical" v-if="record.typeId==0||record.typeId==1" />

          <a @click="edit(record)" v-if="record.typeId>=0">编辑</a>
          <a-modal v-model="editVisible" title="编辑" @ok="editOk" :mask="false">
            <a-row type="flex" align="middle">
              <a-col :span="3">名称：</a-col>
              <a-col :span="14">
                <a-input style="width: 100%" v-model="upName" placeholder="请输入名称" allowClear></a-input>
              </a-col>
            </a-row>
            <br />
          </a-modal>
        </span>
      </a-table>
    </a-card>
  </div>
</template>
<script>
  import {
    data
  } from './data/areaData.js'
  import {
    postAction
  } from '@/api/manage'
  const columns = [{
      title: '名称',
      dataIndex: 'placeName',
      key: 'placeName',
      width: '40%'
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: {
        customRender: 'action'
      }
    },
  ]

  export default {
    data() {
      return {
        columns: columns,
        expandedRowKeys: [],
        defaultExpandedRowKeys:[0],
        dataSource: [],
        addVisible: false,
        placeName: '',
        editVisible: false,
        rowRecord: '',
        nextAddVisible: false,
        nextName: '',
        upName: '',
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        let parameters = {
          "placeId": 0,
          "placeName": "福建师范大学",
          "typeId": -1
        }
        postAction('/PlaceController/getPlaceTree', parameters).then(res => {
          if (res.code == 200) {
            this.dataSource = [res.data]
          }
        })
      },
      edit(value) {
        this.editVisible = true
        this.rowRecord = value
        console.log(' this.rowRecordedit', this.rowRecord)
        this.upName = this.rowRecord.placeName
      },
      editOk() {
        if (this.upName) {
          let Parameters = {
            placeId: this.rowRecord.placeId,
            placeName: this.upName,
          }
          postAction('/PlaceController/updatePlaceById', Parameters).then(res => {
            if (res.code == 200) {
              this.$message.success('修改成功')
              this.loadData()
            } else {
              this.$message.warning(res.message)
            }
          })
          this.editVisible = false
        } else {
          this.$message.warning('请输入名称')
        }

      },
      nextAdd(value) {
        console.log('valuenextAdd', value)
        this.nextAddVisible = true
        this.rowRecord = value
        this.rowRecord.placeName = this.rowRecord.placeName
      },
      nextAddOk() {
        if (this.nextName) {
          let Parameters = {
            placePid: this.rowRecord.placeId,
            placeName: this.nextName,
            placeType: this.rowRecord.typeId + 1
          }
          postAction('/PlaceController/addPlace', Parameters).then(res => {
            if (res.code == 200) {
              this.$message.success('新增成功')
              this.nextName = ''
              this.loadData()
            } else {
              this.$message.warning(res.message)
            }
          })
          this.nextAddVisible = false
        } else {
          this.$message.warning('请输入名称')
        }
      },
    },
  }
</script>
<style>
</style>