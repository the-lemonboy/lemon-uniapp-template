<template>
	<view class="main-container" v-if='mainVisible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="qc-container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">质控信息</text>
			<uni-icons @click="goAddOrEditorData()" class="add" type="plus-filled" size="30" style="color:#2160FF; line-height: 44px; margin-right: 10px; float:right;"></uni-icons>
			</view>
			</view>
			<view class="tab-box">
				<u-tabs :list="tabOptions" :is-scroll="true" v-model="tabCurent" @change="change"></u-tabs>
			</view>
			<view class="search-box">
				<u-search placeholder="请输入记录编号" v-model="searchKeyWord" @search="getList()" :show-action="searchShowActionFlag" @focus="searchShowActionFlag=true" @blur="searchShowActionFlag=false"></u-search>
			</view>
			<view class="content-box">
				<uni-swipe-action ref="swipeAction">
					<uni-swipe-action-item class="swipe-item items-box" v-for="item of dataList" :key="item.id"
						:right-options="swiperOptions"
						@click="swipeClick($event,content,item.id)">
						<view class="item-box" @click="goAddOrEditorData(item.id)">
							<view class="left-item">
								<view class="title">记录编号：{{ item.id }}</view>
								<view class="center-zone">
									<text class="area">检查人：{{ item.checkUserName }}</text>
									<text class="project">{{item.typetext}}</text>
								</view>
								<text class="time">{{item.registertime}}</text>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<u-empty style="margin-top: 40px;" v-if="dataList.length == 0 && loading == false" text="暂无数据" mode="list"></u-empty>
			</view>
		</view>
	</view>
	<addOrEditor ref='EditorRef' @curTab="curTab" @emitVisible='(val)=>mainVisible=val'></addOrEditor>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		getQCCheckBaseList,
		delQCCheckBaseDetail
	} from '@/api/sample/qualityControl.js'
	import {
		getMenuId
	} from '@/utils/index.js';
	import {
		onLoad,
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import {
		UserSettingInfo
	} from '@/api/common.js'
	import addOrEditor from './addOrEditor.vue'
	const editorFlag = ref(true)
	const tabOptions = ref([{
			name: '内部质控'
		},
		{
			name: '现场检查'
		}
	])
	const EditorRef = ref(null)
	const mainVisible = ref(true)

	function goAddOrEditorData(id) {
		EditorRef.value.visible = true
		mainVisible.value = false
		if (id) {
			EditorRef.value.itemId = id
		} else {
			EditorRef.value.checkType = `${++tabCurent.value}`
		}
		EditorRef.value.initData()
	}

	function goToBack() {
		uni.navigateBack({
			delta: 1
		})
	}
	function curTab(val){
		let temp = val
		if(typeof val !== 'number'){
			tabCurent.value = parseInt(temp)-1
		}else{
			tabCurent.value = temp-1
		}
	}
	const dataList = ref([])
	// 搜索
	const searchShowActionFlag = ref(false)
	const searchKeyWord = ref()
	const loading = ref(true)
	 function getList() {
		let menuId = getMenuId('项目列表')
		const projectId = uni.getStorageSync('projectId')
		uni.showLoading({
			title: '加载中'
		});
		loading.value = true
		let initQuery = {
			currentPage: 1,
			pageSize: 0,
			sort: 'desc',
			sidx: '',
			menuId: menuId,
			projectId: projectId,
			holeId: '',
			id:searchKeyWord.value
		}
		// Object.assign(initQuery, query)
		 getQCCheckBaseList(initQuery).then(res => {
			let list = null
			if (tabCurent.value == 0) {
				list = res.data.list.filter(item => item.checkType == '1')
			} else {
				list = res.data.list.filter(item => item.checkType == '2')
			}
			dataList.value = list
			uni.hideLoading();
			loading.value = false
		})
		loading.value = true
	}
	const tabCurent = ref(0)
	function change(index) {
		getList()
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
					delQCCheckBaseDetail(id).then(res=>{
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
		uni.$on('refresh',(val)=>{
			tabCurent.value = val-1
			getList()
		})
	})
	onPullDownRefresh(async () => {
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
	})
</script>

<style scoped lang="scss">
	.qc-container {
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