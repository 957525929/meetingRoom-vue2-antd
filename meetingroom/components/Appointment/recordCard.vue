<template>
	<view>
		<view v-for="(item,index) in meetingdata" :key="index">
			<!-- 判断传递过来的值显示对应状态 -->
			<view v-if="item.type==cardType.type">
				<view class="card" @tap="recordDetail(item)">
					<span class="picture">
						<!-- 显示不同图片 -->
						<image class="card-img" :src="item.image" mode="scaleToFill" style="width: 60px; height: 60px;"></image>
						<!-- <div>{{imgSrc[cardType.id]}}</div> -->
					</span>
					<span class="card-center">
						<view>
							{{item.name}}
						</view>
						<view>
							开会时间：{{item.time + item.period}}
						</view>
						<view>
							会议室：{{item.room}}
						</view>
					</span>
					<span class="card-right">
						<!-- 切换不同颜色 -->
						<view :style="styleObject[cardType.id]">
							{{item.type}}
						</view>
						<view class="text-red" style="margin-top: 18px;" @tap="showModal" data-target="DialogModal1">
							{{item.cancel}}
						</view>
					</span>
				</view>
			</view>
		</view>

		<!-- <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">撤回</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否确定撤回？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>

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
				modalName: null,
				meetingdata: [
					{
						index: 0,
						name: '学科地理学术研讨会',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() + 1) + "月" +
							(new Date().getDate()+1) + "日" ,
						type: '待开会',
						cancel: '取消',
						period:"上午",
						peoples:"10人",
						condition:["白板","投影仪"],
						room:"仓山校区.邵逸夫楼.305",
						affairs:false,
						remark:"参与人:学科地理组所有老师",
						image:"require(../../static/Appointment/waitmeeting.png)"
					},
					{
						index: 1,
						name: '学科地理学术研讨会',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() + 1) + "月" +
							(new Date().getDate()+1) + "日" ,
						type: '待开会',
						cancel: '取消',
						period:"下午",
						condition:["白板","投影仪"],
						peoples:"10人",
						room:"仓山校区.邵逸夫楼.305",
						affairs:false,
						remark:"参与人:学科地理组所有老师",
						image:"require(../../static/Appointment/waitmeeting.png)"
					},
					{
						index: 2,
						name: '自然地理学术研讨会',
						campus: '旗山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() ) + "月" +
							(new Date().getDate()) + "日" ,
						type: '已完成',
						cancel: '',
						period:"上午",
						condition:["白板","投影仪","电脑"],
						room:"旗山校区.地理科学学院实验楼.101",
						peoples:"15人",
						affairs:true,
						remark:"参与人:自然地理组所有老师",
						image:"require(../../static/Appointment/waitmeeting.png)"
					},
					{
						index: 3,
						name: '自然地理学术研讨会',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() ) + "月" +
							(new Date().getDate()) + "日" ,
						type: '已完成',
						cancel: '',
						period:"下午",
						condition:["白板","投影仪","电脑"],
						room:"旗山校区.地理科学学院实验楼.101",
						peoples:"15人",
						affairs:true,
						remark:"参与人:自然地理组所有老师",
						image:"require(../../static/Appointment/waitmeeting.png)"
					},
					{
						index: 4,
						name: '人文地理学术研讨会',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() ) + "月" +
							(new Date().getDate()-1) + "日" ,
						type: '已取消',
						cancel: '',
						period:"上午",
						condition:["白板","投影仪","电脑"],
						room:"仓山校区.邵逸夫楼.203",
						peoples:"12人",
						affairs:true,
						remark:"参与人:人文地理组所有老师",
						image:"require(../../static/Appointment/waitmeeting.png)"
					},
					{
						index: 5,
						name: '自然地理学开题准备会议',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth() ) + "月" +
							(new Date().getDate()-2) + "日" ,
						type: '已取消',
						cancel: '',
						period:"上午",
						condition:["白板","投影仪","电脑"],
						room:"仓山校区.邵逸夫楼.203",
						peoples:"12人",
						affairs:true,
						remark:"参与人:自然地理组所有老师",
						image:"require(../../static/Appointment/waitmeeting.png)"
					},
					{
						index:6,
						name: '自然地理学开题准备会议',
						campus: '仓山校区',
						time: new Date().getFullYear() + "年" +
							(new Date().getMonth()+1) + "月" +
							(new Date().getDate()+1) + "日" ,
						type: '强制撤销',
						cancel: '',
						period:"下午",
						condition:["白板","投影仪","电脑"],
						room:"仓山校区.邵逸夫楼.305",
						peoples:"16人",
						affairs:true,
						remark:"参与人:自然地理组所有老师",
						image:"require(../../static/Appointment/waitmeeting.png)"
					},
					
				],
				// 图片
				imgSrc: [
					"../../static/Appointment/waitmeeting.png",
					"../../static/Appointment/complete.png",
					"../../static/Appointment/cancel.png",
					"../../static/Appointment/revocation.png",
				],
				// 颜色
				styleObject: [{
						color: '#3f7dcc',
						fontSize: '16px',
					},
					{
						color: '#aaa9a3',
						fontSize: '16px',
					},
					{
						color: '#ffaa00',
						fontSize: '16px',
					},
					{
						color: '#f93c3c',
						fontSize: '16px',
					},
				],

			}
		},

		props: ["cardType"],
		mounted() {
			console.log("cardType",this.cardType.id)
		},
		
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			recordDetail(item){
				console.log(item)
				this.$emit('send',item)
			}
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
	}

	.card-right {
		margin-left: 30px;
		margin-top: 5px;
	}

	.card-type {
		color: #3f7dcc;
		font-size: 15px;
	}
</style>
