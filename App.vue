<script setup>
import {onLaunch} from '@dcloudio/uni-app'
onLaunch(()=>{
		let token= uni.getStorageSync('token');
	// #ifdef APP-PLUS
	// token标志来判断
	if (token) {
	    //存在则关闭启动页进入首页
	plus.navigator.closeSplashscreen();
	} else {
	//不存在则跳转至登录页
	    uni.reLaunch({
	        url: "/pages/login/index",
	        success: () => {
	            plus.navigator.closeSplashscreen();
	        }
		})
	}
	// #endif
	// #ifdef H5
	// uni.setStorageSync('token',null);
	if (token) {
	uni.switchTab({
		url: '/pages/sampleDetection/index'
	});
	} else {
	//不存在则跳转至登录页
	 uni.navigateTo({
	                  url:'/pages/login/index'
	              })
	}
	// #endif
})
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './style/common.scss';
	@import './uni_modules/vk-uview-ui/index.scss';

</style>
