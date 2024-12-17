<template>
	<view class="main-container" v-if="mainVisile">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="me-container">
			<view class="me-header" @click="goUserInfo">
				<view class="avatar">
					<img class="img" :src="`${baseURL}${userInfo.headIcon}`" />
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
				<view class="message-center link-box" @click="goMessage()">
					<text class="left-text">消息中心</text>
					<view class="right-content">
						<uni-icons type="right" size="30" color="#999"></uni-icons>
					</view>
				</view>
				<!-- #ifdef APP-PLUS -->
		
				<!-- #endif -->
				<view class="message-center link-box" @click="handleUpdate()">
				
					<view class="left-content">
						<text class="left-text">检查更新</text>
						<u-badge v-if="updateFlag>0" style="margin-left: 10px;" :absolute="false" color="white"
							bgColor="red" count="new"></u-badge>
					</view>
					<view class="right-content">
						<text type="right" class="mini-text">版本{{curVersionNo}}</text>
						<uni-icons type="right" size="30" color="#999"></uni-icons>
					</view>
				</view>
				<!-- #ifdef APP-PLUS -->
				<view class="clear-cache link-box" @click="clearCache">
					<text class="left-text">清除缓存</text>
					<view class="right-content">
						<text class="right-text mini-text">{{cacheSize}}</text>
						<uni-icons type="right" size="30" color="#999"></uni-icons>
					</view>
				</view>
				<!-- #endif -->
				<view class="setting link-box" @click="gowatermark">
					<text class="left-text">设置</text>
					<uni-icons type="right" size="30" color="#999"></uni-icons>
				</view>
				<view class="login-out">
					<u-button type="primary" @click="loginOut">退出登录</u-button>
				</view>
			</view>
		</view>
	</view>
	<watermark v-else-if="!mainVisile && watermarkVisible" @visible="watermarkFlag"></watermark>
	<userInfoPage class="userInfo" v-else-if="!mainVisile && userInfoVisible" @visible="userInfoFlag"></userInfoPage>
	<updataPopup :lastVersion="lastVersion" :apkPath="apkPath" ref="updatePopup"></updataPopup>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		reactive,
		inject,
		ref
	} from 'vue';
	import watermark from './watermark/index.vue'
	import userInfoPage from './userInfo/index.vue'
	import updataPopup from './checkUpdate/index.vue'
	import {
		compareVersion
	} from '@/utils/index.js'
	import {
		getLasterVersionNo,
		getLasterVersion
	} from '@/api/updateVersion/updateVersion.js'
	const userInfo = ref({})
	const baseURL = inject('define').baseURL

	function loginOut() {
		uni.showModal({
			title: '提示',
			content: '是否退出当前账号？',
			success: function(res) {
				if (res.confirm) {
					uni.setStorageSync('token', null)
					uni.setStorageSync('userInfo', null)
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
						url: '/pages/login/index'
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

	function gowatermark() {
		watermarkVisible.value = true
		mainVisile.value = false
	}
	const userInfoVisible = ref(false)
	const userInfoRef = ref()

	function goUserInfo() {
		userInfoVisible.value = true
		mainVisile.value = false
	}

	function userInfoFlag(val) {
		userInfoVisible.value = val
		mainVisile.value = !val
	}

	function watermarkFlag(val) {
		watermarkVisible.value = val
		mainVisile.value = !val
	}

	function goMessage() {
		uni.navigateTo({
			url: '/pages/me/message/index'
		})
	}
	// const checkUpdateVisible = ref(false)
	
	// #ifdef APP-PLUS
	const updatePopup = ref(null)
	async function _getLasterVersionNo() {
		try {
			const res = await getLasterVersionNo();
			console.log(res.data)
			return res.data;
		} catch (error) {
			console.error('获取最新版本号失败:', error);
			throw error;
		}
	}
	const lastVersion = ref(null)
	const apkPath = ref(null)
	const curVersionNo = ref(plus.runtime.version)
	const updateFlag = ref(false)
	async function _compareVeresion() {
		const apkInfo = await _getLasterVersionNo()
		lastVersion.value = apkInfo.lastVersion;
		apkPath.value = apkInfo.url
		updateFlag.value = compareVersion(lastVersion.value, curVersionNo.value);
	}
	 function handleUpdate() {
			if (updateFlag.value > 0) {
				updatePopup.value.updateDialog.open()
				// 执行更新操作，例如提示用户下载并安装新版本
			} else if (updateFlag.value === 0) {
				uni.showToast({
					title: '已经是最新版本啦！',
					icon: 'error',
					duration: 2000
				});
			} else {
				uni.showToast({
					title: '当前版本高于最新版本',
					icon: 'error',
					duration: 2000
				});
			}
		
	}
	// #endif
	// #ifdef APP-PLUS
	const cacheSize = ref()

	function clearCache() {
		let that = this;
		let os = plus.os.name;
		uni.showModal({
			title: '提示',
			content: '是否清除缓存？',
			success: function(res) {
				if (res.confirm) {
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
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}

	function accCache() {
		plus.cache.calculate(function(size) {
			let sizeCache = parseInt(size);
			if (sizeCache == 0) {
				cacheSize.value = "0B";
			} else if (sizeCache < 1024) {
				cacheSize.value = sizeCache + "B";
			} else if (sizeCache < 1048576) {
				cacheSize.value = (sizeCache / 1024).toFixed(2) + "KB";
			} else if (sizeCache < 1073741824) {
				cacheSize.value = (sizeCache / 1048576).toFixed(2) + "MB";
			} else {
				cacheSize.value = (sizeCache / 1073741824).toFixed(2) + "GB";
			}
		});
	}
	// #endif
	onLoad(() => {
		// #ifdef APP-PLUS
		accCache()
		// #endif
		userInfo.value = uni.getStorageSync('userInfo')
		_compareVeresion()
	})
</script>

<style scoped lang="scss">
	/* #ifndef H5 */
	.me-container {
		padding: 0;
		margin: 0;
		height: calc(100vh - 50rpx);
		width: 100%;
		background-color: #e9ecef;
	}

	/* #endif */
	/* #ifdef H5 */
	.me-container {
		padding: 0;
		margin: 0;
		height: calc(100vh - 50px);
		width: 100%;
		background-color: #e9ecef;
	}

	/* #endif */
	.me-header {
		width: 100%;
		height: 210rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #ffffff;

		.img {
			width: 180rpx;
			height: 180rpx;
			background-color: gray;
			border-radius: 50%;
		}

		.info {
			.info-top {
				display: flex;
				flex-direction: row;

				text {
					margin: 0 10px;
				}
			}

			.comp {
				margin: 0 10px;
			}
		}

	}

	.me-menu {
		margin-top: 50rpx;

		.link-box {
			height: 100rpx;
			width: 100%;
			box-sizing: border-box;
			background-color: #ffffff;
			border-top: 1px solid gainsboro;
			padding: 0 10px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

		}

		// .left-text {
		// 	position: relative;
		// }

		.right-content {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

	}

	.login-out {
		width: 90%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 50px;
	}

	.mini-text {
		color: $uni-text-color-grey;
	}
</style>