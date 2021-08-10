
const reclassify = {
	// namespaced: true,
	state:{
		comData:{
			address:'',
			city:"",
			// street:"",
			area:"全部街道",
			description: '',
			// deviceId: "1ea8a84507b377085b91333fd7e9311",
			typeId:"",
			userId:""
		},
		// 惯用语
		idiomsType:'请选择',
		// 商城
		verifyNum:0,
		// 保洁区域
		chooseIndex:[12,0,0],
		countyId:350104,
		chooseConIndex:[0,0]
	},
	getters: {
		verifyNum(state){
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
			return verifyNum
		}
	},
	
	mutations:{
		// 更改单个值
		changeVal:(state,payload)=>{
			state[payload[0]] = payload[1]
		},
		changeSecClass:(state,payload)=>{
			// console.log(payload[1].throwGuide)
			// console.log(payload[1].secondlevelResultList)
			state.trashTypeDetail.forEach(item=>{
				item.content.forEach(itemm=>{										 
					if(itemm.title==payload[0]){
						itemm.throwGuide = payload[1].throwGuide
						itemm.secContent = payload[1].secondlevelResultList							
					}
				})
			})
		},
		addComIdioms:(state,payload)=>{
			state.comData['description'] += payload
		},
		// 问题投诉更改值
		changeComData:(state,payload)=>{
			if(payload=='all'){
				let aa = {
					address:'',
					city:"",
					area:"请选择",
					description: '',
					deviceId: "",//1eb08afa9f7a4109364076fbdb54e3e
					// type:"请选择",
					userId:""
				}
				state.comData = aa
			}else{
				state.comData[payload[0]] = payload[1]			
			}

		}
	},
	actions:{
		
	}
}
export default reclassify