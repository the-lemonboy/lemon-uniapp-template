import request from "@/utils/request";

// 质控检查---------------------
// 获取列表
export function getQCCheckBaseList(data){
	return request({
		url:`/api/project/QCCheckBase/getList`,
		method: 'post',
		data
	})
}
// 获取详细
export function getQCCheckBaseDetail(id){
	return request({
		url:`/api/project/QCCheckBase/${id}`,
		method:'get'
	})
}
// 新增
export function addQCCheckBase(data){
	return request({
		url:`/api/project/QCCheckBase`,
		method: 'post',
		data
	})
}
// 修改
export function updateQCCheckBase(id,data){
	return request({
		url:`/api/project/QCCheckBase/${id}`,
		method:'put',
		data
	})
}

// 配置项
export function QcInitListTree(data){
	return request({
		url:`/api/project/QCCheckBase/initListTree`,
		method: 'post',
		data
	})
}