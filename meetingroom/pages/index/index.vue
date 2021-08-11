<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<scan v-if="PageCur=='scan'"></scan>
		<person v-if="PageCur=='person'"></person>

		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur=='home'?'text-green cuIcon-homefill':'text-gray cuIcon-home'"></text>
				</view>
				<view :class="PageCur=='home'?'text-green':'text-gray'">首页</view>
			</view>

			<!-- <view class="action" @click="NavChange" data-cur="scan">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur=='scan'?'text-green cuIcon-circlefill':'text-gray cuIcon-circle'"></text>
				</view>
				<view :class="PageCur=='scan'?'text-green':'text-gray'">扫码</view>
			</view> -->

			<view class="action" @click="NavChange" data-cur="person">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur=='person'?'text-green cuIcon-peoplefill':'text-gray cuIcon-people'"></text>
				</view>
				<view :class="PageCur=='person'?'text-green':'text-gray'">个人中心</view>
			</view>
		</view>
		
		<view class="cu-tabbar-height margin-bottom"></view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				PageCur: 'home'
			}
		},
		onLoad() {
			_this = this;
			_this.getmenus();
			uni.setTabBarStyle({
				backgroundImage: '/static/images/tabbar/foot.png',
				backgroundRepeat: 'no-repeat'
			});
			_this.wxlogin();
			this.$store.dispatch("getArea");
		},
		methods: {
			NavChange: function(e) {
				console.log(e.currentTarget)
				this.PageCur = e.currentTarget.dataset.cur
			},
			
			wxlogin() {
				wx.login({
					success: function(res) {
						if (res.code) {
							console.log("res.code:" + res.code);
							this.postcode();
						// 	var d = {
						// 		appid:'wx8c3e458fbbe9cecb',
						// 		secret:'d1422640a47c374c48d1c8ce65b6112f'
						// 	}; //这里存储了appid、secret、token串  
						// 	var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid +
						// 		'&secret=' + d.secret + '&js_code=' + res.code +
						// 		'&grant_type=authorization_code';
						// 	wx.request({
						// 		url: l,
						// 		data: {},
						// 		method: 'GET',
						// 		success: function(res) {
						// 			console.log("res" + res);
						// 			var obj = {};
						// 			obj.openid = res.data.openid;
						// 			obj.expires_in = Date.now() + res.data.expires_in;
						// 			wx.setStorageSync('user', obj); //存储openid 
						// 		}
						// 	});
						// } else {
						// 	console.log('获取用户登录态失败！' + res.errMsg)
						// }
					}
					}
				});
			},
			postcode() {
				//把code  post给后端
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

</style>
