import http from '../http.js'

const globalApiList = {
	// 获取移动应用引导
	getAppGuide:()=>{
		return http.request(`delivery/helpcent/getAppGuide`,{})
	},
	// ===========登录=============
	
	// 获取验证码
	getValidateCode:(params)=>{
		return http.request(`delivery/people/getValidateCode`, {
			data: {
				...params
			}
		})
	},
	// 登录
	loginIn:(params)=>{
		return http.request(`UserAppController/login`, {
			// admin{telephone:"18020991313",verifyCode:"123456"}
			data:{
				...params
			},
			method:"POST",
			hideLoading:true
		})
	},	
	// 注销登录
	loginOut:(params)=>{
		return http.request(`delivery/people/logoff`, {
			data: {
				...params
			},
			method:"POST",
			header:{"Content-Type": "application/x-www-form-urlencoded"}
		})
	},
	// 获取用户个人中心统计信息
	getPerStat:(params)=>{
		return http.request(`delivery/people/getStatisticInfo`, {
			data: {
				...params
			}
		})
	},
	// ================
	// 获取热更新字符串
	getUpdateString:()=>{
		return http.request(`delivery/appManage/getHotUpdate`,{})
	},
	// 修改垃圾投递app热更新字符串
	editUpdateString:(params)=>{
		return http.request(`delivery/appManage/updateHot`, {
			data: {
				...params
			},
			method:"POST"
		})
	},

// 获取省市区域树
	getProCityArea:()=>{
		return http.request(`delivery/complaint/getToCountyRegions`, {})
	},
// 获取乡镇(街道)和地区
	getStreet:(params)=>{
		return http.request(`delivery/complaint/getStreetAndArea`, {
			data: {
				...params
			}
		})
	},


}

export default globalApiList
