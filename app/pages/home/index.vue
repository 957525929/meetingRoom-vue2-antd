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
				<view class="content" @tap="message">
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

			<view class="nav-list margin-top margin-bottom">
					<!-- #ifdef  MP-WEIXIN -->
			<!-- 		<navigator hover-class="none" :url="navCard[0].url" :class="navCard[0].style" navigateTo>
						<view class="nav-title">{{navCard[0].name}}</view>
						<view class="nav-name">{{navCard[0].secname}}</view>
						<text :class="navCard[0].icon"></text>
					</navigator>
					<navigator hover-class="none" :url="navCard[1].url" :class="navCard[1].style" navigateTo>
						<view class="nav-title">{{navCard[1].name}}</view>
						<view class="nav-name">{{navCard[1].secname}}</view>
						<text :class="navCard[1].icon"></text>
					</navigator>
					<view hover-class="none" @tap="click" data-target="Modal" :class="navCard[2].style" navigateTo>
						<view class="nav-title">{{navCard[2].name}}</view>
						<view class="nav-name">{{navCard[2].secname}}</view>
						<text :class="navCard[2].icon"></text>
					</view>
					<navigator hover-class="none" :url="navCard[3].url" :class="navCard[3].style" navigateTo>
						<view class="nav-title">{{navCard[3].name}}</view>
						<view class="nav-name">{{navCard[3].secname}}</view>
						<text :class="navCard[3].icon"></text>
					</navigator> -->
		<!-- 			<navigator hover-class="none" v-for="(item,index) in navCard" :url="item.url" :class="item.style" navigateTo>
							<view class="nav-title">{{item.name}}</view>
							<view class="nav-name">{{item.secname}}</view>
							<text :class="item.icon"></text>
					</navigator> -->
					<!-- #endif -->
					<!-- #ifndef  MP-WEIXIN -->
	<!-- 				<navigator hover-class="none" v-if="!(index==2)" v-for="(item,index) in navCard" :url="item.url" :class="item.style"  navigateTo>
							<view class="nav-title">{{item.name}}</view>
							<view class="nav-name">{{item.secname}}</view>
							<text :class="item.icon"></text>
					</navigator> -->
					<view hover-class="none"  v-for="(item,index) in navCard" @tap="gotoPage(item)" data-target="Modal"   :class="item.style"  navigateTo>
							<view class="nav-title">{{item.name}}</view>
							<view class="nav-name">{{item.secname}}</view>
							<text :class="item.icon"></text>
					</view>
				<!-- 	<view hover-class="none" @tap="click" data-target="Modal" :class="navCard[2].style" navigateTo>
						<view class="nav-title">{{navCard[2].name}}</view>
						<view class="nav-name">{{navCard[2].secname}}</view>
						<text :class="navCard[2].icon"></text>
					</view> -->
				 <!-- #endif -->
				
			
			</view>

			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">选择所属单位进入</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view class="padding flex flex-direction">
							<button class="cu-btn bg-blue lg" @tap="goto1">地科院</button>
							<button class="cu-btn bg-green margin-tb-sm lg" @tap="goto2">地理所</button>
						</view>
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
						url: '../../pagesSign/signList',
						style: 'nav-li bg-blue'
					},
					{
						id: 3,
						name: '入帐',
						secname: 'Account',
						icon: 'cuIcon-redpacket',
						url: ' ',
						style: 'nav-li bg-mauve'
					},
					{
						id: 4,
						name: '查询',
						secname: 'Search',
						icon: 'cuIcon-search',
						url: '../../pagesSearch/index',
						style: 'nav-li bg-purple'
					}
				],
				modalName: null,
			}
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			click(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			goto1(){
				uni.navigateTo({
					url:'../../pagesAccount/index'
				})
				this.modalName = null
			},
			goto2(){
				uni.navigateTo({
					url:'../../pagesAccount/index'
				})
				this.modalName = null
			},
			message(){
				uni.navigateTo({
					url:'../person/message'
				})
			},
			gotoPage(item){
				if(item.id==3){
					this.modalName = "Modal"
				}
				uni.navigateTo({
					url:item.url
				})
			}
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
