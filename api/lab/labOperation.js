import request from "@/utils/request";

// 物料库存盘点---------------------
// 获取列表
export function getMaterielList(data){
	return request({
		url:`/api/material/Stock/getList`,
		method: 'post',
		data
	})
}
// 获取详细
export function getSoilRecordDetail(id){
	return request({
		url:`/api/project/SoilSample/${id}`,
		method:'get'
	})
}
// 新增
export function addMateriel(data){
	return request({
		url:`api/material/Apply/stockCheck`,
		method: 'post',
		data
	})
}

// 仪器使用登记---------------------
// 获取列表
export function getApplyEquipmentList (data){
	return request({
		url:`/api/equipment/Apply/getList`,
		method: 'post',
		data
	})
}

export function getEquipmentList(data){
	return request(({
		url:`/api/equipment/Base/getList`,
		method:'post',
		data
	}))
}

// 新增
export function addEquipment(data){
	return request(({
		url:`/api/equipment/Apply`,
		method:'post',
		data
	}))
}
// 修改
export function updateEquipment(id,data){
	return request({
		url:`/api/equipment/Apply/${id}`,
		method:'put',
		data
	})
}


// 获取详细
// export function getSoilRecordDetail(id){
// 	return request({
// 		url:`/api/project/SoilSample/${id}`,
// 		method:'get'
// 	})
// }
// // 新增
// export function addSoilRecord(data){
// 	return request({
// 		url:`/api/project/SoilSample`,
// 		method: 'post',
// 		data
// 	})
// }
// // 修改
// export function updateSoilRecord(id,data){
// 	return request({
// 		url:`/api/project/SoilSample/${id}`,
// 		method:'put',
// 		data
// 	})
// }