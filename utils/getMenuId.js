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


export function searchId(id){
	let menuList = uni.getStorageSync('permissionList')
	
	for(let val of menuList){
		if(val.modelId === id){
			console.log(val.moduleName) 
			return
		}
	}
}