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
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">盘点物料库存</text>
				<text @click="addOrUpdateData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
			<u-toast ref="uToast" />
			<text class="form-title"  style="margin-left: 20px; font-weight: bold;">基本信息</text>
			<driver></driver>
			<u-form :model="dataForm" ref="Form" style="margin: 10px;">
				<!-- <u-form-item label-width='100px' label="记录编号" prop="startDepth"><u-input  v-model="dataForm.startDepth" /></u-form-item> -->
				<u-form-item label-width='100px' label="选择项目" prop="checkTime"><u-input
						v-model="projectOptions.current.label" type="select"
						@click="projectOptions.show=true" /></u-form-item>
				<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
				<!-- <u-form-item label-width='100px' label="检查人" prop="checkUserId"><u-input v-model="dataForm.solumColor" /></u-form-item> -->
				<u-form-item label-width='100px' label="申请人" prop="weather"><u-input
						v-model="dataForm.weather" /></u-form-item>
				<u-form-item label-width='100px' label="申请时间" prop="applyTime"><u-input
						@click="selectTimeVisible = true" v-model="dataForm.applyTime" /></u-form-item>
				<u-form-item label-width='100px' label="申请事由" prop="weather"><u-input
						v-model="dataForm.weather" /></u-form-item>
			</u-form>
			<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
				:default-time='getCurrentTime()'></u-picker>
			<view class="stock-title">
				<text class="form-title"  style="margin-left: 20px; font-weight: bold;">物料库存</text>
				<u-button type="success" class="add-btn" size="mini" @click="addMateriel">新增</u-button>
			</view>
			<driver></driver>
			<view class="stock-box" v-for="(item,index) of materielList">
				<view class="stock-Header">
					<text class="title">新增一条</text>
					<u-button type="error" class="delete-btn" size="mini">删除</u-button>
				</view>
				<u-form :model="materielList[index]" ref="Form" style="margin: 10px;">
					<u-form-item label-width='100px' label="物料" prop="startDepth"><u-input
							v-model="materielList[index].materialName" type="select"
							@click="currentMateriel(index)" /></u-form-item>
					<u-form-item label-width='100px' label="规格型号" prop="materialModel"><u-input
							v-model="materielList[index].materialModel" /></u-form-item>
					<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
					<!-- <u-form-item label-width='100px' label="检查人" prop="checkUserId"><u-input v-model="dataForm.solumColor" /></u-form-item> -->
					<u-form-item label-width='100px' label="盘点数量" prop="currStockCount"><u-number-box :positive-integer="false" v-model="value"
							@change="valChange"></u-number-box></u-form-item>
					<u-form-item label-width='100px' label="盘存说明" prop="temperature"><u-input
							v-model="dataForm.temperature" /></u-form-item>
				</u-form>
				</view>
				<u-top-tips ref="uTips"></u-top-tips>
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
		getMaterielList
	} from '@/api/lab/labOperation.js'
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
			console.log('liebiao', projectOptions)
		})
	}

	function addData() {
		dataForm.applyUserId = uni.getStorageSync('userInfo').userId
		dataForm.organizeId = uni.getStorageSync('userInfo').organizeId

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
				console.log(currentData)
				return
			}
		}
		let selectMaterie = {
			applyCount: 0,
			applyType: dataForm.applyType,
			// currStockCount: current.currStockCount,
			id: generateUUID(),
			isHazchem: currentData.isHazchem,   
			lastStockCount: currentData.lastStockCount,  //现有库存
			materialId: currentData.materialId,
			materialModel: currentData.materialModel,
			materialName: currentData.materialName,
			materialPrice: currentData.materialPrice,
			currStockCount: 0,  //盘点数量
			storeState: currentData.currStockCount
		}
		materielList.value[materielIdx.value] = selectMaterie
		// console.log("====",selectMaterie)
	}
	const materielIdx = ref(0)
	function currentMateriel(idx){
		materielIdx.value = idx
		materielOptions.show = true
	}
	const materielList = ref([])
	let uTips = ref(null)
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
			uTips.value.show({
				title: '请先选择项目!',
				type: 'error',
				duration: '2300'
			})
		}
	}

	function addMateriel() {
		let newMaterie = {
			applyCount: null,
			applyType: null,
			currStockCount: null,
			id: generateUUID(),
			isHazchem: null,
			lastStockCount: null,
			materialId: null,
			materialModel: null,
			materialName: null,
			materialPrice: null,
			storeState: null
		}
		materielList.value.push(newMaterie)
	}
	
	function addOrUpdateData(){
		
	}
	onLoad(() => {
		// getMateriel()
		// setTimeout(()=>{
		// 	getMateriel()
		// },2000)
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
	// watch(itemId, (val)=>{
	//  if(val){
	//   getQCCheckConfList()
	//  }
	// })
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