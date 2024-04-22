<template>
	<view class="mo-container">
		<view class="content-box">
			<uni-swipe-action ref="swipeAction" v-if="dataList.length">
						<uni-swipe-action-item
						class="swipe-item items-box"
						v-for="item in dataList" :key="item.id"
						    :right-options="swiperOptions"
						    @click="swipeClick($event,content,item.id)"
						>
							<view class="item-box" @click="goAddOrEditor(item.id)">
								<view class="left-item">
									<view class="title">监测点位编号：{{ item.holeNo }}</view>
									<view class="center-zone">
										<text class="area">采样类型：{{ item.holeType }}</text>
										<text class="project">{{item.typetext}}</text>
									</view>
									<text class="time">{{item.registertime}}</text>
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
	import {onLoad,onPullDownRefresh,onShow} from '@dcloudio/uni-app'
	import { getSoilRecordList,delSoilRecordDetail } from '@/api/sample.js'
	import {getMenuId} from '@/utils/index.js'
	const dataList = ref([])
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
				dataList.value = res.data.list
			})	
	}
	function goAddOrEditor(id){
			uni.setStorageSync('soilSampleId', id)
		uni.navigateTo({
			url:'/pages/sampleDetection/sampling/pageMonitoringPoint/soilSample/addOrEditor'
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
					delSoilRecordDetail(id).then(res=>{
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
	onShow(()=>{
		getList()
			
	})
	onPullDownRefresh(async () => {
		await getList()
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