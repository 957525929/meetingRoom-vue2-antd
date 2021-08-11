<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会议室预约</block>
			<!-- <block slot="right">
				<view class="action">
					<view class='cuIcon-cu-image'>
						<text class="cuIcon-copy" @tap="Pagego" data-target="viewModal"></text>
					</view>
				</view>
			</block> -->
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">会议名称</view>
				<input v-model="meetingdata.name" name="input"></input>
			</view>
			<view class="cu-form-group">
				<text class="cuIcon-title text-orange "></text> 校区
				<picker @change="PickerChangecampus" :value="index" :range="campus">
					<view class="picker">
						{{meetingdata.campus}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<text class="cuIcon-title text-orange"></text>参会人数
				<input v-model="meetingdata.peoples" name="input" style="padding-left: 10px;"></input>
			</view>
			<view class="cu-form-group" style="margin-top: 10px;">
				<text class="cuIcon-title text-orange "></text> 会议日期
				<picker mode="date" :value="date" start="2015年09月01" end="2030年09月01" @change="DateChange">
					<view class="picker">
						{{meetingdata.time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<text class="cuIcon-title text-orange "></text> 会议时段
				<picker @change="PickerChange" :value="index" :range="period">
					<view class="picker">
						{{meetingdata.period}}
					</view>
				</picker>
			</view>
			<view class="cu-bar bg-white margin-top" style="margin-top: 0;">
				<view class="action">
					<text></text> 基本条件
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="showModal" data-target="ChooseModal">选择</button>
				</view>
			</view>
			<view class="bg-white margin-top" style="margin-top: 0;">
				<view style="margin-left: 3%;">
					<view v-for="(item,index)  in checkbox" v-if="item.checked" :key="index"
						class="cu-tag round bg-blue light" style="font-size: 14.5px;">{{item.name}}</view>
				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideChooseModal">
				<view class="cu-dialog" @tap.stop="">
					<view class="cu-bar bg-white">
						<view class="action text-blue" @tap="hideChooseModal">取消</view>
						<view class="action text-green" @tap="hideChooseModal">确定</view>
					</view>
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
							<button class="cu-btn orange lg block" :class="item.checked?'bg-orange':'line-orange'"
								@tap="ChooseCheckbox" :data-value="item.value"> {{item.name}}
							</button>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<text class="cuIcon-title text-orange"></text>会议地点
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex"
					:range="multiArray">
					<view class="picker" style="font-size: 15px;">
						{{multiArray[0][multiIndex[0]]}}.{{multiArray[1][multiIndex[1]]}}
					</view>
				</picker>

				<!-- <text class='cuIcon-locationfill text-orange'></text> -->
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">是否会务安排</view>
				<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea placeholder="需要会务安排，请按照需求列出安排事项" maxlength="-1" name="input"
					v-model="meetingdata.remark"></textarea>
			</view>
			<view class="box">
				<view class="cu-bar btn-group">
					<button class="cu-btn bg-orange shadow-blur round lg" @tap="showModaltijiao"
						data-target="Modal">提交</button>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">【提示】</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						您已成功提交会议室预约申请
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
						</view>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		objectMultiArray
	} from './data/areaTree.js'
	import {
		mapState,
		mapGetters
	} from "vuex";
	export default {
		computed: {
			...mapGetters({
				area: "area",
			}),
			...mapState({
				tree: (state) => state.area
				// userId: (state) => state.userId,
				// launchFlag: (state) => state.launchFlag,
			}),
		},
		data() {
			return {
				objectMultiArray,
				itemdata: {},
				index: 0,
				switchC: false,
				modalName: null,
				radio: 'radio1',
				time:"",
				date: '2021年08月25',
				//获取的条件选择列表（text）
				period: [],
				campus: [],
				
				//条件选择
				checkbox: 
					[{
						value: 0,
						name: '白板',
						checked: true,
					}, {
						value: 1,
						name: '黑板',
						checked: true,
					}, {
						value: 2,
						name: '电脑',
						checked: true,
					}, {
						value: 3,
						name: '投影仪',
						checked: true,
					}, 
				],
				//会议室选择
				curIndex: 0,
				multiIndex: [0, 0],
				multiArray: [
					[],
					[]
				],
				//当前显示
				meetingdata: {
					name: "学科研讨会议",
					campus: "旗山校区",
					peoples: "10",
					time: "2021-08-25",
					period: "上午",
					condition: [],
					room: "",
					affairs: false,
					remark: "无",
				},
				//筛选会议室参数
				roomparams:{
					campus:"",
				//	date:"",
					period:"1",
				//	number:"",
					blackboard:"",
					whiteboard:"",
					Pc:"",
					projector:"",
				},
				//会议室预约参数
				meetingparams: {
					period:"1",
					meetingRoomId:"",
				//	meetingName:"",
				//	date:"",
					needArragnement:"0",
				//	number:"",
				//	remark:"",
				},
			};
		},
		onLoad(option) {
			if (option.itemdata != null) {
				this.itemdata = JSON.parse(option.itemdata);
				this.meetingdata.name = this.itemdata.name;
				this.meetingdata.campus = this.itemdata.campus;
				this.curIndex = this.objectMultiArray.findIndex(value => value.name == this.meetingdata.campus);
				this.meetingdata.peoples = this.itemdata.peoples;
				this.meetingdata.time = this.itemdata.time;
				this.meetingdata.period = this.itemdata.period;
				this.switchC = this.itemdata.affairs;
				this.meetingdata.remark = this.itemdata.remark;
				console.log("主页面", this.itemdata);
			}
			this.init();
		},
		mounted() {
			this.getOptionList();
			console.log(this.area);
			
		},
		methods: {
			init() {
				this.meetingdata.campus = this.objectMultiArray[this.curIndex].name;
				this.campus = [];
				this.multiArray[0] = [];
				this.multiArray[1] = [];
				// for (var i = 0; i < this.objectMultiArray.length; i++) {
				// 	this.campus.push(this.objectMultiArray[i].name);
				// }
				for (var j = 0; j < this.objectMultiArray[this.curIndex].tower.length; j++) {
					this.multiArray[0].push(this.objectMultiArray[this.curIndex].tower[j].name);
				}
				for (var k = 0; k < this.objectMultiArray[this.curIndex].tower[this.multiIndex[1]].room
					.length; k++) {
					this.multiArray[1].push(this.objectMultiArray[this.curIndex].tower[this.multiIndex[1]].room[k]
						.name);
				}
			},
			//获取初始条件选项
			getOptionList() 
			{
				//获取校区列表
				this.meetingApi.getPlace({
				}).then(res => 
				{
					console.log("data",res.data)
					let Placelist = res.data;
					Placelist.forEach((element) => this.campus.push(element.placeName))	
				});
				//获取午别列表
				this.meetingApi.getPeriod({
				}).then(res => 
				{
					console.log("data",res.data)
					let Periodlist = res.data;
					Periodlist.forEach((element) => this.period.push(element.dictValue))	
				});
					
			},
			//午别选择
			PickerChange(e) {
				this.index = e.detail.value
				this.meetingdata.period = this.period[this.index]
				this.meetingparams.period = e.detail.value
				this.roomparams.period = e.detail.value
			},
			//校区选择
			PickerChangecampus(e) {
				this.curIndex = e.detail.value;
				this.roomparams.campus = this.curIndex
				console.log("校区选择参数",this.roomparams.campus)
				this.multiIndex = [0, 0];
				this.init();
			},
			//时间选择
			DateChange(e) {
				this.meetingdata.time = e.detail.value
			},

			//条件选择
			ChooseCheckbox(e) {
				console.log(e)
				let items = this.checkbox;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						console.log("当前选中", items[i].name)
						items[i].checked = !items[i].checked;
						break
					}
				}
			},
			//会议室基本条件选择
			hideChooseModal(e) {
				this.modalName = null
				if(this.checkbox[0].checked == true)
				{
					this.roomparams.whiteboard = 1;
					this.meetingdata.condition.push(this.checkbox[0].name)
				}
				else 
					this.roomparams.whiteboard = 0;
				if(this.checkbox[1].checked == true)
				{
					this.roomparams.blackboard = 1;
					this.meetingdata.condition.push(this.checkbox[1].name)
				}
				else 
					this.roomparams.blackboard = 0;
				if(this.checkbox[2].checked == true)
				{
					this.roomparams.Pc = 1;
					this.meetingdata.condition.push(this.checkbox[2].name)
				}
				else 
					this.roomparams.Pc = 0;
				if(this.checkbox[3].checked == true)
				{
					this.roomparams.projector = 1;
					this.meetingdata.condition.push(this.checkbox[3].name)
				}
				else 
					this.roomparams.projector = 0;
				this.GetroomList();
				
			},
			
			
			RadioChange(e) {
				this.radio = e.detail.value
			},
			
			//筛选出符合条件会议室列表
			GetroomList() {
				this.meetingApi.getMeetingRoom({
					campus: 1,
					date: this.meetingdata.time,
					period:this.roomparams.period,
					number:this.meetingdata.peoples,
					blackboard:this.roomparams.blackboard,
					whiteboard:this.roomparams.whiteboard,
					Pc:this.roomparams.Pc,
					projector:this.roomparams.projector,
				}).then(res => {
					console.log("res",res)
					if(res.code == 200)
					{
						// //同步操作
						// this.$store.commit('getAppointList',{
						// 	appiontmentList:res.data.list,
						// })
						
					}
					
				})
			},
			
			
			//会议室选择
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				this.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						this.multiIndex[1] = 0;
						let result = this.searchColumn(e.detail.value);
						this.multiArray[1] = result
						break;
				};
			},
			searchColumn() {
				var arr = [];
				for (var j = 0; j < this.objectMultiArray[this.curIndex].tower.length; j++) {
					if (j == this.multiIndex[0]) {
						for (var k = 0; k < this.objectMultiArray[this.curIndex].tower[j].room.length; k++) {
							arr.push(this.objectMultiArray[this.curIndex].tower[j].room[k].name);
						}
					}
				}
				return arr;
			},
			//是否会务安排
			SwitchC(e) {
				this.switchC = e.detail.value
				this.meetingdata.affairs = this.switchC
				this.meetingparams.needArragnement = this.switchC
			},

			//预约会议室
			addReservation() {
				this.meetingApi.meetingAppointment({
					period:this.meetingparams.period,
					meetingRoomId:"2",
					meetingName:this.meetingdata.name,
					dateDay:this.meetingdata.time.toString(),
					number:this.meetingdata.peoples,
					needArragnement:this.meetingparams.needArragnement,
					remark:this.meetingdata.remark
				}).then(res => {
					console.log("res",res)
					if(res.code == 200)
					{
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
			showModaltijiao(e) {
				this.modalName = e.currentTarget.dataset.target
				this.addReservation();
	
			},
			hideModal(e) {
				this.modalName = null
				this.Pagego();
			},
			Pagego() {
				console.log(111);
				uni.navigateTo({
					url: '/pagesList/index'
				});
			}
		}
	}
</script>

<style>
	.cu-form-group {
		font-size: 15px;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}

	.cardItem {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-top: 5px;
		width: 300px;
		flex-wrap: wrap;
		color: #000000;
	}
</style>
