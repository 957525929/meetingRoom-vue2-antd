<template>
	<view class="wrap">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">资产信息</block>
		</cu-custom>
		<view class="margin-top">
			<view class="commodityinfo">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar cardtitle" :class=" size?'solids-bottom':'solid-bottom'">
						<view class="margin text-bold text-xl">办公桌</view>
						<view class="margin text-gray text-sm flex justify-between">
							2021-05-06 16:31:30
						</view>
					</view>
					<view class="text-content margin-top">
						<view class="title-wrap">
							<view class="margin-left margin-bottom-xs">
								领用人：{{ commodityList.name }}
							</view>
							<view class="margin-left margin-bottom-xs">
								手机：{{ commodityList.telephone }}
							</view>
							<view class="margin-left margin-bottom-xs">
								位置：{{ commodityList.address }}
							</view>
							<view class="margin-left margin-bottom-xs">
								数量：{{ commodityList.number }}
							</view>
							<view class="margin-left margin-bottom-xs">
								学校编号：{{ commodityList.barcode1 }}
							</view>
							<view class="margin-left margin-bottom-xs">
								学院编号：{{ commodityList.barcode2 }}
							</view>
							<view class="margin-left margin-bottom-xs">
								登记时间：{{ commodityList.regTime }}
							</view>
							<view class="margin-left margin-bottom-xs">
								有效期限：{{ commodityList.expire }}
							</view>
							<view class="margin-left margin-bottom-xs">
								报废时间：{{ commodityList.scrapTime }}
							</view>
							<view class="itemimage">
								<view class="margin-left">照片：</view>
								<image @click="imgListPreview(commodityList.image)" class="item-img"
									:src="commodityList.image">
								</image>
							</view>
						</view>
					</view>
					<view class="text-lg text-right padding">
						<text class="cuIcon-edit text-blue margin-left" @tap="edit">编辑</text>
						<text class="cuIcon-delete text-red margin-left" @tap="showModal1" data-target="DialogModal1">报废</text>
						<text class="cuIcon-roundclose text-orange margin-left" @tap="showModal"
							data-target="DialogModal">删除</text>
					</view>
				</view>
				
				<view class="cu-modal" :class="modalName1=='DialogModal1'?'show':''" style="z-index: 1;">
					<view class="cu-dialog">

						<view class="cu-bar bg-white justify-end">
							<view class="content">报废原因</view>
							<view class="action" @tap="hideModal1">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
								<view class="cu-form-group">
									<view >
										选择状态
									</view>
									<picker @change="statusSelectchange" :value="statusIndex" :range="statusSelectList" >
										<view class="picker">
											{{statusIndex>-1?statusSelectList[statusIndex]:'请选择选择状态'}}
										</view>
									</picker>
								</view>
								
								<view class="cu-form-group">
									<view>学院编号：</view>
									<input type="text" v-model="scrap" placeholder="请填写报废原因" />
								</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn" @tap="hideModal1">取消</button>
								<button class="cu-btn bg-green margin-left" @tap="okconfirm">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">删除</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl bg-white">
							是否删除该资产信息？
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn" @tap="hideModal">否</button>
								<button class="cu-btn bg-green margin-left" @tap="confirm">是</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				statusIndex: -1,
				statusSelectList: ['在用', '丢失'],
				scrap:'',
				background: {
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				commodityList: {
					category: '办公桌',
					status: '在用',
					name: '王老师',
					telephone: '12313213123',
					address: '仓山校区A栋306',
					barcode1: '12321312543465',
					barcode2: '45754674343233',
					regTime: '2021-05-06 16:31:30',
					expire: '2023-05-06',
					scrapTime: '2021-05-06 16:31:30',
					image: '../../static/scan/table.jpg',
					number: 1,
				},
				id: null,
				value: '',
				type: 'text',
				border: true,
				modalName: null,
				modalName1: null,
				size: false
			}
		},
		onLoad(option) {
			_this = this;
			console.log(option.barCode);
			//_this.getcommodityList();
		},
		// onNavigationBarButtonTap(e) {
		// 	uni.navigateTo({
		// 		url: 'addcommodity'
		// 	})
		// },
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			showModal1(e){				
				this.modalName1 = e.currentTarget.dataset.target
				this.scrap=''
			},
			hideModal1(e) {
				this.modalName1 = null
			},
			getcommodityList() {
				this.commodityList = [];
				// _this._post_form('/api/ykjp/product/product/getProduct', {}, (result) => {
				// 	for (let i = 0;i<result.data.data.length;i++) {
				// 		if(!result.data.data[i].time){
				// 			result.data.data[i].time = _this.transformTime(result.data.data[i].updatetime);
				// 		}
				// 	}
				// 	_this.setData({'commodityList' : result.data.data})
				// });
			},
			// del(index) {
			// 	_this.show = true;
			// },
			edit() {
				uni.navigateTo({
					url: '../scan/editcommodity'
				})
			},
			open(index) {
				this.commodityList[index].show = true;
			},
			confirm() {
				_this._post_form('/api/ykjp/product/product/deleteProduct', {
					id: _this.id
				}, (result) => {
					_this.getcommodityList()
				});
			},
			imgListPreview(url) {
				var urlList = []

				urlList.push(
					'../../static/scan/table.jpg'
				) //push中的参数为 :src="item.img_url" 中的图片地址
				uni.previewImage({
					indicator: "number",
					loop: true,
					urls: urlList
				})
			},
			SetSize(e) {
				this.size = e.detail.value
			},
			statusSelectchange(e){
				this.statusIndex = e.detail.value
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	.commodityinfo {
		// background-image: linear-gradient(#b6e1e5, #09c1e6);
		background-color: white;
		margin: 30rpx;
		border-radius: 20rpx;
	}

	.cardtitle {
		display: flex;
		justify-content: space-between;
	}

	.item {
		display: inherit;
		padding: 20rpx;
	}
	
	.itemimage{
		display: flex;
		width: 100%;
	}

	// image {
	// 	width: 150rpx;
	// 	flex: 0 0 120rpx;
	// 	height: 150rpx;
	// 	margin-right: 20rpx;
	// 	border-radius: 12rpx;
	// }

	.u-popup {
		padding: 15px;

		.text {
			color: #797373;
			margin: auto;
			text-align: center;
			padding: 10px 0;
		}
	}

	.title-wrap {
		display: inline-block;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: white;
		margin-top: 20rpx;
	}

	.vxtitle {
		text-align: left;
		font-size: 28rpx;
		color: green;
		margin-top: 20rpx;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}

	.cinfo {
		background-image: linear-gradient(#b6e1e5, #09c1e6);
		border-radius: 30px;
	}

	.item-img {
		margin-top: 10rpx;
		background-color: pink ;
		width: 150rpx;
		height: 150rpx;
		border-radius: 12rpx;
		display: block;
		border: 1px solid #dcdcdc;
	}

</style>
