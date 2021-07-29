<template>
	<view>
		<!-- <view class="cu-form-group">
			<view class="title">申请状态</view>
			<picker @change="PickerChange1" :value="index1" :range="picker1">
				<view class="picker">
					{{picker1[index1]}}
				</view>
			</picker>
		</view> -->
		
		<!-- <view class="cu-form-group">
			<view class="title">被访部门</view>

			<picker @change="PickerChange2" :value="index2" :range="picker2">
				<view class="picker">
					{{picker2[index2]}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group">
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
				<view class="action">按预约时间查询</view>
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
		//	let aTime = new Date();

			this.time =new Date().getFullYear() + "-" +(new Date().getMonth() + 1) + "-" +(new Date().getDate()+1)  ;
			this.time1 = new Date().getFullYear() + "-" +(new Date().getMonth() + 2) + "-" +(new Date().getDate()+1) ;
			// let aData = new Date();

			// this.date =
			// 	aData.getFullYear() + "-" +
			// 	(aData.getMonth() + 1) + "-" +
			// 	(aData.getDate())
		},
		mounted() {

		},
		data() {
			return {
				time: '',
				time1: '',
				// index: 0,
				// index1: 0,
				// index2: 0,
				date:''
			}
		},
		methods: {
			// PickerChange(e) {
			// 	this.index = e.detail.value
			// },
			// PickerChange1(e) {
			// 	this.index1 = e.detail.value
			// 	this.$emit('send', this.index1)
			// 	// console.log(e.detail.value)
			// },
			// PickerChange2(e) {
			// 	this.index2 = e.detail.value
			// },
			TimeChange(e) {
				this.time = e.detail.value
			},
			TimeChange1(e) {
				this.time1 = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
		}
	}
</script>

<style>
</style>
