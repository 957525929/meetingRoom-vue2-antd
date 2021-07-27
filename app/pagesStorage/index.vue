<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">资产入库</block>
		</cu-custom>
		
		<view>
			<view class="cu-form-group itemimage">
				<view class="title titlename">资产图片</view>
				<image @click="imgListPreview('../static/scan/table.jpg')" class="image" mode="scaleToFill"
					src="../static/scan/table.jpg" style="width: 13vh; height: 13vh;">
				</image>
			</view>
			<view class="cu-form-group">
				<view class="title">学校编号</view>
				<input placeholder="请输入学校编号" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">学院编号</view>
				<input placeholder="请输入学院编号" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">资产类型</view>
				<picker @change="selectchange" :value="selectIndex" :range="selectList">
					<view class="picker">
						{{selectIndex>-1?selectList[selectIndex]:'请选择资产类型'}}
					</view>
				</picker>
			</view>
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn light bg-green lg" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: -1,
				selectList: ['办公桌', '办公椅'],
			}
		},
		methods: {
			imgListPreview(url) {
				var urlList = []

				urlList.push(
					'https://img36.51tietu.net/pic/2016-122315/20161223155040stnfwkjxaih15350.jpg'
				) //push中的参数为 :src="item.img_url" 中的图片地址
				uni.previewImage({
					indicator: "number",
					loop: true,
					urls: urlList
				})
			},
			selectchange(e) {
				this.selectIndex = e.detail.value
			},
			submit() {
				
			},
		}
	}
</script>

<style>
	.image {
		border: 1px solid #dcdcdc;
	}

	.itemimage {
		height: 15vh;
		display: flex;
	}
</style>
