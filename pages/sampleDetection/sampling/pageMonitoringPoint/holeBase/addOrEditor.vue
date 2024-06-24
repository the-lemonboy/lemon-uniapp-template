<template>
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
				style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">建井信息</text>
			<text @click="addOrUpdateData()" type="primary" class="submit"
				style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
		</view>
		</view>
		<u-toast ref="uToast" />
		<u-form :model="dataForm" ref="Form" style="margin: 10px;">
			<u-form-item label-width='100px' label="钻孔编号" prop="holeNo"><u-input
					v-model="dataForm.holeNo" /></u-form-item>
			<u-form-item label-width='100px' label="采样类型" prop="holeType"><u-input
					v-model="holeTypeOptions.current.label" type="select"
					@click="holeTypeOptions.show=true" /></u-form-item>
			<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
			<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input type="select"
					@click="showPickerDate('startTime')" v-model="dataForm.startTime" /></u-form-item>
			<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input type="select"
					@click="showPickerDate('endTime')" v-model="dataForm.endTime" /></u-form-item>
			<u-form-item label-width='100px' label="钻孔直径" prop="diameter"><u-number-box :positive-integer="false"
					v-model="dataForm.diameter"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="初见水位埋深" prop="sWaterLevel"><u-number-box :positive-integer="false"
					v-model="dataForm.sWaterLevel"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="地面高程" prop="elevation"><u-number-box :positive-integer="false"
					v-model="dataForm.elevation"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="参考高程来源" prop="reevlResouce"><u-input
					v-model="dataForm.reevlResouce" /></u-form-item>
			<u-form-item label-width='100px' label="备注" prop="remark"><u-input
					v-model="dataForm.remark" /></u-form-item>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<!-- <upload :value="dataForm.files" @input="handleInput"></upload> -->
			</u-form-item>
		</u-form>
		<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
			:default-time='getCurrentTime()'></u-picker>
		<u-select v-model="wellTypeOptions.show" value-name="enCode" label-name="fullName" :list="wellTypeOptions.list"
			@confirm="onWellTypeOptions"></u-select>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		nextTick
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import upload from '@/components/cityk-upload.vue';
	import {
		getMenuId,
		getCurrentTime
	} from '@/utils/index.js';
	import {
		addHoleRecord,
		updateHoleRecord,
		getHoleRecordDetail
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade
	} from '@/api/dictionary'
	// 监测井类型
	const wellTypeOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getwellTypeOptions() {
		getDictionaryDataSelector('497335660487647813').then(res => {
			wellTypeOptions.list = res.data.list
		})
	}

	function onwellTypeOptions(arr) {
		let current = arr[0];
		wellTypeOptions.current = current;
		dataForm.wellType = current.label;
	}
	// 选择时间
	const timeParams = reactive({
		year: true,
		month: true,
		day: true,
		hour: true,
		minute: true,
		second: true,
	})
	const curTimeKey = ref(null)
	const selectTimeVisible = ref(false)

	function showPickerDate(value) {
		curTimeKey.value = value,
			selectTimeVisible.value = true
	}

	function getTime(e) {
		if (curTimeKey.value === 'startTime') dataForm.startTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
		else if (curTimeKey.value === 'endTime') dataForm.endTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
	}

	let dataForm = reactive({
		projectId: '',
		holeNo: '',
		holeType: '',
		startTime: '',
		endTime: '',
		longitude: '',
		latitude: '',
		diameter: '',
		sWaterLevel: '',
		elevation: '',
		reevlResouce: '',
		remark: '',
		files: []
	})

	function parseData(_data) {
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.holeId = uni.getStorageSync('holeId')
		_data.id = uni.getStorageSync('wellBaseId')
	}

	function addOrUpdateData() {
		// dataForm.files = parseFiles(dataForm.files)
		// dataForm = (dataForm)
		parseData(dataForm)
		if (!dataForm.id) {
			addHoleRecord(dataForm).then(res => console.log('success!'))
		} else {
			updateHoleRecord(dataForm.id, dataForm)
		}
		uni.$emit('refresh')
	}

	function initData() {
		const id = uni.getStorageSync('wellBaseId')
		if (id) {
			getHoleRecordDetail(id).then(res => {
				// Object.assign(dataForm,res.data)
				dataForm = dataInfo(res.data)
			})
		}
	}
	onLoad(async () => {
		// await initData()
		getwellTypeOptions()
	})

	function goToBack() {
		uni.setStorageSync('wellBaseId', null)
		uni.navigateBack({
			delta: 1
		})
	}
	const files = ref([])

	function dataInfo(_dataAll) {
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		files.value = _dataAll.files
		return _dataAll
	}
</script>

<style lang="scss" scoped>
</style>