<template>
	<view class="mo-container">
		<uni-table border  emptyText="暂无更多数据" >
					<uni-tr>
					<uni-th  align="center">样品编号</uni-th>
					<uni-th align="center">样品名称</uni-th>
				</uni-tr>
				<uni-tr  v-for="item in dataList" >
					<uni-td @click="goAddOrEditor(item.id)"  align="center">{{item.sampleNo}}</uni-td>
					<uni-td align="center">{{item.sampleName}}</uni-td>
				</uni-tr>
			</uni-table>
	</view>
</template>

<script setup>
	import { ref,reactive } from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { getSoilRecordList } from '@/api/sample.js'
	import {getMenuId,getRouteId} from '@/utils/index.js'
	const dataList = reactive({})
	function getList(){
		let menuId = getMenuId('项目列表')
		const projectId = uni.getStorageSync('projectId')
		const holeId = uni.getStorageSync('holeId')
		let query = {
			 currentPage: 1,
			        pageSize: 0,
			        sort: 'desc',
			        sidx: '',
					menuId:menuId,
					projectId : projectId,
					holeId:holeId
		}
			getSoilRecordList(query).then(res=>{
				Object.assign(dataList,res.data.list)
			})	
	}
	function goAddOrEditor(id){
			uni.setStorageSync('soilSample', id)
		uni.navigateTo({
			url:'/pages/sampleDetection/sampling/pageMonitoringPoint/soilSample/addOrEditor'
		})
	}
	// function goAddOrEditorData(addFlag){
	// 	 uni.setStorageSync('addFlag', addFlag)
	// 		uni.navigateTo({
	// 			url: `/pages/sampleDetection/sampling/monitorPoint/addOrEditor`,
	// 		})
	// }
	onLoad(()=>{
		getList()
			
	})

	
</script> 

<style>
</style>