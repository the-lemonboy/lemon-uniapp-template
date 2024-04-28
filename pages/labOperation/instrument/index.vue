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
				style="position: fixed; z-index: 99; background-color: white;box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
			<uni-icons @click="goToBack()"  type="left" size="30" style="line-height: 44px;"></uni-icons>
			<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">仪器使用记录</text>
		<uni-icons @click="goAddOrEditorData()" class="add" type="plus-filled" size="30" style="color:#2160FF; line-height: 44px; margin-right: 10px; float:right;"></uni-icons>		
		<text @click="scanQRcode()" type="primary" class="submit"
			style="color:blue; line-height: 44px; margin-right: 10px; float:right;"><uni-icons type="scan" size="30"></uni-icons></text>
		</view>
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
					    @click="swipeClick($event,content,item.id)"
					>
						<view class="item-box" @click="goAddOrEditorData(item.id)">
							<view class="left-item">
								<view class="title">申请单号：{{ item.applyCode }}</view>
								<view class="center-zone">
									<text class="area">申请人：{{ item.applyUserName }}</text>
									<text class="project">{{item.typetext}}</text>
								</view>
								<text class="time">申请时间：{{item.applyTime}}</text>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<u-empty style="margin-top: 40px;" v-else text="暂无数据" mode="list"></u-empty>
		</view>
	</view>
	</view>
	<equipmentDetail ref="detailRef" @emitVisible="(val)=>mainVisible = val"></equipmentDetail>
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
		onPullDownRefresh,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		getApplyEquipmentListPage,
		delEquipment
	} from '@/api/lab/labOperation.js'
	import {
		getMenuId,searchId
	} from '@/utils/getMenuId.js'
	import applyInstrument from './applyInstrument.vue';
	import equipmentDetail from './equipmentDetail.vue';
	const tableData = ref([])
	// 搜索
	const searchKeyWord = ref()
	const listQuery = reactive({
		currentPage: 1,
		pageSize: 20,
		sort: "asc",
		sidx: "encode",
	})
	const reachBottomFlag = ref(false)
	async function getList() {
		uni.showLoading({
			title: '加载中'
		});
		const menuId = getMenuId('仪器使用')
		if(!reachBottomFlag.value){
			listQuery.currentPage = 1
		}
		let queryData = {
			 applyType:['Rec'],
			 domain: 'equip',
			 menuId: menuId,
			 applyCode:searchKeyWord.value,
			 ...listQuery
		}
		await getApplyEquipmentListPage(queryData).then(res => {
			if(reachBottomFlag.value){
				tableData.value = [...tableData.value, ...res.data.list]
			}else{
				tableData.value = res.data.list
			}
			listQuery.currentPage++
			uni.hideLoading();
			
		})
	}
	const swiperOptions = ref([{
				            text: '删除',
				            style: {
				                backgroundColor: '#dd524d'
				            }
				        }
			])
		function swipeClick(e,ctx,id){
			uni.showModal({
				title: '提示',
				content: '您确定要删除此项吗？',
				success: res => {
					if (res.confirm) {
						delEquipment(id).then(res=>{
							getList()
						})
						uni.showToast({
							title: '移除成功',
							icon: 'none'
						});
					}
				}
			});
		}
	function goToBack(){
		uni.navigateBack({delta:1})
	}
	const addRef = ref(null)
	const mainVisible = ref(true)
	function goAddOrEditorData(id) {
	   addRef.value.addVisible = true
	   addRef.value.id = id
	   addRef.value.initData()
	   mainVisible.value = false
	}
	const detailRef = ref(null)
	function scanQRcode(){
		uni.scanCode({
			success: function (res) {
				detailRef.value.detailVisible = true
				detailRef.value.equipid = res.result
				detailRef.value.getEquipBase()
				detailRef.value.getEquipUseList()
				mainVisible.value = false
			},
			error:function(res){
				uni.showToast({
					title: '无效二维码',
					duration: 2000
				});
			}
		});
	}

	onLoad(() => {
		getList()
		uni.$on('refresh', () => {
		   getList()
		})	
	})
	onReachBottom(()=>{
		getList()
	})
	onPullDownRefresh(async () => {
		try {
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
			margin:0 auto;
			display: flex;
			justify-content: center;
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