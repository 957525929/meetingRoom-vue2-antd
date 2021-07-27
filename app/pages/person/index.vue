<template>
	<view class="back">
		<!-- #ifdef APP-PLUS -->
		<!-- 状态栏占位 -->
		<view class="top-wrapper">
		</view>
		<!-- #endif -->
		<view class="wrapper">
			<view class="card">
				<view class="contentList perMsg bg-green" @tap="$navTo.goTo('myInfo')">
					<view class="avat">
						<image mode="scaleToFill" src="/static/person/head.png"></image>
					</view>
					<view class="fontContent fontColorWhite">
						<h3>{{title}}</h3>
					</view>
				</view>
				<text class="listIcons secCode iconfont iconerweima-copy"></text>
			</view>
			<view class="cu-list menu sm-border card-menu margin-top">
				<view class="cu-item arrow content" v-for="item in contentList" :key="item.title">
					<text class="text-grey">{{item.title}}</text>
					<view v-if="item.title=='我的消息'" class="action">
						<view class="cu-tag round bg-red">1</view>
					</view>
				</view>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="back">退出</button>
			</view>
		</view>
	</view>
</template>

<script>
	const content = [{
		imgUrl: 'form',
		title: '我的消息',
		url: 'info'
	}, {
		imgUrl: 'iconfont iconyijianfankui',
		title: '账号管理',
		url: 'about',
	}, {
		imgUrl: 'iconfont iconset-copy-copy',
		title: '密码修改',
		url: 'sysSetting'
	}, {
		imgUrl: 'iconfont iconset-copy-copy',
		title: '注册新用户',
		url: 'sysSetting'
	}]

	export default {
		data() {
			return {
				title: "Hi，您未登录",
				contentList: content,
				colorIs: "#616161",
			};
		},
		methods: {
			back() {
				uni.navigateTo({
					url: '../login/index'
				});
			}
		}
	};
</script>
<style scoped>
	.back {
		background-color: #eeeeee;
	}

	/* 信息卡片 */
	.wrapper {
		display: flex;
		flex-direction: column;
		padding: 5px;
		overflow: scroll;
	}

	.avat {
		width: 170rpx;
		height: 170rpx;
		margin: 20px;
	}

	.avat image {
		width: 80px;
		height: 80px;
		/* background-color: #eeeeee; */
		border-radius: 50%;
	}

	.fontContent {
		flex: 1;
	}

	/* 二维码 */
	.perMsg {
		border-radius: 5px;
		padding: 15rpx;
	}

	.secCode {
		position: absolute;
		right: 0;
		top: 0;
		color: white;
	}

	/* 列表 */
	.contentList {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 5rpx 25rpx;
	}

	.listIcons {
		color: #27a176;
		width: 15px;
		height: 15px;
		margin: 10px;
	}
</style>
