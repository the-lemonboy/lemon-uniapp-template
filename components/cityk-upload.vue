<template>
	<view class="jnpf-upload">

		<u-upload ref="uploadRef" :before-upload="handleListChanged" :file-list="lists" :action="comUploadUrl+type"
			:header="uploadHeaders" @on-success="onSuccess" @on-remove="onRemove"></u-upload>
		<view style='width:0px;height:0px;overflow:hidden;'>
			<canvas canvas-id="cid" :style="{height:`${cvHeight}px`,width:`${cvWidth}px`}"></canvas>
		</view>
	</view>
</template>

<script setup>
	import {
		inject,
		ref,
		defineEmits,
		defineProps,
		watch,
		nextTick,
		onMounted
	} from 'vue'
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import {
		getCurrentTime
	} from '@/utils/index.js'
	const props = defineProps({
		value: {
			type: Array,
			default: () => []
		},
		disabled: {
			type: Boolean,
			default: false
		},
		watermark: {
			type: Boolean,
			default: false
		},
		watermarkContent: {
			type: Array,
			default: () => []
		}
	})
	const lists = ref([])
	const emits = defineEmits(['update:value']);
	const fileList = ref([])
	const baseURL = inject('define').baseURL
	const comUploadUrl = inject('define').comUploadUrl
	const type = 'annexpic'
	const uploadHeaders = {
		Authorization: uni.getStorageSync('token')
	}
	onMounted(() => {
		if(props.value){
			setTimeout(() => {
				fileList.value = props.value
				lists.value = fileList.value.map(item => {
					let temp = {
						url: baseURL + item.url
					}
					return temp
				})
			}, 500)
		}
	})
	const syUrl = ref()
	const cvHeight = ref()
	const cvWidth = ref()
	async function handleListChanged(index, list) {
		if(uni.getStorageSync('watermarkFlag') && props.watermark){
			// #ifdef H5
			await getImgSize(list[index].url)
			await imgToCanvas(list[index].url, cvWidth.value, cvHeight.value).then(res => {
				list[index].url = res
			})
			// #endif
			// #ifdef APP-PLUS
			await getImgSize(list[index].url)
			await imgToCanvas(list[index].url, cvWidth.value, cvHeight.value).then(res => {
				list[index].url = res
			})
			// #endif
		}
	}

	function getImgSize(url) {
		const self = this
		// #ifdef H5
		return new Promise(resolve => {
			setTimeout(() => {
				const img = new Image();
				img.src = url;
				cvHeight.value = img.height;
				cvWidth.value = img.width;
				resolve();
			},100)
		})
		// #endif
		// #ifndef H5
		return new Promise(resolve => {
			setTimeout(() => {
				uni.getImageInfo({
					src: url,
					success: function(img) {
						cvHeight.value = img.height;
						cvWidth.value = img.width;
						resolve()
					}
				});
			},100)
		})
		// #endif
	}

	function imgToCanvas(url, width, height) {
		return new Promise(resolve => {
		setTimeout(()=>{
			const ctx = uni.createCanvasContext('cid');
			
			ctx.drawImage(url, 0, 0, width, height);
			ctx.font = '30px Arial';
			ctx.fillStyle = '#adb5bd';
			const watermarkValue = uni.getStorageSync('watermarkValue');
			watermarkValue.forEach(item => {
				if (item.name === '项目名称') {
					item.value = uni.getStorageSync('projectName');
				} else if (item.name === '日期') {
					item.value = getCurrentTime();
				} else if (item.name === '经纬度') {
					item.value = uni.getStorageSync('latAndLon');
				} else if (item.name === '人员') {
					item.value = uni.getStorageSync('userInfo').userName;
				}
			});
			
			uni.setStorageSync('watermarkValue', watermarkValue);
			
			let tempIdx = 0;
			watermarkValue.forEach(item => {
				if (item.flag) {
					ctx.fillText(`${item.name}:${item.value}`, 30, height - 50 - tempIdx * 40);
					++tempIdx;
				}
			});
			
			//绘制到canvas上
			ctx.draw(false, () => {
				uni.canvasToTempFilePath({
					canvasId: 'cid',
					fileType: 'jpg',
					success: (res) => {
						resolve(res.tempFilePath);
					}
				});
			});
		},100)
		});
	}

	function onSuccess(data, index, _lists, name) {
		if (data.code == 200) {
			fileList.value.push({
				name: data.data.name,
				fileId: data.data.name,
				url: data.data.url,
				fullName: _lists[index].file.name,
				filePath: data.data.name,
				fileExtenSion: _lists[index].file.type,
				fileSize: _lists[index].file.size
			});
			lists.value.push({
				name: data.data.name,
				fileId: data.data.name,
				url: data.data.url,
				fullName: _lists[index].file.name,
				filePath: data.data.name,
				fileExtenSion: _lists[index].file.type,
				fileSize: _lists[index].file.size
			})
			console.log(fileList.value)
			// fileList.value = fileList.value
			emits('update:value', fileList.value); // 触发 input 事件，并传递更新后的 fileList 的值
		} else {
			// 处理请求失败的逻辑
		}
	}

	function onListChange(res, index, lists, name) {
		fileList.value = lists
	}
	const uploadRef = ref(null)

	function deleteItem(index) {
		uni.showModal({
			title: '提示',
			content: '您确定要删除此项吗？',
			success: res => {
				if (res.confirm) {
					uploadRef.value.remove(index);
					fileList.value.splice(index, 1)
					emits('update:value', fileList.value)
					uni.showToast({
						title: '移除成功',
						icon: 'none'
					});
				}
			}
		});
	}

	function doPreviewImage(url) {
		const images = fileList.value.map(item => baseURL + item.url);
		uni.previewImage({
			urls: images,
			current: url,
			success: () => {},
			fail: () => {
				uni.showToast({
					title: '预览图片失败',
					icon: 'none'
				});
			}
		});
	}

	function onRemove(index, lists) {
		fileList.value.splice(index, 1)
		emits('update:value', fileList.value) // 触发 update:value 事件，并传递更新后的 fileList 的值
	}
</script>

<style lang="scss" scoped>
	.jnpf-upload {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		.u-preview-wrap {
			width: 150rpx;
			height: 150rpx;
			border: 1px solid #ebecee;
			overflow: hidden;
			margin: 10rpx;
			background: rgb(244, 245, 246);
			position: relative;
			border-radius: 10rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			align-items: center;
			justify-content: center;

			.u-preview-image {
				display: block;
				// width: 100%;
				// height: 100%
				height: 100px;
				width: 100px;
				border-radius: 10rpx;
			}

			::v-deep .u-image__image {
				width: 100%;
				height: 100%
			}

			.u-delete-icon {
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				z-index: 10;
				background-color: $u-type-error;
				border-radius: 100rpx;
				width: 44rpx;
				height: 44rpx;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				align-items: center;
				justify-content: center;
			}

			.u-icon {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>