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
// 获取列表分页
export function getMaterielListPage(data){
	return request({
		url:`/api/material/Stock/getListPage`,
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
		url:`/api/material/Apply/stockCheck`,
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
// 获取列表分页
export function getApplyEquipmentListPage (data){
	return request({
		url:`/api/equipment/Apply/getListPage`,
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

// 获取详细
export function getEquipmentDetail(id){
	return request(({
		url:`/api/equipment/Apply/${id}`,
		method:'get'
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
// 删除
export function delEquipment(id){
	return request({
		url:`/api/equipment/Apply/${id}`,
		method:'delete'
	})
}

// 使用详细
export function getEquipmentUseDetail(data){
	return request(({
		url:`/api/equipment/ApplyDetail/getList`,
		method:'post',
		data
	}))
}

// 设备详细
export function getEquipmentBaseDetail(id){
	return request({
		url:`/api/equipment/Base/detail/${id}`,
		method:'get'
	})
}
// 打开门禁
export function openDoor(ip,usename,password){
	return request({
		url:`/api/device/DeviceOperate/openGate?ip=${ip}&userName=${usename}&password=${password}`,
		method: 'post'
	})
}

export function getDoorInfoList(data){
	return request({
		url:`/api/device/GateInfo/getList`,
		method:'post',
		data
	})
}