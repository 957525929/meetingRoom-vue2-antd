import http from '../http.js'

const deliveryApiList = {
	// 居民投递
	addDelivery:(params)=>{
		return http.request(`delivery/people/delivery/addDelivery`, {
			body: JSON.stringify(params),
			method:"POST"
		})
	},
	
	scanDevDeli:(params)=>{
		return http.request(`delivery/people/delivery/requestDeviceDelivery`, {
			data: {
				...params
			},
			timeout:30000,
			header:{"Content-Type": "application/x-www-form-urlencoded"}
		})
	},
	// 投递统计
	getDeliveryDetail:(params)=>{
		return http.request(`delivery/people/delivery/getDeliveryDetail`, {
			data: {
				...params
			}
		})
	},
	getDeliveryList:(params)=>{
		return http.request(`delivery/people/delivery/getDeliverysByParams`, {
			data: {
				...params
			}
		})
	},
	getDeliveryStatData:(params)=>{
		return http.request(`delivery/statistics/StatisticDelivery`, {
			data: {
				...params
			}
		})
	},	
	// 垃圾袋领取
	bindBags:(params)=>{ 
		return http.request(`delivery/garbage/collection/addGarbageUser`, {
			data: {
				...params
			},
			header:{
				'content-type':"application/x-www-form-urlencoded"
			},
			method:"POST"
		})
	},
	getBagList:(params)=>{
		return http.request(`delivery/garbage/collection/getGarbageUser`, {
			data: {
				...params
			}
		})
	},
	// 获取取袋详情
	getBagDetail:(params)=>{
		return http.request(`delivery/garbage/collection/getBagRecordById`, {
			data: {
				...params
			}
		})
	},
	// 回收分类
	getIntroduce:(params)=>{
		return http.request(`delivery/classification/query/getDeliveryIntroduce`, {
			data: {
				...params
			}
		})
	},
	getGoods:(params)=>{
		return http.request(`delivery/classification/query/getDoodsBySecondType`, {
			data: {
				...params
			}
		})
	},
	getVagueList:(params)=>{
		return http.request(`delivery/classification/query/getGarbageListByGoodName`, {
			data: {
				...params
			}
		})
	},
	getGoodDetail:(params)=>{
		return http.request(`delivery/classification/query/getGarbageTypeByGoods`, {
			data: {
				...params
			}
		})
	},
	getHotSearchList:(params)=>{
		return http.request(`delivery/classification/query/getHotspotQuerys`, {
			data: {
				...params
			}
		})
	},
	getSecTypeByFirType:(params)=>{
		return http.request(`delivery/classification/query/getSecondTypeByFirstType`, {
			data: {
				...params
			}
		})
	},
	getSecTypeIdByName:(params)=>{
		return http.request(`delivery/classification/query/getSecondTypeIdByName`, {
			data: {
				...params
			}
		})
	}
}

export default deliveryApiList
