<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">账号管理</block>
		</cu-custom>

		<view class="cu-form-group padding">
			<view class="title">头像</view>
			<view class="cu-avatar lg round bg-green">L</view>
		</view>
		
		<view class="cu-form-group">
			<view class="title">用户ID</view>
			<input placeholder="15622" name="input"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">用户名</view>
			<input placeholder="管理员" name="input"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">昵称</view>
			<input placeholder="L" name="input"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">邮箱</view>
			<input placeholder="307148762@qq.com" name="input"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">手机</view>
			<input placeholder="15280375031" name="input"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">生日</view>
			<input placeholder="1998-06-01" name="input"></input>
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="back">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back() {
				uni.navigateTo({
					url: '../login/index'
				});
			},
		}
	}
</script>

<style>

</style>
