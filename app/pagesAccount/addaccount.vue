<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">新增资产入账</block>
		</cu-custom>
		
		<view class="cu-form-group">
			<view class="title">资产类型</view>
			<picker @change="selectchange" :value="selectIndex" :range="selectList">
				<view class="picker">
					{{selectIndex>-1?selectList[selectIndex]:'请选择资产类型'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">学院编号</view>
			<input placeholder="请输入学院编号" name="input"></input>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: -1,
				selectList: ['房屋、构筑物及土地', '通用设备', '专用设备', '图书、档案', '家具、用具'],
			}
		},
		methods: {
			selectchange(e) {
				this.selectIndex = e.detail.value
			},
		}
	}
</script>

<style>

</style>
