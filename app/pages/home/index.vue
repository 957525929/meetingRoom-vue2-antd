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

		<view class="card">
			<view class="cu-form-group padding">
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
				<navigator v-for="(item,index) in navCard" :key="index" hover-class="none" :url="item.url"
					:class="item.style" navigateTo>
					<view class="nav-title">{{item.name}}</view>
					<view class="nav-name">{{item.secname}}</view>
					<text :class="item.icon"></text>
				</navigator>
			</view>
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
				navCard: [{
						id: 1,
						name: '入库',
						secname: 'Storage',
						icon: 'cuIcon-deliver',
						url: '../../pagesStorage/index',
						style: 'nav-li bg-grey'
					},
					{
						id: 2,
						name: '登记',
						secname: 'Sign',
						icon: 'cuIcon-edit',
						url: '../../pagesSign/index',
						style: 'nav-li bg-blue'
					},
					{
						id: 3,
						name: '入帐',
						secname: 'Account',
						icon: 'cuIcon-redpacket',
						url: '../../pagesAccount/index',
						style: 'nav-li bg-mauve'
					},
					{
						id: 4,
						name: '查询',
						secname: 'Search',
						icon: 'cuIcon-search',
						url: '../../pagesSearch/index',
						style: 'nav-li bg-purple'
					},
					{
						id: 5,
						name: '会议室预约',
						secname: 'Appointment',
						icon: 'cuIcon-newshot',
						url: '../../pagesAppointment/index',
						style: 'nav-li bg-yellow'
					},
				],
				modalName: null,
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
	.card {
		background-color: white;
		border-radius: 30rpx;
	}
	.nav-li uni-text {
		right: 8px;
	}
</style>
