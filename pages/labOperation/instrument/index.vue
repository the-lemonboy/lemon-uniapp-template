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
			<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">仪器使用记录</text>
			<text @click="goToAdd()" type="primary" class="submit" style="color:blue; line-height: 44px; margin-right: 10px; float:right;">新增</text>
		</view>
	<view class="search-box">
		<u-search placeholder="搜索申请单号" v-model="searchKeyWord" @search="getMenuList()"></u-search>
	</view>
	<view class="content-box">
		<uni-swipe-action ref="swipeAction" v-if="tableData.length">
					<uni-swipe-action-item
					class="swipe-item items-box"
					v-for="item in tableData" :key="item.id"
					    :right-options="swiperOptions"
					    @change="swipeChange($event)"
					    @click="swipeClick($event,content,item.id)"
					>
						<view class="item-box">
							<view class="left-item">
								<view class="title">申请单号：{{ item.applyCode }}</view>
								<view class="center-zone">
									<text class="area">申请人：{{ item.applyUserName }}</text>
									<text class="project">{{item.typetext}}</text>
								</view>
								<text class="time">申请时间：{{item.applyTime}}</text>
							</view>
							
						<!-- 	<view class="right-box">
								<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />
								<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />
								<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />
								<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />
							</view> -->
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<u-empty style="margin-top: 40px;" v-else text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
	</view>
	<applyInstrument ref="addRef" @emitVisible="(val)=>mainVisible = val"></applyInstrument>
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
		getApplyEquipmentList
	} from '@/api/lab/labOperation.js'
	import {
		getMenuId,searchId
	} from '@/utils/getMenuId.js'
	import applyInstrument from './applyInstrument.vue';
	function swipeClick(e,ctx,id){
		uni.showModal({
			title: '提示',
			content: '您确定要删除此项吗？',
			success: res => {
				if (res.confirm) {
					delProjectDetail(id).then(res=>{
						getMenuList()
					})
					uni.showToast({
						title: '移除成功',
						icon: 'none'
					});
				}
			}
		});
	}
	const tableData = ref([])
	// 搜索
	const searchKeyWord = ref()
	async function getMenuList() {
		const menuId = getMenuId('仪器使用')
		let queryData = {
			 currentPage: 1,
			 applyType:['Rec'],
			 domain: 'equip',
			 sort: "asc",
			 sidx: "applyCode",
			 menuId: menuId,
			 applyCode:searchKeyWord.value
		}
		getApplyEquipmentList(queryData).then(res => {
			
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
		getMenuList()
		console.log(searchId('484709504437452997'))
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

	.items-box {
		width: 95%;
		margin: 10px auto;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		box-shadow: 5px 5px 18px #ebebeb, -5px -5px 18px #fff;
	
		.left-item {
			margin: 10px;
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