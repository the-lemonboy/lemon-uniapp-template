<template>
	<view class="main-container">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		<view class="sa-container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
				<uni-icons @click="goAddOrEditorData()" class="add" type="plus-filled" size="30" style="color:#2160FF; line-height: 44px; margin-right: 10px; float:right;"></uni-icons>
			</view>
			</view>
			<view class="tab-box">
				 <u-tabs :list="tabOptions" :is-scroll="true" v-model="tabCurent" @change="change"></u-tabs>
			</view>
			<view class="content">
				<view class="monitor-container" v-if='!tabCurent'>
					<monitorPoint></monitorPoint>
				</view>
				<view class="quality-container" v-else>
					<qualitySample></qualitySample>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import{onLoad} from '@dcloudio/uni-app'
	import monitorPoint from './monitorPoint/index.vue';
	import qualitySample from './qualitySample/index.vue';
	
	let showEditorFlag = ref(false)
	function goToBack(){
		uni.navigateBack({delta:1})
	}
	function goAddOrEditorData(){
		if(tabCurent.value == 0){
			uni.setStorageSync('holeId', null)
			uni.navigateTo({
				url: `/pages/sampleDetection/sampling/monitorPoint/addOrEditor`,
			})
		}else{
			uni.navigateTo({
				url: `/pages/sampleDetection/sampling/qualitySample/addOrEditor`,
			})
		}
	}
	const tabOptions = ref([
		{name:'检测点位'},
		{name:'质控样品'}
	])
	const tabCurent = ref(0)
	function change(index) {
		tabCurent.value = index
			}	
</script>

<style lang="scss" scoped>
</style>