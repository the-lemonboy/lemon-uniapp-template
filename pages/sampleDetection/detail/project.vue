<template>
	<view class="pr-container">
		<u-form :model="dataForm" ref="Form" style="margin: 10px;">
			<u-form-item label-width='100px' label="项目编号" prop="encode"><u-input
					v-model="dataForm.encode" :disabled='true'/></u-form-item>
			<u-form-item label-width='100px' label="项目类型" prop="typeid"><u-input
					v-model="dataForm.typeName" :disabled='true'/></u-form-item>
			<u-form-item label-width='100px' label="启动时间" prop="registertime"><u-input
					v-model="dataForm.registertime" :disabled='true'/></u-form-item>
			<u-form-item label-width='100px' label="计划工期" prop="planworkload"><u-input
					v-model="dataForm.planworkload" :disabled='true'/></u-form-item>
			<u-form-item label-width='100px' label="运行时长" prop="workData"><u-input
					v-model="dataForm.workData" :disabled='true'/></u-form-item>
			<u-form-item label-width='100px' label="项目地址" prop="address"><u-input
					v-model="dataForm.address" :disabled='true'/></u-form-item>
			<u-form-item label-width='100px' label="项目业主" prop="customid" ><u-input
					v-model="dataForm.customid" :disabled='true'/></u-form-item>
			<u-form-item label-width='100px' label="备注" prop="remark" ><u-input
					v-model="dataForm.remark" :disabled='true'/></u-form-item>
		</u-form>
	</view>

</template>

<script setup>
	import {
		reactive
	} from 'vue';
	import {
		getCurrentTime
	} from '@/utils/index.js'
	import {
		getDictionaryDataSelector
	} from '@/api/dictionary.js'
	import {
		getProjectDetail
	} from '@/api/sample.js'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	// import map from './map.vue'
	let dataForm = reactive({})
	function initData() {
		let projectId = uni.getStorageSync('projectId')
		return getProjectDetail(projectId).then(res => {
			// dataForm = res.data
			Object.assign(dataForm, res.data);
			console.log(dataForm)
		})

	}
    // 计算运行时长
	function getData(beforeTime){
		const currentTimeStamp = new Date().getTime();
		const targetDate = new Date(beforeTime);
		const targetTimeStamp = targetDate.getTime();
		const timeStampDiff = targetTimeStamp - currentTimeStamp;
		const nonNegativeDiff = Math.max(0, timeStampDiff);
		const daysDiff = {workData:Math.ceil(nonNegativeDiff / (1000 * 60 * 60 * 24))}
		Object.assign(dataForm,daysDiff)
	}
		function gettypeidOptions() {
			return getDictionaryDataSelector('327816685773922437').then(res => {
				const typeidOptions = Object.assign(res.data.list)
				let name = {typeName:res.data.list.filter(item => item.enCode === dataForm.typeid).map(item => item.fullName)}
				Object.assign(dataForm,name)
			})
		}
		onLoad(async() => {
			await initData()
			await gettypeidOptions()
			getData(dataForm.registertime)
		
		})
</script>

<style>
</style>