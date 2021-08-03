// import util from './util.js';
const publicUrl = "/pages/component"
// 路由封装
var router = {
	guide: '/pages/index/guide',
	noNetwork: '/pages/public/noNetwork',
	noResult: '/pages/public/noResult',
	openUrl: '/pages/public/openUrl',
	// 首页
	recyclingGuide: '/pages/component/home/recyclingGuide/recyclingGuide',
	recClassify: '/pages/component/home/recClassify/recClassify',
	classDetail: '/pages/component/home/recClassify/classDetail',
	scanGiftCode: '/pages/component/home/scanGiftCode/scanGiftCode',

	complaint: '/pages/component/home/complaint/complaint',
	comDetail: '/pages/component/home/complaint/comDetail',
	Idioms: '/pages/component/home/complaint/Idioms',
	comList: '/pages/component/home/complaint/comList',

	scanThrow: '/pages/component/home/scanThrow/scanThrow',

	scan: '/pages/component/bindBag/scan',
	bindList: '/pages/component/bindBag/bindList',
	submitBags: '/pages/component/bindBag/submitBags',

	map: '/pages/component/home/recList/map',
	recList: '/pages/component/home/recList/recList',
	recBinDetail: '/pages/component/home/recList/recBinDetail',
	// 积分商城
	mall: '/pages/component/home/mall/mall',
	shopmall: '/pages/component/home/shopmall/shopmall',
	goodDetail:'/pages/component/home/shopmall/goodDetail',
	exList: '/pages/component/home/shopmall/exList',
	exQrcode: '/pages/component/home/shopmall/exQrcode',
	exDetail: '/pages/component/home/shopmall/exDetail',
	// 消息通知
	other: '/pages/component/notice/other',
	notDetail: '/pages/component/notice/notDetail',
	// 个人中心
	myInfo: '/pages/component/person/myInfo/myInfo',
	infoDetail: '/pages/component/person/myInfo/infoDetail',
	myBill: '/pages/component/person/myBill/myBill',
	billDetail: '/pages/component/person/myBill/billDetail',
	billStatistics:publicUrl+ '/person/myBill/billStatistics',

	memberBind: publicUrl+ '/person/memberBind/memberBind',
	memDetail: publicUrl+ '/person/memberBind/memDetail',
	help:publicUrl+  '/person/help/help',
	helpType: publicUrl+ '/person/help/helpType',
	inlineService: publicUrl+ '/person/help/inlineService',
	feedback: publicUrl+ '/person/feedback',
	feedBackList: publicUrl+ '/person/feedback/feedBackList',
	about:publicUrl+  '/person/about/about',
	aboutDetail:publicUrl+  '/person/about/aboutDetail',
	contact:publicUrl+  '/person/about/contact',
	sysSetting: publicUrl+ '/person/sysSetting',
	// ,backpage, backtype
};

function goTo(url, data) {
	const urlIs = router[url] + (url.indexOf('?') < 0 ? '?' : '&') + param(data)
	uni.navigateTo({
		url: urlIs
	})
}

function param(data) {
	let url = ''
	// encodeURIComponent(
	for (var j in data) {
		let value = data[j] !== undefined ? data[j] : ''
		url += '&' + j + '=' + JSON.stringify(value)
	}
	return url ? url.substring(1) : ''
}

module.exports = {
	goTo
}
