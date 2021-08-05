<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会议室预约</block>
			<block slot="right">
				<view class="action">
					<view class='cuIcon-cu-image'>
						<text class="cuIcon-copy" @tap="Pagego" data-target="viewModal"></text>
					</view>
				</view>
			</block>
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
				<picker @change="PickerChange" :value="index" :range="time">
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
				<textarea maxlength="-1" name="input" v-model="meetingdata.remark"></textarea>
			</view>
			<view class="box">
				<view class="cu-bar btn-group">
					<button class="cu-btn bg-orange shadow-blur round lg" @tap="showModal"
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
	export default {
		data() {
			return {
				objectMultiArray,
				itemdata: {},
				date: '2021年07月25',
				index: 0,
				time: ['上午', '下午', '晚上', '全天'],
				switchA: false,
				switchB: true,
				switchC: false,
				modalName: null,
				radio: 'radio1',
				//条件选择
				checkbox: [{
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
				}, ],
				//会议室选择
				campus: [],
				curIndex: 0,
				multiIndex: [0, 0],
				multiArray: [
					[],
					[]
				],
				meetingdata: {
					name: "学科研讨会议",
					campus: "旗山校区",
					peoples: "10人",
					time: "2021-07-25",
					period: "上午",
					condition: ["白板", "投影仪"],
					room: "",
					affairs: false,
					remark: "需要会务安排，请按照需求列出安排事项",
				},
			};
		},
		onLoad(option) {
			if (option.itemdata != null) {
				this.itemdata = JSON.parse(option.itemdata);
				this.meetingdata.name = this.itemdata.name;
				this.meetingdata.campus = this.itemdata.campus;
				this.curIndex = this.objectMultiArray.findIndex(value=>value.name == this.meetingdata.campus);
				this.meetingdata.peoples = this.itemdata.peoples;
				this.meetingdata.time = this.itemdata.time;
				this.meetingdata.period = this.itemdata.period;
				this.switchC = this.itemdata.affairs;
				this.meetingdata.remark = this.itemdata.remark;
				console.log("主页面", this.itemdata);
			}
			this.init();
		},
		methods: {
			init() {
				this.meetingdata.campus = this.objectMultiArray[this.curIndex].name;
				this.campus = [];
				this.multiArray[0] = [];
				this.multiArray[1] = [];
				for (var i = 0; i < this.objectMultiArray.length; i++) {
					this.campus.push(this.objectMultiArray[i].name);
				}
				for (var j = 0; j < this.objectMultiArray[this.curIndex].tower.length; j++) {
					this.multiArray[0].push(this.objectMultiArray[this.curIndex].tower[j].name);
				}
				for (var k = 0; k < this.objectMultiArray[this.curIndex].tower[this.multiIndex[1]].room
					.length; k++) {
					this.multiArray[1].push(this.objectMultiArray[this.curIndex].tower[this.multiIndex[1]].room[k]
						.name);
				}
			},
			//时段选择
			PickerChange(e) {
				this.index = e.detail.value
				this.meetingdata.period = this.time[this.index]
			},
			//校区选择
			PickerChangecampus(e) {
				this.curIndex = e.detail.value;
				this.multiIndex = [0, 0];
				this.init();
			},
			DateChange(e) {
				this.meetingdata.time = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				console.log(this.meetingdata)
			},
			hideModal(e) {
				this.modalName = null
				this.Pagego();
			},
			hideChooseModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
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
				return  arr;
			},
			//是否会务安排
			SwitchC(e) {
				this.switchC = e.detail.value
				this.meetingdata.affairs = this.switchC
			},
			Pagego() {
				console.log(111);
				uni.navigateTo({
					url: './historyList'
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
