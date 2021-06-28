<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" src="../../static/images/head.png"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? userInfo.username : '您未登录'}}</text>
			</view>
		</view>

		<u-cell-group class="m_top20">
			<u-badge type="error" count="1"></u-badge>
			<u-cell-item icon="email-fill" color='#f3e5e9' title="我的消息" @click="gourl('message')"></u-cell-item>
			<u-cell-item icon="account-fill" color='#22c1a9' title="帐号管理" @click="gourl('account')"></u-cell-item>
			<u-cell-item icon="chat-fill" color='#f3e5e9' title="密码修改" @click="gourl('message')"></u-cell-item>
			<!-- <u-cell-item icon="question-circle-fill" color='#aaaaff' title="问题反馈" @click="gourl('feedback')"></u-cell-item>
			<u-cell-item icon="zhuanfa" color='#aa557f' title="服务条款及协议" @click="gourl('service')"></u-cell-item>
			<u-cell-item icon="error-circle-fill" color='#dc6a19' title="关于应用" @click="gourl('about')"></u-cell-item> -->
			<u-cell-item icon="plus-circle-fill" color='#358bc1' title="注册新用户" @click="gourl('../login/register')">
			</u-cell-item>
			<button class="login-button" @click="logout">退出登录</button>
		</u-cell-group>

		<u-cell-group class="m_top20">
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="contact" class="white btn">

			</button>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->

			<!-- #endif -->
		</u-cell-group>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				userInfo: {}
			}
		},
		onLoad() {
			let userinfo = uni.getStorageSync('userinfo');
			if (userinfo) {
				this.login = true;
			}
			this.getUserDetail()
		},
		methods: {
			getUserDetail() {
				var _this = this;
				_this._post_form('user/getUserInfo', {}, function(result) {
					_this.setData({
						userInfo: result.data
					})
				});
			},
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: 'login'
					});
				}
			},
			gourl(url) {
				if (this.login) {
					uni.navigateTo({
						url: url
					});
				} else {
					uni.navigateTo({
						url: 'login'
					});
				}
			},
			logout() {
				uni.showLoading({
					title: 'waiting',
					mask: false
				});

				uni.removeStorageSync('token');
				uni.removeStorageSync('userinfo');

				uni.hideLoading();
				uni.reLaunch({
					url: '../login/index'
				});
			},
			onChat() {
				plus.runtime.openURL('mqqwpa://im/chat?chat_type=crm&uin=2903475819',
					function(res) {
						plus.nativeUI.alert("本机没有安装QQ，无法启动");
					});
			},
			onClickUrl() {
				this.openBrowser('https://www.huzhan.com/code/goods403940.html');
			},
			/* 打开外部浏览器 */
			openBrowser(url) {
				// #ifdef MP-WEIXIN
				this.setClipboardData(url)
				return;
				// #endif

				// #ifdef APP-PLUS
				plus.runtime.openURL(url);
				return;
				// #endif

				// #ifdef H5
				window.location.href = url;
				return;
				// #endif
			},
			/* 设置系统剪贴板的内容 */
			setClipboardData(str) {
				// #ifdef H5
				return;
				// #endif
				uni.setClipboardData({
					data: str,
					success: function() {
						uni.showToast({
							title: '已成功复制到剪贴板',
							duration: 2000
						})
					}
				});
			},
		}
	}
</script>

<style>
	.m_top20 {
		margin-top: 20px;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		height: 120px;
		padding: 10px;
		background-color: #2fc25b;
		display: flex;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
		line-height: 75px;
	}

	.btn {
		position: initial;
		padding-left: 0px;
		padding-right: 0px;
	}

	.login-button {
		width: 80%;
		background: #E3162E;
		color: #FFFFFF;
		border-radius: 44upx;
		margin-top: 50px;
	}
</style>
