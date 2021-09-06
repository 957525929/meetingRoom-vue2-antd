<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">编辑资产信息</block>
		</cu-custom>
		<view class="wrap">
			
			<view class="cu-bar bg-white padding-left">
				<view class="action">
					资产图片
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub padding-left">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-title text-red"></text>
					领用人
				</view>
				<picker @change="nameSelectchange" :value="nameIndex" :range="nameSelectList">
					<view class="picker">
						{{nameIndex>-1?nameSelectList[nameIndex]:'请选择领用人'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-title text-red"></text>
					位置
				</view>
				<picker mode="multiSelector" @change="addressSelectChange" :value="addressIndex"
					@columnchange="addressColumnChange" :range="addressSelectList">
					<view class="picker">
						{{addressSelectList[0][addressIndex[0]]}}.{{addressSelectList[1][addressIndex[1]]}}.{{addressIndex[2]>-1?addressSelectList[2][addressIndex[2]]:"请选择位置"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-title text-red"></text>
					手机
				</view>
				<input placeholder="请输入手机号码" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title padding-left">学校编号</view>
				<input placeholder="请输入学校编号" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title padding-left">学院编号</view>
				<input placeholder="请输入学院编号" name="input"></input>
				<text class='cuIcon-scan'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-title text-red"></text>
					资产类型
				</view>
				<picker @change="selectchange" :value="selectIndex" :range="selectList">
					<view class="picker">
						{{selectIndex>-1?selectList[selectIndex]:'请选择资产类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title padding-left">登记时间</view>
				<picker mode="date" :value="date" start="2017-09-01" end="2023-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<picker mode="time" :value="time" start="00:00" end="24:00" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title padding-left">有效期限</view>
				<picker mode="date" :value="date1" start="2017-09-01" end="2023-09-01" @change="Date1Change">
					<view class="picker">
						{{date1}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title padding-left">报废时间</view>
				<picker mode="date" :value="date2" start="2017-09-01" end="2023-09-01" @change="Date2Change">
					<view class="picker">
						{{date2}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<picker mode="time" :value="time2" start="00:00" end="24:00" @change="Time2Change">
					<view class="picker">
						{{time2}}
					</view>
				</picker>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn round bg-green lg" @tap="submit" data-target="DialogModal">提交</button>
			</view>
			
			<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">提交</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl bg-white">
						请确认是否提交
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn" @tap="hideModal">否</button>
							<button class="cu-btn bg-green margin-left" @tap="okconfirm">是</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		created: function() {
			let aData = new Date();
		
			this.date =
				aData.getFullYear() + "-" +
				(aData.getMonth() + 1) + "-" +
				(aData.getDate())
		},
		
		
		data() {
			return {
				nameIndex: -1,
				nameSelectList: ['王老师', '李老师'],
				addressIndex: [-1, -1, -1],
				addressSelectList: [
					['仓山校区', '旗山校区'],
					['知明楼', '立诚楼'],
					['101', '102']
				],
				selectIndex: -1,
				selectList: ['办公桌', '办公椅'],
				date: '',
				date1: '请选择有效期限',
				date2: '请选择报废日期',
				time: '请选择登记时间',
				time2: '请选择报废时间',
				imgList: ['../../static/scan/table.jpg'],
				modalName: null,
			}
		},
		onLoad() {
			_this = this;
			//_this.getUnitList();
		},
		// onReady() {
		// 	this.$refs.uForm.setRules(this.rules);
		// },
		methods: {
			nameSelectchange(e) {
				this.nameIndex = e.detail.value
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
								data.addressSelectList[1] = ['广东', '广西'];
								data.addressSelectList[2] = ['广州', '深圳'];
								break;
							case 1:
								data.addressSelectList[1] = ['纽约'];
								data.addressSelectList[2] = ['皇后街'];
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
										data.addressSelectList[2] = ['广州', '深圳'];
										break;
									case 1:
										data.addressSelectList[2] = ['南宁', '桂林'];
										break;
								}
								break;
							case 1:
								switch (data.addressIndex[1]) {
									case 0:
										data.addressSelectList[2] = ['皇后街'];
										break;
								}
								break;
						}
						data.addressIndex[2] = 0;
						break;
				}
				this.addressSelectList = data.addressSelectList;
				this.addressIndex = data.addressIndex;
			},
			selectchange(e) {
				this.selectIndex = e.detail.value
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			Time2Change(e) {
				this.time2 = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			Date1Change(e) {
				this.date1 = e.detail.value
			},
			Date2Change(e) {
				this.date2 = e.detail.value
			},
			submit() {
				// this.$refs.uForm.validate(valid => {
				// 	if (valid) {
				// 		this.sendImage();
				// 	} else {
				// 		this.$refs.uToast.show({
				// 			title: '验证失败',
				// 			type: 'error'
				// 		})
				// 	}
				// });
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			
			submit(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			cancle() {
				this.modalName = null
			},
			okconfirm() {
				uni.navigateBack()
			},
		}

	}
</script>
<style scoped lang="scss">
	.itemimage {
		height: 15vh;
		display: flex;
	}

	.image {
		border: 1px solid #dcdcdc;
	}

	// .wrap {
	// 	padding: 30rpx;
	// 	background-color: #fff;
	// }
</style>
