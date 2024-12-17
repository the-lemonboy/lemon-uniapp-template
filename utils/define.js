/* process.env.NODE_ENV设置生产环境模式 */
/*JAVA app.java.jnpfsoft.com  NET dotnet.jnpfsoft.com*/

const baseURL = "dev"  // 接口前缀 
const updateAPkURL = 'updateAPkURL'
const define = {
	baseURL: baseURL,
	comUploadUrl: baseURL + '/api/file/Uploader/',
	timeout: 1000000,
	report: baseURL + '/Report',
	updateAPkURL:updateAPkURL
}

export default define
