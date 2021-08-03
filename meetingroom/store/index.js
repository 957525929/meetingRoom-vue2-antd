import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js'
import upload from './modules/upload.js'
import notice from './modules/notice.js'
import person from './modules/person.js'

import util from '../common/util.js'
import noticeMenu from './content.js'
import globalApiList from '@/common/http/api/global.js'
const NEW_NOTICEMENU = Object.freeze(noticeMenu)
import {
	socketUrl
} from '../common/http/http.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		home,
		upload,
		notice,
		person
	},
	state: {
		// 启动页
		launchFlag: false,
		// 登录
		phone: '',
		password: '',
		userId: '',
		loginTime: '',
		hasLogin: true,
		// websocket,
		timer: undefined,
		// socketConnecting: '',
		// 通知列表
		noticeList: [],
		// 消息系统设置
		ableGetNewMessageType: {
			ableGetNewMessage: true,
			voice: true,
			vibrate: true
		},
		// 个人中心信息
		uerName:"",
		perInfo:{}
	},
	mutations: {
		// 修改state值
		changeData: (state, payload) => {
			for (let [key, val] of Object.entries(payload)) {
				state[key] = val;
				// console.log("变更" + key + "为" + val);
			}
		},
		// 登出
		loginOut: (state, payload) => {
			state.phone = ""
			state.password = ""
			state.userId = ""
			state.loginTime = ""
			state.hasLogin = false;
			// uni.closeSocket()
			if (payload === "timeout") {
				uni.showToast({
					title: "登录已过期，请重新登录",
					icon: "none",
					duration: 3000
				})
			} else {
				uni.showToast({
					title: "您已退出登录",
					icon: "none",
					duration: 2000
				})
			}
			uni.removeStorageSync("req_token")
			uni.reLaunch({
				url: "/pages/index/guide",
				success: () => {
					uni.hideToast();
				}
			})
		},
		checkOpenSocket: (state) => {
			let data = '{"sentUser":-2,"content":"心跳","state":0}';
			state.timer = setTimeout(function() {
				uni.sendSocketMessage({
					data: data,
					success: (res) => {
						return;
					},
					fail: (err) => { // 未连接打开websocket连接
						// console.log(err)
						uni.closeSocket()
						store.commit("connectWebsocket")
					}
				})
			}, 5000)
		},
		connectWebsocket: (state) => {
			let self = this;
			// 握手状态
			uni.connectSocket({
				url: socketUrl + `${state.userId}/0`,
			});
			uni.onSocketOpen((res) => {
				if (state.ableGetNewMessageType.ableGetNewMessage) {
					// #ifdef APP-PLUS
					plus.push.addEventListener(
						"click",
						function(msg) {
							uni.switchTab({
								url: "/pages/tabBar/notice",
							});
						},
						false
					);
					// #endif
					// store.commit('heartCheck')
					uni.onSocketMessage((res) => {
						if (state.ableGetNewMessageType.ableGetNewMessage) {
							// console.log(res);
							const newMessage = JSON.parse(res.data);
							let throwObj = {
								messageid: "",
								throwType: "", //1为垃圾投递，2为开头口
								deviceName: "",
								deliveryId: "", //throwType1的时候传
								deviceId: "", //throwType2的时候传
								deliveryType: "",
								deliveryResult: "", //1：满桶;2:未安装：3：远程开头口4:正常
								deliveryTime: "",
							};
							let bagObj = {
								messageid: "",
								throwType: "", //1为垃圾袋结果，2为开取代口
								deviceId: "",
								deviceName: "",
								changeId: "",
								changeType: "",
								changeResult: "", //1：无袋;2:积分不足：3:正常
								changeTime: "",
							};
							let sysObj = {
								messageId: "",
								content: "",
								time: "",
								msg: "",
								ifRead: false
							};
							// let msgObj = {
							// 	messageid: "",
							// 	throwType: "", //1为垃圾投递，2为开头口
							// 	deviceName: "",
							// 	recordId: "", //throwType1的时候传
							// 	deviceId: "", //throwType2的时候传
							// 	garbageType: "",
							// 	result: "", //1：满桶;2:未安装：3：远程开头口4:正常
							// 	time: "",
							// 	msg: "" //内容
							// };
							let bagMsg = [{
								key: "messageId",
								matchValue: "messageId",
								value: ""
							}, {
								key: "deviceName",
								matchValue: "deviceName",
								value: ""
							}, {
								key: "garbageType",
								matchValue: "changeType",
								value: "",
								content: {
									"可回收物垃圾袋": {
										imgUrl: "/pages/component/home/static/home/recycleBag.png"
									},
									"厨余垃圾袋": {
										imgUrl: "/pages/component/home/static/home/kitchenBag.png"
									},
									"有害垃圾袋": {
										imgUrl: "/pages/component/home/static/home/harmBag.png"
									},
									"其他垃圾袋": {
										imgUrl: "/pages/component/home/static/home/otherBag.png"
									}
								}
							}, {
								key: "time",
								matchValue: "changeTime",
								value: ""
							}, {
								key: "throwType",
								matchValue: "throwType",
								value: "",
							}, {
								key: "recordId",
								matchValue: "changeId",
								value: ""
							}, {
								key: "deviceId",
								matchValue: "deviceId",
								value: ""
							}, {
								key: "result",
								matchValue: "changeResult",
								value: "",
								content: {
									1: {
										truedelivery: false,
										description: "剩余垃圾袋不足",
										msg: "兑换失败，当前设备暂无剩余垃圾袋，请前往其它设备兑换",
									},
									2: {
										truedelivery: false,
										description: "积分不足",
										msg: "兑换失败，当前账户剩余积分不足，无法兑换，您可通过投递可回收物类垃圾获得更多积分" //内容
									},
									3: {
										truedelivery: true,
										description: "兑换成功",
										msg: "兑换成功" //内容
									}
								}
							}, {
								key: "ifRead",
								matchValue: "",
								value: false
							}];
							let deliMsg = [{
								key: "messageId",
								matchValue: "messageId",
								value: ""
							}, {
								key: "deviceName",
								matchValue: "deviceName",
								value: ""
							}, {
								key: "garbageType",
								matchValue: "deliveryType",
								value: ""
							}, {
								key: "time",
								matchValue: "deliveryTime",
								value: ""
							}, {
								key: "throwType",
								matchValue: "throwType",
								value: "",
							}, {
								key: "recordId",
								matchValue: "deliveryId",
								value: ""
							}, {
								key: "deviceId",
								matchValue: "deviceId",
								value: ""
							}, {
								key: "result",
								matchValue: "deliveryResult",
								value: "",
								content: {
									1: {
										truedelivery: false,
										description: "垃圾桶已满",
										msg: "投递失败，当前设备垃圾已满，请前往其他设备投递"
									},
									2: {
										truedelivery: false,
										description: "垃圾桶未安装",
										msg: "投递失败，当前设备未安装垃圾桶，请前往其他设备投递" //内容
									},
									3: {
										truedelivery: false,
										description: "非法操作，远程开箱",
										msg: "投递失败，禁止远程开箱" //内容
									},
									4: {
										truedelivery: true,
										description: "投递成功",
										msg: "投递成功" //内容
									},
									6: {
										truedelivery: false,
										msg: "您投放的垃圾存在分类错误，您可前往回收分类中心查看正确的分类，垃圾分类从你我做起",
										description: "垃圾分类错误"
									}
								}
							}, {
								key: "ifRead",
								matchValue: "",
								value: false
							}];
							let sysMsg = [{
								key: "messageId",
								matchValue: "messageId",
								value: ""
							}, {
								key: "content",
								matchValue: "content",
								value: ""
							}, {
								key: "time",
								matchValue: "time",
								value: ""
							}, {
								key: "msg",
								matchValue: "msg",
								value: ""
							}, {
								key: "ifRead",
								matchValue: "ifRead",
								value: false
							}];

							let receiveObj = {
								"垃圾投递": {
									type: 1,
									msg: deliMsg
								},
								"垃圾袋领取": {
									type: 3,
									msg: bagMsg
								},
								"系统公告": {
									type: 2,
									msg: sysMsg
								},
								"商品核销": {
									type: 4,
									msg: sysMsg
								},
							}
							// 设备0，管理员-1，服务器-2
							if (newMessage.sendUser == -1) {
								sysObj["messageId"] = newMessage.messageId;
								for (let i in sysObj) {
									if (sysObj.hasOwnProperty(i)) {
										sysObj[i] = newMessage.content[i]
									}
								}
								uni.navigateTo({
									url: "/pages/component/notice/other?type=2"
								})
								store.commit('createLocalPushMsg', [newMessage.type, sysObj
									.content
								])
								store.commit("addNoticeList", [newMessage.type, sysObj]);
							} else if (newMessage.sendUser == 0) {
								// 垃圾投递
								let msgObj = {}
								msgObj = util.handleDevMsg(newMessage, receiveObj[newMessage
									.type].msg)
								uni.navigateTo({
									url: "/pages/component/notice/notDetail?idIs=" +
										JSON.stringify(msgObj.messageId) +
										"&type=" + receiveObj[newMessage.type]
										.type + "&detail=" + JSON.stringify(msgObj)
								})
								msgObj["ifRead"] = true;
								store.commit('createLocalPushMsg', [newMessage.type,
									msgObj
								])
								store.commit("addNoticeList", [newMessage.type, msgObj]);
							} else if (newMessage.sendUser == -2) {
								let msgObj = {}
								if (newMessage.type) {
									msgObj = util.handleDevMsg(newMessage, receiveObj[
										newMessage.type].msg)
									if (newMessage.type === "垃圾投递") {
										uni.navigateTo({
											url: "/pages/component/notice/notDetail?idIs=" +
												JSON.stringify(msgObj.messageId) +
												"&type=" + receiveObj[newMessage
													.type].type + "&detail=" + JSON
												.stringify(msgObj)
										})
										store.commit("addNoticeList", [newMessage.type,
											msgObj
										]);
										msgObj["ifRead"] = true;
									} else if (newMessage.type == "商品核销") {
										msgObj['msg'] = "您在商城兑换的物品已" + newMessage.content
											.content
										store.commit("addNoticeList", ["更多消息", msgObj]);
										msgObj["ifRead"] = false;
									} else if (newMessage.type == "系统公告") {
										msgObj["msg"] = "您已成功注册";
										store.commit("addNoticeList", [newMessage.type,
											msgObj
										]);
										msgObj["ifRead"] = false
									}

									store.commit('createLocalPushMsg', [newMessage.type,
										msgObj
									])
								} else {
									return;
								}
								if (newMessage.content == "有其他人登录了账号你已经被强制下线") {

									uni.closeSocket()
									store.commit("loginOut");
									uni.showToast({
										title: "账户已在其它设备登录，请重新登录",
										icon: "none",
										duration: 2000,
									});

								} else if (newMessage.content == "心跳") {
									console.log("心跳砰砰砰");
								}
							}
						};
					});

				}
			});
			uni.onSocketError((err) => {
				clearTimeout(state.timer)
				uni.closeSocket()
				store.commit("checkOpenSocket")
				return;
			});
			uni.onSocketClose(function(res) {
				console.log('websocket 断开: ' + res)
				clearTimeout(state.timer)
				if (state.hasLogin) {
					store.commit("checkOpenSocket")
				}
			});
		},
		// 通知栏消息提示
		createLocalPushMsg: (state, payload) => {
			// 设置通知方式
			// #ifdef APP-PLUS
			if (state.ableGetNewMessageType.voice) {
				plus.device.beep(1);
			}
			if (state.ableGetNewMessageType.vibrate) {
				plus.device.vibrate(100);
			}
			let options = {
				cover: false,
				icon: "static/logo.png",
				title: "环城卫士",
				subtitle: payload[1].msg,
			};
			// if (payload[0] == 2) {
			// plus.runtime.setBadgeNumber(this.length, "");
			// } else {
			plus.push.createMessage(payload[1].msg, options);
			// }
			if (uni.getSystemInfoSync().platform === "ios") {
				console.log(
					'如果无法显示通知消息，请到"设置"->"通知"中配置应用在通知中心显示!'
				);
			}
			// #endif
		},
		heartCheck: (state) => {
			state.timer = setTimeout(function() {
				clearTimeout(state.timer); //	清除计时器
				// state.timer = null;
				let data = '{"sentUser":-2,"content":"心跳","state":0}';
				uni.sendSocketMessage({
					data: data,
				});
			}, 55000);
		},
		// 握手状态
		changeConnectStatus: (state, payload) => {
			state.socketConnecting = payload
		},
		// websocket连接状态
		changeSocketStatus: (state, payload) => {
			// console.log(payload)
			state.socketConnected = payload
		},
		//修改系统消息设置
		changeSetting: (state, payload) => {
			state.ableGetNewMessageType[payload[0]] = payload[1]
		},
		getPer: (state, payload) => {
			
			globalApiList.getPerStat(payload.obj).then((res) => {
				state.perInfo = res.data
				// state.perInfo.title = util.judgeNull(res.data.userName) ? res.data.userName : "环保达人"
				
				// state.perInfo.map((item) => {
				// 	item.num = item.key !== "deliveryNum" ? res.data[item.key].toFixed(2) :
				// 		res.data[item.key]
				// 	return item
				// });
				// console.log(state.perInfo)
			})
		}
	},
	actions: {
		getPer(context,obj) {
			context.commit('getPer',{obj})
		}
		// connectWebsocket: (state) => {
		// 	store.commit('connectWebsocket')
		// }
		// login
	}
})

export default store
