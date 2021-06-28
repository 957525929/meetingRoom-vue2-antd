<template>
	<view class="content" v-if="data">
		<u-navbar :is-back="false" back-icon-color="#fff" :background="background" back-text="首页" title="首页"
			title-color="#fff" :back-text-style="{color: '#fff'}">
		</u-navbar>
		<u-swiper :list="data.bannerlist" :effect3d="true" :height="300"></u-swiper>
		<view class="m_top25" v-for="(listitem, index) in data.menu" :key="index">
			<u-section :title="listitem.title" :right="false" :show-line="true"></u-section>
			<view class="white m_top5">
				<u-grid :col="2" :border="false">
					<u-grid-item v-for="(item, idx) in listitem.info" :key="idx" @tap="onClick(item.url?item.url:null)">
						<image class="u-grid-item-img" :src="item.src"></image>
						<view class="grid-text">{{item.title}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
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
				data: {
					bannerlist: [{
							image: '../../static/images/lb.jpg'
						},
						{
							image: '../../static/images/lb1.png'
						},
						{
							image: 'http://app.com/Uploads/banner/lb.jpg'
						}
					],
					menu: [{
							title: "资产管理",
							info: [{
									'title': "入库",
									'src': '../../static/images/m7.png',
									'url': "/pages/commodity/storage"
								},
								{
									'title': "登记",
									'src': '../../static/images/m8.png',
									'url': "/pages/commodity/record"
								},
							]
						},
						{
							title: "资产查询",
							info: [{
									'title': "查询",
									'src': '../../static/images/m2.png',
									'url': "/pages/asset/assetList"
								},
								{
									'title': "扫一扫",
									'src': '../../static/images/m3.jpg',
									'url': ""
								}
							]
						}

					]
				}
			}
		},
		onLoad() {
			_this = this;
			_this.getmenus();
		},
		methods: {
			onClick(url) {
				if (url) {
					uni.navigateTo({
						url: url
					})
				} else {
					this.scan();
				}
			},
			getmenus() {
				// _this._post_form('user/getAppMenu', {}, (result) => {
				// 	_this.data = result.data
				// });
			},
			onClickMp() {
				// #ifndef MP
				return;
				// #endif
				uni.navigateToMiniProgram({
					appId: 'wxe604ef58ff7c65b1',
					path: 'pages/index/index'
				})
			},
			/**
			 * 分享当前页面
			 */
			onShareAppMessage: function() {
				return {
					title: '我发现了一个超好用的进销存管理系统',
					path: "/pages/login/index"
				};
			},
			/**
			 * 分享到朋友圈
			 * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
			 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
			 */
			onShareTimeline() {
				return {
					title: '我发现了一个超好用的进销存管理系统',
					path: "/pages/login/index"
				};
			},
			scan() {
				let url = '/pages/commodity/commodityinfo?barCode=' + 123;
				_this.onClick(url);
				// 调起条码扫描
				// uni.scanCode({
				//  scanType: 'barCode',
				//  success: function (res) {
				// 	 //that.result3 = res.result;
				// 	 console.log('条码类型：' + res.scanType);
				// 	 console.log('条码内容：' + res.result);
				// 	 let url = '/pages/commodity/commodityinfo?barCode='+ res.result;
				// 	 _this.onClick(url);
				//  }
				// });
			}
		}
	}
</script>
<style>
	.content {
		padding: 10px 10px;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.m_top15 {
		margin-top: 15px;
	}

	.m_top25 {
		margin-top: 25px;
	}

	.m_top5 {
		margin-top: 5px;
	}

	.u-grid-item-img {
		margin: 0 auto;
		display: block;
		padding: 5px 0;
		width: 60px;
		height: 60px;
	}
</style>
