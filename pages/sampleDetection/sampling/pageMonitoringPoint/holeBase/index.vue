<template>
	<view class="pr-container">
		<u-form :model="dataForm" ref="Form" style="margin: 10px;">
			<u-form-item label-width='100px' label="钻孔编号" prop="holeNo"><u-input v-model="dataForm.holeNo"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="钻孔开始时间" prop="startTime"><u-input v-model="dataForm.startTime"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="钻孔结束时间" prop="endTime"><u-input v-model="dataForm.endTime"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="采样类型" prop="holeType"><u-input v-model="dataForm.holeType"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="经度" prop="longitude"><u-input v-model="dataForm.workData"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="纬度" prop="latitude"><u-input v-model="dataForm.latitude"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="钻孔直径" prop="diameter"><u-input v-model="dataForm.diameter"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="初见水位埋深" prop="sWaterLevel"><u-input v-model="dataForm.sWaterLevel"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="地面高程" prop="elevation"><u-input v-model="dataForm.elevation"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="参考高程来源" prop="reevlResouce"><u-input v-model="dataForm.reevlResouce"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="记录人" prop="createUser"><u-input v-model="dataForm.createUser"
					:disabled='true' /></u-form-item>
			<u-form-item label-width='100px' label="备注" prop="remark"><u-input :type='textarea'
					v-model="dataForm.sWaterLevel" :disabled='true' /></u-form-item>
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
		getHoleBaseDetail
	} from '@/api/sample.js'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	let dataForm = reactive({})

	function initData() {
		let holeId = uni.getStorageSync('HoleId')
		return getProjectDetail(holeId).then(res => {
			Object.assign(dataForm, res.data);
		})

	}
	onLoad(() => {
		initData()
		uni.$on('refresh', () => {
			getList()
		})
	})
</script>

<style>
</style>