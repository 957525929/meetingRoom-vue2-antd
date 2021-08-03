var main_es$1 = Object.freeze({
	earthRadius: earthRadius,
	radiansToLength: radiansToLength,
	isNumber: isNumber,
	factors: factors,
});
var factors = {
	meters: earthRadius,
	metres: earthRadius,
	millimeters: earthRadius * 1000,
	millimetres: earthRadius * 1000,
	centimeters: earthRadius * 100,
	centimetres: earthRadius * 100,
	kilometers: earthRadius / 1000,
	kilometres: earthRadius / 1000,
	miles: earthRadius / 1609.344,
	nauticalmiles: earthRadius / 1852,
	inches: earthRadius * 39.370,
	yards: earthRadius / 1.0936,
	feet: earthRadius * 3.28084,
	radians: 1,
	degrees: earthRadius / 111325,
};
var earthRadius = 6371008.8;
// 处理消息通知
const handleDevMsg = (newMessage, obj) => {
	const payload = newMessage.content
	let msgObj = new Object();
	obj.forEach(i => {
		if (i.matchValue === "messageId") {
			i.value = newMessage.messageId
		} else if (i.matchValue === "deviceId") {
			let str = payload[i.matchValue]
			i.value = str.substring(15, 18) +
				str.substring(9, 13) +
				str.substring(0, 8) +
				str.substring(19, 23) +
				str.substring(24);
		} else {
			i.value = payload[i.matchValue]
		}
	})
	obj.forEach(j => {
		msgObj[j.key] = j.value
		if (j.content) {
			let temp = j.content[j.value]
			Object.assign(msgObj, temp)
		}
	})
	return msgObj
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatStampTime(timestamp, timeS = ':', flag = true) {
	let str = '';
	let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

	let Y = date.getFullYear();
	let M = autoChange(date.getMonth() + 1); //计算机的月份是从0开始滴，需要+1

	let D = autoChange(date.getDate());
	str = Y + '-' + M + '-' + D;

	if (flag) {
		let h = autoChange(date.getHours()) + timeS;
		let m = autoChange(date.getMinutes()) + timeS;
		let s = autoChange(date.getSeconds());
		let timeStr = h + m + s;
		str += " ";
		str += timeStr;
	}
	return str;
}

function autoChange(num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return num;
	}
}

function isIDCard(num) {
	num = num.toUpperCase();
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		return false;
	}
	//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
	//下面分别分析出生日期和校验位 
	var len, re;
	len = num.length;
	if (len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re)
		//检查生日日期是否正确 
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		var bCorrectDay;
		bCorrectDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
			(
				dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bCorrectDay) {
			return false;
		} else {
			//将15位身份证转成18位 
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return true;
		}
	}
	if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re)
		//检查生日日期是否正确 
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bCorrectDay;
		bCorrectDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
			(dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bCorrectDay) {
			return false;
		} else {
			//检验18位身份证的校验码是否正确。 
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1)) {
				return false;
			}
			return true;
		}
	}
	return false;
}

// 返回相差为xx天xx小时xx分钟
function compareTime(faultDate, completeTime) {
	let stime = Date.parse(new Date(faultDate));
	let etime = Date.parse(new Date(completeTime));
	// 两个时间戳相差的毫秒数
	let usedTime = etime - stime;
	// 计算相差的天数  
	let days = Math.floor(usedTime / (24 * 3600 * 1000));
	// 计算天数后剩余的毫秒数
	let leave1 = usedTime % (24 * 3600 * 1000);
	// 计算出小时数  
	let hours = Math.floor(leave1 / (3600 * 1000));
	// 计算小时数后剩余的毫秒数
	let leave2 = leave1 % (3600 * 1000);
	// 计算相差分钟数
	let minutes = Math.floor(leave2 / (60 * 1000));
	// let time = days + "天" + hours + "时" + minutes + "分";
	return days;
	// return time;
}
// 判断对象是否相等
function isEqual(objA, objB) {
	//相等
	if (objA === objB) return objA !== 0 || 1 / objA === 1 / objB;
	//空判断
	if (objA == null || objB == null) return objA === objB;
	//类型判断
	if (Object.prototype.toString.call(objA) !== Object.prototype.toString.call(objB)) return false;

	switch (Object.prototype.toString.call(objA)) {
		case '[object RegExp]':
		case '[object String]':
			//字符串转换比较
			return '‘‘ ' + objA === '‘‘' + objB;
		case '[object Number]':
			//数字转换比较,判断是否为NaN
			if (+objA !== +objA) {
				return +objB !== +objB;
			}

			return +objA === 0 ? 1 / +objA === 1 / objB : +objA === +objB;
		case '[object Date]':
		case '[object Boolean]':
			return +objA === +objB;
		case '[object Array]':
			//判断数组
			for (let i = 0; i < objA.length; i++) {
				if (!this.isEqual(objA[i], objB[i])) return false;
			}
			return true;
		case '[object Object]':
			//判断对象
			let keys = Object.keys(objA);
			for (let i = 0; i < keys.length; i++) {
				if (!this.isEqual(objA[keys[i]], objB[keys[i]])) return false;
			}

			keys = Object.keys(objB);
			for (let i = 0; i < keys.length; i++) {
				if (!this.isEqual(objA[keys[i]], objB[keys[i]])) return false;
			}

			return true;
		default:
			return false;
	}
}
// 距离计算
function distance(from, to, options) {
	// console.log(from)
	// console.log(to)
	// Optional parameters
	options = options || {};
	if (!isObject(options)) throw new Error('options is invalid');
	var units = options.units;
	var coordinates1 = getCoord(from);
	var coordinates2 = getCoord(to);
	var dLat = degreesToRadians((coordinates2[1] - coordinates1[1]));
	var dLon = degreesToRadians((coordinates2[0] - coordinates1[0]));
	var lat1 = degreesToRadians(coordinates1[1]);
	var lat2 = degreesToRadians(coordinates2[1]);
	// console.log(dLat)
	// console.log(lat1)
	var a = Math.pow(Math.sin(dLat / 2), 2) +
		Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
	// console.log(a)
	// var ssss = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	// console.log(radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units))
	return radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units);
}

function isObject(input) {
	return (!!input) && (input.constructor === Object);
}

function getCoord(obj) {
	if (!obj) throw new Error('obj is required');
	var coordinates = getCoords(obj);
	if (coordinates.length > 1 && isNumber(coordinates[0]) && isNumber(coordinates[1])) {
		return coordinates;
	} else {
		throw new Error('Coordinate is not a valid Point');
	}
}

function getCoords(obj) {
	if (!obj) throw new Error('obj is required');
	var coordinates;

	// Array of numbers
	if (obj.length) {
		coordinates = obj;

		// Geometry Object
	} else if (obj.coordinates) {
		coordinates = obj.coordinates;

		// Feature
	} else if (obj.geometry && obj.geometry.coordinates) {
		coordinates = obj.geometry.coordinates;
	}
	// Checks if coordinates contains a number
	if (coordinates) {
		containsNumber(coordinates);
		return coordinates;
	}
	throw new Error('No valid coordinates');
}

function degreesToRadians(degrees) {
	if (degrees === null || degrees === undefined) throw new Error('degrees is required');

	var radians = degrees % 360;
	return radians * Math.PI / 180;
}

function containsNumber(coordinates) {
	if (coordinates.length > 1 && isNumber(coordinates[0]) && isNumber(coordinates[1])) {
		return true;
	}

	if (Array.isArray(coordinates[0]) && coordinates[0].length) {
		return containsNumber(coordinates[0]);
	}
	throw new Error('coordinates must only contain numbers');
}

function radiansToLength(radians, units) {
	// console.log(radians);
	// console.log(units);
	if (radians === undefined || radians === null) throw new Error('radians is required');

	if (units && typeof units !== 'string') throw new Error('units must be a string');
	// 默认是米
	factor = 6371008.8;
	if (!factor) throw new Error(units + ' units is invalid');
	return radians * factor;
}

function isNumber(num) {
	return !isNaN(num) && num !== null && !Array.isArray(num);
}

function imgToBase64(file, type) {
	let that = this;
	let Orientation;
	let img = new Image();
	img.src = file;
	img.onload = function() {
		//压缩图片函数-输出base64
		let data = that.compress(img, Orientation);
	}
}

function compress(img, Orientation) {
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext('2d');
	//瓦片canvas
	let tCanvas = document.createElement("canvas");
	let tctx = tCanvas.getContext("2d");
	let initSize = img.src.length;
	let width = img.width;
	let height = img.height;
	//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
	let ratio;
	if ((ratio = width * height / 4000000) > 1) {
		console.log("大于400万像素")
		ratio = Math.sqrt(ratio);
		width /= ratio;
		height /= ratio;
	} else {
		ratio = 1;
	}
	canvas.width = width;
	canvas.height = height;
	//        铺底色
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//如果图片像素大于100万则使用瓦片绘制
	let count;
	if ((count = width * height / 1000000) > 1) {
		console.log("超过100W像素");
		count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
		//            计算每块瓦片的宽和高
		let nw = ~~(width / count);
		let nh = ~~(height / count);
		tCanvas.width = nw;
		tCanvas.height = nh;
		for (let i = 0; i < count; i++) {
			for (let j = 0; j < count; j++) {
				tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
				ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
			}
		}
	} else {
		ctx.drawImage(img, 0, 0, width, height);
	}
	//修复ios上传图片的时候 被旋转的问题
	if (Orientation != "" && Orientation != 1) {
		switch (Orientation) {
			case 6: //需要顺时针（向左）90度旋转
				this.rotateImg(img, 'left', canvas);
				break;
			case 8: //需要逆时针（向右）90度旋转
				this.rotateImg(img, 'right', canvas);
				break;
			case 3: //需要180度旋转
				this.rotateImg(img, 'right', canvas); //转两次
				this.rotateImg(img, 'right', canvas);
				break;
		}
	}
	//进行最小压缩
	let ndata = canvas.toDataURL('image/jpeg', 0.1);
	console.log('压缩前：' + initSize);
	console.log('压缩后：' + ndata.length);
	console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
	tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
	return ndata;
}

function base64ToPath(base64) {
	return new Promise(function(resolve, reject) {
		console.log(base64)
		if (typeof window === 'object' && 'document' in window) {
			base64 = base64.split(',')
			var type = base64[0].match(/:(.*?);/)[1]
			var str = atob(base64[1])
			var n = str.length
			var array = new Uint8Array(n)
			while (n--) {
				array[n] = str.charCodeAt(n)
			}
			console.log(array)
			return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], {
				type: type
			})))
		}
		var extName = base64.match(/data\:\S+\/(\S+);/)
		console.log(extName)
		if (extName) {
			extName = extName[1]
		} else {
			reject(new Error('base64 error'))
		}
		var fileName = Date.now() + '.' + extName
		if (typeof plus === 'object') {
			var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
			bitmap.loadBase64Data(base64, function() {
				var filePath = '_doc/uniapp_temp/' + fileName
				bitmap.save(filePath, {}, function() {
					bitmap.clear()
					resolve(filePath)
				}, function(error) {
					bitmap.clear()
					reject(error)
				})
			}, function(error) {
				bitmap.clear()
				reject(error)
			})
			return
		}
		if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
			var filePath = wx.env.USER_DATA_PATH + '/' + fileName
			wx.getFileSystemManager().writeFile({
				filePath: filePath,
				data: base64,
				// .replace(/^data:\S+\/\S+;base64,/, ''),
				encoding: 'base64',
				success: function() {
					resolve(filePath)
				},
				fail: function(error) {
					reject(error)
				}
			})
			return
		}
		reject(new Error('not support'))
	})
	// 转换为带单位的内存大小

}
function dataURLtoFile(dataurl, filename) { 
    if(!filename){
        filename = new Date().getTime()
    }
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename + '.' + mime.split('/')[1], { type: mime });
}
// 年月YYYY-MM的拆分与合并
function getDate() {
	const date = new Date();
	let yearNum = date.getFullYear()
	let month = date.getMonth() + 1;
	month = month> 9 ? month: "0" + month;
	return [yearNum + '-' +month,yearNum,month]
}

function splitDate(val){
	val.match(/^(\d{4})-(\d{2})$/)
	return val.match(/^(\d{4})-(\d{2})$/)
}

//统一提示组件方便全局修改
const msg = (title, duration = 2000, mask = false, icon = 'none') => {
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
// 判空
const judgeDataNull = (data) => {
  return Boolean(data) === false ? false : true;
};

//  值判空
const judgeNull = (data) => {
  if (!judgeDataNull(data)) {
    console.log('返回空');
    return false;
  } else {
    if (typeof data === 'object') {
      let arr = Object.keys(data);
      if (arr.length === 0) {
        console.log('返回对象值为空或未定义');
        return false;
      }
    } else if (typeof data === 'string') {
		// .replace(/(^s*)|(s*$)/g, '')
      if (data.length === 0) {
        console.log('返回字符串值为空');
        return false;
      }
    }
    return true;
  }
};
module.exports = {
	handleDevMsg,
	compareTime,
	isIDCard,
	formatLocation,
	formatTime,
	formatStampTime,
	isEqual,
	distance,
	base64ToPath,
	getDate,
	splitDate,
	msg,
	judgeDataNull,
	judgeNull
}
