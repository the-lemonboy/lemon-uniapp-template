<template>
	<view class="main-container" v-if="editVisible">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="mo-container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title"
						style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">土样记录</text>
				</view>
			</view>
			<u-form :model="doorInfo" ref="form"  style="margin:20px auto; width: 90%;">
				<u-form-item label-width='100px' label="门禁位置" prop="sampleName"><u-input
					disabled="true"	v-model="doorInfo.name" /></u-form-item>
				<u-form-item label-width='100px' label="门禁id" prop="sampleDepth"><u-input
					disabled="true"	v-model="doorInfo.id" /></u-form-item>
				<u-form-item label-width='100px' label="门禁ip" prop="pidReading"><u-input
					disabled="true"	v-model="doorInfo.ip" /></u-form-item>
			</u-form>
			<u-button class="open-btn" type="success" @click="handelOpenDoor">打开门禁</u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		nextTick,
		watch,
		defineEmits,
		defineProps
	} from 'vue'
	import {
		onLoad,
		onReady,
		onBackPress,
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import {
		getMenuId
	} from '@/utils/index.js';
	import {
		openDoor
	} from '@/api/lab/labOperation.js'
	const editVisible = ref(null)
	const doorInfo = ref(null)
	function handelOpenDoor() {
		if (doorInfo.value.ip && doorInfo.value.usename && doorInfo.value.password) {
			openDoor(doorInfo.value.ip, doorInfo.value.usename, doorInfo.value.password).then(res => {
				ToastFn("门禁已打开",'success')
			})
		} else {
			ToastFn("门禁打开失败",'error')
		}
	}

	function ToastFn(text,type) {
		uni.$emit('refresh')
		goToBack()
		uni.showToast({
			title: text,
			duration: 2000,
			icon:type
		});
	}
	onLoad(() => {

	})
	onBackPress((e) => {
		if (e.from === "backbutton" && editVisible.value) {
			goToBack()
			return true
		}
	})
	const emits = defineEmits(['emitVisible'])
	function goToBack() {
		doorInfo.value = null
		editVisible.value = false
		emits('emitVisible', true)
	}
	defineExpose({
		editVisible,
		doorInfo
	})
	onPullDownRefresh( () => {
		uni.stopPullDownRefresh();
	})
</script>

<style lang="scss" scoped>
	.mo-container {
		padding-bottom: 10px;
	}

	.open-btn {
		width: 100px;
		margin: 10px auto;
	}
</style>