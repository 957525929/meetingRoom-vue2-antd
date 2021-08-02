<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">入账资产详情</block>
		</cu-custom>

		<view class="cu-card case">
			<view class="cu-item shadow">
				<view class="image flex-sub text-center">
					<image src="./static/phone.jpg" style="height: 400rpx;" mode="heightFix">
					</image>
					<view class="cu-bar bg-shadeBottom justify-end">
						<view class="text-bold" @tap="edit">
							<text class="cuIcon-edit"></text>
							编辑
						</view>
						<view class="margin-left text-bold" @tap="del" data-target="DialogModal">
							<text class="cuIcon-delete"></text>
							删除
						</view>
					</view>
				</view>
				<view class="cu-list menu-avatar cardtitle flex justify-between">
					<view class="margin text-bold text-lg">资产类型：专用设备</view>
					<view class="margin text-gray text-sm">
						<view class='cu-tag light round bg-red' >不合格</view>
					</view>
				</view>
				<view class="text-content margin-top">
					<view class="title-wrap">
						<view class="margin-left margin-bottom-xs">
							审核时间：2021-06-30 16:20:35
						</view>
						<view class="margin-left margin-bottom-xs">
							资产名称：手机
						</view>
						<view class="margin-left margin-bottom-xs">
							领用人：姚明
						</view>
						<view class="margin-left margin-bottom-xs">
							手机：15880465874
						</view>
						<view class="margin-left margin-bottom-xs">
							位置：仓山校区黄鹤楼301
						</view>
						<view class="margin-left margin-bottom-xs">
							数量：1
						</view>
						<view class="margin-left margin-bottom-xs">
							价格：4350(元)
						</view>
						<view class="margin-left margin-bottom-xs">
							厂家：华为
						</view>
						<view class="margin-left margin-bottom-xs">
							供应商：华为
						</view>
						<view class="margin-left margin-bottom-xs">
							购置时间：2021-06-28
						</view>
						<view class="margin-left margin-bottom-xs">
							型号/规格：Meta50
						</view>
						<view class="margin-left margin-bottom-xs">
							经费项目：科研
						</view>
						<view class="margin-left margin-bottom-xs">
							报销部门：财务大厅
						</view>
						<view class="margin-left margin-bottom-xs">
							经费来源：地理所
						</view>
						<view class="margin-left margin-bottom-xs">
							发票号：250611431925
						</view>
						<view class="margin-left margin-bottom-xs">
							备注：学校已经没有经费了
						</view>
						
						<view class="margin-left margin-bottom-xs">
							发票照片：
						</view>
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub padding-left">
								<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
									:data-url="imgList[index]">
									<image :src="imgList[index]" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						
						<view class="margin-left margin-bottom-xs">
							资产照片：
						</view>
						<view class="cu-form-group padding-bottom">
							<view class="grid col-4 grid-square flex-sub padding-left">
								<view class="image" v-for="(item,index) in imgList1" :key="index" @tap="ViewImage1"
									:data-url="imgList1[index]">
									<image :src="imgList1[index]" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					是否删除该资产信息
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
				imgList: [require('./static/invoice.jpg')],
				imgList1: [require('./static/phone.jpg'),require('./static/phone.jpg'), require('./static/phone.jpg')],
				modalName: null,
			}
		},
		methods: {
			edit(){
				uni.navigateTo({
					url:'./editaccount'
				})
			},
			del(e){
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
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			ViewImage1(e) {
				uni.previewImage({
					urls: this.imgList1,
					current: e.currentTarget.dataset.url
				});
			},
		}
	}
</script>

<style>

</style>
