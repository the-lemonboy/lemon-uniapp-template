import request from "@/utils/request";
// 项目成员
export function getMember(data) {
	return request({
		url: '/api/project/ProjMember/getList',
		method: 'post',
		data
	})
}

// 样品

export function getSampleBase(data) {
	return request({
		url: '/api/sample/Base/getList',
		method: 'post',
		data
	})
}
//  项目列表
export function getProjectBaseList(data) {
	return new Promise((resolve) => {
		setTimeout(() => {
			// 模拟后端返回的数据
			const data = Array.from({
				length: 10
			}, (_, idx) => {
				return {
					id: idx,
					name: `project${idx}`,
					organizetext: `organizetext${idx}`,
					typetext: `type:${idx}`,
					registertime: '2011-11-11',
				};
			});
			const res = {
				success: true,
				code: 200,
				message: "Success",
				data: data
			}
			resolve(res);
		}, 1000); // 延迟 1 秒
	});
}

// 项目详细
export function getProjectDetail(id) {
	return request({
		url: `/api/project/ProjBase/detail/${id}`,
		method: 'get'
	})
}
// 删除
export function delProjectDetail(id) {
	return request({
		url: `/api/project/ProjBase/${id}`,
		method: 'delete'
	})
}
// 监测点位-------------------
// 新增监测点列表
export function getHoleBaseList(data) {
	return request({
		url: `/api/project/HoleBase/getList`,
		method: 'post',
		data
	})
}
// 新增监测点位
export function addHoleBaseDetail(data) {
	return request({
		url: `/api/project/HoleBase`,
		method: 'post',
		data
	})
}

// 修改监测点位
export function updateHoleBase(id, data) {
	return request({
		url: `/api/project/HoleBase/${id}`,
		method: 'put',
		data
	})
}
// 获取监测信息
export function getHoleBaseDetail(id) {
	return request({
		url: `/api/project/HoleBase/detail/${id}`,
		method: 'get'
	})
}
// 删除
export function delHoleBaseDetail(id) {
	return request({
		url: `/api/project/HoleBase/${id}`,
		method: 'delete'
	})
}
// 质控样品---------------------
// 获取质控样品列表
export function getQCSampleList(data) {
	return request({
		url: `/api/project/QCSample/getList`,
		method: 'post',
		data
	})
}
// 获取质控样品信息
export function getQCSampleDetail(id) {
	return request({
		url: `/api/project/QCSample/${id}`,
		method: 'get'
	})
}
// 新增质控样品
export function addQCSample(data) {
	return request({
		url: `/api/project/QCSample`,
		method: 'post',
		data
	})
}
// 修改质控样品
export function updateQCSample(id, data) {
	return request({
		url: `/api/project/QCSample/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function delQCSampleDetail(id) {
	return request({
		url: `/api/project/QCSample/${id}`,
		method: 'delete'
	})
}
// 钻孔记录---------------------
// 获取列表
export function getHoleRecordList(data) {
	return request({
		url: `/api/project/HoleRecord/getList`,
		method: 'post',
		data
	})
}
// 获取详细
export function getHoleRecordDetail(id) {
	return request({
		url: `/api/project/HoleRecord/${id}`,
		method: 'get'
	})
}
// 新增
export function addHoleRecord(data) {
	return request({
		url: `/api/project/HoleRecord`,
		method: 'post',
		data
	})
}
// 修改
export function updateHoleRecord(id, data) {
	return request({
		url: `/api/project/HoleRecord/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function delHoleRecordDetail(id) {
	return request({
		url: `/api/project/HoleRecord/${id}`,
		method: 'delete'
	})
}
// 土样记录---------------------
// 获取列表
export function getSoilRecordList(data) {
	return request({
		url: `/api/project/SoilSample/getList`,
		method: 'post',
		data
	})
}
// 获取详细
export function getSoilRecordDetail(id) {
	return request({
		url: `/api/project/SoilSample/${id}`,
		method: 'get'
	})
}
// 新增
export function addSoilRecord(data) {
	return request({
		url: `/api/project/SoilSample`,
		method: 'post',
		data
	})
}
// 修改
export function updateSoilRecord(id, data) {
	return request({
		url: `/api/project/SoilSample/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function delSoilRecordDetail(id) {
	return request({
		url: `/api/project/SoilSample/${id}`,
		method: 'delete'
	})
}
// 建井信息---------------------
// 获取列表
export function getWellBaseList(data) {
	return request({
		url: `/api/project/WellBase/getList`,
		method: 'post',
		data
	})
}
// 获取详细
export function getWellBaseDetail(id) {
	return request({
		url: `/api/project/WellBase/${id}`,
		method: 'get'
	})
}
// 新增
export function addWellBase(data) {
	return request({
		url: `/api/project/WellBase`,
		method: 'post',
		data
	})
}
// 修改
export function updateWellBase(id, data) {
	return request({
		url: `/api/project/WellBase/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function delWellBaseDetail(id) {
	return request({
		url: `/api/project/WellBase/${id}`,
		method: 'delete'
	})
}
// 洗井记录---------------------
// 获取列表
export function getWellWashRecordList(data) {
	return request({
		url: `/api/project/WellWashRecord/getList`,
		method: 'post',
		data
	})
}
// 获取详细
export function getWellWashRecordDetail(id) {
	return request({
		url: `/api/project/WellWashRecord/${id}`,
		method: 'get'
	})
}
// 新增
export function addWellWashRecord(data) {
	return request({
		url: `/api/project/WellWashRecord`,
		method: 'post',
		data
	})
}
// 修改
export function updateWellWashRecord(id, data) {
	return request({
		url: `/api/project/WellWashRecord/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function delWellWashRecordDetail(id) {
	return request({
		url: `/api/project/WellWashRecord/${id}`,
		method: 'delete'
	})
}
// 水样记录---------------------
// 获取列表
export function getWaterSampleList(data) {
	return request({
		url: `/api/project/WaterSample/getList`,
		method: 'post',
		data
	})
}
// 获取详细
export function getWaterSampleDetail(id) {
	return request({
		url: `/api/project/WaterSample/${id}`,
		method: 'get'
	})
}
// 新增
export function addWaterSample(data) {
	return request({
		url: `/api/project/WaterSample`,
		method: 'post',
		data
	})
}
// 修改
export function updateWaterSample(id, data) {
	return request({
		url: `/api/project/WaterSample/${id}`,
		method: 'put',
		data
	})
}
// 删除
export function delWaterSampleDetail(id) {
	return request({
		url: `/api/project/WaterSample/${id}`,
		method: 'delete'
	})
}