<template>
	<view class="detail-container">
		<view class="link-container">
			<view @click="goToSampling(item.routerUrl)" class="link-box" v-for='item of linkOptions' :key='item.id'>
				<img :src='item.iconUrl' style="width: 45rpx;" />
				<text>{{item.iconName}}</text>
			</view>
		</view>
	
		<view class="tab-box">
			<u-tabs :list="tabOptions" :is-scroll="true" v-model="tabCurent" @change="change"></u-tabs>
		</view>
			<driver></driver>
		<project v-if="!tabCurent"></project>
		<member v-else></member>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import project from './project.vue'
	import member from './member.vue'
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
		}
	])
	const tabCurent = ref(0)

	function change(index) {
		console.log("index", index);
	}

	// 接口获取的表单数据
	let dataList = reactive(null)

	function goToSampling(router) {
		const projectId = uni.getStorageSync('projectId')
		uni.navigateTo({
			url: `${router}?id=${projectId}`,
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


	.link-container {
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