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
						【会议名称】：{{curData.name}}
					</view>
					<view class="m-bottom">
						【会议室】：{{curData.address}}
					</view>
					<view class="m-bottom">
						【时间】：{{curData.time}} {{curData.period}}
					</view>
					<view class="m-bottom">
						【任务】：{{curData.remark}}
					</view>
					
				</view>
			</view>
		</view>
		<view v-for="(item,index) in taskdata" :key="index">
				<view class="card" @tap="recordDetail(item)">
					<span class="picture">
						<!-- 显示不同图片 -->
						<image class="card-img" :src="imgSrc[0]" mode="scaleToFill" style="width: 50px; height: 50px;"></image>
					</span>
					<span class="card-center">
						<view>
							会议名称：{{item.name}}
						</view>
						<view>
							会议室：{{item.address}}
						</view>
						<view>
							时间：{{item.time}} {{item.period}}
						</view>
					</span>					
				</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				modalVisable:false,
				curData:{},
				taskdata:[
					{
						index:0,
						name:'自然地理学术研讨会',
						address:'仓山校区.邵逸夫楼.305',
						time:'2021年9月8日',
						period:"上午",
						remark:"1、准备茶水和茶歇餐;2、拍照",
						//condition:["白板","投影仪"],
						//galleryful:'5-6',
					},
					{
						index:1,
						name:'自然地理学术研讨会',
						address:'仓山校区.邵逸夫楼.305',
						time:'2021年9月9日',
						period:"上午",
						remark:"1、搬桌椅;2、打扫卫生",
					}		
				],
				
				// 图片
				imgSrc: [
					"/static/Appointment/task.png",
					
				],
			}
		},
		methods: {

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
