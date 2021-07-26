<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">编辑资产信息</block>
		</cu-custom>
		<view class="wrap">
			<view class="cu-form-group itemimage">
				<view class="title titlename">资产图片</view>
				<image class="image" mode="scaleToFill" src="../../static/scan/table.jpg"
					style="width: 13vh; height: 13vh;"></image>
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
								data.addressSelectList[1] = ['广东','广西'];
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
