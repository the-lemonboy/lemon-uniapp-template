<template>
	<view class="mo-container">
		<uni-table border  emptyText="暂无更多数据" >
					<uni-tr>
					<uni-th  align="center">监测点位编号</uni-th>
					<uni-th align="center">采样类型</uni-th>
				</uni-tr>
				<uni-tr  v-for="item in dataList" >
					<uni-td @click="goHoleBase(item.id)"  align="center">{{item.holeNo}}</uni-td>
					<uni-td align="center">{{item.holeType}}</uni-td>
				</uni-tr>
			</uni-table>
	</view>
</template>

<script setup>
	import { ref,reactive } from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { getHoleBaseList } from '@/api/sample.js'
	import {getMenuId} from '@/utils/index.js'
	const dataList = reactive({})
	function getList(){
		let menuId = getMenuId('项目列表')
		let projectId = uni.getStorageSync('projectId')
		let query = {
			 currentPage: 1,
			        pageSize: 0,
			        sort: 'desc',
			        sidx: '',
					menuId:menuId,
					projectId : projectId
		}
			getHoleBaseList(query).then(res=>{
				Object.assign(dataList,res.data.list)
			})	
			console.log( getRouteId())
	}
	function goHoleBase(holeId){
			uni.setStorageSync('holeId', holeId)
		uni.navigateTo({
			url:'/pages/sampleDetection/sampling/pageMonitoringPoint/index'
		})
	}
	function goAddOrEditorData(addFlag){
		 uni.setStorageSync('addFlag', addFlag)
			uni.navigateTo({
				url: `/pages/sampleDetection/sampling/monitorPoint/addOrEditor`,
			})
	}
	onLoad(()=>{
		getList()
			
	})

	
</script> 

<style>
</style>