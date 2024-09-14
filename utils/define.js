/* process.env.NODE_ENV设置生产环境模式 */
/*JAVA app.java.jnpfsoft.com  NET dotnet.jnpfsoft.com*/

const baseURL = "http://106.14.80.181:30019"  // 接口前缀
// const baseURL = "http://112.64.139.162:30019"  // 接口前缀 
// const baseURL = "http://192.168.88.162:30019"  // 接口前缀
// const baseURL = "http://192.168.88.162:30019"  // 接口前缀
// 
const frontEndUrl = "http://112.64.139.162:30018"
const define = {
	baseURL: baseURL,
	webSocketUrl: "ws://106.14.80.181:30019/websocket",
	comUploadUrl: baseURL + '/api/file/Uploader/',
	timeout: 1000000,
	report: baseURL + '/Report',
	frontEndUrl:frontEndUrl
}


// const baseURL = "http://106.14.80.181:30019" // "https://app.java.jnpfsoft.com" 
// const define = {
// 	baseURL: baseURL,
// 	webSocketUrl: "ws://106.14.80.181:30019/websocket", //"ws://app.java.jnpfsoft.com/api/message/websocket"
// 	comUploadUrl: baseURL + '/api/file/Uploader/',
// 	timeout: process.env.NODE_ENV === 'production' ? 1000000 : 1000000,
// 	report: baseURL + '/Report'
// }
export default define
