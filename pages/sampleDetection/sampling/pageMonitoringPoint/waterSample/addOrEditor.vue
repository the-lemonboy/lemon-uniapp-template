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
				style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">水样记录</text>
			<text @click="addOrUpdateData()" type="primary" class="submit"
				style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
		</view>
		<u-toast ref="uToast" />
		<u-form :model="dataForm" ref="Form" style="margin: 10px;">
			<u-form-item label-width='100px' label="监测井编号" prop="wellId"><u-input v-model="wellIdOptions.current.label"
					type="select" @click="wellIdOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="样品名称(采样)" prop="sampleName"><u-input type='number'
					v-model="dataForm.sampleName" /></u-form-item>
			<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input @click="showPickerDate('startTime')"
					v-model="dataForm.startTime" /></u-form-item>
			<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input @click="showPickerDate('endTime')"
					v-model="dataForm.endTime" /></u-form-item>
			<u-form-item label-width="150" label="是否送检" prop="isInspection">
				<u-radio-group v-model="dataForm.isInspection">
					<u-radio :name="val.value" :disabled="val.disabled" v-for="(val,index) of isInspectionRadio"
						:key="index">{{val.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label-width='100px' label="样品编号" prop="sampleNo"><u-input
					v-model="sampleNoOptions.current.label" type="select"
					@click="sampleNoOptions.show=true" /></u-form-item>
			<u-form-item label-width="150" label="是否添加平行样" prop="hasParallelSample">
				<u-radio-group v-model="dataForm.hasParallelSample">
					<u-radio :name="val.value" :disabled="val.disabled" v-for="(val,index) of hasParallelSampleRadio"
						:key="index">{{val.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label-width='100px' label="平行样样品编号" prop="relationSampleId"><u-input
					v-model="relationSampleIdOptions.current.label" type="select"
					@click="relationSampleIdOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="样品保存方式" prop="storageMethod"><u-input type='number'
					v-model="dataForm.storageMethod" /></u-form-item>
		<!-- 	<u-form-item label-width='100px' label="采样设备" prop="deviceIdOptions"><u-input
					v-model="deviceIdOptions.current.label" type="select"
					@click="deviceIdOptions.show=true" /></u-form-item> -->
	<!-- 		<u-form-item label-width='100px' label="分析指标" prop="deviceIdOptions"><u-input
					v-model="deviceIdOptions.current.label" /></u-form-item> -->
			<u-form-item label-width='100px' label="井深" prop="waterTemperature"><u-number-box
					v-model="dataForm.waterTemperature"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="pH值" prop="waterPh"><u-number-box
					v-model="dataForm.waterPh"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="电导率" prop="waterConductivity"><u-number-box
					v-model="dataForm.waterConductivity"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="氧化还原电位" prop="oxReductionPotential"><u-number-box
					v-model="dataForm.oxReductionPotential"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="溶解氧" prop="dissolvedOxygen"><u-number-box
					v-model="dataForm.dissolvedOxygen"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="浊度" prop="waterTurbidity"><u-number-box
					v-model="dataForm.waterTurbidity"></u-number-box></u-form-item>
			<u-form-item label-width="100px" label="发现NAPL" prop="hasNapl">
				<u-radio-group v-model="dataForm.hasNapl">
					<u-radio :name="val.value" :disabled="val.disabled" v-for="(val,index) of hasNaplRadio"
						:key="index">{{val.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<!-- <upload :value="dataForm.files" @input="handleInput"></upload> -->
			</u-form-item>
		</u-form>
		<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
			:default-time='getCurrentTime()'></u-picker>
		<u-select v-model="wellIdOptions.show" value-name="wellNo" label-name="wellNo" :list="wellIdOptions.list"
			@confirm="onWellTypeOptions"></u-select>
		<u-select v-model="sampleNoOptions.show" value-name="sampleNo" label-name="sampleNo"
			:list="sampleNoOptions.list" @confirm="onSampleNoOptions"></u-select>
		<u-select v-model="relationSampleIdOptions.show" value-name="enCode" label-name="fullName"
			:list="relationSampleIdOptions.list" @confirm="onRelationSampleIdOptions"></u-select>
	<!-- 	<u-select v-model="deviceIdOptions.show" value-name="enCode" label-name="fullName" :list="deviceIdOptions.list"
			@confirm="onDeviceIdOptions"></u-select> -->
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
		getHoleRecordDetail,
		getWellBaseList,
		getProjectBaseList
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade
	} from '@/api/dictionary'
	// 监测井类型
	const wellIdOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getWellIdOptions() {
		let _query = {
			projectId: uni.getStorageSync('projectId'),
			holeId: uni.getStorageSync('holeId')
		}
		getWellBaseList(_query).then(res => {
			wellIdOptions.list = res.data
		})
	}

	function onWellTypeOptions(arr) {
		let current = arr[0];
		wellTypeOptions.current = current;
		dataForm.wellId = current.value;
	}
	// 样品编号
	const sampleNoOptions = reactive({
		show: false,
		current: {},
		list: []
	})
const relationSampleIdOptions = reactive({
		show: false,
		current: {},
		list: []
	})
	function getSampleNoOptions() {
		let _query = {
			projectId: uni.getStorageSync('projectId'),
			sampleType: '2'
		}
		getProjectBaseList(_query).then(res => {
			sampleNoOptions.list = res.data
		})
	}

	function onSampleNoOptions(arr) {
		let current = arr[0];
		sampleNoOptions.current = current;
		dataForm.sampleNo = current.value;
	}

	function onRelationSampleIdOptions(arr) {
		let current = arr[0];
		relationSampleIdOptions.current = current;
		dataForm.relationSampleId = current.value;
	}
	// 采样设备
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
		holeNo: '',
		wellId: '',
		sampleId: '',
		sampleNo: '',
		sampleName: '',
		deviceId: '',
		waterTemperature: '',
		waterPh: '',
		waterConductivity: '',
		oxReductionPotential: '',
		dissolvedOxygen: '',
		waterTurbidity: '',
		hasNapl: 0,
		waterQualityDesc: '',
		isInspection: 0,
		startTime: '',
		endTime: '',
		hasParallelSample: 0,
		relationSampleId: '',
		relationSampleId: '',
		sampleTransportId: '',
		storageMethod: '',
		analysisFactorIds: ''
	})
	const isInspectionRadio = ref([{
			name: "是",
			value: "1",
			disabled: false
		},
		{
			name: "否",
			value: "0",
			disabled: false
		}
	])
	const hasParallelSampleRadio = ref([{
			name: "是",
			value: "1",
			disabled: false
		},
		{
			name: "否",
			value: "0",
			disabled: false
		}
	])
	const hasNaplRadio = ref([{
			name: "是",
			value: "1",
			disabled: false
		},
		{
			name: "否",
			value: "0",
			disabled: false
		}
	])

	function parseData(data) {
		var _data = JSON.parse(JSON.stringify(data))
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.holeId = uni.getStorageSync('holeId')
		_data.id = uni.getStorageSync('water')
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
		const id = uni.getStorageSync('waterSampleId')
		if (id) {
			getHoleRecordDetail(id).then(res => {
				// Object.assign(dataForm,res.data)
				dataInfo(res.data)
			})
		}
	}
	onLoad(async () => {
		// await initData()
		initData()
		getWellIdOptions()
		getSampleNoOptions()
	})

	function goToBack() {
		uni.setStorageSync('waterSampleId', null)
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