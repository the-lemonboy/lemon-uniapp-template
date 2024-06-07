import request from "@/utils/request";

export function getLasterVersionNo(){
	return request({
		url:'/api/app/getAppLastVersionNo',
		method:'get'
	})
}
export function getLasterVersion(){
	return request({
		url:'/api/app/getAppLastVersion',
		method:'get',
		header:{'Content-Type': 'application/vnd.android'}
	})
}