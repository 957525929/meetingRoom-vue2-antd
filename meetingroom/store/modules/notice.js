const notice = {
	state: {
		// 垃圾分类
		noticeList: [{
			id: '0',
			notType: '垃圾投递',
			type: 1,
			content: [
				// 	{//投垃圾
				// 	id:1,
				// 	name:'',
				// 	deliveryId:'e57ec4fa-f3ad-40cb-9f83-4cf359121bdb',
				// 	isTruedelivery:true,
				// 	deliveryResult:"投递成功",
				// 	deliveryTime:"2020-05-01 08:21:30",
				// 	ifRead:false,
				// },{//开投口
				// 	id:2, 
				// 	deviceName:"dev15",
				// 	deliveryId:'c0f9ca42-ea60-406d-b82f-03499232fd78',
				// 	isTruedelivery:false,
				// 	deliveryType:"厨余垃圾",
				// 	deliveryResult:"1",//1：满桶;2:未安装：3:正常
				// 	deliveryTime:"2020-06-01 18:21:30",
				// 	ifRead:false,
				// }
			]
		}, {
			id: '2',
			notType: '系统公告',
			type: 2,
			imgUrl: 'iconfont iconxitongshezhi',
			content: [
				// 	{
				// 	messageId: "1",
				// 	id:'0',
				// 	content:'您已成功注册',
				// 	time:'2020-07-05 09:39:54',
				// 	ifRead:''
				// },{
				// 	messageId: "2",
				// 	id:'1',
				// 	content:'积分新规则出台了！',
				// 	time:'2020-07-05 09:39:54',
				// 	ifRead:''
				// },
			]
		}, {
			id: '1',
			notType: '垃圾袋领取',
			type: 3,
			imgUrl: 'iconfont icongouwudai',
			content: [
				// 	{
				// 	id:'',
				// 	deviceName:"dev15",
				// 	changeId:'c0f9ca42-ea60-406d-b82f-03499232fd78',
				// 	isSuccess:false,
				// 	changeType:"可回收物垃圾袋",
				// 	changeResult:"1",//1：无袋;2:积分不足：3:正常
				// 	changeTime:"2020-06-01 18:21:30",
				// 	ifRead:false,
				// },
			]
		}, {
			id: '3',
			notType: '更多消息',
			type: 4,
			imgUrl: 'iconfont icongengduo',
			content: []
		}],
		typeLength: [],
		// length2:'',
		// length3:'',
		// length4:'',
	},
	getters: {
		notLenth(state) {
			let length = 0,
				ifNull = false;
			state.noticeList.forEach((item, index) => {
				let arr = item.content.filter(function(res) {
					return res.ifRead == false
				})
				// if(item.type==index)
				state.typeLength[item.type - 1] = arr.length
				if (arr.length != 0) {
					ifNull = true
				}
				length += arr.length
			})
			if (ifNull) {
				uni.setTabBarBadge({
					index: 2,
					text: length.toString()
				})
			} else {
				uni.removeTabBarBadge({
					index: 2
				})
			}
			return state.typeLength
		},
		typeNotLength: (state) => {
			let type = [1, 2, 3, 4]
			state.typeLength = []
			return state.noticeList.forEach((res, index) => {
				if (res.type == type[index + 1]) {
					let aa = ''
					aa = res.content.filter(item => {
						return item.ifRead == false
					})
					state.typeLength.push(aa)
				}
			})
		}
	},
	mutations: {
		addNoticeList: (state, payload) => {
			console.log(payload[0],payload[1])
			state.noticeList.forEach(item => {
				if (item.notType == payload[0]) {
					item.content.unshift(payload[1])
				}
				if(payload[0]=="更多消息"){
					uni.showToast({
						title:payload[1].msg,
						duration: 2000,
						icon: 'none'
					})
				}
			})

			// plus.runtime.setBadgeNumber(state.noticeList.length);
			// console.log(state.noticeList)
		},
		changeIfRead: (state, payload) => {
			if (payload[0] == "all") {
				state.noticeList.forEach(item => {
					if (item.type == payload[1]) {
						item.content.forEach(itemm => {
							if (itemm.ifRead == false) {
								itemm.ifRead = true
							}
						})
					}
				})
			} else {
				console.log(payload[0], payload[1])
				state.noticeList[payload[1] - 1].content.forEach(res => {
					if (res.messageId == payload[0]) {
						res.ifRead = true
					}
				})
			}
		},
		clearRead: (state, payload) => {
			let aa = '',
				bb = []
			aa = state.noticeList.filter(function(item) {
				return item.type == payload
			})
			if (aa[0].content.length == 0) {
				uni.showToast({
					title: '当前暂无消息',
					icon: 'none'
				})
			} else {
				let self = this
				uni.showModal({
					title: '提示',
					content: "确认清除所有已读消息？",
					success: (res) => {
						if (res.confirm) {
							aa[0].content.forEach((itemm, index) => {
								if (itemm.ifRead == true) {
									bb.push(index)
								}
							})
							bb.sort(function(a, b) {
								return b - a
							})
							bb.forEach(index => {
								aa[0].content.splice(index, 1)
							})
						}
					}
				})
			}


		},
	},
	actions: {}
}
export default notice
