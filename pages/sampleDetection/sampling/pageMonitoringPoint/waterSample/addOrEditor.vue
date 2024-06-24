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
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">水样记录</text>
				<text @click="addOrUpdateData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
			<u-form-item label-width='100px' label="监测井编号" prop="wellId"><u-input v-model="dataForm.wellId"
					type="select" @click="wellIdOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="样品名称" prop="sampleName"><u-input
					v-model="dataForm.sampleName" /></u-form-item>
			<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input type="select"
					@click="showPickerDate('startTime')" v-model="dataForm.startTime" /></u-form-item>
			<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input type="select"
					@click="showPickerDate('endTime')" v-model="dataForm.endTime" /></u-form-item>
			<u-form-item label-width="150" label="送检" prop="isInspection">
				<u-radio-group v-model="dataForm.isInspection">
					<u-radio :name="val.value" :disabled="val.disabled" v-for="(val,index) of isInspectionRadio"
						:key="index" @change="isInspectionChange">{{val.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item v-if="isInspectionFlag" label-width='100px' label="样品编号" prop="sampleNo"><u-input v-model="dataForm.sampleNo"
					type="select" @click="sampleNoOptions.show=true" /></u-form-item>
			<u-form-item v-if="isInspectionFlag" label-width='100px' label="样品保存方式" prop="storageMethod"><u-input type='number'
					v-model="dataForm.storageMethod" /></u-form-item>
			<u-form-item v-if="isInspectionFlag" label-width="120px" label="添加平行样" prop="hasParallelSample">
				<u-radio-group v-model="dataForm.hasParallelSample">
					<u-radio :name="val.value" :disabled="val.disabled" v-for="(val,index) of hasParallelSampleRadio"
						:key="index" @change="hasParallelSampleChange">{{val.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item v-if="isInspectionFlag && hasParallelSampleFlag" label-width='120px' label="平行样样品编号" prop="relationSampleId"><u-input
					v-model="relationSampleIdOptions.current.label" type="select"
					@click="relationSampleIdOptions.show=true" /></u-form-item>
			<u-form-item v-if="isInspectionFlag && hasParallelSampleFlag" label-width='100px' label="平行样样品名称"
				prop="relationSampleName"><u-input type='number' v-model="dataForm.relationSampleName" /></u-form-item>
			<u-form-item label-width="100px" label="分析指标"><u-input type="select" v-model="selectName"
					@click="showPicker" /></u-form-item>
			<u-form-item label-width='100px' label="井深" prop="waterTemperature"><u-number-box :positive-integer="false"
					v-model="dataForm.waterTemperature"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="pH值" prop="waterPh"><u-number-box :positive-integer="false"
					v-model="dataForm.waterPh"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="电导率" prop="waterConductivity"><u-number-box
					:positive-integer="false" v-model="dataForm.waterConductivity"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="氧化还原电位" prop="oxReductionPotential"><u-number-box
					:positive-integer="false" v-model="dataForm.oxReductionPotential"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="溶解氧" prop="dissolvedOxygen"><u-number-box :positive-integer="false"
					v-model="dataForm.dissolvedOxygen"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="浊度" prop="waterTurbidity"><u-number-box :positive-integer="false"
					v-model="dataForm.waterTurbidity"></u-number-box></u-form-item>
			<u-form-item label-width="100px" label="发现NAPL" prop="hasNapl">
				<u-radio-group v-model="dataForm.hasNapl">
					<u-radio :name="val.value" :disabled="val.disabled" v-for="(val,index) of hasNaplRadio"
						:key="index">{{val.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload :watermark='true' @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files">
				</upload>
			</u-form-item>
		</u-form>
		<ba-tree-picker ref="treePicker" :multiple='true' @select-change="selectChange" title="选择分析指标"
			@initDataName="initDataName" :propsInitId="initAnalysisFactorIds" :localdata="factorTreeList"
			:selectParent="false" valueKey="id" textKey="factorName" childrenKey="children" />
		<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
			:default-time='getCurrentTime()'></u-picker>
		<u-select v-model="wellIdOptions.show" value-name="wellNo" label-name="wellNo" :list="wellIdOptions.list"
			@confirm="onWellIdOptions"></u-select>
		<u-select v-model="sampleNoOptions.show" value-name="sampleNo" label-name="sampleNo"
			:list="sampleNoOptions.list" @confirm="onSampleNoOptions"></u-select>
		<u-select v-model="relationSampleIdOptions.show" value-name="sampleNo" label-name="sampleNo"
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
		watch,
		onMounted
	} from 'vue'
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import upload from '@/components/cityk-upload.vue';
	import {
		getMenuId,
		getCurrentTime
	} from '@/utils/index.js';
	import {
		addWaterSample,
		updateWaterSample,
		getWaterSampleDetail,
		getWellBaseList,
		getSampleBase,
		getWaterSampleList
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade,
		getFactorTreeList
	} from '@/api/dictionary'
	const form = ref(null)
	const rules = reactive({
		wellId: [{
			required: true,
			message: '请输入监测井编号',
			trigger: 'blur',
		}],
		sampleName: [{
				validator: (rule, value, callback) => {
					if (curSampleNameList.value.includes(value)) {
						callback(new Error('该样品名称已存在'))
						// console.log(value)
						// return false
					} else {
						callback()
						// return true
					}
				},
				message: '请确保样品名称唯一',
				trigger: ['change', 'blur'],
			},
			{
				required: true,
				message: '请输入样品名称',
				trigger: 'blur',
			}
		],
		startTime: [{
			required: true,
			message: '请输入开始时间',
			trigger: 'blur',
		}],
		endTime: [{
			required: true,
			message: '请输入结束深度',
			trigger: 'blur',
		}]
	})
	onReady(() => {
		form.value.setRules(rules);
	})
	const curSampleNameList = ref([])

	function getCurSampleNameList() {
		return new Promise(resolve => {
			let _query = {
				currentPage: 1,
				projectId: uni.getStorageSync('projectId'),
				holeId: uni.getStorageSync('holeId'),
				sort: 'desc',
				sidx: '',
				menuId: getMenuId('项目列表')
			}
			getWaterSampleList(_query).then(res => {
				curSampleNameList.value = res.data.list.map(item => {
					return item.sampleName
				})
				resolve()
			})
		})
	}
	// 分析指标
	// 显示选择器
	const factorTreeList = ref([])
	const treePicker = ref()
	const selectName = ref([])

	function getfactorTypeOptions() {
		const _query = {}
		const id = '505417419548805189'
		getFactorTreeList(id, _query).then(res => {
			factorTreeList.value = res.data.list
		})
	}

	function showPicker() {
		treePicker.value._show();
	}
	//监听选择（ids为数组）
	function selectChange(ids, names) {
		let resulteIds = ids.map(item => BigInt(item))
		resulteIds = resulteIds.join(',')
		dataForm.value.analysisFactorIds = resulteIds
		selectName.value = names
	}

	function initDataName(val) {
		if (!selectName.value.length) {
			val.forEach((item, index) => {
				if (index < val.length - 1) {
					selectName.value += item + '/'
				} else {
					selectName.value += item
				}
			})
		}
	}
	const initAnalysisFactorIds = ref([])
	// initData里面执行
	function handelAnalysisFactorIds() {
		if (dataForm.value.analysisFactorIds) {
			initAnalysisFactorIds.value = dataForm.value.analysisFactorIds.split(",")
			console.log(initAnalysisFactorIds.value)
		}
	}
	onLoad(() => {
		getfactorTypeOptions()
		// initDataName()
	})
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
			wellIdOptions.list = res.data.list
		})
	}

	function onWellIdOptions(arr) {
		let current = arr[0];
		wellIdOptions.current = current;
		dataForm.value.wellId = current.value;
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
		getSampleBase(_query).then(res => {
			sampleNoOptions.list = res.data.list
			relationSampleIdOptions.list = res.data.list
		})
	}

	function onSampleNoOptions(arr) {
		let current = arr[0];
		sampleNoOptions.current = current;
		dataForm.value.sampleNo = current.value;
	}

	function onRelationSampleIdOptions(arr) {
		let current = arr[0];
		relationSampleIdOptions.current = current;
		dataForm.value.relationSampleId = current.value;
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
		if (curTimeKey.value === 'startTime') dataForm.value.startTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
		else if (curTimeKey.value === 'endTime') dataForm.value.endTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
	}

	let dataForm = ref({
		projectId: '',
		holeId: '',
		holeNo: '',
		wellId: '',
		sampleId: '',
		sampleNo: '',
		sampleName: '',
		deviceId: '',
		waterTemperature: 0,
		waterPh: 0,
		waterConductivity: 0,
		oxReductionPotential: 0,
		dissolvedOxygen: 0,
		waterTurbidity: 0,
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
	const isInspectionFlag = ref(false)
	const hasParallelSampleFlag = ref(false)
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
	function isInspectionChange(val){
		if(val == 0){
			isInspectionFlag.value = false
		}else{
			isInspectionFlag.value = true
		}
		
	}
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
	function hasParallelSampleChange(val){
		if(val == 0){
			hasParallelSampleFlag.value = false
		}else{
			hasParallelSampleFlag.value = true
		}
	}
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

	function parseData(_data) {
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.holeId = uni.getStorageSync('holeId')
		_data.id = uni.getStorageSync('waterSampleId')
	}

	function addOrUpdateData() {
		form.value.validate(valid => {
			if (valid) {
				parseData(dataForm.value)
				if (!dataForm.value.id) {
					addWaterSample(dataForm.value).then(res => ToastFn('创建成功'))
				} else {
					updateWaterSample(dataForm.value.id, dataForm.value).then(res => ToastFn('修改成功'))
				}
			}
		});
	}

	function ToastFn(text) {
		uni.$emit('refresh')
		goToBack()
		uni.showToast({
			title: text,
			duration: 2000
		});
	}

	function initData() {
		return new Promise(resolve => {
			const id = uni.getStorageSync('waterSampleId')
			if (id) {
				getWaterSampleDetail(id).then(res => {
					dataForm.value = dataInfo(res.data)
					judgeFlag(res.data)
					curSampleNameList.value = curSampleNameList.value.filter(item => {
						return item !== dataForm.value.sampleName
					})
					handelAnalysisFactorIds()
					resolve()
				})
			}
		})
	}
	function judgeFlag(dataForm){
		if(dataForm.isInspection === 'false' || dataForm.isInspection == 0 || dataForm.isInspection === false  ){
			isInspectionFlag.value = false
		}else{
			isInspectionFlag.value = true
		}
		if(dataForm.hasParallelSample === 'false' || dataForm.hasParallelSample == 0 || dataForm.hasParallelSample === false  ){
			hasParallelSampleFlag.value = false
		}else{
			hasParallelSampleFlag.value = true
		}
	}
	onLoad(async () => {
		getWellIdOptions()
		getSampleNoOptions()
		await getCurSampleNameList()
		await initData()



	})

	function goToBack() {
		uni.setStorageSync('waterSampleId', null)
		uni.navigateBack({
			delta: 1
		})
	}

	function dataInfo(_dataAll) {
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		_dataAll.hasParallelSample = _dataAll.hasParallelSample == "true" ? "1" : "0"
		_dataAll.isInspection = _dataAll.isInspection == "true" ? "1" : "0"
		_dataAll.hasNapl = _dataAll.hasNapl == "true" ? "1" : "0"
		return _dataAll
	}
</script>

<style lang="scss" scoped>
</style>