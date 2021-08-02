const person = {
	state:{
		avatImg:[],
		msgList:[{
			direction:"AI",
			id:0,
			title:"您可以选择以下常见问题直接查看答案或输入关键字进行查询，如“垃圾桶”",
			question:"",
			content:"",
			type:'All',//All,Search,KeyValue
			time:""
		}]
	},
	mutations:{
		changeList:(state,payload)=>{		
			state[payload[0]].push(payload[1])
		},
		clearList:(state,payload)=>{
			state[payload]=[]
		},
	}
}
export default person