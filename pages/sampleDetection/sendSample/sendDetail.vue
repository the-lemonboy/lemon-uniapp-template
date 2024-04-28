<template>
		<view class="send-container" v-if="sendDetailVisible">
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
<view class="content-box">
		<view class="nav-container" style="height: 44px;">
			<view class="nav-bar"
				style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()"  type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
				</view>
				</view>
				<view class="send-info-box">
					<view class="left-box">
						<text>送样人：{{userName}}</text>
						<text>联系电话：{{mobilePhone}}</text>
						<text>送样时间：{{sendData.transTime}}</text>
					</view>
					<view class="right-box">
						<uni-icons type="checkbox" size="50" style="color:white"></uni-icons>
						<text>确认中</text>
					</view>
				</view>
				<view class="content" v-if="sendData.detailList.length">
				<view class="send-box-item" v-for="item of sendData.detailList" :key="item.id">
					<view class="item-box">
						<view class="left-item">
							<view class="title" @click="goToDeatil(item.id)">{{ item.sampleNo }}</view>
							<view class="center-zone">
								<text class="area">{{ item.sampleTime }}</text>
								<text class="project">{{item.analysisFactorNames}}</text>
							</view>
							<text class="time">{{item.registertime}}</text>
						</view>
					</view>
				</view>
				</view>
				<u-empty v-else style="margin-top: 40px;" text="未选择样品" mode="list"></u-empty>
	<view class="select-footer">
		<view class="right-box">
				<!-- <text class="count">共计： {{unSendList.length}}个</text> -->
				<u-button type="primary" @click="submitSend">确认送样</u-button>
		</view>
	</view>	
	</view>
	</view>
</template>

<script setup>
	import {ref,defineExpose,defineEmits,reactive,defineProps} from 'vue'
	import {updateSendsample,addSendsample} from '@/api/sample/sendSample.js'
	import {onLoad} from '@dcloudio/uni-app'
	const emits = defineEmits(['emitVisible','submitVisibleFlag'])
	const props = defineProps({
		sendId:{type:String,default:null}
	})
	const sendDetailVisible = ref(false)
	function addOrEditor(){
		sendData.transState = '0'
		if(props.sendId){
			updateSendsample(id,sendData.value)
		}else{
			addSendsample(sendData.value)
		}
	}
	// 送样和收样详细
	const sendDetailId = ref(null)
	const sendDetailList = ref([])
	// const unSendDetailList = ref([])   //未送的样品
	const sendData = ref()
	function submitSend(){
		const data = sendData.value
		const id = sendDetailId.value
		ToastFn()
		// addSendsample.addSendsample
		if(sendData.value.id){
			updateSendsample(sendData.value.id,data).then(res=>ToastFn('修改成功！'))
		}else{
			addSendsample(data).then(res=>ToastFn('送样成功！'))
		}
		
		// updateSendsample(id,data).then(res=>ToastFn('送样成功！'))
	}
	function ToastFn(text){
			sendDetailVisible.value = false
			emits('submitVisibleFlag',false)
			uni.showToast({
				title: text,
				duration: 2000
			});
		}
	function goToBack(){
		sendDetailVisible.value = false
		emits('emitVisible',true)
	}
	let mobilePhone = ref(uni.getStorageSync('userInfo').mobilePhone)
	let userName = ref(uni.getStorageSync('userInfo').userName)
	onLoad(()=>{
		// sendDetail()
	})
	defineExpose({
		sendDetailVisible,
		sendDetailId,
		sendData
		
	})
</script>

<style lang="scss" scoped>
	.send-container{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100vw;
		min-height: 100vh;
		position: absolute;
		top: 0;
		background-color: white;
		.send-info-box{
			height: 120px;
			background-color: #2160FF;
			// padding: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		.left-box{
			height: 70%;
			display: flex;
			flex-direction: column;
			color: white;
			justify-content: space-between;
			margin-left: 10px;
		}
		.right-box{
			display: flex;
			flex-direction: column;
			margin-right: 20px;
			text{
				font-size: $uni-font-size-lg;
				font-weight: bold;
				color: #fff;
			}
		}
		}
		.item-box {
			width: 90%;
			height: 80px;
			margin: 10px auto;
			padding: 0 10px;
			border: 1px solid #e6e6e6;
			border-radius: 5px;
			box-shadow: 5px 5px 18px #ebebeb, -5px -5px 18px #fff;
			display: flex;
			align-items: center;
		
			.left-item {
				// height: 100%;
				// display: flex;
				// flex-direction: column;
			}
		}
		.select-footer{
			position: fixed;
			bottom: 0;
			left: 0;
			height: 60px;
			width: 100vw;
			box-shadow: 0px -5px 18px #ebebeb, 0px 5px 18px #fff;

			display: flex;
			justify-content: flex-end;
			align-items: center;
			.footer-radio{
				line-height: 60px;
				margin-left: 10px;
			}
			.right-box{
				margin-right: 10px;
				display: flex;
				flex-direction: row;
				align-items: center;
				.count{
					margin-right: 10px;
				}
			}
		}
	}
</style>