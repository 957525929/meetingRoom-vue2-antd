<template>
	<view class="content" v-if="data">
		<u-navbar :is-back="false" back-icon-color="#fff" :background="background"
			title="统计"
			title-color="#fff"
			:back-text-style="{color: '#fff'}">
		</u-navbar>
			
		<view class="color-box" v-if="infodata">
			<view class="color-item bg1" >
				<view class="color-title">
					￥{{ infodata.purchase.totalMoney }}
				</view>
				<view class="color-value">
					采购汇总
				</view>
			</view>
			<view class="color-item bg2">
				<view class="color-title">
					￥{{ infodata.Retprodcut.totalMoney }}
				</view>
				<view class="color-value">
					采购退货汇总
				</view>
			</view>
		</view>
		
		<view class="color-box" v-if="infodata">
			<view class="color-item bg3">
				<view class="color-title">
					￥{{ infodata.deliveryPro.totalMoney }}
				</view>
				<view class="color-value">
					销售汇总
				</view>
			</view>
			<view class="color-item bg4">
				<view class="color-title">
					￥{{ infodata.sellreturn.totalMoney }}
				</view>
				<view class="color-value">
					销售退货汇总
				</view>
			</view>
		</view>
			
		<view class="m_top25" v-for="(listitem, index) in data.menus" :key="index" >
			<u-section  :title="listitem.title" :right="false" :show-line="true"></u-section>
			<view class="white m_top5">
				<u-grid :col="3"  :border="false">
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
				data:null,
				infodata:null,
			}
		},
		onLoad() {
			_this = this;
			_this.getinfo();
		},
		methods: {
			onClick(url){
				if (url) {
					uni.navigateTo({
						url:url
					})
				}
			},
			getinfo(){
				_this._post_form('api/index/getmenus2', {}, (result) => {
					_this.data = result.data
				});
				
				_this._post_form('api/ykjp/summary/Purchase/index', {}, (result) => {
					_this.infodata = result.data.data
				});
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
		width: 28px;
		height: 28px;
	}
	
	
	.color-box {
		/* padding: 0 15px; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		text-align: center;
		margin-top: 20rpx;
	}
	
	.color-item {
		display: flex;
		flex: 1;
		margin: 0 8rpx;
		flex-direction: column;
		border-radius: 6rpx;
		padding: 12rpx 0;
		height: 75px;
	}
	
	.bg1{
		background: linear-gradient(-125deg, #67c707, #a7f968);
	}
	
	.bg2{
		background: linear-gradient(-125deg, #16a8cc, #1bd0fd);
	}
	
	.bg3{
		background: linear-gradient(-125deg, #e29811, #f1cf71);
	}
	
	.bg4{
		background: linear-gradient(-125deg, #cc16b6, #d496d8);
	}
	
	.color-title {
		font-size: 30px;
		/* line-height: 75px; */
		height: 75px;
	}
	
	.color-value {
		font-size: 24rpx;
	}
	
</style>
