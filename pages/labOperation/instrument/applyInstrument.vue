<template>
	<view class="main-container" v-if='addVisible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="qc-container">
			<view class="nav-bar"
				style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
				<text @click="addOrUpdateData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
			<u-toast ref="uToast" />
			<text class="form-title">基本信息</text>
			<driver></driver>
			<u-form :model="dataForm" ref="Form" style="margin: 10px;">
				<!-- <u-form-item label-width='100px' label="记录编号" prop="startDepth"><u-input  v-model="dataForm.startDepth" /></u-form-item> -->
				<!-- 	<u-form-item label-width='100px' label="选择项目" prop="checkTime"><u-input
						v-model="projectOptions.current.label" type="select"
						@click="projectOptions.show=true" /></u-form-item> -->
				<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
				<!-- <u-form-item label-width='100px' label="检查人" prop="checkUserId"><u-input v-model="dataForm.solumColor" /></u-form-item> -->
				<!-- 		<u-form-item label-width='100px' label="申请人" prop="weather"><u-input
						v-model="dataForm.weather" /></u-form-item> -->
				<u-form-item label-width='100px' label="申请日期" prop="applyTime"><u-input
						@click="showPickerDate('applyTime',0)" v-model="dataForm.applyTime" /></u-form-item>
				<u-form-item label-width='100px' label="使用日期" prop="applyTime"><u-input
						@click="showPickerDate('useDay',0)" v-model="dataForm.useDay" /></u-form-item>
				<u-form-item label-width='100px' label="开始使用时间" prop="useStarTime"><u-input
						@click="showPickerDate('useStarTime',1)" v-model="useStarTime" /></u-form-item>
				<u-form-item label-width='100px' label="使用结束时间" prop="useOverTime"><u-input
						@click="showPickerDate('useOverTime',1)" v-model="useOverTime" /></u-form-item>
				<u-form-item label-width='100px' label="申请事由" prop="weather"><u-input
						v-model="dataForm.weather" /></u-form-item>
			</u-form>
			<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
				:default-time='getCurrentTime()'></u-picker>
			<view class="stock-title">
				<text class="form-title">物料库存</text>
				<u-button type="success" class="add-btn" size="mini" @click="addInstrument">新增</u-button>
			</view>
			<driver></driver>
			<view class="stock-box" v-for="(item,index) of InstrumentList">
				<view class="stock-Header">
					<text class="title">新增一条</text>
					<u-button type="error" class="delete-btn" size="mini" @click="removeInstrument(index)">删除</u-button>
				</view>
				<u-form :model="InstrumentList[index]" ref="Form" style="margin: 10px;">
					<u-form-item label-width='100px' label="仪器名称" prop="assetName"><u-input
							v-model="InstrumentList[index].assetName" type="select"
							@click="InstrumentMateriel(index)" /></u-form-item>
					<u-form-item label-width='100px' label="仪器编号" prop="assetNo"><u-input
							v-model="InstrumentList[index].assetNo" /></u-form-item>
					<u-form-item label-width='100px' label="仪器型号" prop="assetModel"><u-input
							v-model="InstrumentList[index].assetModel" /></u-form-item>
					<u-form-item label-width='100px' label="仪器分类" prop="assetType"><u-input
							v-model="InstrumentList[index].assetType" /></u-form-item>
					<u-form-item label-width='100px' label="仪器厂家" prop="manufactor"><u-input
							v-model="InstrumentList[index].manufactor" /></u-form-item>
				</u-form>
			</view>
			<u-top-tips ref="uTips"></u-top-tips>
			<u-select v-model="projectOptions.show" value-name="id" label-name="name" :list="projectOptions.list"
				@confirm="onProjectOptions"></u-select>
			<u-select v-model="InstrumentOptions.show" value-name="id" label-name="assetName"
				:list="InstrumentOptions.list" @confirm="onInstrument"></u-select>

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
		onReady
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
		getApplyEquipmentList,
		addEquipment
	} from '@/api/lab/labOperation.js'
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
	let dataForm = reactive({
		applyType: 'Use',
		domain: 'equip',
		applyCode: '',
		applyUserId: '',
		useDay: '',
		useRang: '',
		useRangArray: [],
		remark: '',
		detailList: [],
		organizeId: ''
	})
	const curTimeKey = ref(null)
	const curTimeType = ref(0)
	const selectTimeVisible = ref(false)

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
		console.log(curTimeKey.value)
		if (curTimeType.value == 0) {
			if (curTimeKey.value === 'applyTime') dataForm.applyTime =
				`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
			else if (curTimeKey.value === 'useDay') dataForm.useDay =
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
		dataForm.projectId = current.value;
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
		dataForm.applyUserId = uni.getStorageSync('userInfo').userId
		dataForm.organizeId = uni.getStorageSync('userInfo').organizeId

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
		console.log("====",InstrumentList.value)
	}
	const InstrumentIdx = ref(0)

	function InstrumentMateriel(idx) {
		InstrumentIdx.value = idx
		InstrumentOptions.show = true
	}
	let uTips = ref(null)

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
			assetGrade:null, 
			assetModel: null, 
			assetName: null, 
			assetNo: null, 
			assetType:null, 
			equipId: null, 
			leadUserId: null, 
			manufactor: null, 
			useDay: null,
			useRang: null
			}
			InstrumentList.value.push(newMaterie)
		}
		function removeInstrument(idx){
			InstrumentList.value = InstrumentList.value.filter((item,index)=>index !== idx)
		}
		// 新增或者更新
		function addOrUpdateData(){
			dataForm.applyUserId = uni.getStorageSync('userInfo').id
			dataForm.organizeId = uni.getStorageSync('userInfo').organizeId
			dataForm.detailList = InstrumentList.value
			dataForm.useRang = `${useStarTime.value}-${useOverTime.value}`
			dataForm.useRangArray.push(useStarTime.value,useOverTime.value)
			dataForm.detailList.forEach(item=>{
				item.useRang = `${useStarTime.value}-${useOverTime.value}`
				item.useDay = dataForm.useDay
			})
			addEquipment(dataForm).then(res=> console.log('success!'))
		}
		onLoad(() => {
			getInstrumentList()
			getProjectList()

		})
		onReady(() => {
			popup.value.open()
		})

		function goToBack() {
			// uni.setStorageSync('holeRecordId', null)
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
			dataForm = _dataAll
		}
		defineExpose({
			addVisible,
			dataForm
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
</style>