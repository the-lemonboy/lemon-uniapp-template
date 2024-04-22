<template>
<view class="main-container" v-if="mainVisile">
	<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->
	<view class="me-container">
		<view class="me-header">
			<view class="avatar">
				<!-- <img src="@/static" alt="" /> -->
				<img class="img" :src="`${baseURL}${userInfo.headIcon}`" />
					
				<!-- </img> -->
			</view>
			<viwe class="info">
			<view class="info-top">
				<text class="name">{{userInfo.userName}}</text>
				<text class="phone">{{userInfo.mobilePhone}}</text>
			</view>
			<text class="comp">{{userInfo.organizeName}}</text>
			</viwe>
		</view>
		<view class="me-menu">
			<view class="message-center link-box">
				<text class="left-text">消息中心</text>
				<view class="right-content">
					<text class="right-text">new</text>
					<uni-icons type="right" size="30"></uni-icons>
				</view>
			</view>
			<view class="update link-box">
				<text class="left-text">检查更新</text>
				<view class="right-content">
					<text class="right-text">1.0.0</text>
					<uni-icons type="right" size="30"></uni-icons>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="clear-cache link-box" @click="clearCache">
				<text class="left-text">清除缓存</text>
				<view class="right-content">
					<text class="right-text">{{cacheSize}}</text>
					<uni-icons type="right" size="30"></uni-icons>
				</view>
			</view>
			<!-- #endif -->
			<view class="setting link-box" @click="gowatermark">
				<text class="left-text">设置</text>
				<uni-icons type="right" size="30"></uni-icons>
			</view>
			<view class="login-out">
				<u-button type="primary" @click="loginOut">退出登录</u-button>
			</view>
		</view>
	</view>
</view>
<watermark v-else-if="!mainVisile && watermarkVisible" @visible="watermarkFlag"></watermark>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
import { reactive,inject, ref} from 'vue';
import watermark from './watermark/index.vue'
// import clearCache from './clearCache/index.vue'
// import {clearCache} from '@/utils/clearCache.js'
	const userInfo  = reactive({})
	const baseURL = inject('define').baseURL
	function loginOut(){
		uni.showModal({
			title: '提示',
			content: '是否退出当前账号？',
			success: function (res) {
				if (res.confirm) {
					uni.setStorageSync('token',null)
					uni.setStorageSync('userInfo',null)
						// #ifdef APP-PLUS
						uni.reLaunch({
						    url: "/pages/login/index",
						    success: () => {
						        plus.navigator.closeSplashscreen();
						    }
						})
						// #endif
						// #ifdef H5
						uni.navigateTo({
						                  url:'/pages/login/index'
						              })
						// #endif
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	const mainVisile = ref(true)
	const watermarkVisible = ref(false)
	function gowatermark(){
		watermarkVisible.value = true
		mainVisile.value = false
	}
	function watermarkFlag(val){
		watermarkVisible.value = val
		mainVisile.value = !val
	}
	// #ifdef APP-PLUS
	const cacheSize = ref()
	  function clearCache() {
	           let that = this;  
	           let os = plus.os.name;  
	           if (os == 'Android') {  
	               let main = plus.android.runtimeMainActivity();  
	               let sdRoot = main.getCacheDir();  
	               let files = plus.android.invoke(sdRoot, "listFiles");  
	               let len = files.length;  
				   
	               for (let i = 0; i < len; i++) {  
	                   let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
	                   plus.io.resolveLocalFileSystemURL(filePath, function(entry) {  
	                       if (entry.isDirectory) {  
	                           entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
	                               uni.showToast({  
	                                   title: '缓存清理完成',  
	                                   duration: 2000  
	                               });  
	                               accCache(); // 重新计算缓存  
	                           }, function(e) {  
	                               console.log(e.message)  
	                           });  
	                       } else {  
	                           entry.remove();  
	                       }  
	                   }, function(e) {  
	                       console.log('文件路径读取失败')  
	                   });  
	               }  
	           } else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
	               plus.cache.clear(function() {  
	                   uni.showToast({  
	                       title: '缓存清理完成',  
	                       duration: 2000  
	                   });  
	                   formatSize();  
	               });  
	           }  
	       }
		   function accCache(){
			   plus.cache.calculate(function(size) {
			       let sizeCache = parseInt(size);  
			       if (sizeCache == 0) {  
			           cacheSize.value = "0B";  
			       } else if (sizeCache < 1024) {  
			           cacheSize.value  = sizeCache + "B";  
			       } else if (sizeCache < 1048576) {  
			           cacheSize.value  = (sizeCache / 1024).toFixed(2) + "KB";  
			       } else if (sizeCache < 1073741824) {  
			           cacheSize.value  = (sizeCache / 1048576).toFixed(2) + "MB";  
			       } else {  
			           cacheSize.value  = (sizeCache / 1073741824).toFixed(2) + "GB";  
			       }  
			   	console.log(cacheSize.value,"--cache")
			   }); 
		   }
	  // #endif
	onLoad(()=>{
		// #ifdef APP-PLUS
		 accCache()
		// #endif
		Object.assign(userInfo,uni.getStorageSync('userInfo'))
		console.log(userInfo,uni.getStorageSync('userInfo'))
	})
</script>

<style scoped lang="scss">
	.me-container{
		padding: 0;
		margin: 0;
	    height: calc(100vh - 50px);
		width: 100%;
		background-color: #e9ecef;
	}
	.me-header{
		width: 100%;
		height: 200rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #ffffff;
		.img{
			width: 180rpx;
			height: 180rpx;
			background-color: gray;
			border-radius: 50%;
		}
		.info{
			.info-top{
				display: flex;
				flex-direction: row;
				text{
					margin:0 10px;
				}
			}
			.comp{
				margin: 0 10px;
			}
		}
		
	}
	.me-menu{
		margin-top: 50rpx;
		.link-box{
			height: 100rpx;
			width: 100%;
			box-sizing: border-box;
			background-color: #ffffff;
			border-top:1px solid gainsboro;
			padding: 0 10px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			// .left-text{
			// 	line-height: 100rpx;
			// }
		}
		.right-content{
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		
	}
	.login-out{
		width: 90%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 50px;
	}
</style>