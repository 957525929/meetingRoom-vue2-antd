<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">消息通知</block>
		</cu-custom>
		<view class="margin-top">
			<view class="commodityinfo">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar cardtitle">
						<view class="margin text-xl">
							<text class="cuIcon-warn text-red"></text>
							会议室强制撤销
						</view>
						<view class="margin text-gray text-sm flex justify-between">
							2021-08-31 11:30:30
						</view>
					</view>
					<view class="text-content padding-bottom">
						<view class="title-wrap">
							<view class="margin-left itemcontent">
								<text>您已预约的仓山校区邵逸夫楼305会议室已被强制撤销，理由是需要征用该会议室召开紧急会议，请您重新预约会议室。</text>
							</view>
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
			
			}
		},
		methods: {

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

	.itemcontent {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
</style>
