<template>
	<view class="main-container" v-if="mainVisible">
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
				<u-form-item label-width='100px' label="钻孔编号" prop="holeNo"><u-input
						v-model="dataForm.holeNo" /></u-form-item>
				<u-form-item label-width='100px' label="采样类型" prop="holeType"><u-input
						v-model="holeTypeOptions.current.label" type="select"
						@click="holeTypeOptions.show=true" /></u-form-item>
				<u-form-item label-width='100px' label="经纬度" prop="startTime"><u-input
						v-model="dataForm.longitude" /><u-input v-model="dataForm.latitude" /><uni-icons
						@click="mainVisible = false" type="location-filled" size="30"
						style="color: green;"></uni-icons></u-form-item>
				<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input
						@click="showPickerDate('startTime')" v-model="dataForm.startTime" /></u-form-item>
				<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input @click="showPickerDate('endTime')"
						v-model="dataForm.endTime" /></u-form-item>
				<u-form-item label-width='100px' label="钻孔直径" prop="diameter"><u-number-box :positive-integer="false"
						v-model="dataForm.diameter"></u-number-box></u-form-item>
				<u-form-item label-width='100px' label="初见水位埋深" prop="sWaterLevel"><u-number-box
						:positive-integer="false" v-model="dataForm.sWaterLevel"></u-number-box></u-form-item>
				<u-form-item label-width='100px' label="地面高程" prop="elevation"><u-number-box :positive-integer="false"
						v-model="dataForm.elevation"></u-number-box></u-form-item>
				<u-form-item label-width='100px' label="参考高程来源" prop="reevlResouce"><u-input
						v-model="dataForm.reevlResouce" /></u-form-item>
				<u-form-item label-width='100px' label="备注" prop="remark"><u-input
						v-model="dataForm.remark" /></u-form-item>
				<u-form-item label-width='100px' label="上传图片" prop="file">
					<upload @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files"></upload>
				</u-form-item>
			</u-form>
			<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
				:default-time='getCurrentTime()'></u-picker>
			<u-select v-model="holeTypeOptions.show" value-name="enCode" label-name="fullName"
				:list="holeTypeOptions.list" @confirm="onHoleTypeOptions"></u-select>
		</view>
	</view>
	<tMap v-else @emitVisible="(val)=>mainVisible=val" @emitLocation="emitLocation"></tMap>
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
		addHoleRecord,
		updateHoleRecord,
		getHoleBaseDetail
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade
	} from '@/api/dictionary'
	import tMap from './tMap.vue'
	const mainVisible = ref(true)
	const location = ref()
	function emitLocation(val){
		location.value = val
		dataForm.longitude = val.latlng.lng
		dataForm.latitude = val.latlng.lat
	}
	// 监测井类型
	const holeTypeOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getHoleTypeOptions() {
		getDictionaryDataSelector('485002738363531269').then(res => {
			holeTypeOptions.list = res.data.list
		})
	}

	function onHoleTypeOptions(arr) {
		let current = arr[0];
		holeTypeOptions.current = current;
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
		diameter: 0,
		sWaterLevel: 0,
		elevation: 0,
		reevlResouce: '',
		remark: '',
		files: []
	})
	function showPickerDate(value) {
		curTimeKey.value = value,
		selectTimeVisible.value = true
	}
	
	function parseData(data) {
		var _data = JSON.parse(JSON.stringify(data))
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.id = uni.getStorageSync('holeId')
		return _data
	}

	function addOrUpdateData() {
		// dataForm.files = parseFiles(dataForm.files)
		// dataForm = (dataForm)
		dataForm = parseData(dataForm)
		if (!dataForm.id) {
			getHoleBaseDetail(dataForm).then(res => console.log('success!'))
		} else {
			updateHoleRecord(dataForm.id, dataForm)
		}
	}

	function initData() {
		const id = uni.getStorageSync('holeId')
		if (id) {
			// debugger
			getHoleBaseDetail(id).then(res => {
				// Object.assign(dataForm,res.data)
				dataInfo(res.data)
			})
		}
	}
	onLoad(async () => {
		initData()
		getHoleTypeOptions()

	})

	function goToBack() {
		uni.setStorageSync('holeId', null)
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
		Object.assign(dataForm, _dataAll)
		// dataForm = _dataAll
	}
</script>

<style lang="scss" scoped>
</style>