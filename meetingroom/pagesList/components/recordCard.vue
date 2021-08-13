<template>
	<view>
		<view class="cu-modal" :class="modalVisable==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">预约详情</view>
						<view class="action" @tap="hideModaldetail">
							<text class="cuIcon-close text-red"></text>
						</view>
					
				</view>
				<view class="padding-xl m-view" style="text-align: left;">
					<view class="m-bottom">
						【会议名称】：{{curData.meetingName}}
					</view>
					<view class="m-bottom">
						【会议时间】：{{curData.dateDay}}
					</view>
					<view v-if="curData.period==0" class="m-bottom">
						【会议时段】：上午
					</view>
					<view v-if="curData.period==1" class="m-bottom">
						【会议时段】：下午
					</view>
					<view v-if="curData.period==2" class="m-bottom">
						【会议时段】：晚上
					</view>
					<view v-if="curData.period==3" class="m-bottom">
						【会议时段】：全天
					</view>


					<view class="m-bottom">
						【预约会议室】：{{curData.meetingRoomName}}
					</view>
					<!-- <view class="m-bottom">
						【基本条件】：{{curData.condition}}
					</view> -->
					<view class="m-bottom">
						【参会人数】：{{curData.number}}
					</view>
					<view v-if="curData.needArrangement==1" class="m-bottom">	
						【是否会务安排】：是
					</view>
					<view v-if="curData.needArrangement==0" class="m-bottom">
						【是否会务安排】：否
					</view>
					<!-- <view v-if="curData.status=='强制撤销'" class="m-bottom">
						【强制撤销原因】：{{curData.reason}}
					</view> -->
					<view class="m-bottom">
						【备注】：{{curData.remark}}
					</view>
				</view>
			</view>
		</view>
		<hr-pull-load
		 @refresh='refresh'
		 @loadMore='loadMore'
		 :height='-1'
		 :pullHeight='50'
		 :maxHeight='100'
		 :lowerThreshold='20'
		 :bottomTips='bottomTips'
		 :isAllowPull="true"
		 :isTab='false'
		 ref='hrPullLoad'>
			<view v-for="(item,index) in meetingList" :key="index">
				<!-- 判断传递过来的值显示对应状态 -->
				<view v-if="item.status==cardType.id">
					<view class="card" @tap="recordDetail(item)">
						<span class="picture">
							<!-- 显示不同图片 -->
							<image class="card-img" :src="imgSrc[item.status]" mode="scaleToFill" style="width: 60px; height: 60px;"></image>
						</span>
						<span class="card-center">
							<view>
								会议名：{{item.meetingName}}
							</view>
							<view>
								开会日期：{{item.dateDay}}
							</view>
							<view v-if="item.period==0">
								时段：上午
							</view>
							<view v-if="item.period==1">
								时段：下午
							</view>
							<view v-if="item.period==2">
								时段：晚上
							</view>
							<view v-if="item.period==3">
								时段：全天
							</view>
						</span>
						<span class="card-right">
							<view v-if="item.status==1" class="text-red" style="font-size: 15px;" @tap.stop="showModal($event,item)" data-target="DialogModal1">
								取消
							</view>
							<view v-if="item.status==5" class="text-red" style="font-size: 15px" @tap.stop="showModal2($event,item)"  data-target="DialogModal2">
								重新预约
							</view>
						</span>
					</view>
				</view>
			</view>
		</hr-pull-load>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">取消预约</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否确定取消预约？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>

					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName1=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">重新预约</view>
					<view class="action" @tap="hideModal2">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否确定重新预约？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal2">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="goForm" >确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'
import noResult from '@/components/noResult.vue'
	export default {
		data() {
			return {
				bottomTips:'',
				currentPage:1,
				pageSize:10,
				tabIndex: 0,
				modalName: null,
				modalName1: null,
				modalVisable:false,
				itemdata:{},
				curData:{},
				time:"",
				time1:"",
				meetingList:[],
				// 图片
				imgSrc: [
					"/static/Appointment/waitmeeting.png",
					"/static/Appointment/waitmeeting.png",
					"/static/Appointment/complete.png",
					"/static/Appointment/complete.png",
					"/static/Appointment/revocation.png",
					"/static/Appointment/revocation.png",
				//	"../static/Appointment/cancel.png",
				],
				// 颜色
				styleObject: [{
						color: '#00aa00',
						fontSize: '16px',
					},
					{
						color: '#434343',
						fontSize: '16px',
					},
					{
						color: '#f93c3c',
						fontSize: '16px',
					},
					// {
					// 	color: '#eb9c2e',
					// 	fontSize: '16px',
					// },
				],

			}
		},
		created: function() {
		//	let aTime = new Date();
		
			this.time =new Date().getFullYear() + "-" +(new Date().getMonth() + 1) + "-" +(new Date().getDate()+1)  ;
			this.time1 = new Date().getFullYear() + "-" +(new Date().getMonth() + 2) + "-" +(new Date().getDate()+1) ;
			// let aData = new Date();
		
			// this.date =
			// 	aData.getFullYear() + "-" +
			// 	(aData.getMonth() + 1) + "-" +
			// 	(aData.getDate())
		},
		//props:["cardType","starttime","endtime"],
		props:{
			cardType: {
				type: Number,
				default: 1
			},
			start: {
				type: String,
				default: this.time
			},
			end: {
				type: String,
				default: this.time1
			},
		},
		watch: {
		    cardType: function (newcardType, oldcardType) {
		      this.getList(1)
			  // console.log("gaiiba",this.cardType,this.start,this.end)
		    }
		 },
		mounted() {
			this.getList();
			
		},
		methods: {
			//获取全部
			getList(type) {
				let self=this;
				if(type==1)
				{
					uni.showLoading({
						title: '正在加载',
						});
				}
				setTimeout(()=>{
					this.meetingList.length = 0
					this.meetingApi.getAppointmentList({
						pageNum: self.currentPage,
						pageSize:self.pageSize,
						status: self.cardType.id,
						//时间查询
						reservationStartTime: self.start,
						reservationEndTime:self.end,
					}).then(res => {
						console.log("res",res)
						if(res.code == 200)
						{
							if(res.data.list.length > 0)
							{
								if(type==1)
								{
									 console.log("type=1");
									self.meetingList=[];
									self.meetingList=res.data.list;
								}
								else if(type==2){
									console.log("type=2");
									self.meetingList=self.meetingList.concat(res.data.list);
								}
								
								
								if(self.meetingList.length<self.pageSize){
									self.bottomTips = "nomore";
								}else{
									self.bottomTips = "more";
								}
							}
							//console.log("list",res.data.list)
							//res.data.list.forEach((element) => self.meetingList.push(element))	
							console.log("meetingList",self.meetingList)
							//根据返回参数item的状态匹配  v-if="item.type==cardType.type"
							// //同步操作
							// this.$store.commit('getAppointList',{
							// 	appiontmentList:res.data.list,
							// })
							
						}
						else{
							if(type==1)
							{
								self.meetingList = [];
							}
							else if(type==2){
								self.currentPage--;
							}
							self.bottomTips = "nomore";
							
						}
						
					})
					
				//})
				/* 这里300毫秒的延时，主要是为了优化视觉效果 */
					let timer=setTimeout(()=>{
						clearTimeout(timer);
						self.$refs.hrPullLoad.reSet();
						uni.hideLoading();
					},300);
				},500);
			},
			//取消预约弹框
			showModal(e,item) {
				console.log("item",item.reserveId)
				this.curData.reserveId = item.reserveId
				console.log("取消",this.curData.reserveId)
				this.modalName = e.currentTarget.dataset.target
			},
			//确认取消预约
			hideModal(e) {
				this.modalName = null
				this.meetingApi.cancelReservation({
					cancelRemark:"",
					//id:32,
					id: parseInt(this.curData.reserveId),
				}).then(res => 
				{
					console.log("data",res.data)
					
				});
				
			},
			//自定义上拉加载更多
			loadMore(){
				this.currentPage++;
				this.bottomTips = "loading";
				console.log("上拉加载",this.currentPage);
				this.getList(2);
			},
			//自定义下拉刷新
			refresh(){
				this.currentPage = 1;
				console.log("下拉刷新");
				this.getList(1);
			},
			showModal2(e,item) {
				//console.log("111",e,item)
				this.itemdata=item;
				this.modalName1 = e.currentTarget.dataset.target;
				
			},
			hideModal2(e) {
				this.modalName1 = null
			},
			hideModaldetail(){
				this.modalVisable = false
			},
			//跳转
			goForm(e) {
				this.modalName1 = null
				
				//方法一导航
				uni.navigateTo({
					url: '/pagesAppointment/index?itemdata='+JSON.stringify(this.itemdata)
				});	
				//方法二：回到上一页
				// uni.navigateBack({
				//     delta: 1
				// });
			},
			recordDetail(item){
				console.log("item",item)
				this.modalVisable = true;
				this.curData=item;
				
				//this.$emit('send',item)
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
		width: 56%;
	}

	.card-right {
		margin-left: 20px;
		margin-top: 5px;
	}

	.card-type {
		color: #3f7dcc;
		font-size: 15px;
	}
</style>

