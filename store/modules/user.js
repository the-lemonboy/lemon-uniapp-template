import {
	logout,
	getCurrentUser
} from '@/api/common.js'
import {onLaunch} from '@dcloudio/uni-app'
const state = {
	token: "",
	userInfo: {}
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
}

const actions = {
	getCurrentUser({
		commit
	}) {
		return new Promise((resolve, reject) => {
			getCurrentUser().then(res => {
				
				if(res.code == 200){
					const userInfo = res.data.userInfo || {}
					const permissionList = res.data.permissionList || []
					const sysConfigInfo = res.data.sysConfigInfo || {}
					const sysVersion = sysConfigInfo.sysVersion || ''
					const copyright = sysConfigInfo.copyright || ''
					commit('SET_USERINFO', userInfo)
					uni.setStorageSync('sysVersion', sysVersion)
					uni.setStorageSync('permissionList', permissionList)
					uni.setStorageSync('sysConfigInfo', sysConfigInfo)
					uni.setStorageSync('copyright', copyright)
					uni.setStorageSync('userInfo', userInfo)
					// 水印内容
					uni.setStorageSync('watermarkFlag', true)
					uni.setStorageSync('watermarkTime', null)
					uni.setStorageSync('projectName', null)
					uni.setStorageSync('latAndLon', null)
					uni.setStorageSync('watermarkValue', [{
							name: '经纬度',
							value: uni.getStorageSync('latAndLon'),
							flag: true
						},
						{
							name: '日期',
							value: uni.getStorageSync('watermarkTime'),
							flag: true
						},
						{
							name: '人员',
							value: uni.getStorageSync('userInfo').userName,
							flag: true
						},
						{
							name: '项目名称',
							value: uni.getStorageSync('projectName'),
							flag: true
						}
					])
					resolve(userInfo)
				}
			}).catch(error => {
				uni.reLaunch({
				    url: "/pages/login/index",
				    success: () => {
				        plus.navigator.closeSplashscreen();
				    }
				})
				reject(error)
			})
		})
	},
	logout({
		commit,
		dispatch
	}) {
		return new Promise((resolve, reject) => {
			logout().then(() => {
				commit('SET_TOKEN', '')
				commit('SET_USERINFO', {})
				dispatch('resetToken')
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	// remove token
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			uni.removeStorageSync('token')
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('permissionList')
			resolve()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}