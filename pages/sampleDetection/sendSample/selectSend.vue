<template>
	<view class="send-container" v-if="selectVisible">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="content-box">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">送样信息</text>
				<!-- <text @click="addOrUpdateData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text> -->
			</view>
			</view>
			<view class="form-box">
				<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
					<u-form-item label-width='100px' label="批次编号" prop="transNo"><u-input
							v-model="dataForm.transNo" /></u-form-item>
					<u-form-item label-width='100px' label="送样时间" prop="transTime"><u-input
						type="select"	@click="showPickerDate('transTime')" v-model="dataForm.transTime" /></u-form-item>
				</u-form>
				<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
					:default-time='getCurrentTime()'></u-picker>
			</view>
			<view class="send-box-item" v-for="item of unSendList" :key="item.id">
				<view class="item-box">
					<u-checkbox @change="checkboxChange" v-model="item.send" shape="circle" :name="item.id"></u-checkbox>
					<view class="left-item">
						<view class="title">采样名称：{{ item.sampleName }}</view>
						<view class="center-zone">
							<text class="area">分析指标：{{ item.analysisFactorNames }}</text>
						</view>
						<text class="time">采样时间：{{item.createTime}}</text>
					</view>
				</view>
			</view>
			<view class="clear-bfc"></view>
			<view class="select-footer">
				<view class="footer-radio">
					<u-checkbox-group>
								<u-checkbox 
								shape="circle"
									@change="selectAll" 
									v-model="selectValue.checked" 
									:name="selectValue.name"
								>{{selectValue.name}}</u-checkbox>
							</u-checkbox-group>
				</view>
				<view class="right-box">
					<text class="count">共计： {{unSendList.length}}个</text>
					<u-button type="primary" @click="goSendDetail">选择送样</u-button>
				</view>
			</view>
		</view>
	</view>
	<sendDetail ref="sendDetailRef" @submitVisibleFlag="submitVisibleFlag()" @emitVisible="(val)=>selectVisible = val" :sendId="sendId"></sendDetail>
</template>

<script setup>
	import {
		ref,
		defineExpose,
		defineEmits,
		toRaw,
		reactive
	} from 'vue'
	import {
		getSendsampleDetail,
		updateSendsample,
		addSendsample,
		initSendList
	} from '@/api/sample/sendSample.js'
	import {getProjectDetail} from '@/api/sample.js'
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import sendDetail from './sendDetail.vue';
	import {
		getCurrentTime
	} from '@/utils/index.js'
	const emits = defineEmits(['emitVisible'])
	const form = ref(null)
	const rules = reactive({
		transNo: [{
			required: true,
			message: '请输入批次编号',
			trigger: 'blur',
		}],
		transTime: [{
			required: true,
			message: '请输入送样时间',
			trigger: 'blur',
		}]
	})
	onReady(() => {
		form.value.setRules(rules);
	})
	function submitVisibleFlag(val){
		emits('emitVisible',true)
		selectVisible.value = false
	}
	const selectVisible = ref(false)
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
		if (curTimeKey.value === 'transTime') dataForm.value.transTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
		else if (curTimeKey.value === 'endTime') dataForm.value.endTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
	}
	const dataForm = ref({
				id:'',
				domain: 'sample',
		        // location: '',
		        organizeId: '',
		        projectId: '',
		        // projection: '',
		        // receiveCount: 0,
		        remark: '',
		        transCount: 0,
		        transNo: '',
		        // transState: '',
		        transTime: '',
		        transUserId: '',
				projectEnCode:'',
				detailList:[]
	})

	// function addOrUpdateData() {
	// 	dataForm.projectId = uni.getStorageSync('projectId')
	// 	dataForm.transUserId = uni.getStorageSync('userInfo').id
	// 	dataForm.transUserId = uni.getStorageSync('userInfo').organizeId
	// 	if (sendId.value) {
	// 		updateSendsample().then(res => {

	// 		})
	// 	}
	// }
	const unSendList = ref([])
	function getUnsendList() {
		return new Promise(resolve=>{
			const id = {
				projectId:uni.getStorageSync('projectId')
			}
			initSendList(id).then(res => {
				let result = res.data.list.filter(item=>item.analysisFactorNames)
				if(sendId.value){
				unSendList.value = dataForm.value.detailList.concat(result)
				}else{
					unSendList.value = result
					// dataForm.value = clearData(dataForm.value)
					// dataForm.value.domain = 'sample'
				}
				resolve()
			})
		})
	}
	function clearData(data){
		for(let key in data){
			if(Array.isArray(data[key])){
				data[key] = []
			}else if (Object.prototype.toString.call(data[key]) === '[object Object]'){
				data[key] = {}
			}else if(typeof data[key] === 'number'){
				data[key] = 0
			}else{
				data[key] = null
			}
		}
		return data
	}
	// 送样和收样详细
	
	// const dataList = ref([])
	// const unSendList = ref([])   //未送的样品
	// function getSendDetail(){
	// 	const id = sendId.value
	//      getSendsampleDetail(id).then(res=>{
	// 		dataList.value = res.data
	// 		unSendList.value = res.data.detailList.filter(item=>item.received == 0)
	// 		// countSend.value = res.data.detailList.filter(item=>item.received == 0).length
	// 	})
	// }
	// function handleData(oldData,newData){
	// 	oldData.detailList.forEach((oldItem,oldIndex)=>{
	// 		newData.forEach(newItem=>{
	// 			if(oldItem.id === newItem.id){
	// 				oldItem[oldIndex] = newItem
	// 			}
	// 		})
	// 	})
	// 	oldData.detailList.forEach(item=>{
	// 		if(item.received === true){
	// 			item.received = 1
	// 		}else if(item.received === false){
	// 			item.received = 0
	// 		}	
	// 	})
	// 	return oldData
	// }
	// 获取项目编号
	function getProjectEncode(){
		const id = uni.getStorageSync('projectId')
		getProjectDetail(id).then(res=>{
			dataForm.value.projectEnCode = res.data.encode
		})
	}
	const addFlag = ref(false)
	const sendDetailRef = ref(null)
	const sendId = ref(null)
	function goSendDetail() {
		form.value.validate(valid => {
			if (valid) {
		dataForm.value.projectId = uni.getStorageSync('projectId')
		dataForm.value.transUserId = uni.getStorageSync('userInfo').userId
		dataForm.value.organizeId = uni.getStorageSync('userInfo').organizeId
		detailList: [] // 详细列表
	    const detailList = unSendList.value
	        .filter(item => item.send)
	        .map(item => ({
	            analysisFactorIds: item.analysisFactorIds,
	            analysisFactorNames: item.analysisFactorNames,
	            classify: item.classify,
	            // dropped: item.dropped,
	            files: item.files,
	            // received: item.received,
	            remark: item.remark,
	            sampleAmount: item.sampleAmount,
	            sampleId: item.sampleId,
	            sampleName: item.sampleName,
	            sampleNo: item.sampleNo,
	            sampleTime: item.sampleTime,
	            sampleType: item.sampleType,
	            sampleUnit: item.sampleUnit,
	            transId: item.transId,
	            // useLocId: item.useLocId,
	            // useLocType: item.useLocType,
	            // useLocation: item.useLocation,
				sampleTypeText:item.sampleTypeText
	        }));
			// console.log(detailList)
			dataForm.value.transCount = detailList.length
			dataForm.value.detailList = detailList
			selectVisible.value = false
			sendDetailRef.value.sendDetailVisible = true
			sendDetailRef.value.sendData = dataForm.value
			}
			});
	}

	function initData(){
		return new Promise(resolve=>{
			const id = sendId.value
			getSendsampleDetail(id).then(res=>{
				dataForm.value = res.data
				dataForm.value.detailList.forEach(item=>{
					item.send = true
				})
				resolve()
			})
		})
	}
	function goToBack() {
		selectVisible.value = false
		emits('emitVisible', true)
	}

	function checkboxChange(e) {
	}
	const selectValue = ref({name: '全选',disabled: false})
	function selectAll(e){
		if(e.value){
			unSendList.value.forEach(item=>{
				item.send = true
			})
		}else{
			unSendList.value.forEach(item=>{
				item.send = false
			})
		}
	}
	onLoad(() => {
		getProjectEncode()
	})
	defineExpose({
		selectVisible,
		addFlag,
		sendId,
		getUnsendList,
		initData
	})
</script>

<style lang="scss" scoped>
	.send-container {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100vw;
		min-height: 100vh;
		position: absolute;
		top: 0;
		background-color: white;

		.item-box {
			width: 90%;
			height: 80px;
			margin: 10px auto;
			padding: 0 10px;
			border: 1px solid #e6e6e6;
			border-radius: 5px;
			box-shadow: 5px 5px 18px #ebebeb, -5px -5px 18px #fff;
			display: flex;
			// justify-content: space-between;
			align-items: center;

			.left-item {
				// height: 100%;
				// display: flex;
				// flex-direction: column;
			}
		}

		.select-footer {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 60px;
			width: 100vw;
			box-shadow: 0px -5px 18px #ebebeb, 0px 5px 18px #fff;
			background-color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.footer-radio {
				line-height: 60px;
				margin-left: 10px;
			}

			.right-box {
				margin-right: 10px;
				display: flex;
				flex-direction: row;
				align-items: center;

				.count {
					margin-right: 10px;
				}
			}
		}
	}
	.clear-bfc{
		height: 65px;
		width: 100%;
	}
</style>