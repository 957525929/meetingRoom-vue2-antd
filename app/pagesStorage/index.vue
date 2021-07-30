<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">资产入库</block>
		</cu-custom>

		<view>

			<view class="cu-bar bg-white padding-left">
				<view class="action">
					资产图片
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub padding-left">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>

			<view class="cu-form-group">
				<view class="title padding-left">学校编号</view>
				<input placeholder="请输入学校编号" name="input"></input>
				<text class='cuIcon-scan'></text>
			</view>
			<view class="cu-form-group">
				<view class="title padding-left">学院编号</view>
				<input placeholder="请输入学院编号" name="input"></input>
				<text class='cuIcon-scan'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-title text-red"></text>
					资产类型
				</view>
				<picker @change="selectchange" :value="selectIndex" :range="selectList">
					<view class="picker">
						{{selectIndex>-1?selectList[selectIndex]:'请选择资产类型'}}
					</view>
				</picker>
			</view>
		</view>

		<view class="padding flex flex-direction">
			<button class="cu-btn round bg-green lg" @tap="submit" data-target="DialogModal">提交</button>
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提交</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					请确认是否提交
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn" @tap="hideModal">否</button>
						<button class="cu-btn bg-green margin-left" @tap="okconfirm">是</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: -1,
				selectList: ['办公桌', '办公椅'],
				imgList: ['../static/scan/table.jpg'],
				modalName: null,
			}
		},
		methods: {
			selectchange(e) {
				this.selectIndex = e.detail.value
			},
			submit() {

			},

			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			
			submit(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			cancle() {
				this.modalName = null
			},
			okconfirm() {
				uni.navigateBack()
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
