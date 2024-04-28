<template>
	<view class="mo-container">
	<view class="content-box">
		<!-- <uni-navigator url="{{url}}"></uni-navigator> -->
		<uni-swipe-action ref="swipeAction" v-if="dataList.length">
					<uni-swipe-action-item
					class="swipe-item items-box"
					v-for="item in dataList" :key="item.id"
					    :right-options="swiperOptions"
					    @click="swipeClick($event,content,item.id)"
					>
						<view class="item-box" @click="goAddOrEditor(item.id)">
							<view class="left-item">
								<view class="title">土层类型：{{ item.solumType }}</view>
								<view class="center-zone">
									<text class="area">颜色：{{ item.solumColor }}</text>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<u-empty style="margin-top: 40px;" v-else text="暂无数据" mode="list"></u-empty>
	</view>
	</view>
</template>

<script setup>
	import { ref,reactive } from 'vue'
	import {onLoad,onPullDownRefresh} from '@dcloudio/uni-app'
	import { getHoleRecordList,delHoleRecordDetail } from '@/api/sample.js'
	import {getMenuId} from '@/utils/index.js'
	const dataList = ref([])
	async function getList(){
		uni.showLoading({
			title: '加载中'
		});
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
			await getHoleRecordList(query).then(res=>{
				dataList.value = res.data.list
				uni.hideLoading();
			})	
	}
	function goAddOrEditor(id){
		uni.setStorageSync('holeRecordId', id)
		uni.navigateTo({
			url:'/pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/addOrEditor'
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
					delHoleRecordDetail(id).then(res=>{
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
	onLoad(()=>{
		getList()
		uni.$on('refresh', () => {
		   getList()
		})	
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

<style lang="scss" scoped>
.items-box {
			width: 95%;
			margin: 10px auto;
			border: 1px solid #e6e6e6;
			border-radius: 5px;
			box-shadow: 5px 5px 18px #ebebeb, -5px -5px 18px #fff;
			// display: flex;
			// justify-content: space-between;
			// align-items: center;

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
					color: $uni-text-color-time;
					margin-bottom: $uni-spacing-col-sm;
				}
			}
		}
</style>