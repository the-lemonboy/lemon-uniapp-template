import request from "@/utils/request";

export function getLasterVersionNo() {
	return new Promise(resolve => {
		setTimeout(() => {
			const res = {
				message: 'sucesseful',
				code: 200,
				data: {
					lastVersion: '0.0.1',
					url: 'testUrl'
				}
			}
			resolve(res)
		},1000)
	})
}