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
			<u-form-item label-width='100px' label="样品编号" prop="sampleNo"><u-input
					v-model="sampleNoOptions.current.label" type="select"
					@click="sampleNoOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="样品名称" prop="sampleName"><u-input
					v-model="dataForm.sampleName" /></u-form-item>
			<u-form-item label-width='100px' label="质控样品类型" prop="sampleType"><u-input
					v-model="sampleTypeOptions.current.label" type="select"
					@click="sampleTypeOptions.show=true" /></u-form-item>
			<u-form-item label-width="100px" label="分析指标"><u-input
					v-model="selectName" @click="showPicker"/></u-form-item>
			<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input @click="showPickerDate('startTime')"
					v-model="dataForm.startTime" /></u-form-item>
			<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input @click="showPickerDate('endTime')"
					v-model="dataForm.endTime" /></u-form-item>
			<u-form-item label-width='100px' label="备注" prop="remark"><u-input
					v-model="dataForm.remark" /></u-form-item>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload :watermark='true' @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files"></upload>
			</u-form-item>
		</u-form>
		<ba-tree-picker ref="treePicker" :multiple='true' @select-change="selectChange" title="选择分析指标"
		    :localdata="factorTreeList" valueKey="id" textKey="factorName" childrenKey="children" />
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
		getProjectBaseList
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade
	} from '@/api/dictionary'
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
			dataForm.analysisFactorIds = ids
			selectName.value = names
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
		getProjectBaseList(_query).then(res => {
			sampleNoOptions.list = res.data.list
		})
	}

	function onSampleNoOptions(arr) {
		let current = arr[0];
		wellTypeOptions.current = current;
		dataForm.holeType = current.label;
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
		wellTypeOptions.current = current;
		dataForm.holeType = current.label;
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
		analysisFactorIds: []
	})

	function parseData(data) {
		var _data = JSON.parse(JSON.stringify(data))
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.id = uni.getStorageSync('QCSampleId')
		return _data
	}

	function addOrUpdateData() {
		dataForm = parseData(dataForm)
		if (!dataForm.id) {
			addHoleRecord(dataForm).then(res => console.log('success!'))
		} else {
			updateHoleRecord(dataForm.id, dataForm)
		}
	}

	function initData() {
		const id = uni.getStorageSync('QCSampleId')
		if (id) {
			getHoleRecordDetail(id).then(res => {
				dataInfo(res.data)
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