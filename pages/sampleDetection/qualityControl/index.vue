<template>
	<view class="main-container" v-if='mainVisible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		<view class="qc-container">
			<view class="nav-bar" style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
				<uni-icons @click="goAddOrEditorData()" class="add" type="plus-filled" size="30" style="color:blue; line-height: 44px; margin-right: 10px; float:right;"></uni-icons>
			</view>
			<view class="tab-box">
				 <u-tabs :list="tabOptions" :is-scroll="true" v-model="tabCurent" @change="change"></u-tabs>
			</view>
			<view class="search-box">
				<u-search placeholder="搜索." v-model="keyword"></u-search>
			</view>
			<view class="content">
				<view class="content-item">
					<uni-table border  emptyText="暂无更多数据" >
								<uni-tr>
								<uni-th  align="center">记录编号</uni-th>
								<uni-th align="center">检查人</uni-th>
							</uni-tr>
							<uni-tr  v-for="item of dataList" >
								<uni-td @click="goAddOrEditorData(item.id)"  align="center">{{item.recordNo}}</uni-td>
								<uni-td align="center">{{item.checkUserName}}</uni-td>
							</uni-tr>
						</uni-table>
				</view>
			</view>
		</view>
		</view>
	     <addOrEditor ref='EditorRef' @emitVisible='(val)=>mainVisible=val'></addOrEditor>
</template>

<script setup>
	import { ref,reactive,computed, watch } from 'vue'
	import {getQCCheckBaseList} from '@/api/sample/qualityControl.js'
	import { getMenuId } from '@/utils/index.js';
	import {onLoad} from '@dcloudio/uni-app'
	import {UserSettingInfo} from '@/api/common.js'
	import addOrEditor from './addOrEditor.vue'
	const editorFlag = ref(true)
	const tabOptions = ref([
		{name:'内部质控'},
		{name:'现场检查'}
	])
	const EditorRef = ref(null)
	const mainVisible = ref(true)
	function goAddOrEditorData(id){
		EditorRef.value.visible = true
		mainVisible.value = false
		if(id){
			console.log(id)
			EditorRef.value.itemId = id
		}else{
			EditorRef.value.checkType = `${tabCurent.value++}`
		}
		EditorRef.value.initData()
	}
	function goToBack(){
		uni.navigateBack({delta:1})
	}
	const dataList = ref([])
	const query = reactive({id:'',recorderId:'',recordTime:''})
	function getList(){
		let menuId = getMenuId('项目列表')
		const projectId = uni.getStorageSync('projectId')
		// const holeId = uni.getStorageSync('holeId')
		let initQuery = {
			        currentPage: 1,
			        pageSize: 0,
			        sort: 'desc',
			        sidx: '',
					menuId:menuId,
					projectId : projectId,
					holeId:'',
		}
		Object.assign(initQuery,query)
			getQCCheckBaseList(initQuery).then(res=>{
				let list = null
				if(tabCurent.value == 0){
				 list = res.data.list.filter(item=>item.checkType == '1')	
				}else{
					 list = res.data.list.filter(item=>item.checkType == '2')	
				}
				dataList.value = list
			})	
	}
	const tabCurent = ref(0)
	function change(index) {
				getList()
			}
			onLoad(()=>{
				getList()
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
		}
</style>