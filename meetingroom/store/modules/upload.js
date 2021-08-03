const upload = {
	state:{
		imageList:[],
		imageShowList:[]
	},
	mutations:{
		addImg:(state,payload)=>{
			// state.imageList = state.imageList.concat(payload);
			state.imageList.push(payload)
			// console.log(payload)
			// state.showImageList.p
		},
		showImg:(state,payload)=>{
			state.imageShowList = state.imageShowList.concat(payload);
		},
		delImg:(state,payload)=>{			
			if(payload=='all'){
				state.imageList=[]
				state.imageShowList=[]
			}else{
				state.imageList.splice(payload, 1)
				state.imageShowList.splice(payload, 1)
			}
		},
		
	},
	actions:{
		
	}
}
export default upload