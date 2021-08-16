import {
	judgeDataNull,
	judgeNull,
	msg
} from '../util.js'
import store from '@/store'
const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};


// 地址
// 生产环境（production）：http://39.101.213.6:13018/api/ || https://gatc.wkbiot.com/api/
// 开发环境（development）：http://39.100.85.99:13018/api/ || http://172.16.0.125:13018/api/||"http://fzzt.fzjhdn.com:13018/api/"
// const socketUrl = process.env.NODE_ENV === 'development'?"ws://172.16.0.125:13018/websocket/":"ws://fzzt.fzjhdn.com:13018/websocket/"
const api = process.env.NODE_ENV === 'development' ? "http://172.16.2.135:14054/api/meetingroomapp/" :
	"http://172.16.2.135:14054/api/meetingroomapp/"
const socketUrl = process.env.NODE_ENV === 'development' ? "ws://172.16.2.135:14054/websocket/" :
	"ws://172.16.2.135:14054/websocket/"
 const imgsUrl = "http://172.16.2.135:14054/"
const self = this
const request = (url, param) => {
	// if(param){
	const baseUrl = param.api || api,
		method = param.method || "GET",
		data = param.data || {},
		dataType = param.dataType || "json",
		hideLoading = param.hideLoading || false,
		timeout = param.timeout || 20000;

	let headers = param.header || {
		'content-type': 'application/json;charset=UTF-8',
	}
	// 获取token
	const req_token = uni.getStorageSync('token');
	console.log("获取token",req_token)
	headers = judgeNull(req_token) ? {
		
		...headers,
		'token': req_token
	} : {
		...headers
	}

	//等待提示
	if (hideLoading || headers["content-type"] === "application/x-www-form-urlencoded") {
		uni.showLoading({
			title: '加载中...'
		});
	};
	// console.log(url, param, headers)
	let promise = new Promise((resolve, reject) => {
		//网络请求
		uni.request({
			url: baseUrl + url,
			method: method,
			header: headers,
			data: data,
			timeout: timeout,
			sslVerify: false,
			dataType: dataType,
			success: res => {
				// console.log(res)
				if (res.statusCode && res.statusCode !== 200) {
					if (res.statusCode === 401) {
						store.commit("loginOut", "timeout")
					}
					msg(res.data.message || codeMessage[res.statusCode])
					return;
				} else if (res.statusCode && res.statusCode === 200) {
					if (res.data.code && res.data.code !== 200) {
						if (res.data.code === 401) {
							store.commit("loginOut", "timeout")
						}
						msg(res.data.message || codeMessage[res.data.code])
						reject(res.data)
						return;
					} else if (res.data.code && res.data.code === 200) {
						if (!judgeDataNull(res.data.data) && method === "GET") {
							msg("返回数据不合法或出现空值")
							reject(res.data)
							// resolve(res.data)
						}
					} else if (res.data && !judgeDataNull(res.data)) {
						resolve(res.data)
					}
					resolve(res.data)
				}
			},
			fail: (e) => {
				msg('抱歉，网络错误，请求失败')
				reject(e)
			},
			complete: () => {
				uni.stopPullDownRefresh();
				uni.hideLoading();
			}
		})
	})
	return promise
}

const uploadReq = (url, param) => {
	const baseUrl = param.api || api,
		method = param.method || "POST",
		data = param.data || {},
		hideLoading = param.hideLoading || true,
		filePath = param.filePath || "",
		file = Object.assign([],param.files) || [];
	let headers = param.header || {
		'Content-type': 'multipart/form-data',
	}
	// 获取token
	const req_token = uni.getStorageSync('req_token');
	headers = judgeNull(req_token) ? {
		...headers,
		'token': req_token
	} : {
		...headers
	}
	//等待提示
	if (hideLoading) {
		uni.showLoading({
			title: '加载中...'
		});
	};

	let promise = new Promise((resolve, reject) => {
		//网络请求
		// ****使用 files 时，filePath 和 name 不生效。***
		// console.log(file)
		uni.uploadFile({
			url: baseUrl + url,
			method: method,
			header: headers,
			timeout: 15000,
			filePath: filePath,
			name: "file",
			files: file,
			formData: data,
			success: (res) => {
				console.log(res)
				let temp = JSON.parse(res.data)
				if (res.statusCode && res.statusCode != 200) {
					if (res.statusCode === 401) {
						store.commit("loginOut", "timeout")
					}
					msg(temp.message || codeMessage[res.statusCode])
					return;
				} else if (res.statusCode && res.statusCode === 200) {
					if (temp.code && temp.code !== 200) {
						if (temp.code === 401) {
							store.commit("loginOut", "timeout")
						}
						msg(temp.message || codeMessage[temp.code])
						reject(temp)
						return;
					} else if (temp.code && temp.code === 200) {
						if (!judgeDataNull(temp.data) || !judgeDataNull(temp)) {
							console.log("返回值为空")
							// reject(temp)
							// return;
						}
					}
					resolve(temp)
				}
			},
			fail(e) {
				console.log(e)
				msg('抱歉，请求失败')
				reject(e)
			},
			complete: (res) => {
				console.log(res)
				uni.stopPullDownRefresh();
				uni.hideLoading();
			}
		});
	})
	return promise

}

module.exports = {
	api,
	imgsUrl,
	socketUrl,
	request,
	uploadReq
}
