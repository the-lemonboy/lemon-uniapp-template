<template>
	<view class="send-container" v-if="selectVisible">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="content-box">
			<view class="nav-bar"
				style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
				<text @click="addOrUpdateData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
			<view class="form-box">
				<u-form :model="dataForm" ref="Form" style="margin: 10px;">
					<u-form-item label-width='100px' label="批次编号" prop="transNo"><u-input
							v-model="dataForm.transNo" /></u-form-item>
					<u-form-item label-width='100px' label="收样时间" prop="receiveTime"><u-input
							@click="showPickerDate('receiveTime')" v-model="dataForm.receiveTime" /></u-form-item>
				</u-form>
				<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
					:default-time='getCurrentTime()'></u-picker>
			</view>
			<view class="send-box-item" v-for="item of dataForm.detailList" :key="item.id">
				<view class="item-box">
					<u-checkbox @change="checkboxChange" v-model="item.send" shape="circle" :name="item.id"></u-checkbox>
					<view class="left-item">
						<view class="title" @click="goToDeatil(item.id)">{{ item.sampleNo }}</view>
						<view class="center-zone">
							<text class="area">{{ item.createTime }}</text>
							<text class="project">{{item.typetext}}</text>
						</view>
						<text class="time">{{item.registertime}}</text>
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
					<text class="count">共计： {{dataForm.detailList.length}}个</text>
					<u-button type="primary" @click="submitData">确认采样</u-button>
				</view>
			</view>
		</view>
	</view>
	<!-- <sendDetail ref="sendDetailRef" @emitVisible="(val)=>selectVisible = val" :sendId="sendId"></sendDetail> -->
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
		initSendList,
		receiveSample
	} from '@/api/sample/sendSample.js'
	import {getProjectDetail} from '@/api/sample.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getCurrentTime
	} from '@/utils/index.js'
	const emits = defineEmits(['emitVisible'])
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
		if (curTimeKey.value === 'receiveTime') dataForm.receiveTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
		else if (curTimeKey.value === 'endTime') dataForm.endTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
	}
	const dataForm = ref()
	function initData(id){
		getSendsampleDetail(id).then(res=>{
			dataForm.value = res.data
			console.log(res.data,'=-=--')
		})
	}
	// 获取项目编号
	// function getProjectEncode(){
	// 	const id = uni.getStorageSync('projectId')
	// 	getProjectDetail(id).then(res=>{
	// 		dataForm.projectEnCode = res.data.encode
	// 		console.log(res.data)
	// 	})
	// }
	const addFlag = ref(false)
	const sendDetailRef = ref(null)
	const receiveId = ref(null)
	function submitData() {
		dataForm.value.projectId = uni.getStorageSync('projectId')
		dataForm.value.transUserId = uni.getStorageSync('userInfo').userId
		dataForm.value.receiveUserName = uni.getStorageSync('userInfo').userName
		dataForm.value.transState = "1"
		// detailList: [] // 详细列表
	    dataForm.value.detailList.forEach(item=>{
			if(item.send){
				item.received = 1
				dataForm.value.receiveCount =+ 1
			}else{
				item.received = -1
			}
			delete item.send
		})
		console.log(uni.getStorageSync('userInfo'))
		if(dataForm.value.detailList.length > 0){
			receiveSample(receiveId.value,dataForm.value).then(res=>{
				console.log('success!')
			})
		}
	}


	function goToBack() {
		selectVisible.value = false
		emits('emitVisible', true)
	}

	function checkboxChange(e) {
		console.log(e)
	}
	const selectValue = ref({name: '全选',disabled: false})
	function selectAll(e){
		console.log(e)
		if(e.value){
			dataForm.value.detailList.forEach(item=>{
				item.send = true
			})
		}else{
			dataForm.value.detailList.forEach(item=>{
				item.send = false
			})
		}
	}
	onLoad(() => {
		// sendDetail()
		// getProjectEncode()
	})
	defineExpose({
		addFlag,
		initData,
		selectVisible,
		receiveId
		// getSendDetail,
		// sendId

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