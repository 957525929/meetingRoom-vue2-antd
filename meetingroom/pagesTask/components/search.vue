<template>
	<view>
		<!-- <view class="cu-form-group">
			<view class="title">会议室状态</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{picker[index]}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">位置</view>
			<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
				<view class="picker" style="font-size: 15px;">
					{{multiArray[0][multiIndex[0]]}}.{{multiArray[1][multiIndex[1]]}}.{{multiArray[2][multiIndex[2]]}}
				</view>
			</picker>
		</view> -->
			<!-- <picker @change="PickerChange1" :value="index1" :range="picker1">
				<view class="picker">
					{{picker1[index1]}}
				</view>
			</picker> -->


		<!-- <view class="cu-form-group">
			<view class="title">被访问人</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{picker[index]}}
				</view>
			</picker>
		</view> -->

		<!-- <view v-if="this.index1 == 1">
			<view class="cu-bar bg-white margin-top">
				<view class="action">选择访问日期</view>
			</view>

			<view class="cu-form-group">
				<view class="title">日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view> -->

			<view class="cu-bar bg-white margin-top" style="margin-top: 10px;">
				<view class="action">按会议时间范围查询</view>
			</view>
			<view class="cu-form-group">
				<view class="title">请选择开始时间</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2030-09-01"  @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">请选择结束时间</view>
				<picker mode="date" :value="date" start="2015-10-01" end="2030-10-01"  @change="TimeChange1">
					<view class="picker">
						{{time1}}
					</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {},

		created: function() {
			 this.time =new Date().getFullYear() + "-" +(new Date().getMonth() + 1) + "-" +(new Date().getDate()+1)  ;
			 this.time1 = new Date().getFullYear() + "-" +(new Date().getMonth() + 2) + "-" +(new Date().getDate()+1) ;
		},
		mounted() {

		},
		data() {
			return {
				time: '',
				time1: '',
				index: 0,
				//index1:0,
				//picker: ['空闲', '已预约', '禁用'],
				//picker1: ['福建师范大学.旗山校区.1号楼', '福建师范大学.旗山校区.2号楼', '福建师范大学.仓山校区.1号楼','福建师范大学.仓山校区.2号楼'],
				date:'',
				// multiIndex: [0, 0, 0],
				// multiArray: [
				// 	['仓山校区', '旗山校区'],
				// 	['1号楼', '2号楼','3号楼'],
				// 	['101','102'],
				// 	],
			}
		},
		methods: {
			// PickerChange(e) {
			// 	this.index = e.detail.value
			// 	this.$emit('send', this.index)
			// 	// console.log(e.detail.value)
			// },
			// PickerChange1(e) {
			// 	this.index1 = e.detail.value
			// 	this.$emit('send', this.index1)
				// console.log(e.detail.value)
			//},
			// MultiChange(e) {
			// 	this.multiIndex = e.detail.value
			// },
			// MultiColumnChange(e) {
			// 	let data = {
			// 		multiArray: this.multiArray,
			// 		multiIndex: this.multiIndex
			// 	};
			// 	data.multiIndex[e.detail.column] = e.detail.value;
			// 	switch (e.detail.column) {
			// 		case 0:
			// 			switch (data.multiIndex[0]) {
			// 				case 0:
			// 					data.multiArray[1] = ['1号楼', '2号楼','3号楼'];
			// 					data.multiArray[2] = ['1-105','1-205','1-305','1-405'];
			// 					break;
			// 				case 1:
			// 					data.multiArray[1] = ['4号楼', '5号楼'];
			// 					data.multiArray[2] = ['4-106','4-206','4-306','4-406'];
			// 					break;
			// 			}
			// 			data.multiIndex[1] = 0;
			// 			data.multiIndex[2] = 0;
			// 			break;
			// 		case 1:
			// 			switch (data.multiIndex[0]) {
			// 				case 0:
			// 					switch (data.multiIndex[1]) {
			// 						case 0:
			// 							data.multiArray[2] = ['1-105','1-205','1-305','1-405'];
			// 							break;
			// 						case 1:
			// 							data.multiArray[2] = ['2-301','2-302','2-303','2-304'];
			// 							break;
			// 						case 2:
			// 							data.multiArray[2] = ['3-101','3-102','3-103','3-104'];
			// 							break;
			// 					}
			// 					break;
			// 				case 1:
			// 					switch (data.multiIndex[1]) {
			// 						case 0:
			// 							data.multiArray[2] = ['4-106','4-206','4-306','4-406'];
			// 							break;
			// 						case 1:
			// 							data.multiArray[2] = ['5-303', '5-304'];
			// 							break;
			// 						// case 2:
			// 						// 	data.multiArray[2] = ['8-205', '8-206', '8-207'];
			// 						// 	break;
			// 					}
			// 					break;
			// 			}
			// 			data.multiIndex[2] = 0;
			// 			break;
			// 	}
			// 	this.multiArray = data.multiArray;
			// 	this.multiIndex = data.multiIndex;
			// },
			TimeChange(e) {
				this.time = e.detail.value
				this.$emit('getstarttime', this.time)
			},
			TimeChange1(e) {
				this.time1 = e.detail.value
				this.$emit('getendtime', this.time1)
			},
			// DateChange(e) {
			// 	this.date = e.detail.value
			// },
		}
	}
</script>

<style>
</style>
