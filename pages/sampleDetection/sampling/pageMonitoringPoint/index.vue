<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">
		<view class="top_view"></view>
	</view>
	<!-- #endif -->
	<view class="detail-container">
		<view class="nav-bar"
			style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
			<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
			<text class="title"
				style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
			<text @click="scanQRcode" type="primary" class="submit"
				style="color:blue; line-height: 44px; margin-right: 10px; float:right;"><uni-icons type="scan" size="30"></uni-icons></text>
		</view>
		<view class="link-container">
			<view @click="goToSampling(item.routerUrl)" class="link-box" v-for='item of linkOptions' :key='item.id'>
				<image :src='item.iconUrl' style="width: 45rpx; margin-bottom: 5px; height: 45rpx;" ></image>
				<text>{{item.iconName}}</text>
			</view>
		</view>
	
		<view class="tab-box">
			<u-tabs :font-size='20' :inactive-color="'#adb5bd'" :list="tabOptions" :is-scroll="true" v-model="tabCurent" @change="change"></u-tabs>
		</view>
			<driver></driver>
	<view class="content">
		<view class="holeRecord-container" v-if="tabCurent === 0">
			<holeRecord></holeRecord>
		</view>
		<view class="waterSample-container" v-else-if="tabCurent === 1">
			<soilSample></soilSample>
		</view>
		<view class="wellBase-container" v-else-if="tabCurent === 2">
			<wellBase></wellBase>
		</view>
		<view class="wellWashRecord-container" v-else-if="tabCurent === 3">
			<wellWashRecord></wellWashRecord>
		</view>
		<view class="soilSample-container" v-else-if="tabCurent === 4">
			<waterSample></waterSample>
		</view>
	</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import holeRecord from './holeRecord/index.vue';
	import soilSample from './soilSample/index.vue';
	import waterSample from './waterSample/index.vue';
	import wellBase from './wellBase/index.vue';
	import wellWashRecord from './wellWashRecord/index.vue';
	import {
		getProjectDetail
	} from '@/api/sample.js'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import driver from '@/components/driver.vue'
	// 全局样式
	const linkOptions = ref([{
			id: 0,
			iconName: '监测点位',
			iconUrl: '/static/project-icons/jcdianwei.svg',
			routerUrl: '/pages/sampleDetection/sampling/monitorPoint/addOrEditor'
		},
		{
			id: 1,
			iconName: '钻孔记录',
			iconUrl: '/static/project-icons/zkjl.svg',
			routerUrl: '/pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/addOrEditor'
		},
		{
			id: 2,
			iconName: '土样记录',
			iconUrl: '/static/project-icons/syjilu.svg',
			routerUrl: '/pages/sampleDetection/sampling/pageMonitoringPoint/soilSample/addOrEditor'
		},
		{
			id: 3,
			iconName: '监测井',
			iconUrl: '/static/project-icons/jiancejing.svg',
			routerUrl: '/pages/sampleDetection/sampling/pageMonitoringPoint/wellBase/addOrEditor'
		},
		{
			id: 4,
			iconName: '洗井记录',
			iconUrl: '/static/project-icons/xjjilu.svg',
			routerUrl: '/pages/sampleDetection/sampling/pageMonitoringPoint/wellWashRecord/addOrEditor'
		},
		{
			id: 5,
			iconName: '水样记录',
			iconUrl: '/static/project-icons/zhikong.svg',
			routerUrl: '/pages/sampleDetection/sampling/pageMonitoringPoint/waterSample/addOrEditor'
		},
	])

	const tabOptions = reactive([{
			name: '钻孔记录'
		},
		{
			name: '土样记录'
		},
		{
			name: '建井信息'
		},
		{
			name: '洗井信息'
		},
		{
			name: '水样记录'
		},
		
	])
	const tabCurent = ref(0)

	function change(index) {
		tabCurent.value = index
		console.log("index", index);
		console.log(typeof index);
	}

	// 接口获取的表单数据
	let dataList = reactive(null)

	function goToSampling(router) {
		uni.navigateTo({
			url: router,
		})
	}
	function goToBack() {
		uni.setStorageSync('holeId', null)
		uni.navigateBack({
			delta: 1
		})
	}
	function scanQRcode(){
		uni.scanCode({
			success: function (res) {
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
				const result = JSON.parse(res.result)
				console.log(result.type)
				if(result.type === 'soilSample'){
					uni.setStorageSync('soilSampleId', result.id)
					uni.navigateTo({
						url:'/pages/sampleDetection/sampling/pageMonitoringPoint/soilSample/addOrEditor'
					})
				}else if(result.type === 'waterSample'){
					uni.setStorageSync('waterSampleId', result.id)
					uni.navigateTo({
						url:'/pages/sampleDetection/sampling/pageMonitoringPoint/waterSample/addOrEditor'
					})
				}else{
					uni.showToast({
						title: '无效二维码',
						duration: 2000
					});
				}
			}
		});
	}
</script>

<style lang="scss" scoped>
	.detail-container {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

.tab-box{
	width: 95%;
	margin: auto;
}
	.link-container {
		// display: flex;
		// flex-direction: row;
		// justify-items: center;
		// box-sizing: border-box;
		margin-top: 15px;
		display: grid;
		grid-template-columns: repeat(4,1fr);
		grid-row-gap: 20px;
		.link-box {
			justify-items: center;
			align-items: center;
			display: flex;
			flex-direction: column;
		}

		text {
			font-size: $uni-font-size-base;
			color: $uni-link-color;
		}
	}
</style>