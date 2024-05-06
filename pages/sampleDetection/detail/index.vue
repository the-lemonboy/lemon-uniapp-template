<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">
		<view class="top_view"></view>
	</view>
	<!-- #endif -->
	<view class="detail-container">
		<view class="nav-container" style="height: 44px;">
			<view class="nav-bar"
				style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
			<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
			<text class="title"
				style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样检测详细</text>
		</view>
		</view>
		<view class="link-container">

			<view @click="goToSampling(item.routerUrl)" class="link-box" v-for='item of linkOptions' :key='item.id'>
			<image :src="item.iconUrl" style="width: 45rpx; height: 45rpx;"></image>
							<text>{{item.iconName}}</text>
			</view>
		</view>
		<view class="tab-box">
			<u-tabs :list="tabOptions" :is-scroll="true" v-model="tabCurent" @change="change"></u-tabs>
		</view>
			<driver></driver>
		<project v-if="tabCurent == 0"></project>
		<member v-else-if="tabCurent == 1"></member>
		<!-- <projectMap v-else-if="tabCurent == 2"></projectMap> -->
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import project from './project.vue'
	import member from './member.vue'
	import projectMap from './projectMap.vue'
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
			iconName: '采样',
			iconUrl: '/static/project-icons/caiyang.svg',
			routerUrl: '/pages/sampleDetection/sampling/index'
		},
		{
			id: 1,
			iconName: '送样',
			iconUrl: '/static/project-icons/songyang.svg',
			routerUrl: '/pages/sampleDetection/sendSample/index'
		},
		{
			id: 2,
			iconName: '收样',
			iconUrl: '/static/project-icons/shouyang.svg',
			routerUrl: '/pages/sampleDetection/receiveSample/index'
		},
		{
			id: 3,
			iconName: '质控',
			iconUrl: '/static/project-icons/zhikong.svg',
			routerUrl: '/pages/sampleDetection/qualityControl/index'
		},
	])
	const tabOptions = reactive([{
			name: '项目'
		},
		{
			name: '成员'
		},
		// {
		// 	name:'项目地图'
		// }
	])
	const tabCurent = ref(0)

	function change(index) {
	}

	// 接口获取的表单数据
	let dataList = reactive(null)

	function goToSampling(router) {
		const projectId = uni.getStorageSync('projectId')
		uni.navigateTo({
			url: `${router}?id=${projectId}`,
		})
	}
	function goToBack() {
		uni.setStorageSync('projectId', null)
		uni.setStorageSync('holeId',null)
		uni.setStorageSync('soilSampleId',null)
		uni.setStorageSync('waterSampleId',null)
		uni.setStorageSync('wellBaseId',null)
		uni.setStorageSync('wellWashRecord',null)
		uni.setStorageSync('projectName',null)
		uni.navigateBack({
			delta: 1
		})
	}
</script>

<style lang="scss" scoped>
	.detail-container {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}


	.link-container {
		margin-top:15px ;
		display: flex;
		flex-direction: row;
		justify-items: center;
		box-sizing: border-box;

		.link-box {
			flex: 1;
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