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
							报销资产
						</view>
						<view class="margin text-gray text-sm flex justify-between">
							2021-06-04 16:31:30
						</view>
					</view>
					<view class="text-content padding-bottom">
						<view class="title-wrap">
							<view class="margin-left itemcontent">
								<text>现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销</text>
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
