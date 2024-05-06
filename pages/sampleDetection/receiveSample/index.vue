<template>
	<view class="sd-container" v-if='mainVisible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="content-box">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white;box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title"
						style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">收样信息</text>
				</view>
			</view>
			<view class="search-box">
				<u-search placeholder="搜索批次号" v-model="searchKeyWord" @search="getList()"></u-search>
			</view>
			<view class="content-box">
				<uni-swipe-action ref="swipeAction">
					<uni-swipe-action-item class="swipe-item items-box" v-for="item of dataList" :key="item.id"
						:right-options="swiperOptions" @change="swipeChange($event)"
						@click="swipeClick($event,content,item.id)">
						<view class="item-box" @click="goSelectSend(item.id)">
							<view class="left-item">
								<view class="title">批次号：{{ item.transNo }}</view>
								<view class="center-zone">
									<text class="area">项目号：{{ item.projectName }}</text>
									<text class="project">{{item.typetext}}</text>
								</view>
								<text class="time">接收数量：{{item.transCount}}</text>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<u-empty style="margin-top: 40px;" v-if="dataList.length == 0 && loading == false" text="暂无数据" mode="list"></u-empty>

			</view>

		</view>
	</view>
	<selectReceive ref='selectSendRef' @emitVisible='emitVisible'></selectReceive>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onLoad,
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import {
		getSendSampleList,
		delSendsampleDetail
	} from '@/api/sample/sendSample.js'
	import {
		getMenuId
	} from '@/utils/index.js'
	import selectReceive from './selectReceive.vue'
	const dataList = ref([])
	const searchKeyWord = ref()
	async function getList() {
		uni.showLoading({
			title: '加载中'
		});
		loading.value = true
		const menuId = getMenuId('项目列表')
		const projectId = uni.getStorageSync('projectId')
		let query = {
			currentPage: 1,
			pageSize: 0,
			sort: 'desc',
			sidx: '',
			menuId: menuId,
			projectId: projectId,
			transNo: searchKeyWord.value,
		}
		await getSendSampleList(query).then(res => {
			dataList.value = res.data.list.filter(item => item.transState == '0')
			dataList.value.receivedCount = res.data.list.reduce((count, item) => {
				return count + item.detailList.filter(val => val.received === 1).length;
			}, 0);
			dataList.value.forEach(item => {
				item.sendCount = item.detailList.filter(val => val.received == 0).length
				item.receivedCount = item.detailList.filter(val => val.received == 1).length
			})
			uni.hideLoading();
			loading.value = false
		})
		loading.value = true
	}
	const selectSendRef = ref(null)
	const mainVisible = ref(true)

	function goSelectSend(id) {
		selectSendRef.value.selectVisible = true
		selectSendRef.value.receiveId = id
		selectSendRef.value.initData(id)
		mainVisible.value = false
		// selectSendRef.value.getSendDetail()
	}

	function emitVisible(val) {
		mainVisible.value = true
		getList()
	}

	function goToBack() {
		uni.navigateBack({
			delta: 1
		})
	}
	const swiperOptions = ref([{
		text: '删除',
		style: {
			backgroundColor: '#dd524d'
		}
	}])

	function swipeClick(e, ctx, id) {
		uni.showModal({
			title: '提示',
			content: '您确定要删除此项吗？',
			success: res => {
				if (res.confirm) {
					delSendsampleDetail(id).then(res => {
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
	onLoad(() => {
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
				icon: 'error',
				duration: 2000
			});
		}
		uni.stopPullDownRefresh();
	})
</script>

<style scoped lang="scss">
	.sd-container {
		width: 100%;
		margin: 0;
		padding-bottom: 20rpx;
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
	}
</style>