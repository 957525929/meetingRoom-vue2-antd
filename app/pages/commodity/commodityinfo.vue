<template>
	<view class="wrap">
		<u-navbar :is-back="true" back-icon-color="#fff" :background="background" back-text="资产信息" title-color="#fff"
			:back-text-style="{color: '#fff'}">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
				</view>
			</view>
		</u-navbar>
		<u-section class="mt20 mb12" :right="false" :show-line="true"></u-section>
		<view class="">
			<u-card class="cinfo" :title="commodityList.category" :sub-title="commodityList.regTime" margin='0rpx'>
				<view class=""  slot="body">
					<view class="title-wrap">
							<!-- #ifdef MP-WEIXIN -->
							<text class="vxtitle u-line-2">领用人：{{ commodityList.name }}</text>
							<text class="vxtitle u-line-2">手机：{{ commodityList.telephone }}</text>
							<text class="vxtitle u-line-2">位置：{{ commodityList.address }}</text>
							<text class="vxtitle u-line-2">数量：{{ commodityList.number }}</text>
							<text class="vxtitle u-line-2">学校编号：{{ commodityList.barcode1 }}</text>
							<text class="vxtitle u-line-2">学院编号：{{commodityList.barcode2}}</text>
							<text class="vxtitle u-line-2">登记时间:{{commodityList.regTime}}</text>
							<text class="vxtitle u-line-2">有效期限：{{commodityList.expire}}</text>
							<text class="vxtitle u-line-2">报废时间:{{commodityList.scrapTime}}</text>
							<text class="vxtitle u-line-2">照片：</text>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<text class="title u-line-2">领用人：{{ commodityList.name }}</text>
							<text class="title u-line-2">手机：{{ commodityList.telephone }}</text>
							<text class="title u-line-2">位置：{{ commodityList.address }}</text>
							<text class="title u-line-2">数量：{{ commodityList.number }}</text>
							<text class="title u-line-2">学校编号：{{ commodityList.barcode1 }}</text>
							<text class="title u-line-2">学院编号：{{commodityList.barcode2}}</text>
							<text class="title u-line-2">登记时间:{{commodityList.regTime}}</text>
							<text class="title u-line-2">有效期限：{{commodityList.expire}}</text>
							<text class="title u-line-2">报废时间:{{commodityList.scrapTime}}</text>
							<text class="title u-line-2">照片：</text>
							<!-- #endif -->
						
						<image @click="imgListPreview(commodityList.image)" class="item-img" :src="commodityList.image">
						</image>
					</view> 
				</view>
				<view class="" slot="foot">
					<u-row gutter="16" justify="flex-end">
						<u-col span="3">
							<u-icon name="edit-pen-fill" size="34" color="#0055ff" label="编辑" label-color="#0055ff"
								@click="edit()"></u-icon>
						</u-col>
						<u-col span="3">
							<u-icon name="trash-fill" size="34" color="#cc0411" label="报废" label-color="#cc0411"
								@click="scrap()"></u-icon>
						</u-col>
						<u-col span="3">
							<u-icon name="close-circle-fill" size="34" color="#ec3304" label="删除" label-color="#ec3304"
								@click="del()"></u-icon>
						</u-col>
					</u-row>
				</view>
			</u-card>
		</view>
		<u-modal v-model="show" content="是否删除该资产信息？" :show-cancel-button="true" @confirm="confirm"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				background: {
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				commodityList: {
					category: '办公桌',
					status: '在用',
					name: '王老师',
					telephone:'12313213123',
					address: '仓山校区A栋306',
					barcode1: '12321312543465',
					barcode2: '45754674343233',
					regTime: '2021-05-06 16:31:30',
					expire: '2023-05-06',
					scrapTime: '2021-05-06 16:31:30',
					image: '../../static/images/table.jpg',
					number: 1
				},
				show: false,
				id: null,
				value: '',
				type: 'text',
				border: true
			}
		},
		onLoad(option) {
			_this = this;
			console.log(option.barCode);
			//_this.getcommodityList();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'addcommodity'
			})
		},
		methods: {
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
			del(index) {
				_this.show = true;
			},
			edit(index) {
				uni.navigateTo({
					url: 'editcommodity?id=1'
				})
			},
			scrap(index) {
				
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
				
				urlList.push('https://img36.51tietu.net/pic/2016-122315/20161223155040stnfwkjxaih15350.jpg') //push中的参数为 :src="item.img_url" 中的图片地址
				uni.previewImage({
					indicator: "number",
					loop: true,
					urls: urlList
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.item {
		display: inherit;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

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
		display: block;
		margin: 20rpx 100rpx;
	}
</style>
