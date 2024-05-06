<template>
	<view class="main-container" v-if="visible">
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
					<text @click="addOrUpdateData()" type="primary" class="submit"
						style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
				</view>
			</view>
			<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
				<u-form-item label-width='100px' label="样品名称" prop="sampleName"><u-input
						v-model="dataForm.sampleName" /></u-form-item>
				<u-form-item label-width='100px' label="采样深度" prop="sampleDepth"><u-number-box :positive-integer="false"
						v-model="dataForm.sampleDepth"></u-number-box></u-form-item>
				<u-form-item label-width='100px' label="PID读数" prop="pidReading"><u-number-box :positive-integer="false"
						v-model="dataForm.pidReading"></u-number-box></u-form-item>
				<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input
						@click="showPickerDate('startTime')" type="select" v-model="dataForm.startTime" /></u-form-item>
				<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input @click="showPickerDate('endTime')"
						type="select" v-model="dataForm.endTime" /></u-form-item>
				<u-form-item label-width="150" label="送检" prop="isInspection">
					<u-radio-group v-model="dataForm.isInspection">
						<u-radio :name="val.value" :disabled="val.disabled" v-for="(val,index) of isInspectionRadio"
							:key="index">{{val.name}}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label-width='100px' label="样品编号" prop="sampleNo"><u-input
						v-model="sampleNoOptions.current.label" type="select"
						@click="sampleNoOptions.show=true" /></u-form-item>
				<u-form-item label-width="150" label="添加平行样" prop="hasParallelSample">
					<u-radio-group v-model="dataForm.hasParallelSample">
						<u-radio :name="val.value" :disabled="val.disabled"
							v-for="(val,index) of hasParallelSampleRadio" :key="index">{{val.name}}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label-width='120px' label="平行样样品编号" prop="relationSampleId"><u-input
						v-model="relationSampleIdOptions.current.label" type="select"
						@click="relationSampleIdOptions.show=true" /></u-form-item>
				<u-form-item label-width='100px' label="样品保存方式" prop="storageMethod"><u-input type='number'
						v-model="dataForm.storageMethod" /></u-form-item>
				<u-form-item label-width="100px" label="分析指标"><u-input type="select" v-model="selectName"
						@click="showPicker" /></u-form-item>
				<u-form-item label-width='100px' label="上传图片" prop="file">
					<upload :watermark='true' @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files">
					</upload>
				</u-form-item>
			</u-form>
			<u-button class="xrf-btn" type="primary" @click="goXrfConf">编辑xrf</u-button>
			<ba-tree-picker ref="treePicker" :multiple='true' @select-change="selectChange" title="选择分析指标"
			@initDataName="initDataName" :propsInitId="initAnalysisFactorIds" :selectParent="false"	:localdata="factorTreeList" valueKey="id" textKey="factorName" childrenKey="children" />
			<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
				:default-time='getCurrentTime()'></u-picker>
			<u-select v-model="sampleNoOptions.show" value-name="sampleNo" label-name="sampleNo"
				:list="sampleNoOptions.list" @confirm="onSampleNoOptions"></u-select>
			<u-select v-model="relationSampleIdOptions.show" value-name="sampleNo" label-name="sampleNo"
				:list="relationSampleIdOptions.list" @confirm="onRelationSampleIdOptions"></u-select>
		</view>
	</view>
	<editorXRF ref="xrfRef" @emitVisible="(val)=>{visible = val}" @curConfData="(val)=>XRFConfList=val"></editorXRF>
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
		onReady
	} from '@dcloudio/uni-app'
	import upload from '@/components/cityk-upload.vue';
	import {
		getMenuId,
		getCurrentTime
	} from '@/utils/index.js';
	import {
		addSoilRecord,
		updateSoilRecord,
		getSoilRecordDetail,
		getSampleBase,
		getSoilRecordList
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade,
		getFactorTreeList,
		getXRFConf
	} from '@/api/dictionary'
	// import tree from '@/components/ba-tree-picker/ba-tree-picker.vue'
	import editorXRF from './editorXRF.vue';
	const form = ref(null)
	const rules = reactive({
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
			message: '请输入结束时间',
			trigger: 'blur',
		}]
	})
	onReady(() => {
		form.value.setRules(rules);
	})
	const curSampleNameList = ref([])

	function getCurSampleNameList() {
		return new Promise(resolve=>{
			let _query = {
				currentPage: 1,
				projectId: uni.getStorageSync('projectId'),
				holeId: uni.getStorageSync('holeId'),
				sort: 'desc',
				sidx: '',
				menuId: getMenuId('项目列表')
			}
			getSoilRecordList(_query).then(res => {
				curSampleNameList.value = res.data.list.map(item => {
				          return item.sampleName
				        })
						resolve()
			})
		})
	}
	const visible = ref(true)
	const xrfRef = ref(null)

	function goXrfConf() {
		visible.value = false
		xrfRef.value.xrfConfVisible = true
		xrfRef.value.curXrfConf = XRFConfList.value
		xrfRef.value.curXrfConfLength = XRFConfLength.value
	}
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
		dataForm.value.analysisFactorIds = ids
		selectName.value = names
	}
	function initDataName(val){
		if(!selectName.value.length){
			val.forEach((item,index)=>{
					if(index<val.length-1){
						selectName.value += item + '/'
					}else{
						selectName.value += item
					}
			})
		}
	}
	onLoad(() => {
		getfactorTypeOptions()
		// initDataName()
	})
	 // initData里面执行
	const initAnalysisFactorIds = ref([])
	function handelAnalysisFactorIds(){
		if(dataForm.value.analysisFactorIds){
		initAnalysisFactorIds.value = dataForm.value.analysisFactorIds.split(",")
		}
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
			sampleType: '1'
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
	// 初始化XRF
	const XRFConfList = ref([])
	const XRFConfLength = ref()

	function initXRF() {
		let _query = {}
		getXRFConf(_query).then(res => {
			let _list = []
			for (let i = 0; i < res.data.list.length; i++) {
				let _data = res.data.list[i]
				let value = {
					elementCode: _data.elementCode,
					elementName: _data.elementName,
					elementSort: _data.elementSort,
					reading: null
					// soilSampleId: null
				}
				_list.push(value)
			}
			XRFConfList.value = _list
			XRFConfLength.value = _list.length
		})
	}
	let dataForm = ref({
		projectId: '',
		holeId: '',
		holeNo: '',
		sampleId: '',
		sampleDepth: '',
		sampleNo: '',
		sampleName: '',
		sampleCutLength: '',
		pidReading: '',
		isInspection: 0,
		startTime: '',
		endTime: '',
		hasParallelSample: 0,
		relationSampleId: '',
		relationSampleName: '',
		sampleTransportId: '',
		storageMethod: '',
		analysisFactorIds: '',
		xrfDetailsList: [],
		files: []
	})

	function parseData(data) {
		var _data = JSON.parse(JSON.stringify(data))
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.xrfDetailsList = XRFConfList.value
		_data.analysisFactorIds = data.analysisFactorIds.toString()
		_data.projectId = uni.getStorageSync('projectId')
		_data.holeId = uni.getStorageSync('holeId')
		_data.id = uni.getStorageSync('wellBaseId')
		return _data
	}

	function addOrUpdateData() {
		form.value.validate(valid => {
			if (valid) {
				const id = uni.getStorageSync('soilSampleId')
				dataForm.value = parseData(dataForm.value)
				if (!id) {
					addSoilRecord(dataForm.value).then(res => ToastFn('创建成功'))
				} else {
					updateSoilRecord(id, dataForm.value).then(res => ToastFn('修改成功'))
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

	function dataInfo(dataAll) {
		let _dataAll = dataAll
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		_dataAll.hasParallelSample = _dataAll.hasParallelSample == "true" ? "1" : "0"
		_dataAll.isInspection = _dataAll.isInspection == "true" ? "1" : "0"
		dataForm.value = _dataAll
	}

	function initData() {
		return new Promise(resolve=>{
			const id = uni.getStorageSync('soilSampleId')
			if (id) {
				getSoilRecordDetail(id).then(res => {
					dataInfo(res.data)
					curSampleNameList.value = curSampleNameList.value.filter(item => {
						return item !== dataForm.value.sampleName
					})
					handelAnalysisFactorIds()
					XRFConfList.value = dataForm.value.xrfDetailsList
					XRFConfLength.value = dataForm.value.xrfDetailsList.length
				})
			} else {
				initXRF()
			}
		})
	}
	onLoad(async() => {
		await getCurSampleNameList()
		await initData()
		getSampleNoOptions()
		
	})

	function goToBack() {
		uni.setStorageSync('soilSampleId', null)
		uni.navigateBack({
			delta: 1
		})
	}
</script>

<style lang="scss" scoped>
	.mo-container {
		padding-bottom: 10px;
	}

	.xrf-btn {
		width: 100px;
		margin: 10px auto;
	}
</style>