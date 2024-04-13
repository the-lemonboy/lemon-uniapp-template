<template>
	<view class="detail-container">
		<view class="link-container">
			<view @click="goToSampling(item.routerUrl)" class="link-box" v-for='item of linkOptions' :key='item.id'>
				<img :src='item.iconUrl' style="width: 45rpx; margin-bottom: 5px;" />
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
	
</script>

<style lang="scss" scoped>
	.detail-container {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		padding-top: 20px;
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