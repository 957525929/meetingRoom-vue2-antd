<template>
	<view class="qiun-center qiun-columns">
		<view v-if="infoList.length > 0">
			<view class="mt4 code" v-for="(item, index) in infoList" :key="index">
				<u-card :title="item.title" :sub-title="item.createtime" :thumb="statusList[item.status].url">>
					<view class="" slot="body">
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							<view class="u-body-item-title u-line-2">{{item.content}}
							</view>
						</view>
					</view>
				</u-card>
			</view>
		</view>
		<view v-else>
			<image class="u-grid-item-img" src="../../static/images/nodata.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoList: [{
					id: 1,
					status:1,
					code: '123',
					title: '报销资产',
					createtime: '2021-06-04 15:30:24',
					content: '现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销现在资产报销'
				}],
				statusList: [{
					url: '../../static/images/unread.jpg'
				}, {
					url: '../../static/images/unread.jpg'
				}],
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
