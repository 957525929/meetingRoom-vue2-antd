<template>
	<view>
		<view class="cu-form-group">
			<view class="title">申请状态</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{picker[index]}}
				</view>
			</picker>
		</view>
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
				picker: ['待开会', '已完成', '强制撤销'],
				date:''
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
				this.$emit('send', this.index)
				//console.log("index",this.index)
			},
			TimeChange(e) {
				this.time = e.detail.value
				this.$emit('getstarttime', this.time)
				//console.log("index",this.index)
			},
			TimeChange1(e) {
				this.time1 = e.detail.value
				this.$emit('getendtime', this.time1)
				
			},
			DateChange(e) {
				this.date = e.detail.value
			},
		}
	}
</script>

<style>
</style>
