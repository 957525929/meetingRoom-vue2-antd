import http from '../http.js'

const personApiList = {
	// =============个人信息================
	// 个人信息详情查看
	getPerInfo:(params)=>{
		return http.request(`delivery/people/getUserDetail`, {
			data: {
				...params
			}
		})
	},
	// 个人信息修改
	updatePerInfo:(params)=>{
		return http.request(`delivery/people/updateUser`, {
			data: {
				...params
			},
			hideLoading:true,
			method:"POST"
		})
	},
	// 上传用户头像
	uploadAvat:(path,params)=>{
		return http.uploadReq(`delivery/people/uploadUserImg`, {
			filePath: path,
			data: {
				...params
			}
		})
	},
	// 获取用户当前头像
	getAvat:(params)=>{
		return http.request(`delivery/people/getUserNowImg`, {
			data: {
				...params
			}
		})
	},

	// 获取用户的人脸
	getPerFace:(params)=>{
		return http.request(`delivery/people/getUserFaceImg`, {
			data: {
				...params
			}
		})
	},
	// 用户录入人脸
	addPerFace:(params)=>{
		return http.request(`delivery/people/updateUserFaceData`, {
			data: {
				...params
			},
			method:"POST",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
		})
	},
	// =============账单管理=================
	// 根据账单时间、兑换类型、收入、支出获取账单列表
	getBillList:(params)=>{
		return http.request(`delivery/query/getOrderRecords`, {
			data: {
				...params
			}
		})
	},
	// 获取兑换订单详情
	getBillDetial:(params)=>{
		return http.request(`delivery/query/getOrderDetail`, {
			data: {
				...params
			}
		})
	},
	// 按月统计账单
	getMonBillStatData:(params)=>{
		return http.request(`delivery/statistics/getOrderStatisticByMonth`, {
			data: {
				...params
			}
		})
	},	
	// 按年统计账单
	getYearBillStatData:(params)=>{
		return http.request(`delivery/statistics/getOrderStatisticByYear`, {
			data: {
				...params
			}
		})
	},
	// ==========成员管理=========
    getMemList:(params)=>{
		return http.request(`delivery/people/getMembersByUserId`, {
			data: {
				...params
			}
		})
	},
	// 根据成员id获取成员信息
	getMemInfo:(params)=>{
		return http.request(`delivery/people/getMemberByMemberId`, {
			data: {
				...params
			}
		})
	},
	getMemFace:(params)=>{
		return http.request(`delivery/people/getMemberFaceImg`, {
			data: {
				...params
			}
		})
	},
	// 绑定成员
	bindMem:(params)=>{
		return http.request(`delivery/people/addMember`, {
			data: {
				...params
			},
			method:"POST",
			dataType:"",
			hideLoading:true,
		})
	},
	// 判断成员人脸图片是否能入库
	judgeMemFace:(params)=>{
		return http.request(`delivery/people/judgeFamilyMemberInFaceSet`, {
			data: {
				...params
			},
			method:"POST",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
		})
	},
	// 成员人脸图片入库
	uploadMemFace:(params)=>{
		return http.request(`delivery/people/updateMemberFaceData`, {
			data: {
				...params
			},
			method:"POST",
			header:{"Content-Type": "application/x-www-form-urlencoded"}
		})
	},
	// 删除成员信息
	delMemInfo:(params)=>{
		return http.request(`delivery/people/delMember`, {
			data: {
				...params
			},
			method:"POST",
			header:{"Content-Type": "application/x-www-form-urlencoded"}
		})
	},
	// 修改成员信息
	updateMem:(params)=>{
		return http.request(`delivery/people/updateMember`, {
			data:{
				...params
			},
			method:"POST",
			dataType:"",
			hideLoading:true,
			// header:{"Content-Type": "application/x-www-form-urlencoded"}
		})
	},
	// ============帮助中心=============
	// 根据问题查询答案
	getAByQ:(params)=>{
		return http.request(`delivery/helpcent/getAnswerByQuestion`, {
			data: {
				...params
			}
		})
	},
	// 获取常见问题
	getCommonList:(params)=>{
		return http.request(`delivery/helpcent/getCommonQuestions`, {
			data: {
				...params
			}
		})
	},
	// 根据关键字模糊查询问题
	getQByKey:(params)=>{
		return http.request(`delivery/helpcent/getQuestionByKeyword`, {
			data: {
				...params
			}
		})
	},
	// 根据问题类型获取问题列表	
	getQList:(params)=>{
		return http.request(`delivery/helpcent/getQuestionsByType`, {
			data: {
				...params
			}
		})
	},
	// ===========关于我们============
	// 获取产品说明
	getAppIntro:(params)=>{
		return http.request(`delivery/helpcent/getAppIntroduce`,{})
	},
	// 隐私协议
	getPrivacy:(params)=>{
		return http.request(`delivery/helpcent/getAppPrivacyAgreement`,{})
	},	
	// 获取投递App联系电话（新）
	getContact:(params)=>{
		return http.request(`delivery/helpcent/getDeliveryAppPhone`, {})
	},
	// 联系地址（新）
	getAddress:(params)=>{
		return http.request(`delivery/helpcent/getDeliveryAppAddress`, {})
	},
	// 合作伙伴链接
	getPartner:(params)=>{
		return http.request(`delivery/helpcent/getDeliveryAppPartner`, {})
	},
	// 新浪微博（新）
	getSinaWeibo:(params)=>{
		return http.request(`delivery/helpcent/getDeliveryAppSina`, {})
	},
	// 官方微信（新）	
	getWechart:(params)=>{
		return http.request(`delivery/helpcent/getDeliveryAppWechat`, {})
	}
}

export default personApiList
