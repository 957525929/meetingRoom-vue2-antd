import http from '../http.js'
const meetingApiList = {
	//获取会议室
	getMeetingRoom:(params)=> {
		return http.request(`ReservationController/getMeetingRoomByCondition`, {
			data: {
				...params
			}
		})
	},
	//会议室预约
	meetingAppointment:(params)=>{
		return http.request(`ReservationController/addReservation`, {
			data:{
				...params
			},
			method:"POST",
			hideLoading:true
		})
	},
	//获取会议室预约列表
	getAppointmentList:(params)=>{
		return http.request(`ReservationController/getReservationList`, {
			data:{
				...params
			},
			method:"POST",
			hideLoading:true
		})
	},
	//获取校区
	getPlace:()=>{
		return http.request(`ReservationController/getPlace`,{})
	},
	//获取午别
	getPeriod:()=>{
		return http.request(`ReservationController/getPeriod`,{})
	},
	//撤销预约
	cancelReservation:(params)=>{
		return http.request(`ReservationController/cancelReservation`, {
			data:{
				...params
			},
			method:"POST",
			hideLoading:true
		})
		
	},
	//获取会务安排
	getArrangementList:()=>{
		return http.request(`ArrangementController/getArrangementList`, {})
	}
}
export default meetingApiList