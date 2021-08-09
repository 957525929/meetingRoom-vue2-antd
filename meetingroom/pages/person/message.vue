<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">消息通知</block>
		</cu-custom>
		<!-- 教师通知 -->
		<view class="cu-modal" :class="modalVisable==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">会议室强制撤销通知</view>
						<view class="action" @tap="hideModaldetail">
							<text class="cuIcon-close text-red"></text>
						</view>
				</view>
				<view class="padding-xl m-view" style="text-align: left;">
					<view class="m-bottom">
						{{notice.content}}
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="ToList">查看</button>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-top">
			<view class="commodityinfo" >
				<view class="cu-item shadow" @tap="modalVisable=true">
					<view class="cu-list menu-avatar cardtitle">
						<view class="margin text-xl">
							<text class="cuIcon-warn text-red"></text>
							{{notice.title}}
						</view>
						<view class="margin text-gray text-sm flex justify-between">
							{{notice.time}}
						</view>
					</view>
					<view class="text-content padding-bottom">
						<view class="title-wrap">
							<view class="margin-left itemcontent">
								<text>{{notice.content}}</text>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 学生通知 -->
		<!-- <view class="cu-modal" :class="modalVisable==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">会议室强制撤销通知</view>
						<view class="action" @tap="hideModaldetail">
							<text class="cuIcon-close text-red"></text>
						</view>
				</view>
				<view class="padding-xl m-view" style="text-align: left;">
					<view class="m-bottom">
						{{notice.content}}
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="ToList">查看</button>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-top">
			<view class="commodityinfo" >
				<view class="cu-item shadow" @tap="modalVisable=true">
					<view class="cu-list menu-avatar cardtitle">
						<view class="margin text-xl">
							<text class="cuIcon-warn text-red"></text>
							{{notice.title}}
						</view>
						<view class="margin text-gray text-sm flex justify-between">
							{{notice.time}}
						</view>
					</view>
					<view class="text-content padding-bottom">
						<view class="title-wrap">
							<view class="margin-left itemcontent">
								<text>{{notice.content}}</text>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			modalVisable:false,
			notice:{
				title:"预约强制撤销",
				content:"您已预约的仓山校区邵逸夫楼305会议室已被强制撤销，理由是需要征用该会议室召开紧急会议，请您重新预约会议室。",
				time:"2021-08-31 11:30:30",
			},
			stunnotice:{
				
			}
			}
		},
		methods: {
			hideModaldetail() {
				this.modalVisable=false
			},
			ToList() {
				uni.navigateTo({
					url:'../../pagesAppointment/historyList?TabCur='+'2'
		
				});	
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

	.itemcontent {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
</style>
