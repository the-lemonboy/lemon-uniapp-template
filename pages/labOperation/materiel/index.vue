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
			<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">物料库存详细</text>
		<uni-icons @click="goToAdd()" class="add" type="plus-filled" size="30" style="color:#2160FF; line-height: 44px; margin-right: 10px; float:right;"></uni-icons>
		</view>
		</view>
		<view class="search-box">
			<u-search placeholder="请输入物料名称" v-model="searchKeyWord"></u-search>
		</view>
		<view class="content-box">
							<view class="item-box" v-for="item in dataList" :key="item.id">
								<view class="left-item">
									<view class="title">物料名称：{{ item.materialName }}</view>
									<view class="center-zone">
										<text class="area">规格型号：{{ item.materialModel }}</text>
										<text class="project">{{item.typetext}}</text>
									</view>
									<text class="time">物料类型：{{item.materialType}}</text>
								</view>
							</view>
					<u-empty style="margin-top: 40px;"  v-if="dataList.length == 0 && loading == false" text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
	</view>
	<addMateriel ref="addRef" @emitVisible="(val)=>mainVisible = val"></addMateriel>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad,
		onPullDownRefresh,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		getMaterielList,
		getMaterielListPage
	} from '@/api/lab/labOperation.js'
	import {
		getMenuId,searchId
	} from '@/utils/getMenuId.js'
	import addMateriel from './addMateriel.vue';
	const searchKeyWord = ref()
	const dataList = ref([])
	const listQuery = reactive({
		currentPage: 1,
		pageSize: 20,
		sort: "asc",
		sidx: "encode",
	})
	const reachBottomFlag = ref(false)
	const loading = ref(true)
	 function getList() {
		uni.showLoading({
			title: '加载中'
		});
		loading.value = true
		const menuId = getMenuId('库存管理')
		if(!reachBottomFlag.value){
			listQuery.currentPage = 1
		}
		let queryData = {
			 currentPage: 1,
			 materialName: searchKeyWord.value,
			 materialType: '',
			 packType: '',
			 supplierId: '',
			 materialModel: '',
			 domain: 'material',
			 menuId: menuId,
			 ...listQuery
		}
		 getMaterielListPage(queryData).then(res => {
			if(reachBottomFlag.value){
				dataList.value = [...dataList.value, ...res.data.list]
				listQuery.currentPage++
			}else{
				dataList.value = res.data.list
			}
			uni.hideLoading();
			loading.value = false
		})
		loading.value = true
	}
	function goToBack(){
		uni.navigateBack({delta:1})
	}
	const addRef = ref(null)
	const mainVisible = ref(true)
	function goToAdd() {
	   addRef.value.addVisible = true
	   mainVisible.value = false
	}
	onLoad(() => {
		reachBottomFlag.value = false
		getList()
		uni.$on('refresh', () => {
		   getList()
		})	
	})
	onReachBottom(()=>{
		reachBottomFlag.value = true
		getList()
	})
	onPullDownRefresh(async () => {
		try {
		    reachBottomFlag.value = false
		    await getList();
		} catch (error) {
		    uni.showToast({
		    	title: '加载失败',
				icon:'error',
		    	duration: 2000
		    });
		}
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