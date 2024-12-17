<template>
	<view>
		<uni-popup class="popup-container" ref="updateDialog" type="dialog">
			<!-- 		<uni-popup-dialog ref="inputClose" showClose="false" mode="base" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容"
				@confirm="dialogInputConfirm"></uni-popup-dialog> -->
			<view class="content-container">
				<image mode="widthFix" class="bg-top" src="../../../static/images/upgrade-bg_top.png"></image>
				<view class="text-container">
					<view class="lastVersion">发现新版本({{props.lastVersion}})</view>
				</view>
				<button v-if="!downloadFlag" class="update-btn" @click="downloadApp">立即更新</button>
				<u-line-progress v-else active-color='#2096FC' class="progress-box" :striped="true"
					:percent="progressPercent" :striped-active="true"></u-line-progress>
				<image @click="closePopup" class="close-btn" src="../../../static/images/app_update_close.png"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		defineExpose,
		defineProps,
		inject
	} from 'vue'
	import {
		getLasterVersion
	} from '@/api/updateVersion/updateVersion.js'
	import {
		compareVersion
	} from '@/utils/index.js'
	const props = defineProps({
		lastVersion: {
			type: String,
			default: null
		},
		apkPath:{
			type:String,
			default:null
		}
	})
	const updateAPkURL = inject('define').updateAPkURL
	const updateDialog = ref(null)
	const lastVersion = ref(null)
	// 获取最新版本号

	function closePopup() {
		updateDialog.value.close()
	}
	// 更新版本
	const downloadFlag = ref(false)
	const progressPercent = ref(0)

	function downloadApp() {
		downloadFlag.value = true
		const downloadTask = uni.downloadFile({
			// 存放最新安装包的地址
			url: `${updateAPkURL}${props.apkPath}`,
			success: (downloadResult) => {
				if (downloadResult.statusCode === 200) {
					plus.runtime.install(
						downloadResult.tempFilePath, {
							force: false
						},
						function() {
							plus.runtime.restart()
						},
						function(e) {
							uni.showToast({
								title: '安装失败！',
								icon: "error",
								duration: 2000
							})
							downloadFlag.value = false
						}
						
					)
				} else {
					uni.showToast({
						title: '安装失败！',
						icon: "error",
						duration: 2000
					})
					downloadFlag.value = false
				}
			},
			fail: (res) => {
				// console.log(res)
			}
		})
		downloadTask.onProgressUpdate((res) => {
			progressPercent.value = res.progress
			if (res.progress == 100) {
				downloadFlag.value = false
				progressPercent.value = 0
				closePopup()
			}
		})
	}
	defineExpose({
		updateDialog
	})
</script>

<style scoped lang="scss">
	.content-container {
		height: 300px;
		width: 70vw;
		background-color: white;
		position: relative;
		border-radius: 10px;

		.bg-top {
			position: absolute;
			top: -50px;
			left: 0;
			width: 70vw;
		}

		.text-container {
			position: relative;
			top: 90px;

			.lastVersion {
				text-align: center;
				font-size: $uni-font-size-lg;
				font-weight: bold;
			}
		}

		.update-btn {
			width: 50vw;
			height: 40px;
			background-color: $uni-color-primary;
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
			color: white;
			line-height: 40px;
		}

		.progress-box {
			position: absolute;
			bottom: 30px;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
		}

		.close-btn {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			bottom: -40px;
			left: 50%;
			transform: translateX(-50%);

		}
	}
</style>