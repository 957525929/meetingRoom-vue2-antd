<template>
	<view>
		<view class="cu-modal" :class="modalVisable==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">会务安排任务</view>
						<view class="action" @tap="hideModaldetail">
							<text class="cuIcon-close text-red"></text>
						</view>					
				</view>
				<view class="padding-xl m-view" style="text-align: left;">
					<view class="m-bottom">
						【会议名称】：{{curData.meetingName}}
					</view>
					<view class="m-bottom">
						【会议室】：{{curData.meetingRoom}}
					</view>
					<view class="m-bottom">
						【时间】：{{curData.startDay}} {{curData.startTime}}
					</view>
					<view class="m-bottom">
						【任务】：{{curData.arrangeContent}}
					</view>
					
				</view>
			</view>
		</view>
		<view  class="list-content" @touchmove.stop.prevent>
			<hr-pull-load @refresh='refresh' @loadMore='loadMore' :height='-1' :pullHeight='50' :maxHeight='100'
				:lowerThreshold='20' :bottomTips='bottomTips' :isAllowPull="true" :isTab='false' ref='hrPullLoad'>
				<view v-for="(item,index) in taskList" :key="index" >
						<view class="card" @tap="recordDetail(item)">
							<span class="picture">
								<!-- 显示不同图片 -->
								<image class="card-img" :src="imgSrc[0]" mode="scaleToFill" style="width: 50px; height: 50px;"></image>
							</span>
							<span class="card-center">
								<view>
									会议名称：{{item.meetingName}}
								</view>
								<view>
									会议室：{{item.meetingRoom}}
								</view>
								<view>
									时间：{{item.startDay}} {{item.startTime}}
								</view>
							</span>					
						</view>
				</view>
			</hr-pull-load>
		</view>
	</view>
</template>

<script>
	import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'
	import noResult from '@/components/noResult.vue'
	export default {
		data() {
			return {
				bottomTips: '',
				currentPage: 1,
				pageSize: 10,
				tabIndex: 0,
				modalVisable:false,
				curData:{},
				taskList:[		],
				// 图片
				imgSrc: [
					"/static/Appointment/task.png",
					
				],
			}
		},
		//查询时间
		props: {
			start: {
				type: String,
				default: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1)
			},
			end: {
				type: String,
				default: new Date().getFullYear() + "-" + (new Date().getMonth() + 2) + "-" + (new Date().getDate() + 1)
			},
		},
		components:{
			noResult,
		},
		mounted() {
			this.getTaskList(1)
			
		},
		methods: {
			getTaskList(type) {
				let self = this;
				if (type == 1) {
					uni.showLoading({
						title: '正在加载',
					});
				}
				setTimeout(() => {
					this.meetingApi.getArrangementList({
					}).then(res => {
						console.log("res", res)
						if (res.code == 200) {
							if (res.data.length > 0) {
								if (type == 1) {
									console.log("type=1");
									self.taskList = [];
									self.taskList = res.data;
								} 
								else if (type == 2) 
								{
									console.log("type=2");
									self.taskList = self.taskList.concat(res.data);
								}
								if (self.taskList.length < self.pageSize) 
								{
									self.bottomTips = "nomore";
								} 
								else 
								{
									self.bottomTips = "more";
								}
								console.log("self.taskList", self.taskList)
							}
							else {
								if(type==1){
									self.taskList=[];
									this.noResult = true;
									uni.showToast({
										title: '没有数据',
										icon: 'none'
									});
								}
								else if(type==2){
									this.noResult = false;
									this.currentPage--;
								}
								this.bottomTips = "nomore";
							}
						} 
						else {
							if (type == 1) {
								self.taskList = [];
							} 
							else if (type == 2) {
								self.currentPage--;
							}
							self.bottomTips = "nomore";
						}
					})
				
					//})
					/* 这里300毫秒的延时，主要是为了优化视觉效果 */
					let timer = setTimeout(() => {
						clearTimeout(timer);
						self.$refs.hrPullLoad.reSet();
						uni.hideLoading();
					}, 300);
				}, 500);
			},
			//自定义上拉加载更多
			loadMore() {
				this.currentPage++;
				this.bottomTips = "loading";
				console.log("上拉加载", this.currentPage);
				this.getTaskList(2)
			},
			//自定义下拉刷新
			refresh() {
				this.currentPage = 1;
				console.log("下拉刷新");
				this.getTaskList(1)
			},
			recordDetail(item){
				console.log(item)
				this.modalVisable = true;
				this.curData=item;
				//this.$emit('send',item)
			},
			hideModaldetail(){
				this.modalVisable = false
			},
		}
	}
</script>

<style>
	.card {
		margin: 5px 10px 0px 10px;
		background-color: white;
		height: 90px;
		display: flex;
		border-radius: 10px;
		align-items: center;
	}

	.card-img {
		margin: 5px;
	}

	.card-center {
		margin-top: 5px;
		margin-left: 5px;
		width: 76%;
	}

	.card-right {
		margin-left: 20px;
		margin-top: 5px;
	}

	.card-type {
		color: #3f7dcc;
		font-size: 15px;
	}
	.list-content {
		//44px是uni-app自带的nav高度，APP和H5的表现形式不一样，所以这里需要做条件编译
		/* #ifdef APP-PLUS */
		height: calc(100vh - 90rpx);
		/* #endif */
		/* #ifdef H5 */
		height: calc(100vh - 90rpx - 44px);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 90rpx);
		/* #endif */
	}
</style>
