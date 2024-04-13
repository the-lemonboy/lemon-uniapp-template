<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">
		<view class="top_view"></view>
	</view>
	<!-- #endif -->
	<view class="mo-container">
		<view class="nav-bar"
			style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
			<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
			<text class="title"
				style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">建井信息</text>
			<text @click="addOrUpdateData()" type="primary" class="submit"
				style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
		</view>
		<u-toast ref="uToast" />
		<u-form :model="dataForm" ref="Form" style="margin: 10px;">
			<u-form-item label-width='100px' label="监测井编号" prop="startDepth"><u-input type='number'
					v-model="dataForm.startDepth" /></u-form-item>
			<u-form-item label-width='100px' label="监测井类型" prop="wellType"><u-input v-model="wellTypeOptions.current.label"
					type="select" @click="wellTypeOptions.show=true" /></u-form-item>
			<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
			<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input @click="showPickerDate('startTime')"
					v-model="dataForm.startTime" /></u-form-item>
			<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input @click="showPickerDate('endTime')"
					v-model="dataForm.endTime" /></u-form-item>
			<u-form-item label-width='100px' label="井深" prop="wellDepth"><u-number-box
					v-model="dataForm.wellDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="井管内径" prop="wellDiameter"><u-number-box
					v-model="dataForm.wellDiameter"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="井口高程" prop="swaterLevelDepth"><u-number-box v-model="dataForm.wellElevation"
					 ></u-number-box></u-form-item>
			<!-- <text>监测井信息</text> -->
			<u-form-item label-width='100px' label="筛管切缝尺寸" prop="sieveTubeSlitSize"><u-number-box v-model="dataForm.sieveTubeSlitSize"
					></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="顶部深度" prop="sieveTubeTopDepth"><u-number-box
					v-model="dataForm.sieveTubeTopDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="底部深度" prop="sieveTubeBottomDepth"><u-number-box
					v-model="dataForm.sieveTubeBottomDepth" ></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="过滤层类型" prop="filterLayerType"><u-input type='number'
					v-model="dataForm.filterLayerType" /></u-form-item>
			<u-form-item label-width='100px' label="顶部深度" prop="filterLayerTopDepth"><u-number-box
					v-model="dataForm.filterLayerTopDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="底部深度" prop="filterLayerBottomDepth"><u-number-box
					v-model="dataForm.filterLayerBottomDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="隔水层类型" prop="waterBarrierType"><u-input type='number'
					v-model="dataForm.waterBarrierType" /></u-form-item>
			<u-form-item label-width='100px' label="顶部深度" prop="filterLayerTopDepth"><u-number-box
					v-model="dataForm.filterLayerTopDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="底部深度" prop="filterLayerBottomDepth"><u-number-box
					v-model="dataForm.filterLayerBottomDepth"></u-number-box></u-form-item>
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
		nextTick,
		watch
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
		        holeId: '',
		        wellNo: '',
		        wellType: '',
		        startTime: '',
		        endTime: '',
		        wellDepth: '',
		        wellDiameter: '',
		        wellElevation: '',
		        swaterLevelDepth: '',
		        sieveTubeSlitSize: '',
		        sieveTubeTopDepth: '',
		        sieveTubeBottomDepth: '',
		        filterLayerType: '',
		        filterLayerTopDepth: '',
		        filterLayerBottomDepth: '',
		        waterBarrierType: '',
		        waterBarrierTopDepth: '',
		        waterBarrierBottomDepth: '',
		        files: []
	})
	watch(dataForm, (newVal, oldVal) => {
		console.log(newVal, oldVal);
	}, {
		deep: true
	});
	function parseData(data) {
		var _data = JSON.parse(JSON.stringify(data))
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.holeId = uni.getStorageSync('holeId')
		_data.id = uni.getStorageSync('wellBaseId')
		return _data
	}

	function addOrUpdateData() {
		// dataForm.files = parseFiles(dataForm.files)
		// dataForm = (dataForm)
		dataForm = parseData(dataForm)
		if (!dataForm.id) {
			addHoleRecord(dataForm).then(res => console.log('success!'))
		} else {
			updateHoleRecord(dataForm.id, dataForm)
		}
	}

	function initData() {
		const id = uni.getStorageSync('wellBaseId')
		if (id) {
			getHoleRecordDetail(id).then(res => {
				// Object.assign(dataForm,res.data)
				dataInfo(res.data)
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

	function dataInfo(dataAll) {
		let _dataAll = dataAll
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		dataForm = _dataAll
	}
</script>

<style lang="scss" scoped>
</style>