<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">新增资产入账</block>
		</cu-custom>

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

		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				资产名称
			</view>
			<input placeholder="请输入资产名称" name="input"></input>
		</view>

		<view class="cu-bar bg-white padding-left" :class="size?'solids-top':'solid-top'">
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
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				数量
			</view>
			<input placeholder="请输入数量" name="input"></input>
		</view>

		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				单价(元)
			</view>
			<input placeholder="请输入单价" name="input"></input>
		</view>

		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				厂家
			</view>
			<input placeholder="请输入厂家名称" name="input"></input>
		</view>

		<view class="cu-form-group">
			<view class="title padding-left">供应商</view>
			<input placeholder="请输入供应商名称" name="input"></input>
		</view>

		<view class="cu-form-group">
			<view class="title padding-left">购置日期</view>
			<picker mode="date" :value="date" start="2018-01-01" end="2023-01-01" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				型号规格
			</view>
			<input placeholder="请输入型号规格" name="input"></input>
		</view>

		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				经费科目
			</view>
			<picker @change="selectchange1" :value="selectIndex1" :range="selectList1">
				<view class="picker">
					{{selectIndex1>-1?selectList1[selectIndex1]:'请选择经费科目'}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				报账部门
			</view>
			<picker @change="selectchange2" :value="selectIndex2" :range="selectList2">
				<view class="picker">
					{{selectIndex2>-1?selectList2[selectIndex2]:'请选择报账部门'}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				经费来源
			</view>
			<input placeholder="请输入经费来源" name="input"></input>
		</view>

		<view class="cu-form-group">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				发票号
			</view>
			<input placeholder="请输入发票号" name="input"></input>
		</view>

		<view class="padding-left cu-bar bg-white" :class="size?'solids-top':'solid-top'">
			<view class="title">
				<text class="cuIcon-title text-red"></text>
				发票图片
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub padding-left">
				<view class="bg-img" v-for="(item,index) in imgList1" :key="index" @tap="ViewImage1"
					:data-url="imgList1[index]">
					<image :src="imgList1[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg1" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage1" v-if="imgList1.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
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
		created: function() {
			let aData = new Date();

			this.date =
				aData.getFullYear() + "-" +
				(aData.getMonth() + 1) + "-" +
				(aData.getDate())
		},

		data() {
			return {
				selectIndex: -1,
				selectList: ['房屋、构筑物及土地', '通用设备', '专用设备', '图书、档案', '家具、用具'],
				selectIndex1: -1,
				selectList1: ['科研', '教学'],
				selectIndex2: -1,
				selectList2: ['财务大厅', '会计大厅'],
				imgList: [],
				imgList1: [],
				size: false,
				date: '',
				modalName: null,
			}
		},
		methods: {
			selectchange(e) {
				this.selectIndex = e.detail.value
			},
			selectchange1(e) {
				this.selectIndex1 = e.detail.value
			},
			selectchange2(e) {
				this.selectIndex2 = e.detail.value
			},

			SetSize(e) {
				this.size = e.detail.value
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

			DateChange(e) {
				this.date = e.detail.value
			},

			ChooseImage1() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList1.length != 0) {
							this.imgList1 = this.imgList1.concat(res.tempFilePaths)
						} else {
							this.imgList1 = res.tempFilePaths
						}
					}
				});
			},
			ViewImage1(e) {
				uni.previewImage({
					urls: this.imgList1,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg1(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList1.splice(e.currentTarget.dataset.index, 1)
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

</style>
