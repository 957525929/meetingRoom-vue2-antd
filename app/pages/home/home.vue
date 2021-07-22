<template>
	<view>
		<view class="cu-bar bg-gradual-green">
			<view class="content text-bold">
				首页
			</view>
		</view>

		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			:autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			indicator-active-color="#5cbc45">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
						objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>

		<view class="list cu-form-group margin-top padding">
			<view class="content">
				<view class="cu-avatar lg radius bg-green">L
					<view class="cu-tag badge">1</view>
				</view>
				<span class="text-green margin-left">
					管理员
				</span>
				<span class="text-black">
					, 欢迎您！
				</span>
			</view>
		</view>

		<view class="nav-list margin-top">
			<navigator hover-class="none" url="" class="nav-li bg-grey" navigateTo>
				<view class="nav-title">入库</view>
				<view class="nav-name">Record</view>
				<text class="cuIcon-edit"></text>
			</navigator>
			<navigator hover-class="none" url="" class="nav-li bg-orange"
				navigateTo>
				<view class="nav-title">登记</view>
				<view class="nav-name">Install</view>
				<text class="cuIcon-lock"></text>
			</navigator>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '../../static/index/lb.jpg'
				}, {
					id: 1,
					type: 'image',
					url: '../../static/index/lb1.png',
				}, {
					id: 2,
					type: 'image',
					url: '../../static/index/lb1.png'
				}, ],
				dotStyle: false,
			}
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
		}
	}
</script>

<style>
	.list {
		background-color: #f1f1f1;
	}
</style>
