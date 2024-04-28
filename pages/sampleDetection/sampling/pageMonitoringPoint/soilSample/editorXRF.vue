<template>
	<view class="main-container" v-if="xrfConfVisible">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">建井信息</text>
				<text @click="submitXrf()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
			</view>
			<u-form :model="curXrfConf" ref="formRef" style="margin: 20px;">
				<u-form-item label-width='50px' :label="item.elementName" prop="index"
					v-for="(item,index) of curXrfConf"><u-input v-model="item.reading" /> <u-button
						v-if="item.elementSort > curXrfConfLength" @click="delConf(index)">删除</u-button></u-form-item>
			</u-form>
			<u-popup v-model="popupShow" mode='bottom'>
				<view class="popup-container">
					<u-form :model="newConf" ref="popRef" style="margin: 20px;">
						<u-form-item label-width='100px' label="属性" prop="elementCode"><u-input
								v-model="newConf.elementCode" /></u-form-item>
						<u-form-item label-width='100px' label="值" prop="reading"><u-input
								v-model="newConf.reading" /></u-form-item></u-form>
					<view class="popup-btn">
						<u-button type="primary" @click="popupShow = false">取消</u-button>
						<u-button type="primary" @click="submitNewConf">确认</u-button>
					</view>
				</view>
			</u-popup>
			<u-button class="add-btn" type="primary" @click="showpop()">新增</u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		defineExpose,
		defineEmits
	} from 'vue'
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import {
		deepCopy
	} from '@/utils/index.js'
	const curXrfConf = ref([])
	const curXrfConfLength = ref()
	const xrfConfVisible = ref(false)
	const visible = ref(true)
	const xrfRef = ref(null)

	function goToBack() {
		emits('emitVisible', true)
		xrfConfVisible.value = false
	}
	const popupShow = ref(false)
	const newConf = ref({
		elementCode: null,
		elementName: null,
		elementSort: null,
		reading: null
	})
	const popupRules = reactive({
		elementCode: [{
			required: true,
			message: '请输入属性',
			trigger: 'blur',
		}],
	})
	const popRef = ref()

	function submitNewConf() {
		popRef.value.validate((valid) => {
			if (valid) {
				newConf.value.elementSort = curXrfConf.value.length + 1
				newConf.value.elementName = newConf.value.elementCode
				const temp = deepCopy(newConf.value)
				curXrfConf.value.push(temp)
				for (let key in newConf.value) {
					newConf.value[key] = null
				}
				uni.showToast({
					icon: "none",
					title: "添加成功"
				})
				popupShow.value = false
			}
		})
	}

	function showpop() {
		popupShow.value = true

	}
	// 删除
	function delConf(index) {
		let tempData = deepCopy(curXrfConf.value)
		if (index > curXrfConfLength.value) {
			for (let i = index; i < tempData.length; i++) {
				tempData[index - 1] = tempData[index]
				tempData[index - 1].elementSort = i.toString()
			}
		}
		tempData.pop()
		curXrfConf.value = tempData
	}
	onReady(() => {
		popRef.value.setRules(popupRules)
	})
	const emits = defineEmits(['curConfData','emitVisible'])

	function submitXrf() {
		emits('curConfData', curXrfConf.value)
		emits('emitVisible', true)
		xrfConfVisible.value = false
	}
	defineExpose({
		xrfConfVisible,
		curXrfConf,
		curXrfConfLength
	})
</script>

<style lang="scss" scoped>
	.popup-container {
		margin: 20px;
	}

	.popup-btn {
		display: flex;
	}

	.add-btn {
		width: 100px;
		margin-bottom: 20px;
	}
</style>