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
		<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
			<u-form-item label-width='100px' label="监测井编号" prop="wellNo"><u-input
					v-model="dataForm.wellNo" /></u-form-item>
			<u-form-item label-width='100px' label="监测井类型" prop="wellType"><u-input v-model="dataForm.wellType"
					type="select" @click="wellTypeOptions.show=true" /></u-form-item>
			<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
			<u-form-item label-width='100px' label="建井开始时间" prop="startTime"><u-input type="select"
					@click="showPickerDate('startTime')" v-model="dataForm.startTime" /></u-form-item>
			<u-form-item label-width='100px' label="建井结束时间" prop="endTime"><u-input type="select"
					@click="showPickerDate('endTime')" v-model="dataForm.endTime" /></u-form-item>
			<driver style="margin-top: 20px; width:95vw;"></driver>
			<u-form-item label-width='100px' label="井深" prop="wellDepth">
				<u-input type="number" v-model="dataForm.wellDepth"></u-input>
				<span>(单位: m)</span>
			</u-form-item>

			<u-form-item label-width='100px' label="井管内径" prop="wellDiameter">
				<u-input type="number" v-model="dataForm.wellDiameter"></u-input>
				<span>(单位: cm)</span>
			</u-form-item>

			<u-form-item label-width='100px' label="井口高程" prop="wellElevation">
				<u-input type="number" v-model="dataForm.wellElevation"></u-input>
				<span>(单位: m)</span>
			</u-form-item>

			<driver style="margin-top: 20px; width: 95vw;"></driver>

			<u-form-item label-width='100px' label="筛管切缝尺寸" prop="sieveTubeSlitSize">
				<u-input type="number" v-model="dataForm.sieveTubeSlitSize"></u-input>
				<span>(单位: mm)</span>
			</u-form-item>

			<u-form-item label-width='100px' label="顶部深度" prop="sieveTubeTopDepth">
				<u-input type="number" v-model="dataForm.sieveTubeTopDepth"></u-input>
				<span>(单位: m)</span>
			</u-form-item>

			<u-form-item label-width='100px' label="底部深度" prop="sieveTubeBottomDepth">
				<u-input type="number" v-model="dataForm.sieveTubeBottomDepth"></u-input>
				<span>(单位: m)</span>
			</u-form-item>

			<driver style="margin-top: 20px; width: 95vw;"></driver>

			<u-form-item label-width='100px' label="过滤层类型" prop="filterLayerType">
				<u-input type="number" v-model="dataForm.filterLayerType"></u-input>
			</u-form-item>

			<u-form-item label-width='100px' label="顶部深度" prop="filterLayerTopDepth">
				<u-input type="number" v-model="dataForm.filterLayerTopDepth"></u-input>
				<span>(单位: m)</span>
			</u-form-item>

			<u-form-item label-width='100px' label="底部深度" prop="filterLayerBottomDepth">
				<u-input type="number" v-model="dataForm.filterLayerBottomDepth"></u-input>
				<span>(单位: m)</span>
			</u-form-item>
			<driver style="margin-top: 20px; width: 95vw;"></driver>
			<u-form-item label-width='100px' label="过滤层类型" prop="filterLayerType"><u-input
					v-model="dataForm.filterLayerType" /></u-form-item>

			<u-form-item label-width='100px' label="顶部深度" prop="waterBarrierTopDepth">
				<u-input type="number" v-model="dataForm.waterBarrierTopDepth"></u-input>
				<span>(单位: m)</span>
			</u-form-item>

			<u-form-item label-width='100px' label="底部深度" prop="waterBarrierBottomDepth">
				<u-input type="number" v-model="dataForm.waterBarrierBottomDepth"></u-input>
				<span>(单位: m)</span>
			</u-form-item>

			<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload :watermark='true' @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files">
				</upload>
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
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import upload from '@/components/cityk-upload.vue';
	import {
		getMenuId,
		getCurrentTime
	} from '@/utils/index.js';
	import {
		addWellBase,
		updateWellBase,
		getWellBaseDetail
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade
	} from '@/api/dictionary'
	import driver from '@/components/driver.vue'
	const form = ref(null)
	const rules = reactive({
		wellNo: [{
			required: true,
			message: '请输入监测井编号',
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
	// 监测井类型
	const wellTypeOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getwellTypeOptions() {
			return new Promise(resolve=>{
				getDictionaryDataSelector('497335660487647813').then(res => {
					wellTypeOptions.list = res.data.list
					resolve()
				})
			})
	}

	function onWellTypeOptions(arr) {
		let current = arr[0];
		wellTypeOptions.current = current;
		dataForm.value.wellType = current.label;
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
		holeId: '',
		wellNo: '',
		wellType: '',
		startTime: '',
		endTime: '',
		wellDepth: 0,
		wellDiameter: 0,
		wellElevation: 0,
		swaterLevelDepth: 0,
		sieveTubeSlitSize: 0,
		sieveTubeTopDepth: 0,
		sieveTubeBottomDepth: 0,
		filterLayerType: '',
		filterLayerTopDepth: 0,
		filterLayerBottomDepth: 0,
		waterBarrierType: '',
		waterBarrierTopDepth: 0,
		waterBarrierBottomDepth: 0,
		files: []
	})

	function parseData(data) {
		const _data = data
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.holeId = uni.getStorageSync('holeId')
		_data.id = uni.getStorageSync('wellBaseId')
		const wellType = wellTypeOptions?.list?.find(item => item.fullName === _data.wellType)
			?.enCode ?? '';
	    _data.wellType = wellType
		return _data
	}

	function addOrUpdateData() {
		form.value.validate(valid => {
			if (valid) {
				dataForm.value = parseData(dataForm.value)
				if (!dataForm.value.id) {
					addWellBase(dataForm.value).then(res => ToastFn('创建成功'))
				} else {
					updateWellBase(dataForm.value.id, dataForm.value).then(res => ToastFn('修改成功'))
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

	function dataInfo(_dataAll) {
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		const wellType = wellTypeOptions?.list?.find(item => item.enCode === _dataAll.wellType)
			?.fullName ?? '';
		_dataAll.wellType = wellType
		console.log(wellType,_dataAll,'---')
		return _dataAll
	}

	function initData() {
		const id = uni.getStorageSync('wellBaseId')
		if (id) {
			getWellBaseDetail(id).then(res => {
				dataForm.value = dataInfo(res.data)
			})
		}
	}
	onLoad(async() => {
		await getwellTypeOptions()
		initData()
		
	})

	function goToBack() {
		uni.setStorageSync('wellBaseId', null)
		uni.navigateBack({
			delta: 1
		})
	}
</script>

<style lang="scss" scoped>
</style>