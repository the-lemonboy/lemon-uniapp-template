<template>
	<view class="main-container" v-if='addVisible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="qc-container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title"
						style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">仪器使用详细</text>
					<text @click="addOrUpdateData()" type="primary" class="submit"
						style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
				</view>
			</view>
			<view class="content-box">
				<text class="form-title" style="margin-left: 20px; font-weight: bold;">基本信息</text>
				<driver></driver>
				<u-form :model="dataForm" ref="form" :rules="rules" style="margin: auto; width: 90%;">
					<u-form-item label-width='100px' label="申请日期" prop="applyTime"><u-input
							@click="showPickerDate('applyTime',0)" v-model="dataForm.applyTime" /></u-form-item>
					<u-form-item label-width='100px' label="使用日期" prop="applyTime"><u-input
							@click="showPickerDate('useDay',0)" v-model="dataForm.useDay" /></u-form-item>
					<u-form-item label-width='100px' label="开始时段" prop="useStarTime"><u-input
							@click="showPickerDate('useStarTime',1)" v-model="useStarTime" /></u-form-item>
					<u-form-item label-width='100px' label="结束时段" prop="useOverTime"><u-input
							@click="showPickerDate('useOverTime',1)" v-model="useOverTime" /></u-form-item>
					<u-form-item label-width='100px' label="申请事由" prop="weather"><u-input
							v-model="dataForm.weather" /></u-form-item>
				</u-form>
				<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
					:default-time='getCurrentTime()'></u-picker>
				<view class="stock-title" style="margin: 10px 0;">
					<text class="form-title" style="margin-left: 20px; font-weight: bold;">仪器计划</text>
					<u-button type="success" class="add-btn" size="mini" @click="addInstrument">新增</u-button>
				</view>
				<driver style="margin: 10px auto;"></driver>
				<view class="stock-box" v-for="(item,index) of InstrumentList">
					<view class="stock-Header">
						<text class="title" style="margin-left: 20px; font-weight: bold;">新增一条</text>
						<u-button type="error" class="delete-btn" size="mini"
							@click="removeInstrument(index)">删除</u-button>
					</view>
					<u-form :model="item" ref="Form" style="margin: auto; width: 90%;">
						<u-form-item label-width='100px' label="仪器名称" prop="assetName"><u-input v-model="item.assetName"
								type="select" @click="InstrumentMateriel(index)" /></u-form-item>
						<u-form-item label-width='100px' label="仪器编号" prop="assetNo"><u-input
								v-model="item.assetNo" /></u-form-item>
						<u-form-item label-width='100px' label="仪器型号" prop="assetModel"><u-input
								v-model="item.assetModel" /></u-form-item>
						<u-form-item label-width='100px' label="仪器分类" prop="assetType"><u-input
								v-model="item.assetType" /></u-form-item>
						<u-form-item label-width='100px' label="仪器厂家" prop="manufactor"><u-input
								v-model="item.manufactor" /></u-form-item>
					</u-form>
				</view>
				<u-select v-model="projectOptions.show" value-name="id" label-name="name" :list="projectOptions.list"
					@confirm="onProjectOptions"></u-select>
				<u-select v-model="InstrumentOptions.show" value-name="id" label-name="assetName"
					:list="InstrumentOptions.list" @confirm="onInstrument"></u-select>

			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		defineProps,
		watch,
		defineExpose,
		defineEmits
	} from 'vue'
	import {
		onLoad,
		onReady,
		onBackPress
	} from '@dcloudio/uni-app'
	import {
		getMenuId,
		getCurrentTime,
		generateUUID
	} from '@/utils/index.js';
	import {
		getUserInfoList
	} from '@/api/common.js'
	import driver from '@/components/driver.vue'
	import {
		getProjectBaseList
	} from '@/api/sample.js'
	import {
		getEquipmentList,
		addEquipment,
		getEquipmentDetail,
		updateEquipment
	} from '@/api/lab/labOperation.js'
	const form = ref(null)
	const rules = reactive({
		applyTime: [{
			required: true,
			message: '请输入申请时间',
			trigger: 'blur',
		}],
		useDay: [{
			required: true,
			message: '请输入使用日期',
			trigger: 'blur',
		}],
		useStarTime: [{
			required: true,
			message: '请输入开始时段',
			trigger: 'blur',
		}],
		useOverTime: [{
			required: true,
			message: '请输入结束时段',
			trigger: 'blur',
		}]
	})
	onReady(() => {
		form.value.setRules(rules);
	})
	const emits = defineEmits(['emitVisible'])
	// 选择时间
	const timeParams = reactive({
		year: true,
		month: true,
		day: true,
		hour: true,
		minute: true,
		second: true,
	})
	const useStarTime = ref(null)
	const useOverTime = ref(null)
	let dataForm = ref({
		applyType: 'Rec',
		domain: 'equip',
		applyCode: '',
		applyUserId: '',
		useDay: '',
		useRang: '',
		useRangArray: [],
		remark: '',
		detailList: [],
		organizeId: '',
		useState: 9,
	})
	const id = ref(null)
	const curTimeKey = ref(null)
	const curTimeType = ref(0)
	const selectTimeVisible = ref(false)

	function clearData(data) {
		for (let key in data) {
			if (Array.isArray(data[key])) {
				data[key] = []
			} else if (Object.prototype.toString.call(data[key]) === '[object Object]') {
				data[key] = {}
			} else if (typeof data[key] === 'number') {
				data[key] = 0
			} else {
				data[key] = null
			}
		}
		return data
	}

	function initData() {
		dataForm.value = clearData(dataForm.value)
		InstrumentList.value = []
		useOverTime.value = null
		useStarTime.value = null
		if (id.value) {
			getEquipmentDetail(id.value).then(res => {
				dataForm.value = res.data
				const timeArray = res.data.useRang.split("-");
				useStarTime.value = timeArray[0]
				useOverTime.value = timeArray[1]
				InstrumentList.value = res.data.detailList.map(item => {
					return {
						applyType: item.applyType,
						assetGrade: item.equipment.assetGrade,
						assetModel: item.equipment.assetModel,
						assetName: item.equipment.assetName,
						assetNo: item.equipment.assetNo,
						assetType: item.equipment.assetType,
						equipId: item.equipment.id,
						leadUserId: item.applyUser,
						manufactor: item.equipment.manufactor,
						useDay: item.useDay,
						useState: item.useState
					}
				})
			})
		}
	}

	function showPickerDate(value, type) {
		curTimeKey.value = value,
			selectTimeVisible.value = true
		curTimeType.value = type
		if (curTimeType.value === 0) {
			const newTimeParams = {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: true,
			}
			Object.assign(timeParams, newTimeParams)
		} else if (curTimeType.value === 1) {
			const newTimeParams = {
				year: false,
				month: false,
				day: false,
				hour: true,
				minute: true,
				second: false,
			}
			Object.assign(timeParams, newTimeParams)
		}
	}

	function getTime(e) {
		if (curTimeType.value == 0) {
			if (curTimeKey.value === 'applyTime') dataForm.value.applyTime =
				`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
			else if (curTimeKey.value === 'useDay') dataForm.value.useDay =
				`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
		} else if (curTimeType.value == 1) {
			if (curTimeKey.value === 'useStarTime') useStarTime.value = curTimeKey.value = `${e.hour}:${e.minute}`
			else if (curTimeKey.value === 'useOverTime') useOverTime.value = curTimeKey.value = `${e.hour}:${e.minute}`
		}
	}
	const addVisible = ref(false)
	// 获取项目信息
	// const projectName
	function onProjectOptions(arr) {
		let current = arr[0];
		projectOptions.current = current;
		dataForm.value.projectId = current.value;
		getMateriel() //现在了项目才加载
	}
	const projectOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getProjectList() {
		const params = {
			currentPage: 1,
			menuId: getMenuId('项目列表'),
			sidx: "encode",
			sort: "asc"
		}
		getProjectBaseList(params).then(res => {
			projectOptions.list = res.data
		})
	}

	function addData() {
		dataForm.value.applyUserId = uni.getStorageSync('userInfo').userId
		dataForm.value.organizeId = uni.getStorageSync('userInfo').organizeId

	}
	// ---------------------
	// 获取物料列表
	const InstrumentOptions = reactive({
		show: false,
		current: {},
		list: []
	})
	const InstrumentList = ref([])

	function onInstrument(arr) {
		// useState: 9,
		let current = arr[0];
		let currentData = null
		InstrumentOptions.current = current;
		for (let val of InstrumentOptions.list) {
			if (val.id === current.value) {
				currentData = val
				break
			}
		}
		let selectInstrument = {
			applyType: currentData.applyType,
			assetGrade: currentData.assetGrade,
			assetModel: currentData.assetModel,
			assetName: currentData.assetName,
			assetNo: currentData.assetNo,
			assetType: currentData.assetType,
			equipId: currentData.id,
			leadUserId: currentData.leadUserId,
			manufactor: currentData.manufactor
			// useDay: "2024-04-11"，
			// useRang: "08:24-23:59"，
		}
		InstrumentList.value[InstrumentIdx.value] = selectInstrument
	}
	const InstrumentIdx = ref(0)

	function InstrumentMateriel(idx) {
		InstrumentIdx.value = idx
		InstrumentOptions.show = true
	}

	function getInstrumentList() {
		const params = {
			applyTypes: '1,2,4',
			dropped: 0,
			sort: 'asc',
			sidx: 'assetName',
			pcPermission: false,
		}
		getEquipmentList(params).then(res => {
			InstrumentOptions.list = res.data.list
		})
	}

	function addInstrument() {
		let newMaterie = {
			applyType: null,
			assetGrade: null,
			assetModel: null,
			assetName: null,
			assetNo: null,
			assetType: null,
			equipId: null,
			leadUserId: null,
			manufactor: null,
			useDay: null,
			useRang: null
		}
		InstrumentList.value.push(newMaterie)
		uni.showToast({
			title: '新增一条记录',
			icon: 'none'
		});
	}

	function removeInstrument(idx) {
		InstrumentList.value = InstrumentList.value.filter((item, index) => index !== idx)
	}
	// 新增或者更新
	function addOrUpdateData() {
		form.value.validate(valid => {
			if (valid) {
		dataForm.value.applyUserId = uni.getStorageSync('userInfo').userId
		dataForm.value.organizeId = uni.getStorageSync('userInfo').organizeId
		dataForm.value.detailList = InstrumentList.value
		dataForm.value.useRang = `${useStarTime.value}-${useOverTime.value}`
		// dataForm.value.useRangArray.push(useStarTime.value,useOverTime.value)
		dataForm.value.detailList.forEach(item => {
			item.useRang = `${useStarTime.value}-${useOverTime.value}`
			item.useDay = dataForm.value.useDay
		})
		if (!id.value) {
			addEquipment(dataForm.value).then(res => ToastFn('创建成功！'))
		} else {
			updateEquipment(id.value, dataForm.value).then(res => ToastFn('更新成功！'))
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
	onLoad(() => {
		getInstrumentList()
		getProjectList()

	})
	onReady(() => {
		popup.value.open()
	})
	onBackPress((e) => {
		if (e.from === "backbutton" && addVisible.value) {
			goToBack()
			return true
		}
	})

	function goToBack() {
		// uni.setStorageSync('holeRecordId', null)
		id.value = null
		addVisible.value = false
		emits('emitVisible', true)
	}
	// 质控内容
	function dataInfo(dataAll) {
		let _dataAll = dataAll
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		dataForm.value = _dataAll
	}
	defineExpose({
		addVisible,
		initData,
		id
	})
</script>

<style lang="scss" scoped>
	.main-container {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100vw;
		position: absolute;
		top: 0;
		background-color: white;

		.qc-container {
			margin: 0;
			padding: 0;
		}

		.detail-content {
			margin: 20px 0;

			.zk-title {
				font-size: 30rpx;
				font-weight: bold;
			}

			.content {
				line-height: 23px;
				font-size: 25rpx;
				color: $uni-text-color-grey;
			}
		}

		.stock-Header {

			// marg
			.delete-btn {
				float: right;
				margin-right: 10px;
			}
		}

		.stock-title {
			.add-btn {
				float: right;
				margin-right: 10px;
			}
		}
	}

	.content-box {
		margin-top: 15px;
	}
</style>