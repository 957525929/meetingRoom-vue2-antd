import http from '../http.js'

const homeApiList = {
	// 问题投诉typeId（1：投递 2：设备 3：保洁）getConTypeList
	getComTypeList: (params) => {
		return http.request(`delivery/complaint/getAllSecondLevelIdioms`, {})
	},
	getComList: (params) => {
		return http.request(`delivery/complaint/browing/getComplants`, {
			data: {
				...params
			}
		})
	},
	getComDetail: (params) => {
		return http.request(`delivery/complaint/browing/getComplantById`, {
			data: {
				...params
			}
		})
	},
	getComPics: (params) => {
		return http.request(`delivery/complaint/browing/getComplantImgs`, {
			data: {
				...params
			}
		})
	},
	getComIdioms: (params) => {
		return http.request(`delivery/complaint/getComplaintIdioms`, {
			data: {
				...params
			}
		})
	},
	submitCom: (params) => {
		return http.request(`delivery/complaint/addComplant`, {
			data: {
				...params
			},
			method: "POST"
		})
	},
	uploadPics: (path, params) => {
		return http.uploadReq(`delivery/complaint/uploadComplaintImg`, {
			files: path,
			filePath: path,
			data: {
				...params
			}
		})
	},
	// 设备
	getDevList: (params) => {
		return http.request(`delivery/browsing/search/getDeviceNearby`, {
			data: {
				...params
			}
		})
	},
	getDevDetail: (params) => {
		return http.request(`delivery/browsing/search/getDeviceByid`, {
			data: {
				...params
			}
		})
	},
	// 广告
	getOpenAd: () => {
		return http.request(`delivery/advertising/getAdvertise`, {})
	},
	getRotateAd: () => {
		return http.request(`delivery/advertising/getMoByIdDeliver`, {})
	},
	// 	获取回收指南
	getRecycleGuide: (params) => {
		return http.request(`delivery/classification/query/getRecyclGuide`, {
			data: {
				...params
			},
			hideLoading: true
		})
	},
	// 积分商城
	// 添加订单
	addOrder: (params) => {
		return http.request(`delivery/IntegralShop/addOrder`, {
			data: {
				...params
			}
		})
	},

	// 获取所有商品
	getGoodList: () => {
		return http.request(`delivery/IntegralShop/getAllGifts`, {})
	},

	// 根据礼包名称查询礼包
	queryGiftByName: (params) => {
		return http.request(`delivery/IntegralShop/getGiftBagByName`, {
			data: {
				...params
			}
		})
	},

	// 获取所有礼包
	getGiftList: () => {
		return http.request(`delivery/IntegralShop/getGiftBags`, {})
	},

	// 根据礼品名称查询礼品
	queryGoodByName: (params) => {
		return http.request(`delivery/IntegralShop/getGiftByName`, {
			data: {
				...params
			}
		})
	},

	// 获取礼包详细
	getDetail: (params) => {
		return http.request(`delivery/IntegralShop/getGiftsByGiftId`, {
			data: {
				...params
			}
		})
	},

	// 根据订单id查询订单详细信息
	getOrderDetail: (params) => {
		return http.request(`delivery/IntegralShop/getOrderById`, {
			data: {
				...params
			}
		})
	},

	// 查询订单信息
	getOrderInfo: (params) => {
		return http.request(`delivery/IntegralShop/getOrderByStatus`, {
			data: {
				...params
			}
		})
	},

	// 获取用户积分
	getIntegral: (params) => {
		return http.request(`delivery/IntegralShop/getPoint`, {
			data: {
				...params
			}
		})
	},
}

export default homeApiList
