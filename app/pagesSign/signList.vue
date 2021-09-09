<template>
	<view>
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-green" :isBack="true">
				<block slot="backText"></block>
				<block slot="content">登记列表</block>
				<block slot="right">
					<text class="cuIcon-search padding-right" @tap="showModal" data-target="viewModal">
						搜索
					</text>
				</block>
			</cu-custom>

			<view class="margin-top"  v-for="(item,index) in moneyList" >
				<view class="commodityinfo " @tap="detail(item)" >
					<view class="cu-item shadow">
						<view class="cu-list menu-avatar cardtitle" :class=" size?'solids-bottom':'solid-bottom'">
							<view class="margin text-bold">资产种类：{{item.type}}</view>
						</view>
						<view class="text-content padding-bottom margin-top">
							<view class="title-wrap">
								<view class="margin-left margin-bottom-xs">
									领用人：{{item.people}}
								</view>
								<view class="margin-left margin-bottom-xs">
									位置：{{item.area}}
								</view>
								<view class="margin-left margin-bottom-xs">
									手机：{{item.phone}}
								</view>
						<!-- 		<view class="margin-left margin-bottom-xs">
									资产种类：{{item.type}}
								</view> -->
					<!-- 			<view class="margin-left margin-bottom-xs">
									学校编号：{{item.schoolNum}}
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</scroll-view>

		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<!-- #ifdef  MP-WEIXIN -->				
			<view class="cu-form-group">
				<view class="title">
					资产类型
				</view>
				<picker @change="selectchange" :value="selectIndex" :range="selectList">
					<view class="picker">
						{{selectIndex>-1?selectList[selectIndex]:'请选择资产类型'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">
					位置
				</view>
				<picker mode="multiSelector" @change="addressSelectChange" :value="addressIndex"
					@columnchange="addressColumnChange" :range="addressSelectList">
					<view class="picker">
						{{addressSelectList[0][addressIndex[0]]}}.{{addressSelectList[1][addressIndex[1]]}}.{{addressIndex[2]>-1?addressSelectList[2][addressIndex[2]]:"请选择位置"}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
			<view class="cu-form-group margin-top">
				<view class="title">
					姓名
				</view>
				<input placeholder="请输入姓名" name="input"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">
					资产类型
				</view>
				<picker @change="selectchange" :value="selectIndex" :range="selectList">
					<view class="picker">
						{{selectIndex>-1?selectList[selectIndex]:'请选择资产类型'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">
					位置
				</view>
				<picker mode="multiSelector" @change="addressSelectChange" :value="addressIndex"
					@columnchange="addressColumnChange" :range="addressSelectList">
					<view class="picker">
						{{addressSelectList[0][addressIndex[0]]}}.{{addressSelectList[1][addressIndex[1]]}}.{{addressIndex[2]>-1?addressSelectList[2][addressIndex[2]]:"请选择位置"}}
					</view>
				</picker>
			</view>
		

			<view class="padding margin text-center">
				<view class="cu-btn bg-green lg block shadow radius margin-xl" @tap="hideModal">
					查询
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				scrollLeft: 0,
				size: false,
				addressIndex: [-1, -1, -1],
				addressSelectList: [
					['仓山校区', '旗山校区'],
					['知明楼', '立诚楼'],
					['101', '102']
				],
				selectIndex: -1,
				selectList: ['办公桌', '办公椅', '手机'],
				moneyList:[
					{
						collegeNum: "51796521556",
						people:"王老师",
						area:"仓山校区.知明楼.201",
						phone:"15880754987",
						type:"办公桌",
						schoolNum:"98214561154"
					},
					{
						collegeNum: "51796521556",
						people:"王老师",
						area:"仓山校区.知明楼.201",
						phone:"15880754987",
						type:"办公桌",
						schoolNum:"98214561154"
					},
				]
			};
		},

		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			SetSize(e) {
				this.size = e.detail.value
			},
			addressSelectChange(e) {
				this.addressIndex = e.detail.value
			},
			addressColumnChange(e) {
				let data = {
					addressSelectList: this.addressSelectList,
					addressIndex: this.addressIndex
				};
				data.addressIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						switch (data.addressIndex[0]) {
							case 0:
								data.addressSelectList[1] = ['知明楼', '立诚楼'];
								data.addressSelectList[2] = ['101', '102'];
								break;
							case 1:
								data.addressSelectList[1] = ['地理科学楼'];
								data.addressSelectList[2] = ['101'];
								break;
						}
						data.addressIndex[1] = 0;
						data.addressIndex[2] = 0;
						break;
					case 1:
						switch (data.addressIndex[0]) {
							case 0:
								switch (data.addressIndex[1]) {
									case 0:
										data.addressSelectList[2] = ['101', '102'];
										break;
									case 1:
										data.addressSelectList[2] = ['102'];
										break;
								}
								break;
							// case 1:
							// 	switch (data.addressIndex[1]) {
							// 		case 0:
							// 			data.addressSelectList[2] = ['皇后街'];
							// 			break;
							// 	}
							// 	break;
						}
						data.addressIndex[2] = 0;
						break;
				}
			},
			selectchange(e) {
				this.selectIndex = e.detail.value
			},
			detail(item){
				var onjs = JSON.stringify(item)
				uni.navigateTo({
					url:'./index?onjs='+onjs
				})
			}
		},
	}
</script>

<style>
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}

	.status {
		margin: 0.9vh;
		border-radius: 1.8vh;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}

	.commodityinfo {
		background-color: white;
		margin: 30rpx;
		border-radius: 20rpx;
	}

	.cardtitle {
		display: flex;
		justify-content: space-between;
	}
</style>
