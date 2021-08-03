
	let throwObj = {
		messageid: "",
		throwType: "", //1为垃圾投递，2为开头口
		deviceName: "",
		deliveryId: "", //throwType1的时候传
		deviceId: "", //throwType2的时候传
		deliveryType: "",
		deliveryResult: "", //1：满桶;2:未安装：3：远程开头口4:正常
		deliveryTime: "",
	}
	let bagObj = {
		messageid: "",
		throwType: "", //1为垃圾袋结果，2为开取代口
		deviceId: "",
		deviceName: "",
		changeId: "",
		changeType: "",
		changeResult: "", //1：无袋;2:积分不足：3:正常
		changeTime: "",
	}
	let sysObj = {
		messageId: "",
		content: "",
		time: "",
		msg: "",
		ifRead: false
	}
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
	}]
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
	}]
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
	}]
	
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
module.exports = {
	throwObj,
	bagObj,
	sysObj,
	bagMsg,
	deliMsg,
	sysMsg,
	receiveObj
}