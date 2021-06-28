<template>
	<!-- 采购订单 -->
	<view class="wrap1">

		<u-tabs-swiper ref="uTabs" :list="tablist" :current="swiperCurrent" @change="tabsChange" :is-scroll="true"
			:font-size="30" active-color="#feee0b" inactive-color="#fff" bg-color="#2fc25b" swiperWidth="750">
		</u-tabs-swiper>
		<view class="wrap">
			<u-section class="mt20 mb12" :title="tablist[swiperCurrent].name" :right="false" :show-line="true">
			</u-section>
			<u-search v-if="swiperCurrent == 1" shape="round" :clearabled="true" placeholder="输入姓名查询" action-text="查询"
				v-model="keyword" search-icon-color="green" :action-style="stss" @custom="getOrderList()"></u-search>
			<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
			<u-input :custom-style="ctss" type="select" v-if="swiperCurrent == 2" placeholder="请选择资产类型" v-model="value" @click="show = true" />
			<u-select mode="mutil-column-auto" :list="addressSelectList" v-model="addressShow"
				@confirm="addressSelectConfirm"></u-select>
			<u-input :custom-style="ctss" type="select" v-if="swiperCurrent == 3" placeholder="请选择位置" v-model="address" @click="addressShow = true" />
			<view v-if="infoList.length > 0">
				<view class="mt4 code" v-for="(item, index) in infoList" :key="index">
					<u-card class="code" :title="'编号：'+ item.code" :sub-title="item.createtime" :thumb="item.image"
						margin='0rpx' @click=onClick(item.id)>
						<view class="" slot="body">
							<view class="title-wrap">
								<text class="title u-line-2">
									<text class="font-weight-bold">领用人：</text>{{ item.name }}</text>
								<text class="font-weight-bold">位 置：</text>{{ item. address}}</text>
								<text class="title u-line-2">
									<text class="font-weight-bold">手 机：</text>{{ item.telephone }}</text>
								<text class="title u-line-2">
									<text class="font-weight-bold">资产种类：</text>
									{{ item.category}}
								</text>
								<text class="title u-line-2">
									<text class="font-weight-bold">学校编号：</text>{{ item.barcode1 }}</text>
							</view>
						</view>
						<view class="" slot="head">
							<u-row gutter="16" justify="flex-end">
								<u-col span="9">
									<text class="title u-line-2">学院编号：{{ item.barcode2 }}</text>
								</u-col>
								<u-col span="3">
									<u-tag :text="statusList[item.status-1].text" mode="light"
										:type="statusList[item.status-1].type" shape="circle" />
								</u-col>
							</u-row>
						</view>
					</u-card>
				</view>
			</view>
			<view v-else>
				<image class="u-grid-item-img" src="../../static/images/nodata.png"></image>
			</view>
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadmore()" />
		</view>


	</view>
</template>

<script>
	var _this;
	export default {
		data() {

			return {
				keyword:'',
				value: '',
				address: '',
				addressShow:false,
				show: false,
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					nodata: '',
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '已全部加载完毕'
				},
				pageNum: 1,
				pageSize: 8,
				total: 20,
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
				list: [{
						value: '0',
						label: '不限'
					},{
						value: '1',
						label: '办公桌'
					},
					{
						value: '2',
						label: '电脑'
					}
				],
				ctss: {
					color: '#349d9d',
					background: '#f8f2ee',
					'border-radius': '20rpx',
					'line-height': 1.8,
					'text-indent': '30rpx'
				},
				stss: {
					color: 'white',
					background: '#00b9ff',
					width: '100rpx',
					'border-radius': '20px',
					'line-height': 1.8
				},
				search: {
					address: '',
					tyep: '',
					name: '',
					current: ''
				},
				tablist: [{
						name: '全部'
					},
					{
						name: '姓名'
					},
					{
						name: '类型'
					},
					{
						name: '位置'
					}
				],
				swiperCurrent: 0,
				infoList: [{
						id: 1,
						category: '办公桌',
						name: '王老师',
						address: '仓山校区A栋201',
						telephone: '15880754987',
						status: 2,
						barcode2: 123123123,
						barcode1: 12312395212
					},
					{
						id: 2,
						category: '手机',
						name: '王老师',
						address: '仓山校区A栋201',
						telephone: '15880754987',
						status: 2,
						barcode2: 51796521556,
						barcode1: 98214561154
					}
				],
				statusList: [{
					text: '库存',
					type: 'info'
				}, {
					text: '在用',
					type: 'success'
				}, {
					text: '未报废',
					type: 'warning'
				}, {
					text: '报废',
					type: 'error'
				}],
				typelist: [{
					label: '买家自提',
				}, {
					label: '卖家发货',
				}, {
					label: '代发',
				}],
			}

		},
		onReachBottom() {
			if (this.status != 'loadmore') {
				return;
			}
			this.status = 'loading';
			this.pageNum = ++this.pageNum;
			_this._post_form('user/getList', this.search, (result) => {
				if (Math.ceil(_this.total / _this.pageSize) + 1 <= _this.pageNum) {
					_this.status = 'noMore'
				} else {
					setTimeout(function() {
						for (let i in result.data) {
							_this.infoList.push(result.data[i]);
						}
						_this.status = 'loadmore'
					}, 500);
				}
			})
		},
		onShow() {},
		onLoad() {
			_this = this;
			//_this.getOrderList();
		},
		methods: {
			getOrderList() {
				this.search.current = this.swiperCurrent;
				_this._post_form('user/getList', this.search, (result) => {
						debugger;
					// for (let i = 0;i<result.data.data.length;i++) {
					// 	result.data.data[i].createtime = _this.transformTime(result.data.data[i].createtime);
					// }
					_this.infoList = [];
					if (result.data.length == 0) {
						_this.status = 'nodata';
					}
					for (let i in result.data) {
						_this.infoList.push(result.data[i]);
					}
				});
			},
			loadmore() {
				if (this.status != 'loadmore') {
					return;
				}
				this.status = 'loading';
				this.pageNum = ++this.pageNum;
				_this._post_form('user/getList', this.search, (result) => {
					if (Math.ceil(_this.total / _this.pageSize) + 1 <= _this.pageNum) {
						_this.status = 'noMore'
					} else {
						setTimeout(function() {
							for (let i in result.data) {
								_this.infoList.push(result.data[i]);
							}
							_this.status = 'loadmore'
						}, 500);
					}
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
			},
			onClick(id) {
				uni.navigateTo({
					url: '/pages/commodity/commodityinfo?id=' + id
				})
			},
			confirm(e) {
				console.log(e);
				this.value = e[0]["label"]; //value
			},
			addressSelectConfirm(e) {
				this.address = '';
				e.map((val, index) => {
					if (val.label) {
						this.address += val.label;
					}
				})
			}
		}
	}
</script>


<style scoped lang="scss">
	.wrap1 {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.code {
		background-image: linear-gradient(#09c1e6, #9198e5);
		color: white;
		border-radius: 20px;
	}

	.nodata {
		color: white;
		font-size: 20px;
	}
</style>
