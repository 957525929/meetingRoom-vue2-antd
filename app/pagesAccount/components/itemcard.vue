<template>
	<view>
		<view class="commodityinfo" v-for="(item,index) in infoList" :key="index">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar cardtitle">
					<view class="margin">资产类型：{{item.assetType}}</view>
					<view class="margin flex justify-between">
						<view :class='item.statusstyle'>{{item.statustype}}</view>
					</view>
				</view>
				<view class="text-content padding-bottom cf">
					<view class="title-wrap fl">
						<view class="margin-left">资产名称：{{ item.deviceName }}</view>
						<view class="margin-left">位置：{{ item.campus }}{{ item.tower }}{{item.room}}</view>
						<view class="margin-left">数量：{{ item.amount }}</view>
						<view class="margin-left">价格：{{ item.price }}(元)</view>
						<view class="margin-left">厂家：{{ item.factory}}</view>
						<view class="margin-left">购置时间：{{ item.payTime}}</view>
					</view>
					<view class="fr">
						<image class="item-img" :src="item.image">
						</image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		List
	} from '../data/infolist.js'

	export default {
		data() {
			return {
				infoList: List,
			}
		},
		
		watch:{
			value(){
				if(this.value ==0){
					this.infoList = List
				}else{
					this.getinforList()
				}
			}
		},

		props: {
			value: String
		},

		methods: {
			getinforList(){
				let obj = []
				for(let i =0; i< List.length; i++){
					if(List[i].id == this.value){
						obj.push(List[i])
					}
				}
				this.infoList = obj
			}
		}
	}
</script>

<style>
	.commodityinfo {
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

	.item-img {
		display: block;
		margin: 20rpx;
		border: 1px solid #dcdcdc;
	}

	image {
		width: 250rpx;
		height: 220rpx;
		border-radius: 12rpx;
	}
</style>
