import request from "@/utils/request";

// 送样---------------------
// 获取列表
export function getSendSampleList(data){
	return request({
		url:`/api/sample/Transport/getList`,
		method: 'post',
		data
	})
}
// 获取详细
export function getSendsampleDetail(id){
	return request({
		url:`/api/sample/Transport/${id}`,
		method:'get'
	})
}
// 新增
export function addSendsample(data){
	return request({
		url:`/api/sample/Transport`,
		method: 'post',
		data
	})
}
// 修改
export function updateSendsample(id,data){
	return request({
		url:`/api/sample/Transport/${id}`,
		method:'put',
		data
	})
}