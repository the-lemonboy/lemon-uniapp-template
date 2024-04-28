<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">
		<view class="top_view"></view>
	</view>
	<!-- #endif -->
	<view class="sp-container">
		<view class="search-box">
			<u-search placeholder="请输入项目名称" v-model="searchKeyWord" @search="getMenuList()"></u-search>
		</view>
		<view class="sort-box">
			<u-dropdown ref="dropdown1" @open="open" @close="close">
				<u-dropdown-item v-for="(item,index) of dropdownValue" :key="index" :title="item.title" :options="item.options" @change="dropChange"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="content-box">
			<uni-swipe-action ref="swipeAction" v-if="tableData.length">
				<uni-swipe-action-item class="swipe-item items-box" v-for="item in tableData" :key="item.id"
					:right-options="swiperOptions" @change="swipeChange($event)"
					@click="swipeClick($event,content,item.id)">
					<view class="item-box" @click="goToDeatil(item.id,item.name)">
						<view class="left-item">
							<view class="title">{{ item.name }}</view>
							<view class="center-zone">
								<text class="area">{{ item.organizetext }}</text>
								<text class="project">{{item.typetext}}</text>
							</view>
							<text class="time">{{item.registertime}}</text>
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
		getProjectBaseList,
		delProjectDetail
	} from '@/api/sample.js'
	import {
		getMenuId
	} from '@/utils/getMenuId.js'
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	const dropdownValue = ref([
	  {
	    title: "行政区域",
	    options: [
	      {
	        label: '生序',
	        value: {type:"provincetext",value:'asc'}
	      },
	      {
	        label: '降序',
	        value: {type:"provincetext",value:'desc'}
	      }
	    ]
	  },
	  {
	    title: "项目状态",
	    options: [
			{
	        label: '生序',
	        value: {type:"segment",value:'asc'}
	      },
	      {
	        label: '降序',
	         value: {type:"segment",value:'desc'}
	      }
	    ]
	  },
	  {
	    title: "项目类型",
	    options: [
	      {
	        label: '生序',
	         value: {type:"typetext",value:'asc'}
	      },
	      {
	        label: '降序',
	        value: {type:"typetext",value:'desc'},
	      }
	    ]
	  }
	]);

	const swiperOptions = ref([{
		text: '删除',
		style: {
			backgroundColor: '#dd524d'
		}
	}])

	function dropChange(val) {
		listQuery.sidx = val.type
		listQuery.sort = val.value
		getMenuList()
	}
	// 搜索
	const searchKeyWord = ref()

	function swipeClick(e, ctx, id) {
		uni.showModal({
			title: '提示',
			content: '您确定要删除此项吗？',
			success: res => {
				if (res.confirm) {
					delProjectDetail(id).then(res => {
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
	const listQuery =  reactive({
		sort: "asc",
		sidx: "encode"
	})
	async function getMenuList(name) {
		// return new Promise(resolve=>{
		const menuId = getMenuId('项目列表')
		let queryData = {
			// pageSize: 0,
			currentPage: 1,
			menuId: menuId,
			name: searchKeyWord.value,
			...listQuery
		}

		await getProjectBaseList(queryData).then(res => {
			tableData.value = res.data;
		})
	}
	// 项目id传给子孙组件
	function goToDeatil(id, name) {
		uni.setStorageSync('projectId', id)
		uni.setStorageSync('projectName', name)
		uni.navigateTo({
			url: `/pages/sampleDetection/detail/index?id=${id}`,
		})
	}
	// getMenuList()
	onLoad(() => {
		store.dispatch('user/getCurrentUser')
		getMenuList()
	})
	onPullDownRefresh(async () => {
		try {
			await getMenuList();
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
	.sp-container {
		width: 100%;
		margin: 0;
		padding:20rpx 0;
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