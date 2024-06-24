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
				style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">洗井记录</text>
			<text @click="addOrUpdateData()" type="primary" class="submit"
				style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
		</view>
		</view>
		<u-toast ref="uToast" />
		<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
			<u-form-item label-width='100px' label="监测井编号" prop="wellId"><u-input v-model="dataForm.wellId"
					type="select" @click="wellNoOptions.show=true" /></u-form-item>
			<!-- <u-form-item label-width='100px' label="洗井类型" prop="washMode"><u-input  v-model="dataForm.washMode" type="select" @click="washModeOptions.show=true" /></u-form-item> -->
			<u-form-item label-width='100px' label="监测井类型" prop="washMode"><u-input v-model="dataForm.washMode"
					type="select" @click="washModeOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="开始时间" prop="startTime"><u-input type="select"
					@click="showPickerDate('startTime')" v-model="dataForm.startTime" /></u-form-item>
			<u-form-item label-width='100px' label="结束时间" prop="endTime"><u-input type="select"
					@click="showPickerDate('endTime')" v-model="dataForm.endTime" /></u-form-item>
			<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
			<u-form-item label-width='100px' label="洗井设备" prop="deviceId"><u-input
					v-model="dataForm.deviceId" /></u-form-item>
			<u-form-item label-width='100px' label="井水体积" prop="waterVolume"><u-number-box :positive-integer="false"
					v-model="dataForm.waterVolume"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="水温" prop="waterTemperature"><u-number-box :positive-integer="false"
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
			<u-form-item label-width='100px' label="是否发现NAPL" prop="hasNapl">
				<u-radio-group v-model="dataForm.hasNapl">
					<u-radio :name="val.value" :disabled="val.disabled" v-for="(val,index) of selectRadio"
						:key="index">{{val.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label-width='100px' label="备注" prop="waterQualityDesc"><u-input
					v-model="dataForm.waterQualityDesc" /></u-form-item>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload :watermark='true' @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files">
				</upload>
			</u-form-item>
		</u-form>
		<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
			:default-time='getCurrentTime()'></u-picker>
		<u-select v-model="washModeOptions.show" value-name="fullName" label-name="fullName" :list="washModeOptions.list"
			@confirm="onWashModeOptions"></u-select>

		<u-select v-model="wellNoOptions.show" value-name="wellNo" label-name="wellNo" :list="wellNoOptions.list"
			@confirm="onWellNoOptions"></u-select>
	</view>
</template>
<script setup>
	import {
		reactive,
		ref,
		nextTick
	} from 'vue'
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	// import upload from '@/components/ck-upload.vue';
	import upload from '@/components/cityk-upload.vue';
	import {
		getMenuId,
		getCurrentTime
	} from '@/utils/index.js';
	import {
		addWellWashRecord,
		updateWellWashRecord,
		getWellWashRecordDetail,
		getWellBaseList
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector
	} from '@/api/dictionary'
	const form = ref(null)
	const rules = reactive({
		wellId: [{
			required: true,
			message: '请输入监测井编号',
			trigger: 'blur',
		}],
		washMode: [{
			required: true,
			message: '请输入洗井类型',
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
		wellId: '',
		washMode: '',
		startTime: '',
		endTime: '',
		deviceId: '',
		judgmentContent: '',
		waterVolume: 0,
		waterTemperature: 0,
		waterPh: 0,
		waterConductivity: 0,
		oxReductionPotential: 0,
		dissolvedOxygen: 0,
		waterTurbidity: 0,
		hasNapl: 0,
		waterQualityDesc: '',
		files: []
	})
	const selectRadio = ref([{
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
	// 查监测井编号
	const wellNoOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getWellNoOptions() {
		let _query = {
			projectId: uni.getStorageSync('projectId'),
			holeId: uni.getStorageSync('holeId')
		}
		getWellBaseList(_query).then(res => {
			var _list = []
			for (let i = 0; i < res.data.list.length; i++) {
				let _data = res.data.list[i]
				_list.push(_data)
			}

			wellNoOptions.list = _list
		})
	}

	function onWellNoOptions(arr) {
		let current = arr[0];
		wellNoOptions.current = current;
		dataForm.value.wellId = current.value;
	}
	// 监测井类型
	const washModeOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function onWashModeOptions(arr) {
		let current = arr[0];
		washModeOptions.current = current;
		dataForm.value.washMode = current.value;
	}

	function getWashModeOptions() {
		getDictionaryDataSelector('497336968254857797').then(res => {
			washModeOptions.list = res.data.list
		})
	}

	function parseFiles(_data) {
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.holeId = uni.getStorageSync('holeId')
		_data.id = uni.getStorageSync('wellWashRecordId')
	}

	function addOrUpdateData() {
		form.value.validate(valid => {
			if (valid) {
		parseFiles(dataForm.value)
		if (!dataForm.value.id) {
			addWellWashRecord(dataForm.value).then(res => ToastFn('创建成功'))
		} else {
			updateWellWashRecord(dataForm.value.id, dataForm.value).then(res => ToastFn('修改成功'))
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
		_dataAll.hasNapl = _dataAll.hasNapl == "true" ? "1" : "0"
		return _dataAll
	}

	function initData() {
		const id = uni.getStorageSync('wellWashRecordId')
		if (id) {
			getWellWashRecordDetail(id).then(res => {
				dataForm.value = dataInfo(res.data)
			})
		}
	}
	onLoad(() => {

		nextTick(() => {
			initData()
		})
		getWellNoOptions()
		getWashModeOptions()
	})

	function goToBack() {
		uni.setStorageSync('wellWashRecordId', null)
		uni.navigateBack({
			delta: 1
		})
	}
</script>

<style lang="scss" scoped>
</style>