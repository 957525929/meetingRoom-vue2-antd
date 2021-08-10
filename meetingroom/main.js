import Vue from 'vue'
import App from './App'

// 引入vuex
import store from './store'
Vue.prototype.$store = store
// +路由跳转
import * as router from 'common/router.js'
Vue.prototype.$navTo = router

// 网络请求
// import {request} from 'common/http/http.js'
// Vue.prototype.http = api
import homeApiList from 'common/http/api/home.js'
Vue.prototype.homeApi = homeApiList

import deliveryApiList from 'common/http/api/delivery.js'
Vue.prototype.deliveryApi = deliveryApiList

import personApiList from 'common/http/api/person.js'
Vue.prototype.personApi = personApiList

import globalApiList from 'common/http/api/global.js'
Vue.prototype.globalApi = globalApiList

import meetingApiList from 'common/http/api/meeting.js'
Vue.prototype.globalApi = meetingApiList
// 提示信息
import tool from 'common/util.js'
Vue.prototype.$msg = tool.msg

import home from './pages/home/index.vue'
Vue.component('home',home)

import scan from './pages/scan/commodityinfo.vue'
Vue.component('scan',scan)

import person from './pages/person/index.vue'
Vue.component('person',person)



import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

// IP地址	
Vue.prototype.api_root = '/api/';
//Vue.prototype.api_root = 'http://localhost:8001/index.php/';
//Vue.prototype.api_root = 'https://erp2.xiaowo6.cn/';
/**
 * 验证登录
 */
Vue.prototype.checkIsLogin = function() {
	return uni.getStorageSync('token') != '' && uni.getStorageSync('user_id') != '';
}


//保存用户信息
Vue.prototype.setUserInfo = function(data){
	uni.setStorageSync('userinfo',data);
}
//获取用户信息
Vue.prototype.getUserInfo = function(){
	var userinfo = {};
	userinfo = uni.getStorageSync('userinfo');
	return userinfo;
}

// 模拟继承微信setData的方法
Vue.prototype.setData = function(obj) {
	// console.log('这里是方法');
	let that = this;
	let keys = [];
	let val, data;
	Object.keys(obj).forEach(function(key) {
		keys = key.split('.');
		val = obj[key];
		data = that.$data;
		keys.forEach(function(key2, index) {
			// console.log(key2)
			if (index + 1 == keys.length) {
				that.$set(data, key2, val);
			} else {
				if (!data[key2]) {
					that.$set(data, key2, {});
				}
			}
			data = data[key2];
		})
	});
}

// 显示失败提示框
Vue.prototype.showError = function(msg, callback) {
	uni.showModal({
		title: '友情提示',
		content: msg,
		showCancel: false,
		success: function(res) {
			// callback && (setTimeout(function() {
			//   callback();
			// }, 1500));
			callback && callback();
		}
	});
}

/**
 * 显示成功提示框
 */
Vue.prototype.showSuccess = function(msg, callback) {
	uni.showToast({
		title: msg,
		icon: 'success',
		mask: true,
		duration: 1500,
		success: function() {
			callback && (setTimeout(function() {
				callback();
			}, 1500));
		}
	});
}


// 模拟继承get请求的方法
Vue.prototype._get = function(url, data, success, fail, complete) {
	uni.showNavigationBarLoading();
	let App = this;
	// 构造请求参数
	data = data || {};

	// 构造get请求
	uni.request({
		url: App.api_root + url,
		header: {
			'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
			'token': uni.getStorageSync('token')
		},
		data: data,
		success: function(res) {
			if (res.statusCode !== 200) {
				console.log(res);
				App.showError('网络请求出错');
				return false;
			}
			
			success && success(res.data);
		},
		fail: function(res) {
			App.showError('网络请求出错1', function() {
				fail && fail(res);
			});
		},
		complete: function(res) {
			uni.hideNavigationBarLoading();
			complete && complete(res);
		},
	});
}

// 模拟继承post请求的方法
Vue.prototype._post_form = function(url, data, success, fail, complete) {
	let App = this;
	data = data || {};
	uni.request({
		url: App.api_root + url,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			'token': uni.getStorageSync('token')
		},
		method: 'POST',
		data: data,
		success: function(res) {
			if (res.statusCode !== 200 || typeof res.data !== 'object') {
				App.showError('网络请求出错！');
				return false;
			}
			if (res.data.code === 2) {
				// 登录态失效, 重新登录
				uni.removeStorageSync('token');
				uni.removeStorageSync('userinfo');
				uni.hideLoading();
				uni.reLaunch({
					url: '../login/index'
				});
				return false;
			} else if (res.data.code === 0) {
				App.showError(res.data.msg, function() {
					fail && fail(res);
				});
				return false;
			}
			success && success(res.data);
		},
		fail: function(res) {
			console.log(res);
			App.showError('网络请求出错', function() {
				fail && fail(res);
			});
		},
		complete: function(res) {
			uni.hideNavigationBarLoading();
			// uni.hideLoading();
			complete && complete(res);
		}
	});
}


/* js将时间转化为时间戳
* 格式：2020-09-18
 */
Vue.prototype.toTimeData = function(time){
	var str = time; // 日期字符串
	str = str.replace(/-/g,'/');
	var date = new Date(str).getTime();
	return date
}

/* 打开外部浏览器 */
Vue.prototype.openBrowser = function(url){
	// #ifdef MP-WEIXIN
		return;
	// #endif
	
	// #ifdef APP-PLUS
		plus.runtime.openURL(url);
		return;
	// #endif
	
	// #ifdef H5
		window.location.href = url;
		return;
	// #endif
}

// 参数number为毫秒时间戳，format为需要转换成的日期格式
Vue.prototype.transformTime = function(timestamp) {
	// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
	var datetime = new Date(timestamp * 1000);
	var year = datetime.getFullYear(),
		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
		date = ("0" + datetime.getDate()).slice(-2),
		hour = ("0" + datetime.getHours()).slice(-2),
		minute = ("0" + datetime.getMinutes()).slice(-2),
		second = ("0" + datetime.getSeconds()).slice(-2);
	// 拼接
	// console.log('year====>' + datetime);
	var result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	// 返回
	return result;
}

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()

 



