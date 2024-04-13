<template>
		<view class="send-container" v-if="selectVisible">
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
<view class="content-box">

				<view class="nav-bar" style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()"  type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
					<text @click="addOrUpdateData()" type="primary" class="submit" style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
				</view>
				<view class="send-box-item" v-for="item of unSendList" :key="item.id">
					<view class="item-box">
							<u-checkbox   @change="checkboxChange" 
											v-model="item.received" 
											shape="circle"
										></u-checkbox>
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
	<view class="select-footer">
		<view class="footer-radio">
			<u-radio-group v-model="value">
				<u-radio shape="circle" >全选</u-radio>
			</u-radio-group>
		</view>
		<view class="right-box">
				<text class="count">共计： {{unSendList.length}}个</text>
				<u-button type="primary" @click="goSendDetail">选择送样</u-button>
		</view>
	</view>	
	</view>
	</view>
	<sendDetail ref="sendDetailRef" @emitVisible="(val)=>selectVisible = val"></sendDetail>
</template>

<script setup>
	import {ref,defineExpose,defineEmits,toRaw} from 'vue'
	import {getSendsampleDetail,updateSendsample} from '@/api/sample/sendSample.js'
	import {onLoad} from '@dcloudio/uni-app'
	import sendDetail from './sendDetail.vue';
	const emits = defineEmits(['emitVisible'])
	const selectVisible = ref(false)
	function addOrUpdateData(){
		
	}
	// 送样和收样详细
	const sendId = ref(null)
	const dataList = ref([])
	const unSendList = ref([])   //未送的样品
	function getSendDetail(){
		const id = sendId.value
	     getSendsampleDetail(id).then(res=>{
			dataList.value = res.data
			unSendList.value = res.data.detailList.filter(item=>item.received == 0)
			// countSend.value = res.data.detailList.filter(item=>item.received == 0).length
		})
	}
	function handleData(oldData,newData){
		oldData.detailList.forEach((oldItem,oldIndex)=>{
			newData.forEach(newItem=>{
				if(oldItem.id === newItem.id){
					oldItem[oldIndex] = newItem
				}
			})
		})
		oldData.detailList.forEach(item=>{
			if(item.received === true){
				item.received = 1
			}else if(item.received === false){
				item.received = 0
			}	
		})
		return oldData
	}
	const sendDetailRef = ref(null)
	function goSendDetail(){
		sendDetailRef.value.sendDetailVisible = true
		sendDetailRef.value.sendDetailId = dataList.value
		sendDetailRef.value.unSendDetailList = unSendList.value
		console.log(sendDetailRef.value.unSendDetailList)
	}
	function goToBack(){
		selectVisible.value = false
		emits('emitVisible',true)
	}
	function checkboxChange(e){
		console.log(unSendList.value)
		console.log(e)
	}
	onLoad(()=>{
		// sendDetail()
	})
	defineExpose({
		selectVisible,
		getSendDetail,
		sendId
		
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
		.select-footer{
			position: fixed;
			bottom: 0;
			left: 0;
			height: 60px;
			width: 100vw;
			box-shadow: 0px -5px 18px #ebebeb, 0px 5px 18px #fff;

			display: flex;
			justify-content: space-between;
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