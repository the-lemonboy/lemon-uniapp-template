<template>
	<view class="main-container" v-if="mainVisible">
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
	<view class="m-container">
		<view class="nav-bar" style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
			<uni-icons @click="goToBack()"  type="left" size="30" style="line-height: 44px;"></uni-icons>
			<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">物料库存详细</text>
			<text @click="goToAdd()" type="primary" class="submit" style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
		</view>
		<view class="search-box">
			<u-search placeholder="搜索" v-model="keyword"></u-search>
		</view>
		<view class="content-box">
			<!-- <uni-navigator url="{{url}}"></uni-navigator> -->
			<view class="item-box" v-for="item of tableData" :key="item.id">
				<view class="left-item">
					<!-- 使用动态的 URL -->
					<view class="title">物料名称：{{ item.materialName }}</view>
					<view class="center-zone">
						<text class="area">规格型号：{{ item.materialModel }}</text>
						<text class="project">{{item.typetext}}</text>
					</view>
					<text class="time">物料类型：{{item.materialType}}</text>
				</view>

				<view class="right-box">
				
				</view>
			</view>
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
		onPullDownRefresh
	} from "@dcloudio/uni-app"
	import {
		getMaterielList
	} from '@/api/lab/labOperation.js'
	import {
		getMenuId,searchId
	} from '@/utils/getMenuId.js'
	import addMateriel from './addMateriel.vue';
	const tableData = ref([])
	async function getMenuList() {
		const menuId = getMenuId('库存管理')
		let queryData = {
			 currentPage: 1,
			 materialName: '',
			 materialType: '',
			 packType: '',
			 supplierId: '',
			 materialModel: '',
			 domain: 'material',
			// pageSize: 0,
			sort: "asc",
			sidx: "encode",
			menuId: menuId
		}
		getMaterielList(queryData).then(res => {
			tableData.value = res.data.list;
			console.log(tableData.value)
		})
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
	// getMenuList()
	onLoad(() => {
		// getMenuList()
		console.log(searchId('484411573868167301'))
	})
	onPullDownRefresh(async () => {
		await getMenuList()
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
		}

		.item-box {
			width: 90%;
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