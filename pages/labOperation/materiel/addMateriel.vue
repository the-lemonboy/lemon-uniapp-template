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
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">盘点物料库存</text>
				<text @click="addData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
			</view>
			<u-toast ref="uToast" />
			<text class="form-title"  style="margin-left: 20px; font-weight: bold;">基本信息</text>
			<driver></driver>
			<u-form :model="dataForm" ref="form" rules="rules" style="margin: auto; width: 90%;">
				<!-- <u-form-item label-width='100px' label="记录编号" prop="startDepth"><u-input  v-model="dataForm.startDepth" /></u-form-item> -->
				<u-form-item label-width='100px' label="选择项目" prop="projectId"><u-input
						v-model="projectOptions.current.label" type="select"
						@click="projectOptions.show=true" /></u-form-item>
				<u-form-item label-width='100px' label="申请时间" prop="applyTime"><u-input
						@click="selectTimeVisible = true" v-model="dataForm.applyTime" /></u-form-item>
				<u-form-item label-width='100px' label="申请事由" prop="weather"><u-input
						v-model="dataForm.weather" /></u-form-item>
			</u-form>
			<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
				:default-time='getCurrentTime()'></u-picker>
			<view class="stock-title" style="margin: 10px 0;">
				<text class="form-title"  style="margin-left: 20px; font-weight: bold;">物料库存</text>
				<u-button type="success" class="add-btn" size="mini" @click="addMaterielList">新增</u-button>
			</view>
			<driver style="margin: 10px auto;"></driver>
			<view class="stock-box" v-for="(item,index) of materielList">
				<view class="stock-Header">
					<text class="title">新增一条</text>
					<u-button type="error" class="delete-btn" size="mini">删除</u-button>
				</view>
				<u-form :model="materielList[index]" ref="Form" style="margin: auto; width: 90%;">
					<u-form-item label-width='100px' label="物料" prop="startDepth"><u-input
							v-model="materielList[index].materialName" type="select"
							@click="currentMateriel(index)" /></u-form-item>
					<u-form-item label-width='100px' label="规格型号" prop="materialModel"><u-input
							v-model="materielList[index].materialModel" /></u-form-item>
					<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
					<!-- <u-form-item label-width='100px' label="检查人" prop="checkUserId"><u-input v-model="dataForm.solumColor" /></u-form-item> -->
					<u-form-item label-width='100px' label="盘点数量" prop="applyCount"><u-number-box  v-model="item.applyCount"></u-number-box></u-form-item>
					<u-form-item label-width='100px' label="盘存说明" prop="temperature"><u-input
							v-model="dataForm.temperature" /></u-form-item>
				</u-form>
				</view>
				<u-select v-model="projectOptions.show" value-name="id" label-name="name" :list="projectOptions.list"
					@confirm="onProjectOptions"></u-select>
				<u-select v-model="materielOptions.show" value-name="materialId" label-name="materialName"
					:list="materielOptions.list" @confirm="onMaterielOptions"></u-select>
			
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
		getMaterielList,
		addMateriel
	} from '@/api/lab/labOperation.js'
import { apply } from 'ol/transform';
	const form = ref(null)
	const rules = reactive({
		applyTime: [{
			required: true,
			message: '请输入申请时间',
			trigger: 'blur',
		}],
		projectId: [{
			required: true,
			message: '请输入项目名称',
			trigger: 'blur',
		}]
	})
	onReady(() => {
		form.value.setRules(rules);
	})
	const emits = defineEmits(['emitVisible'])
	// 选择时间
	const selectTimeVisible = ref(false)
	const timeParams = {
		year: true,
		month: true,
		day: true,
		hour: true,
		minute: true,
		second: true,
	}
	let dataForm = reactive({
		applyType: 'StockCheck',
		domain: 'material',
		projectId: '',
		applyCode: '',
		applyUserId: '',
		applyTime: '',
		planTime: '',
		applyCount: 0,
		remark: '',
		detailList: [],
		organizeId: ''
	})

	function getTime(e) {
		dataForm.applyTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
	}
	const addVisible = ref(false)
	// 获取项目信息
	// const projectName
	function onProjectOptions(arr) {
		let current = arr[0];
		projectOptions.current = current;
		dataForm.projectId = current.value;
		getMateriel()
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
		form.value.validate(valid => {
			if (valid) {
		dataForm.applyUserId = uni.getStorageSync('userInfo').userId
		dataForm.organizeId = uni.getStorageSync('userInfo').organizeId
		materielList.value.forEach(item=>{
			item.applyCount = item.currStockCount - item.lastStockCount
		})
		dataForm.detailList = materielList.value
		addMateriel(dataForm).then(res=>{
			dataForm = clearData(dataForm)
			materielList.value =  []
			materielOptions.list = []
			ToastFn('创建成功')
		})
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
	// 获取物料列表
	const materielOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function onMaterielOptions(arr) {
		let current = arr[0];
		let currentData = null
		materielOptions.current = current;
		for(let val of materielOptions.list){
			if(val.materialId === current.value){
				currentData = val
				break
			}
		}
		let selectMaterie = {
			applyCount: currentData.currStockCount-currentData.lastStockCount,
			applyType: dataForm.applyType,
			// currStockCount: current.currStockCount,
			id: generateUUID(),
			isHazchem: currentData.isHazchem,   
			lastStockCount: currentData.lastStockCount,  //
			materialId: currentData.materialId,
			materialModel: currentData.materialModel,
			materialName: currentData.materialName,
			materialPrice: currentData.materialPrice,
			currStockCount: currentData.currStockCount,  //盘点数量
			storeState: currentData.storeState
		}
		materielList.value[materielIdx.value] = selectMaterie
	}
	const materielIdx = ref(0)
	function currentMateriel(idx){
		materielIdx.value = idx
		materielOptions.show = true
	}
	const materielList = ref([])
	function getMateriel() {
		if (dataForm.projectId) {
			const params = {
				domain: "material",
				projectId: dataForm.projectId,
				sidx: "materialName",
				sort: "asc"
			}
			getMaterielList(params).then(res => {
				materielOptions.list = res.data.list
			})
		} else {
			uni.showToast({
				title: '请先选择项目！',
				icon:'fail',
				duration: 2000
			});
		}
	}

	function addMaterielList() {
		let newMaterie = {
			applyCount: null,
			applyType: null,
			currStockCount: 0,
			id: generateUUID(),
			isHazchem: 0,
			lastStockCount: 0,
			materialId: null,
			materialModel: null,
			materialName: null,
			materialPrice: null,
			storeState: null
		}
		materielList.value.push(newMaterie)
	}
	onLoad(() => {
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
	const checkType = ref("1")
	function dataInfo(dataAll) {
		let _dataAll = dataAll
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		dataForm = _dataAll
	}
	onBackPress((e) => {
		if (e.from === "backbutton" && addVisible.value) {
			goToBack()
			return true
		}
	})
	defineExpose({
		addVisible,
		dataForm,
		checkType
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
			.title{
				font-weight: bold;
				margin-left: 20px;
			}
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