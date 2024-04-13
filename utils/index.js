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
			console.log(val.moduleName)
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