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
				style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">质控样品</text>
			<text @click="addOrUpdateData()" type="primary" class="submit"
				style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
		</view>
		</view>
		<u-toast ref="uToast" />
		<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
			<u-form-item label-width='100px' label="样品编号" prop="sampleNo"><u-input
					v-model="dataForm.sampleNo" type="select"
					@click="sampleNoOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="样品名称" prop="sampleName"><u-input
					v-model="dataForm.sampleName" /></u-form-item>
			<u-form-item label-width='100px' label="质控样品类型" prop="sampleType"><u-input
					v-model="dataForm.sampleType" type="select"
					@click="sampleTypeOptions.show=true" /></u-form-item>
			<u-form-item label-width="100px" label="分析指标"><u-input type="select"
					v-model="selectName" @click="showPicker"/></u-form-item>
			<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input type="select" @click="showPickerDate('startTime')"
					v-model="dataForm.startTime" /></u-form-item>
			<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input type="select" @click="showPickerDate('endTime')"
					v-model="dataForm.endTime" /></u-form-item>
			<u-form-item label-width='100px' label="备注" prop="remark"><u-input
					v-model="dataForm.remark" /></u-form-item>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload :watermark='true' @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files"></upload>
			</u-form-item>
		</u-form>
		<ba-tree-picker ref="treePicker" :multiple='true' @select-change="selectChange" title="选择分析指标"
		  @initDataName="initDataName" :propsInitId="initAnalysisFactorIds" :localdata="factorTreeList" valueKey="id" :selectParent="false" textKey="factorName" childrenKey="children" />
		<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
			:default-time='getCurrentTime()'></u-picker>
		<u-select v-model="sampleNoOptions.show" value-name="sampleNo" label-name="sampleNo"
			:list="sampleNoOptions.list" @confirm="onSampleNoOptions"></u-select>
		<u-select v-model="sampleTypeOptions.show" value-name="enCode" label-name="fullName"
			:list="sampleTypeOptions.list" @confirm="onSampleTypeOptions"></u-select>
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
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import upload from '@/components/cityk-upload.vue';
	import {
		getMenuId,
		getCurrentTime
	} from '@/utils/index.js';
	import {
		getQCSampleDetail,
		addQCSample,
		updateQCSample,
		getSampleBase
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade,
		getFactorTreeList
	} from '@/api/dictionary'
	
	const form = ref(null)
	const rules = reactive({
		sampleNo: [{
			required: true,
			message: '请输入样品编号',
			trigger: 'blur',
		}],
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
	// 分析指标
	// 显示选择器
	const factorTreeList = ref([]) 
	const treePicker = ref()
	const selectName = ref([])
	function getfactorTypeOptions(){
		const _query = {}
		const id = '505417419548805189'
		getFactorTreeList(id,_query).then(res=>{
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
	 const initAnalysisFactorIds = ref([])
	  // initData里面执行
	 function handelAnalysisFactorIds(){
	 	if(dataForm.value.analysisFactorIds){
			initAnalysisFactorIds.value = dataForm.value.analysisFactorIds.split(",")
		}
	 }
	 onLoad(()=>{
		 getfactorTypeOptions()
	 })
	// 样品编号
	const sampleNoOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getSampleNoOptions() {
		const _query = {
			projectId: uni.getStorageSync('projectId'),
			sampleType: '3'
		}
		getSampleBase(_query).then(res => {
			sampleNoOptions.list = res.data.list
		})
	}

	function onSampleNoOptions(arr) {
		let current = arr[0];
		sampleNoOptions.current = current;
		dataForm.value.sampleNo = current.value;
	}
	// 质控样品类型
	const sampleTypeOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getSampleTypeOptions() {
		getDictionaryDataSelector('497423156592517701').then(res => {
			sampleTypeOptions.list = res.data.list
		})
	}

	function onSampleTypeOptions(arr) {
		let current = arr[0];
		sampleTypeOptions.current = current;
		dataForm.value.sampleType = current.label;
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

	let dataForm = ref({
		projectId: '',
		sampleId: '',
		sampleNo: '',
		sampleName: '',
		sampleType: '',
		weather: '',
		temperature: '',
		startTime: '',
		endTime: '',
		remark: '',
		files: [],
		analysisFactorIds: ''
	})

	function parseData(_data) {
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.id = uni.getStorageSync('QCSampleId')
	}

	function addOrUpdateData() {
		form.value.validate(valid => {
			if (valid) {
		parseData(dataForm.value)
		if (!dataForm.value.id) {
			addQCSample(dataForm.value).then(res =>ToastFn('创建成功'))
		} else {
			updateQCSample(dataForm.value.id, dataForm.value).then(res=>ToastFn('修改成功'))
		}
		}
		});
	}
function ToastFn(text){
	uni.$emit('refresh')
		goToBack()
		uni.showToast({
			title: text,
			duration: 2000
		});
	}
	function initData() {
		const id = uni.getStorageSync('QCSampleId')
		if (id) {
			getQCSampleDetail(id).then(res => {
				dataForm.value = dataInfo(res.data)
				handelAnalysisFactorIds()
			})
		}
	}
	onLoad(() => {
		initData()
		getSampleTypeOptions()
		getSampleNoOptions()
	})

	function goToBack() {
		uni.setStorageSync('QCSampleId', null)
		uni.navigateBack({
			delta: 1
		})
	}

	function dataInfo(_dataAll) {
		let _dataAll = dataAll
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		return _dataAll
	}
</script>

<style lang="scss" scoped>
</style>