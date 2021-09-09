<template>
	<view>
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-green" :isBack="true">
				<block slot="backText"></block>
				<block slot="content">资产清单</block>
				<block slot="right">
					<text class="cuIcon-search padding-right" @tap="showModal" data-target="viewModal">
						搜索
					</text>
				</block>
			</cu-custom>

			<view class="margin-top"  v-for="(item,index) in filterData" >
				<view class="commodityinfo " @tap="detail" >
					<view class="cu-item shadow">
						<view class="cu-list menu-avatar cardtitle" :class=" size?'solids-bottom':'solid-bottom'">
							<view class="margin text-bold">学院编号：{{item.collegeNum}}</view>
							<view :class="item.status=='在用'?'cu-tag bg-green light margin round ':item.status=='闲置'?
							'cu-tag bg-blue light margin round':item.status=='报废'?
							'cu-tag bg-red light margin round':'cu-tag bg-orange light margin round' ">{{item.status}}</view>
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
								<view class="margin-left margin-bottom-xs">
									资产种类：{{item.type}}
								</view>
								<view class="margin-left margin-bottom-xs">
									学校编号：{{item.schoolNum}}
								</view>
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

			<view class="cu-form-group margin-top">
				<view class="title">
					姓名
				</view>
				<input placeholder="请输入姓名" name="input" v-model="search.name"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">
					资产类型
				</view>
				<picker @change="selectchange" :value="selectIndex" :range="selectList" >
					<view class="picker" v-model="search.type">
						{{selectIndex>-1?selectList[selectIndex]:'请选择资产类型'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">
					位置
				</view>
				<picker mode="multiSelector" @change="addressSelectChange" :value="addressIndex"
					@columnchange="addressColumnChange" :range="addressSelectList" v-model="search.place">
					<view class="picker">
						{{addressSelectList[0][addressIndex[0]]}}.{{addressSelectList[1][addressIndex[1]]}}.{{addressIndex[2]>-1?addressSelectList[2][addressIndex[2]]:"请选择位置"}}
					</view>
				</picker>
			</view>

			<view class="padding margin text-center">
				<view class="cu-btn bg-green lg block shadow radius margin-xl" @tap="loadData">
					查询
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.loadData()
		},
		data() {
			return {
				monList:'',
				modalName: null,
				scrollLeft: 0,
				size: false,
				search:{
					name:"",
					type:"",
					place:""
				},
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
						area:"旗山校区.知明楼.201",
						phone:"15880754987",
						type:"手机",
						schoolNum:"98214561154",
						status:"在用"
					},
					{
						collegeNum: "51796521556",
						people:"王老师",
						area:"仓山校区.知明楼.201",
						phone:"15880754987",
						type:"办公桌",
						schoolNum:"98214561154",
						status:"闲置"
					},
					{
						collegeNum: "51796521556",
						people:"林老师",
						area:"仓山校区.知明楼.201",
						phone:"15880754987",
						type:"办公椅",
						schoolNum:"98214561154",
						status:"报废"
					},
					{
						collegeNum: "51796521556",
						people:"姜老师",
						area:"仓山校区.知明楼.201",
						phone:"15880754987",
						type:"手机",
						schoolNum:"98214561154",
						status:"待报废"
					},
				],
				filterData:[]
			};
		},

		methods: {
			loadData(){
				// console.log(this.search.name)
				// const filterData = JSON.parse(JSON.stringify(this.moneyList))
				this.search.type = this.monList
				this.search.place = this.checkbox  
				console.log(this.search.type)
				this.filterData=this.moneyList.filter(item=>{
					console.log(this.search)
					console.log(item.people.indexOf(this.search.type))
					// ||item.type.indexOf(this.search.type)!==-1||item.area.indexOf(this.search.place)!==-1
					return item.people.indexOf(this.search.name)!==-1
				})
				console.log(this.moneyList)
			},
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
				this.addressSelectList = data.addressSelectList;
				this.addressIndex = data.addressIndex;
				// console.log(this.addressSelectList[0][this.addressIndex[0]]+'.'+this.addressSelectList[1][this.addressIndex[1]]+'.'+this.addressSelectList[2][this.addressIndex[2]])
				this.checkbox = this.addressSelectList[0][this.addressIndex[0]]+'.'+this.addressSelectList[1][this.addressIndex[1]]+'.'+this.addressSelectList[2][this.addressIndex[2]]
			},
			selectchange(e) {
				// console.log(e)
				// console.log(this.search.type)
				this.selectIndex = e.detail.value
				// console.log(this.selectList[this.selectIndex])
				this.monList = this.selectList[this.selectIndex]
			},
			detail(){
				uni.navigateTo({
					url:'../pages/scan/commodityinfo'
				})
			}
		},
		watch:{
		}
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
