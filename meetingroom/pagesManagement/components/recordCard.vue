<template>
	<view>
		
		<view class="cu-modal" :class="modalVisable==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">会议室详情</view>
						<view class="action" @tap="hideModaldetail">
							<text class="cuIcon-close text-red"></text>
						</view>
					
				</view>
				<view class="padding-xl m-view" style="text-align: left;">
					<view class="m-bottom">
						【会议室房间号】：{{curData.name}}
					</view>
					
					<view class="m-bottom">
						【容纳人数】：{{curData.galleryful}}
					</view>
					<view class="m-bottom">
						【基本条件】：{{curData.condition}}
					</view>
					<view class="m-bottom">
						【位置】：{{curData.address}}
					</view>
					
				</view>
			</view>
		</view>
		<view v-for="(item,index) in roomsdata" :key="index">
			<!-- 判断传递过来的值显示对应状态 -->
			<view v-if="item.state==cardType.type">
				<view class="card" @tap="recordDetail(item)">
					<span class="picture">
						<!-- 显示不同图片 -->
						<image class="card-img" :src="imgSrc[cardType.id]" mode="scaleToFill" style="width: 50px; height: 50px;"></image>
					</span>
					<span class="card-center">
						<view>
							房间号：{{item.name}}
						</view>
	
						<view>
							容纳人数：{{item.galleryful}}
						</view>
						<view>
							位置：{{item.address}}
						</view>
					</span>
					
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
				roomsdata:[
					{
						index:0,
						name:'会议室203',
						address:'福建师范大学.旗山校区.1号楼',
						state:'空闲',
						galleryful:'5-6',
						condition:'投影仪，白板，黑板',
					},
					{
						index:1,
						name:'会议室204',
						address:'福建师范大学.旗山校区.2号楼',
						state:'禁用',
						galleryful:'6-8',
						condition:'投影仪，白板',
					},
					{
						index:2,
						name:'会议室205',
						address:'福建师范大学.仓山校区.1号楼',
						state:'已预约',
						galleryful:'3-4',
						condition:'演示电脑，投影仪，黑板',
					},
					{
						
						index:3,
						name:'会议室206',
						address:'福建师范大学.仓山校区.2号楼',
						state:'空闲',
						galleryful:'4-6',
						condition:'投影仪，演示电脑，白板',
					},
						
				],
				
				// 图片

				imgSrc: [
					"/static/Appointment/leisure.png",
					"/static/Appointment/reserved.png",
					"/static/Appointment/forbid.png",
				],
				// 颜色
				// styleObject: [{
				// 		color: '#00aa00',
				// 		fontSize: '16px',
				// 	},
				// 	{
				// 		color: '#434343',
				// 		fontSize: '16px',
				// 	},
				// 	{
				// 		color: '#f93c3c',
				// 		fontSize: '16px',
				// 	},
				// ],

			}
		},
		props: ["cardType"],
		mounted() {
			console.log("cardType",this.cardType.id,this.roomsdata)
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
</style>
