// vue3的require
export  const myRequire = (url) => {
    return new URL(`${url}`, import.meta.url).href
}

// 获取当前路由
export function getRouteId(fn){
	const routes = getCurrentPages()
	
	let curParam = routes[routes.length - 1].options.id
	return curParam
}

// 获取menuid
export function getMenuId(moduleName){
	let menuList = []
	if(menuList.length === 0){
		menuList = uni.getStorageSync('permissionList')
	}
	for(let val of menuList){
		if(val.moduleName === moduleName){
			return val.modelId
		}
	}
	return
}

// 生成uuid
export function generateUUID() {
  const timestamp = new Date().getTime().toString(16); // 当前时间戳的十六进制表示
  const random = Math.random().toString(16).slice(2, 10); // 8 位随机数的十六进制表示
  return timestamp + '-' + random;
}
export function searchId(id){
	let menuList = uni.getStorageSync('permissionList')
	for(let val of menuList){
		if(val.modelId === id){
			return 
		}
	}
}


// 获取当前时间
export function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // 补零操作，确保月份、日期、小时、分钟为两位数
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const currentTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return currentTime;
}
// 深拷贝
export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = deepCopy(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}


// 时间戳转时间
export function timestampToTime(timestamp) {
    const date = new Date(timestamp); // 使用时间戳创建 Date 对象
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份，注意月份从 0 开始，所以要加 1
    const day = date.getDate(); // 获取日期
    const hours = date.getHours(); // 获取小时
    const minutes = date.getMinutes(); // 获取分钟
    const seconds = date.getSeconds(); // 获取秒数
    
    // 辅助函数，用于在数字小于 10 时在前面添加 0
    const addZero = (num) => (num < 10 ? '0' + num : num);
    
    // 构造时间字符串
    const timeString = `${year}-${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
    
    return timeString;
}

/**
 * @param {新版本号} newVersion
 * @param {旧版本号} oldVersion
 */
export function compareVersion(newVersion, oldVersion) {
    const arr1 = v1.split('.').map(Number);
    const arr2 = v2.split('.').map(Number);
    
    const maxLength = Math.max(arr1.length, arr2.length);
    
    for (let i = 0; i < maxLength; i++) {
        const num1 = arr1[i] !== undefined ? arr1[i] : 0;
        const num2 = arr2[i] !== undefined ? arr2[i] : 0;
        
        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }
    
    return 0;
}