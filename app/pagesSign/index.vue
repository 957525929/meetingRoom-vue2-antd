<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">资产登记</block>
		</cu-custom>
		<view class="wrap">
			<view class="cu-form-group itemimage">
				<view class="title titlename">资产图片</view>
				<image @click="imgListPreview('../static/scan/table.jpg')" class="image" mode="scaleToFill"
					src="../static/scan/table.jpg" style="width: 13vh; height: 13vh;">
				</image>
			</view>
			<view class="cu-form-group">
				<view class="title">领用人</view>
				<picker @change="nameSelectchange" :value="nameIndex" :range="nameSelectList">
					<view class="picker">
						{{nameIndex>-1?nameSelectList[nameIndex]:'请选择领用人'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">位置</view>
				<picker mode="multiSelector" @change="addressSelectChange" :value="addressIndex"
					@columnchange="addressColumnChange" :range="addressSelectList">
					<view class="picker">
						{{addressSelectList[0][addressIndex[0]]}}.{{addressSelectList[1][addressIndex[1]]}}.{{addressIndex[2]>-1?addressSelectList[2][addressIndex[2]]:"请选择位置"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">手机</view>
				<input placeholder="请输入手机号码" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">学校编号</view>
				<input placeholder="请输入学校编号" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">学院编号</view>
				<input placeholder="请输入学院编号" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">资产类型</view>
				<picker @change="selectchange" :value="selectIndex" :range="selectList">
					<view class="picker">
						{{selectIndex>-1?selectList[selectIndex]:'请选择资产类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">登记时间</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">登记时间</view>
				<picker mode="date" :value="date1" start="2015-09-01" end="2020-09-01" @change="Date1Change">
					<view class="picker">
						{{date1}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">报废时间</view>
				<picker mode="date" :value="date2" start="2015-09-01" end="2020-09-01" @change="Date2Change">
					<view class="picker">
						{{date2}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<picker mode="time" :value="time2" start="09:01" end="21:01" @change="Time2Change">
					<view class="picker">
						{{time2}}
					</view>
				</picker>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn light bg-green lg" @tap="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				nameIndex: -1,
				nameSelectList: ['王老师', '李老师'],
				addressIndex: [-1, -1, -1],
				addressSelectList: [
					['中国', '美国'],
					['广东', '广西'],
					['深圳', '广州']
				],
				selectIndex: -1,
				selectList: ['办公桌', '办公椅'],
				date: '请选择登记日期',
				date1: '请选择有效期限',
				date2: '请选择报废日期',
				time: '请选择登记时间',
				time2: '请选择报废时间',
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
			imgListPreview(url) {
				var urlList = []

				urlList.push(
					'https://img36.51tietu.net/pic/2016-122315/20161223155040stnfwkjxaih15350.jpg'
				) //push中的参数为 :src="item.img_url" 中的图片地址
				uni.previewImage({
					indicator: "number",
					loop: true,
					urls: urlList
				})
			}
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
