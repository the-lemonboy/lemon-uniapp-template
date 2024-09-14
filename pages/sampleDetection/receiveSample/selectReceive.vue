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
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
				<text @click="addOrUpdateData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
			</view>
			<view class="form-box">
				<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
					<u-form-item label-width='100px' label="批次编号" prop="transNo"><u-input
						disabled="true"	v-model="dataForm.transNo" /></u-form-item>
					<u-form-item label-width='100px' label="收样时间" prop="receiveTime"><u-input type="select"
							@click="showPickerDate('receiveTime')" v-model="dataForm.receiveTime" /></u-form-item>
				</u-form>
				<u-picker v-model="selectTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
					:default-time='getCurrentTime()'></u-picker>
			</view>
			<view class="send-box-item" v-for="(item,index) of dataForm.detailList" :key="index">
				<view class="item-box">
					<u-checkbox class="left-item" @change="checkboxChange" v-model="item.send" shape="circle" :name="item.id"></u-checkbox>
					<view class="right-item">
						<view class="title">采样名称:{{ item.sampleNo }}</view>
						<view class="center-zone">
							<text class="area">分析指标:{{ item.analysisFactorNames }}</text>
						</view>
						<text class="time">采样时间:{{item.createTime}}</text>
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
					<u-button type="primary" @click="submitData">确认收样</u-button>
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
		reactive,
		watch
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
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import {
		getCurrentTime
	} from '@/utils/index.js'
	const form = ref(null)
	const rules = reactive({
		receiveTime: [{
			required: true,
			message: '请输入收样时间',
			trigger: 'blur',
		}]
	})
	onReady(() => {
		form.value.setRules(rules);
	})
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
		if (curTimeKey.value === 'receiveTime') dataForm.value.receiveTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
	}
	const dataForm = ref({
		id:'',
		domain: 'sample',
		location: '',
		organizeId: '',
		projectId: '',
		projection: '',
		receiveCount: 0,
		remark: '',
		transCount: 0,
		transNo: '',
		transState: '',
		transTime: '',
		transUserId: '',
		projectEnCode:'',
		detailList:[],
		receiveTime:''
	})
	function initData(id){
		getSendsampleDetail(id).then(res=>{
			dataForm.value = res.data
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
		form.value.validate(valid => {
			if (valid) {
		dataForm.value.projectId = uni.getStorageSync('projectId')
		dataForm.value.receiveUserId = uni.getStorageSync('userInfo').userId
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
		if(dataForm.value.detailList.length > 0){
			receiveSample(receiveId.value,dataForm.value).then(res=>{
				ToastFn('收样成功！')
			})
		}
		}
		});
	}
function ToastFn(text){
			emits('emitVisible',false)
			selectVisible.value = false
			uni.showToast({
				title: text,
				duration: 2000
			});
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
			dataForm.value.detailList.forEach(item=>{
				item.send = true
			})
		}else{
			dataForm.value.detailList.forEach(item=>{
				item.send = false
			})
		}
	}
	watch(dataForm,(val)=>{
		// console.log(val)
		if(!val.detailList.some(item=>!item.send || item.send!==true)){
			selectValue.value.checked = true
		}else{
			selectValue.value.checked = false
		}
	},{deep:true})
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
		min-height: 80px;
		margin: 10px auto;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		box-shadow: 5px 5px 18px #ebebeb, -5px -5px 18px #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		.area{
			  white-space: normal;
			    word-break: break-word; /* 防止长单词撑破容器 */
		}
		.left-item{
			flex-shrink: 0;
		}
		.right-item{
			flex-grow: 1;
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