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
			<view class="cu-form-group" >
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
			
			<view class="cu-bar bg-white margin-top" style="margin-top: 15px;margin-bottom: 0px;">
				<view class="action">
					<text></text> 会议室基本条件
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="showModal" data-target="ChooseModal">选择</button>
				</view>
			</view>
			<view class="bg-white" >
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
			<view class="cu-form-group" style="margin-top: 0px;">
				<text ></text>
				<button class="cu-btn bg-green shadow" @tap="selectRoom" data-target="ChooseModal">筛选会议室</button>
			</view>
			<view class="cu-form-group" >
				<text class="cuIcon-title text-orange"></text>会议地点
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex"
					:range="multiArray" >
					<view class="picker" style="font-size: 15px;">
						{{multiArray[0][multiIndex[0]]}}.{{multiArray[1][multiIndex[1]]}}
					</view>
				</picker>

				<!-- <text class='cuIcon-locationfill text-orange'></text> -->
			</view>
			<view class="cu-form-group margin-top" style="margin-top: 15px;">
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
						您提交的会议室预约申请已{{this.message}}
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-green margin-left" @tap="hideModalOK">确定</button>
						</view>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	// import {
	// 	objectMultiArray
	// } from './data/areaTree.js'
	// import {
	// 	mapState,
	// 	mapGetters
	// } from "vuex";
	export default {
		// computed: {
		// 	...mapGetters({
		// 		area: "area",
		// 	}),
		// 	...mapState({
		// 		tree: (state) => state.area
		// 		// userId: (state) => state.userId,
		// 		// launchFlag: (state) => state.launchFlag,
		// 	}),
		// },
		data() {
			return {
				objectMultiArray:[
					{
						name:'',
						tower:[
							{name:'',room:[{name:"",id:""}],
							},
						],
					},
				],
				object:[
					{
						name:'',
						tower:[
							{name:'',room:[{name:"",id:""}],
							},
						],
					},
				],
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
						checked: false,
					}, {
						value: 1,
						name: '黑板',
						checked: false,
					}, {
						value: 2,
						name: '电脑',
						checked: false,
					}, {
						value: 3,
						name: '投影仪',
						checked: false,
					}, 
				],
				//会议室选择
				curIndex: 0,
				multiIndex: [0, 0],
				multiArray: [
					[],
					[]
				],
				areastring:"",
				totalrooms:[{
				},],
				//当前显示
				meetingdata: {
					name: "学科研讨会议",
					campus: "旗山校区",
					peoples: "50",
					time: "2021-09-25",
					period: "上午",
					condition: [],
					room: "",
					affairs: false,
					remark: "无",
				},
				//筛选会议室参数
				roomparams:{
					period:"1",
					blackboard:"0",
					whiteboard:"0",
					pc:"0",
					projector:"0",
				},
				//会议室预约参数
				meetingparams: {
					period:"1",
					meetingRoomId:"",
					needArragnement:"0",
				},
				message:"",
			};
		},
		onLoad(option) {
			if (option.itemdata != null) 
			{
				this.itemdata = JSON.parse(option.itemdata);
				//参数
				this.meetingdata.name = this.itemdata.meetingName;
				//this.meetingdata.campus = this.itemdata.campus;
				this.meetingdata.time = this.itemdata.dateDay;
				//this.curIndex = this.objectMultiArray.findIndex(value => value.name == this.meetingdata.campus);
				this.meetingdata.peoples = this.itemdata.number;
				this.meetingdata.remark = this.itemdata.remark;
				this.meetingparams.period = this.itemdata.period;
				this.meetingparams.meetingRoomId = this.itemdata.meetingRoomId;
				//this.meetingparams
				this.needArragnement = this.itemdata.needArrangement;
				//显示
				if(this.itemdata.needArrangement == '0')
					this.switchC = false;
				else
					this.switchC = true;
				if(this.itemdata.period == '1')
					this.meetingdata.period = "上午";
				else if(this.itemdata.period == '2')
					this.meetingdata.period = "下午";
				else if(this.itemdata.period == '3')
					this.meetingdata.period = "晚上";
				else if(this.itemdata.period == '4')
					this.meetingdata.period = "全天";
				console.log("主页面", this.itemdata);
				console.log("meetingdata", this.meetingdata);
				console.log("meetingparams", this.meetingparams);
			}
			//this.init();
		},
		mounted() {
			this.getOptionList();
			console.log("初次建树");
			this.getroomList();
		},
		methods: {	
			//获取初始条件选项
			getOptionList() 
			{
				//获取校区列表
				this.meetingApi.getPlace({
				}).then(res => 
				{
					console.log("校区列表",res.data)
					let Placelist = res.data;
					Placelist.forEach((element) => this.campus.push(element.placeName))	
				});
				//获取午别列表
				this.meetingApi.getPeriod({
				}).then(res => 
				{
					console.log("午别列表",res.data)
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
				this.objectMultiArray  = []
				// 深拷贝方法二： this.objectMultiArray = Object.assign({}, this.object);
				this.objectMultiArray = JSON.parse(JSON.stringify(this.object))
				console.log("午别选择清空树",this.objectMultiArray)
			},
			//校区选择
			PickerChangecampus(e) {
				this.curIndex = e.detail.value;
				this.meetingdata.campus = this.campus[this.curIndex]
				console.log("校区选择参数",this.meetingdata.campus)
				//清空树
				this.objectMultiArray  = []
				// 深拷贝方法二：this.objectMultiArray = Object.assign({}, this.object);
				this.objectMultiArray = JSON.parse(JSON.stringify(this.object))
				console.log("校区选择清空树",this.objectMultiArray)
			},
			//时间选择
			DateChange(e) {
				this.meetingdata.time = e.detail.value
				//清空树
				this.objectMultiArray  = []
				// 深拷贝方法二： this.objectMultiArray = Object.assign({}, this.object);
				this.objectMultiArray = JSON.parse(JSON.stringify(this.object))
				console.log("时间选择清空树",this.objectMultiArray)
			},

			//会议室条件选择
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
				this.objectMultiArray  = []
				// 深拷贝方法二：this.objectMultiArray = Object.assign({}, this.object);
				this.objectMultiArray = JSON.parse(JSON.stringify(this.object))
				console.log("会议室条件选择清空树",this.objectMultiArray,this.areastring,this.totalrooms)
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
					this.roomparams.pc = 1;
					this.meetingdata.condition.push(this.checkbox[2].name)
				}
				else 
					this.roomparams.pc = 0;
				if(this.checkbox[3].checked == true)
				{
					this.roomparams.projector = 1;
					this.meetingdata.condition.push(this.checkbox[3].name)
				}
				else 
					this.roomparams.projector = 0;
				
				
			},
			selectRoom() {
				this.getroomList()
			},
			//筛选出符合条件会议室列表
			getroomList() {
				this.areastring = ""
				this.totalrooms = []
				this.meetingApi.getMeetingRoom({
					campus: this.meetingdata.campus,
					date: this.meetingdata.time,
					period:this.roomparams.period,
					number:this.meetingdata.peoples,
					blackboard:this.roomparams.blackboard,
					whiteboard:this.roomparams.whiteboard,
					pc:this.roomparams.pc,
					projector:this.roomparams.projector,
				}).then(res => {
					console.log("res",res)
					if(res.code == 200)
					{	
						for(let i=0,len=res.data.length;i<len;i++)
						{
							let roomparam  = {}
							roomparam.meetingroomId = "",
							roomparam.area = [],
							roomparam.area = res.data[i].placeName.split('.')
							roomparam.meetingroomId = res.data[i].meetingroomId
							
							let roomsel = {}
							roomsel.placeName = res.data[i].placeName
							roomsel.meetingroomId = res.data[i].meetingroomId
							this.totalrooms.push(roomsel)		
							
							this.objectMultiArray[0].name = roomparam.area[0]
							if(this.objectMultiArray[0].tower[0].name == "")
							{	
								this.objectMultiArray[0].tower[0].name = roomparam.area[1]
								this.objectMultiArray[0].tower[0].room[0].name = roomparam.area[2]
								this.objectMultiArray[0].tower[0].room[0].id = roomparam.meetingroomId  
								console.log("首次创建",this.objectMultiArray)
							}
						    else		//objectMultiArray不为空
						    {
							  //遍历是否有该楼房
							  let arr =[]
							  this.objectMultiArray[0].tower.forEach((element) => arr.push(element.name))	
							  let a = arr.indexOf(roomparam.area[1])
								//遍历是否有该楼房
								//	let a = this.objectMultiArray[0].tower.name.indexOf(roomparam.area[1])
								//console.log("index",a)
								if(a == -1)		//没有该楼房，新建该楼房
									{
										console.log("没有该楼房，新建该楼房")
										let build = {}
										build.name = ""
										build.room = [{}]
										build.room[0].name = ""
										build.room[0].id = ""
										build.name = roomparam.area[1]
										build.room[0].name = roomparam.area[2]
										build.room[0].id = roomparam.meetingroomId
										this.objectMultiArray[0].tower.push(build)	
									}
								else		//已经有该楼
									{
										let arrroom = []
										this.objectMultiArray[0].tower[a].room.forEach((element) => arrroom.push(element.name))
										let b = arrroom.indexOf(roomparam.area[2])
										if(b == -1)
										{
											console.log("已经有该楼,无该房间,新建房间")
											let rooms = {}
											rooms.name = ""
											rooms.id = ""
											rooms.name = roomparam.area[2]
											rooms.id = roomparam.meetingroomId
											this.objectMultiArray[0].tower[a].room.push(rooms)
										}
										
									}
							}
						}
						this.init()
					}	
				})
			},
			init() {
				this.multiArray[0] = [];
				this.multiArray[1] = [];
				//此树不分校区，所以永远取this.objectMultiArray[0]
				for (var j = 0; j < this.objectMultiArray[0].tower.length; j++) {
					this.$set(this.multiArray[0], j, this.objectMultiArray[0].tower[j].name);
				}
				for (var k = 0; k < this.objectMultiArray[0].tower[this.multiIndex[1]].room
					.length; k++) {
					this.$set(this.multiArray[1], k, this.objectMultiArray[0].tower[this.multiIndex[1]].room[k].name);
				}
				//建立树后默认选择首行首列
				this.multiIndex[0] = 0
				this.multiIndex[1] = 0
				this.$set(this.multiIndex, 0, 0);
				this.$set(this.multiIndex, 1, 0);
				console.log("当前会议室",this.multiArray[0][this.multiIndex[0]],this.multiArray[1][this.multiIndex[1]])
			},
			//会议室选择
			MultiChange(e) {
				//console.log("第一列选择",e)
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				//console.log("第二列选择",e)
				this.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						this.multiIndex[1] = 0;
						let result = this.searchColumn(e.detail.value);
						//console.log("result",result)
						this.multiArray[1] = result
						break;
				};
				//获取会议室id
				this.areastring = this.meetingdata.campus+ '.'+this.multiArray[0][this.multiIndex[0]]+'.'+this.multiArray[1][this.multiIndex[1]]
				for(let i=0;i<this.totalrooms.length;i++)
				{
					//console.log("遍历",this.totalrooms[i].placeName)
					if(this.areastring == this.totalrooms[i].placeName)
					{
						this.meetingparams.meetingRoomId = this.totalrooms[i].meetingroomId
						break;
					}
						
				}
				console.log("会议室id",this.meetingparams.meetingRoomId)
			},
			searchColumn() {
				var arr = [];
				for (var j = 0; j < this.objectMultiArray[0].tower.length; j++) {
					if (j == this.multiIndex[0]) {
						for (var k = 0; k < this.objectMultiArray[0].tower[j].room.length; k++) {
							arr.push(this.objectMultiArray[0].tower[j].room[k].name);
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
					period:parseInt(this.meetingparams.period),
					//meetingRoomId:parseInt(this.meetingparams.meetingRoomId),
					meetingRoomId:this.meetingparams.meetingRoomId,
					meetingName:this.meetingdata.name,
					dateDay:this.meetingdata.time.toString(),
					number:parseInt(this.meetingdata.peoples),
					needArrangement:parseInt(this.meetingparams.needArragnement),
					remark:this.meetingdata.remark,
				}).then(res => {
					console.log("res",res)
					if(res.code == 200)
					{
						this.message = res.message
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
			hideModalOK(e) {
				this.modalName = null
				this.Pagego();
			},
			hideModal(e) {
				this.modalName = null
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
