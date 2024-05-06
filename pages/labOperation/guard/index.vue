<template>
	<view class="main-container" v-if="mainVisible">
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
	<view class="m-container">
		<view class="nav-container" style="height: 44px;">
			<view class="nav-bar"
				style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
			<uni-icons @click="goToBack()"  type="left" size="30" style="line-height: 44px;"></uni-icons>
			<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">门禁控制</text>
		</view>
		</view>
		<view class="content-box">
							<view class="item-box" @click="goEdit(item)" v-for="item in dataList" :key="item.id">
								<view class="left-item">
									<view class="title">门禁位置：{{ item.name }}</view>
									<view class="center-zone">
										<text class="area">门禁id：{{ item.id }}</text>
									</view>
									<text class="time">门禁ip：{{item.ip}}</text>
								</view>
							</view>
					<u-empty style="margin-top: 40px;" v-if="dataList.length == 0 && loading == false"  text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
	</view>
	<edit ref="editRef" @emitVisible="(val)=>mainVisible = val"></edit>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad,
		onPullDownRefresh
	} from "@dcloudio/uni-app"
	import {
		getDoorInfoList
	} from '@/api/lab/labOperation.js'
	import {
		getMenuId,searchId
	} from '@/utils/getMenuId.js'
	import edit from './edit.vue';
	const dataList = ref([])
	const listQuery = reactive({
		currentPage: 1,
		sort: "desc",
		sidx: "encode",
	})
	const loading = ref(true)
	 function getList() {
		uni.showLoading({
			title: '加载中'
		});
		loading.value = true
		let query = {
			menuId:getMenuId('门禁管理'),
			...listQuery
		}
		getDoorInfoList(query).then(res=>{
			dataList.value = res.data.list
			uni.hideLoading();
			loading.value = false
		})	
		loading.value = true
	}
	function goToBack(){
		uni.navigateBack({delta:1})
	}
	const editRef = ref(null)
	const mainVisible = ref(true)
	function goEdit(doorInfo) {
	   editRef.value.editVisible = true
	   editRef.value.doorInfo = doorInfo
	   mainVisible.value = false
	}
	onLoad(() => {
		getList()
	})
	onPullDownRefresh(async () => {
		await getList();
		uni.stopPullDownRefresh();
	})	
</script>

<style scoped lang="scss">
	.m-container {
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
			margin-top: 10px;
		}

		.item-box {
			width: 95%;
			height: 80px;
			margin: 5px auto;
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
				justify-content: center;
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
					color: $uni-text-color-grey;
					margin-bottom: $uni-spacing-col-sm;
				}
			}
		}
	}
</style>