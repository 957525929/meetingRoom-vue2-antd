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
						【会议名称】：{{curData.name}}
					</view>
					<view class="m-bottom">
						【会议时间】：{{curData.time}}
					</view>
					<view class="m-bottom">
						【会议时段】：{{curData.period}}
					</view>
<!-- 					<view class="m-bottom">
						校区：{{curData.campus}}
					</view> -->
					<view class="m-bottom">
						【预约会议室】：{{curData.room}}
					</view>
					<view class="m-bottom">
						【基本条件】：{{curData.condition}}
					</view>
					<view class="m-bottom">
						【参会人数】：{{curData.peoples}}
					</view>
					<view v-if="curData.affairs==true" class="m-bottom">	
						【是否会务安排】：是
					</view>
					<view v-if="curData.affairs==false" class="m-bottom">
						【是否会务安排】：否
					</view>
					<view v-if="curData.status=='强制撤销'" class="m-bottom">
						【强制撤销原因】：{{curData.reason}}
					</view>
					<view class="m-bottom">
						【备注】：{{curData.remark}}
					</view>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in meetingdata" :key="index">
			<!-- 判断传递过来的值显示对应状态 -->
			<view v-if="item.status==cardType.status">
				<view class="card" @tap="recordDetail(item)">
					<span class="picture">
						<!-- 显示不同图片 -->
						<image class="card-img" :src="imgSrc[cardType.id]" mode="scaleToFill" style="width: 60px; height: 60px;"></image>
					</span>
					<span class="card-center">
						<view>
							会议名：{{item.name}}
						</view>
						<view>
							开会日期：{{item.time}}
						</view>
						<view>
							时段：{{ item.period}}
						</view>
					</span>
					<span class="card-right">
						<view v-if="item.status=='待开会'" class="text-red" style="font-size: 15px;" @tap.stop="showModal" data-target="DialogModal1">
							取消
						</view>
						<view v-if="item.status=='强制撤销'" class="text-red" style="font-size: 15px" @tap.stop="showModal2($event,item)"  data-target="DialogModal2">
							重新预约
						</view>
					</span>
				</view>
			</view>
		</view>

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
	export default {
		data() {
			return {
				modalName: null,
				modalName1: null,
				modalVisable:false,
				itemdata:{},
				curData:{},
				meetingdata: [
					{
						index: 0,
						name: '学科地理学术研讨会',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() + 1) + "月" +
							(new Date().getDate()+1) + "日" ,
						status: '待开会',
						cancel: '取消',
						period:"上午",
						peoples:"10人",
						condition:["白板","投影仪"],
						room:"仓山校区.邵逸夫楼.305",
						affairs:false,
						remark:"参与人:学科地理组所有老师",
						reason:"",
					},
					{
						index: 1,
						name: '学科地理学术研讨会',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() + 1) + "月" +
							(new Date().getDate()+1) + "日" ,
						status: '待开会',
						cancel: '取消',
						period:"下午",
						condition:["白板","投影仪"],
						peoples:"10人",
						room:"仓山校区.邵逸夫楼.305",
						affairs:false,
						remark:"参与人:学科地理组所有老师",
						reason:"",
					},
					{
						index: 2,
						name: '自然地理学术研讨会',
						campus: '旗山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() ) + "月" +
							(new Date().getDate()) + "日" ,
						status: '已完成',
						cancel: '',
						period:"上午",
						condition:["白板","投影仪","电脑"],
						room:"旗山校区.地理科学学院实验楼.101",
						peoples:"15人",
						affairs:true,
						remark:"参与人:自然地理组所有老师",
						reason:"",
					},
					{
						index: 3,
						name: '自然地理学术研讨会',
						campus: '旗山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() ) + "月" +
							(new Date().getDate()) + "日" ,
						status: '已完成',
						cancel: '',
						period:"下午",
						condition:["白板","投影仪","电脑"],
						room:"旗山校区.地理科学学院实验楼.101",
						peoples:"15人",
						affairs:true,
						remark:"参与人:自然地理组所有老师",
						reason:"",
					},
					{
						index: 4,
						name: '人文地理学术研讨会',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth()+2 ) + "月" +
							(new Date().getDate()-1) + "日" ,
						status: '待开会',
						cancel: '',
						period:"上午",
						condition:["白板","投影仪","电脑"],
						room:"仓山校区.邵逸夫楼.203",
						peoples:"12人",
						affairs:true,
						remark:"参与人:人文地理组所有老师",
						reason:"",
					},
					{
						index: 5,
						name: '自然地理学开题准备会议',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() +2) + "月" +
							(new Date().getDate()) + "日" ,
						status: '待开会',
						cancel: '',
						period:"上午",
						condition:["白板","投影仪","电脑"],
						room:"仓山校区.邵逸夫楼.203",
						peoples:"12人",
						affairs:true,
						remark:"参与人:自然地理组所有老师",
						reason:"",
					},
					{
						index:6,
						name: '自然地理学开题准备会议',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth()+1) + "月" +
							(new Date().getDate()+1) + "日" ,
						status: '强制撤销',
						cancel: '',
						period:"下午",
						condition:["白板","投影仪","电脑"],
						room:"仓山校区.邵逸夫楼.305",
						peoples:"16人",
						affairs:true,
						remark:"参与人:自然地理组所有老师",
						reason:"需要征用该会议室召开紧急会议",
					},
					
				],
				// 图片
				imgSrc: [
					"/static/Appointment/waitmeeting.png",
					"/static/Appointment/complete.png",
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

		props: ["cardType"],
		mounted() {
			this.getList();
			console.log("cardType",this.cardType.id)
		},
		methods: {
			//获取全部
			getList() {
				this.meetingApi.getAppointmentList({
					pageNum: 1,
					pageSize: 20,
				}).then(res => {
					console.log("res",res)
					if(res.code == 200)
					{
						//根据返回参数item的状态匹配  v-if="item.type==cardType.type"
						// //同步操作
						// this.$store.commit('getAppointList',{
						// 	appiontmentList:res.data.list,
						// })
						
					}
					
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			showModal2(e,item) {
				//console.log("111",e,item)
				this.itemdata=item;
				this.modalName1 = e.currentTarget.dataset.target;
				console.log("111",this.itemdata)
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
				console.log(item)
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

