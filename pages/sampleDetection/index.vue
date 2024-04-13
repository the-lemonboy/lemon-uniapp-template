<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
	<view class="sp-container">
		<view class="search-box">
			<u-search placeholder="搜索" v-model="keyword"></u-search>
		</view>
		<view class="sort-box">
			<u-dropdown ref="dropdown1" @open="open" @close="close">
				<u-dropdown-item v-model="selectedItem" title="行政区域" :options="dropdownZone"></u-dropdown-item>
				<u-dropdown-item v-model="selectedItem" title="项目状态" :options="dropdownStatus"></u-dropdown-item>
				<u-dropdown-item v-model="selectedItem" title="项目类型" :options="dropdownType"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="content-box">
			<!-- <uni-navigator url="{{url}}"></uni-navigator> -->
			<view class="item-box" v-for="item in tableData" :key="item.id">
				<view class="left-item">
					<!-- 使用动态的 URL -->
					<view class="title" @click="goToDeatil(item.id)">{{ item.name }}</view>
					<view class="center-zone">
						<text class="area">{{ item.organizetext }}</text>
						<text class="project">{{item.typetext}}</text>
					</view>
					<text class="time">{{item.registertime}}</text>
				</view>

				<view class="right-box">
					<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />
					<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />
					<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />
					<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />
				</view>
			</view>
		</view>
	</view>
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
		getProjectBaseList
	} from '@/api/sample.js'
	import {
		getMenuId
	} from '@/utils/getMenuId.js'
	// 全局变量
	const dropdownZone = reactive([{
			label: '默认排序',
			value: 1,
		},
		{
			label: '距离优先',
			value: 2,
		},
		{
			label: '价格优先',
			value: 3,
		}
	])
	const dropdownStatus = reactive([{
			label: '默认排序',
			value: 1,
		},
		{
			label: '距离优先',
			value: 2,
		},
		{
			label: '价格优先',
			value: 3,
		}
	])
	const dropdownType = reactive([{
			label: '默认排序',
			value: 1,
		},
		{
			label: '距离优先',
			value: 2,
		},
		{
			label: '价格优先',
			value: 3,
		}
	])
	const MenuName = '项目列表'
	const detailUrl = ''
	const tableData = ref([])

	async function getMenuList() {
		const menuId = getMenuId('项目列表')
		let queryData = {
			currentPage: 1,
			// pageSize: 0,
			sort: "asc",
			sidx: "encode",
			menuId: menuId
		}
		getProjectBaseList(queryData).then(res => {
			tableData.value = res.data;
			console.log(tableData.value)
		})
	}
	// 项目id传给子孙组件
	function goToDeatil(id) {
	     uni.setStorageSync('projectId', id)
		uni.navigateTo({
			url: `/pages/sampleDetection/detail/index?id=${id}`,
		})
	}
	// getMenuList()
	onLoad(() => {
		getMenuList()
	})
	onPullDownRefresh(async () => {
		await getMenuList()
		uni.stopPullDownRefresh();
	})
</script>

<style scoped lang="scss">
	.sp-container {
		width: 100%;
		margin: 0;
		padding: 0;
		padding: 20rpx;
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