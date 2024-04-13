<template>
	<view class="sd-container" v-if='mainVisible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->
			<view class="content-box">
				<view class="nav-bar" style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()"  type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
					<text @click="goSelectSend()" type="primary" class="submit" style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
				</view>
				<view class="search-box">
					<u-search placeholder="搜索" v-model="keyword"></u-search>
				</view>
				<!-- <uni-navigator url="{{url}}"></uni-navigator> -->
				<view class="item-box" v-for="item in dataList" :key="item.id">
					<view class="left-item">
						<!-- 使用动态的 URL -->
						<view class="title" @click="goSelectSend(item.id)">送样批次号：{{ item.transNo }}</view>
						<view class="center-zone">
							<text class="area">送样总数/收样总数&nbsp &nbsp{{ item.sendCount }}/{{item.receivedCount}}</text>
						</view>
						<text class="time">{{item.transTime}}</text>
					</view>
			
					<view class="right-box">
					</view>
				</view>
			</view>
	</view>
	<selectSend ref='selectSendRef' @emitVisible='(val)=>mainVisible=val'></selectSend>
</template>

<script setup>
	import { ref,reactive } from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { getSendSampleList,getSendsampleDetail } from '@/api/sample/sendSample.js'
	import {getMenuId,getRouteId} from '@/utils/index.js'
	import selectSend from './selectSend.vue'
	const dataList = ref([])
	function getList(){
		const menuId = getMenuId('项目列表')
		const projectId = uni.getStorageSync('projectId')
		let query = {
			 currentPage: 1,
			        pageSize: 0,
			        sort: 'desc',
			        sidx: '',
					menuId:menuId,
					projectId : projectId,
		}
		 return	getSendSampleList(query).then(res=>{
			 dataList.value = res.data.list
			dataList.value.receivedCount = res.data.list.reduce((count, item) => {
			  return count + item.detailList.filter(val => val.received === 1).length;
			}, 0);
			dataList.value.forEach(item=>{
				item.sendCount = item.detailList.filter(val => val.received == 0).length
				item.receivedCount = item.detailList.filter(val => val.received == 1).length
			})
			})	
	}
		const selectSendRef = ref(null)
		const mainVisible = ref(true)
	function goSelectSend(id){
			selectSendRef.value.selectVisible = true
			mainVisible.value = false
			selectSendRef.value.sendId = id
			selectSendRef.value.getSendDetail()
	}
	// function goAddOrEditorData(addFlag){
	// 	 uni.setStorageSync('addFlag', addFlag)
	// 		uni.navigateTo({
	// 			url: `/pages/sampleDetection/sampling/monitorPoint/addOrEditor`,
	// 		})
	// }

	function goToBack(){
		uni.navigateBack({delta:1})
	}
	onLoad(async()=>{
		await getList()
		// await sendDetail()
	})

	
</script> 

<style scoped lang="scss">
	.sd-container {
		width: 100%;
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		.search-box {
			width: 90%;
			margin: auto;
		}

		.sort-box {
			width: 100%;

			::v-deep .u-flex {
				display: flex;
				flex-direction: row;
			}
		}

		.content-box {
			display: flex;
			flex-direction: column;
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
			justify-content: space-between;
			align-items: center;

			.left-item {
				height: 100%;
				display: flex;
				flex-direction: column;

				.title {
					font-size: $uni-font-size-base;
					margin: $uni-spacing-col-sm 0;
				}

				.area {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					margin-bottom: $uni-spacing-col-sm;
				}

				.project {
					margin-left: 10px;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					margin-bottom: $uni-spacing-col-sm;
				}

				.time {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-time;
					margin-bottom: $uni-spacing-col-sm;
				}
			}
		}
	}
</style>