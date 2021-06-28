<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="资产图片" prop="photo" label-width="150">
				<u-upload width="160" max-count="1" :auto-upload="false" ref="uUpload" :file-list="fileList"
					@on-choose-complete="onchoosecomplete" @on-remove="onremovechoose"></u-upload>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="领用人" prop="name">
				<u-input :border="border" type="select" :select-open="nameShow" v-model="model.name"
					placeholder="请选择领用人" @click="nameShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="位置" prop="address">
				<u-input :border="border" type="select" :select-open="addressShow" v-model="model.address"
					placeholder="请选择位置" @click="addressShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="手机" prop="telephone">
				<u-input :border="border" placeholder="请输入手机号码" v-model="model.telephone" type="number">
				</u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="学校编号" prop="barcode1">
				<u-input :border="border" placeholder="请输入学校编号" v-model="model.barcode1">
				</u-input>
				<image style="position: absolute;display: inline-block;left: 90%;width: 30rpx;height: 30rpx;top:30rpx ;" class="user-avatar" src="../../static/images/logosd.png" mode="aspectFill"></image>
				<!-- <u-icon label="" size="40" name="scan" @click="scan(1)"></u-icon> -->
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="学院编号" prop="barcode2">
				<u-input :border="border" placeholder="请输入学院编号" v-model="model.barcode2">
				</u-input>
				<u-icon label="" size="40" name="scan" @click="scan(0)"></u-icon>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="资产类型" prop="category">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.category"
					placeholder="请选择资产类型" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="登记时间" prop="regTime">
				<u-input :border="border" type="select" :select-open="regTimeShow" v-model="model.regTime"
					placeholder="请选择登记时间" @click="regTimeShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="有效期限" prop="regTime">
				<u-input :border="border" type="select" :select-open="expireShow" v-model="model.expire"
					placeholder="请选择有效期限" @click="expireShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
				:label-position="labelPosition" label="报废时间" prop="scrapTime">
				<u-input :border="border" type="select" :select-open="scrapTimeShow" v-model="model.scrapTime"
					placeholder="请选择报废时间" @click="scrapTimeShow = true"></u-input>
			</u-form-item>
		</u-form>
		<view class="mt20">
			<u-button type="success" :ripple="true" :plain="true" shape="circle" @click="submit">提交</u-button>
		</view>
		<u-picker v-model="scrapTimeShow" mode="time" :params="params" @confirm="scrapTimeSelectConfirm">></u-picker>
		<u-picker v-model="expireShow" mode="time" @confirm="expireSelectConfirm">></u-picker>
		<u-picker v-model="regTimeShow" mode="time" :params="params" @confirm="regTimeSelectConfirm">></u-picker>
		<u-select mode="mutil-column-auto" :list="addressSelectList" v-model="addressShow"
			@confirm="addressSelectConfirm">
		</u-select>
		<u-select mode="single-column" :list="statusSelectList" v-model="statusShow" @confirm="statusSelectConfirm">
		</u-select>
		<u-select mode="single-column" :list="nameSelectList" v-model="nameShow" @confirm="nameSelectConfirm">
		</u-select>
		<u-select mode="single-column" :list="selectList" v-model="actionSheetShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="unitList" v-model="unitListShow" @confirm="unitListfirm"></u-select>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				},
				fileList: [{
					url: '../../static/images/table.jpg',
				}],
				model: {
					category: '',
					name: '',
					address: '',
					telephone: '',
					barcode1: '',
					barcode2: '',
					status: '',
					regTime: '',
					expire: ''
				},
				rules: {
					category: [{
						required: true,
						message: '请选择资产类型',
						trigger: ['change', 'blur'],
					}],
					name: [{
						required: true,
						message: '请选择领用人',
						trigger: ['change', 'blur'],
					}],
					address: [{
						required: true,
						message: '请选择位置',
						trigger: ['change', 'blur'],
					}],
					telephone: [{
						required: true,
						message: '请输入手机号码',
						trigger: ['change', 'blur'],
					}, {
						len: 11,
						message: '手机号长度必须是11个字符'
					}, ],
				},
				scrapTimeShow: false,
				expireShow: false,
				regTimeShow: false,
				statusShow: false,
				addressShow: false,
				nameShow: false,
				actionSheetShow: false,
				border: false,
				errorType: ['message'],
				labelPosition: 'left',
				addressSelectList: [{
						value: 1,
						label: '中国',
						children: [{
								value: 2,
								label: '广东',
								children: [{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					},
					{
						value: 8,
						label: '美国',
						children: [{
							value: 9,
							label: '纽约',
							children: [{
								value: 10,
								label: '皇后街区'
							}]
						}]
					}
				],
				nameSelectList: [{
						value: '1',
						label: '王老师'
					},
					{
						value: '2',
						label: '李老师'
					}
				],
				selectList: [{
						value: '1',
						label: '办公桌'
					},
					{
						value: '2',
						label: '办公椅'
					}
				],
				statusSelectList: [{
						value: '1',
						label: '在用'
					},
					{
						value: '2',
						label: '报废'
					}
				],
				unitList: [],
				unitListShow: false,
			}
		},
		onLoad() {
			_this = this;
			//_this.getUnitList();
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			onremovechoose(index, list) {
				this.imageUrl = null;
			},
			onchoosecomplete(list) {
				this.imageUrl = list[0].url;
			},
			getUnitList() {
				_this._post_form('/api/ykjp/product/type/getType', {}, (result) => {
					for (let i = 0; i < result.data.data.length; i++) {
						result.data.data[i].label = result.data.data[i].name
						result.data.data[i].value = result.data.data[i].id
					}
					_this.setData({
						'selectList': result.data.data
					})
				});
				_this._post_form('/api/ykjp/product/unit/getUnitList', {}, (result) => {
					for (let i = 0; i < result.data.data.length; i++) {
						result.data.data[i].label = result.data.data[i].name
						result.data.data[i].value = result.data.data[i].id
					}
					_this.setData({
						'unitList': result.data.data
					})
				});
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.sendImage();
					} else {
						this.$refs.uToast.show({
							title: '验证失败',
							type: 'error'
						})
					}
				});
			},
			sendImage() {
				uni.uploadFile({
					url: _this.api_root + 'api/common/upload',
					filePath: _this.imageUrl,
					name: 'file',
					success: function(res) {
						var e = JSON.parse(res.data)
						if (e.code == 1) {
							_this.model.prop[0].title = _this.model.name
							_this._post_form('/api/ykjp/product/product/add', {
								name: _this.model.commodity,
								product_type_id: _this.model.product_type_id,
								specification: _this.model.specification,
								sku: _this.model.sku,
								prop: JSON.stringify(_this.model.prop),
								remark: _this.model.intro,
								product_unit_id: _this.model.product_unit_id,
								unit: _this.model.unit,
								image: e.data.url,
							}, (result) => {
								_this.$refs.uToast.show({
									title: '添加成功',
									type: 'success',
									back: true
								})
							});
						}
					},
					complete: function(res) {}
				});
			},
			selectConfirm(e) {
				e.map((val, index) => {
					this.model.category = val.label;
					this.model.product_type_id = val.value
				})
			},
			addressSelectConfirm(e) {
				this.model.address = '';
				e.map((val, index) => {
					if (val.label) {
						this.model.address += val.label;
					}
				})
			},
			nameSelectConfirm(e) {
				e.map((val, index) => {
					this.model.name = val.label;
					this.model.product_type_id = val.value
				})
			},
			statusSelectConfirm(e) {
				e.map((val, index) => {
					this.model.status = val.label;
					this.model.product_type_id = val.value
				})
			},
			regTimeSelectConfirm(e) {
				this.model.regTime = '';
				this.model.regTime += e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute + ':' + e
					.second;
			},
			expireSelectConfirm(e) {
				this.model.expire = '';
				this.model.expire += e.year + '-' + e.month + '-' + e.day;
			},
			scrapTimeSelectConfirm(e) {
				this.model.scrapTime = '';
				this.model.scrapTime += e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute + ':' + e
					.second;
			},
			unitListfirm(e) {
				e.map((val, index) => {
					this.model.unit = val.label;
					this.model.product_unit_id = val.value
				})
			},
			scan(index) {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if (index) {
							_this.model.barcode1 = res.result;
						} else {
							_this.model.barcode2 = res.result;
						}
					}
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}
</style>
