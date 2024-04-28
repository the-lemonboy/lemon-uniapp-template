<template>
	    <view @click="showPicker">调用选择器</view>
		<view class="">
			{{treeValue}}
		</view>
	    <ba-tree-picker ref="treePicker" :multiple='true' :propsInitId="treeValue" @select-change="selectChange" title="选择分析指标"
	        :localdata="dataList" valueKey="id" textKey="factorName" childrenKey="children" />
</template>

<script setup>
	import {ref,watch} from 'vue'
	import{onLoad} from '@dcloudio/uni-app'
	import tree from '@/components/ba-tree-picker/ba-tree-picker.vue'
	import request from '@/utils/request.js'
	const dataList = ref([])
	 function getfactorTypeOptions() {
	      return new Promise(resolve => {
	        const _query = {}
	        request({
	          url: `/api/analysis/Factor/getListTree/505417419548805189`,
	          method: 'post',
	          data: _query
	        }).then(res => {
	          dataList.value = res.data.list
	          resolve()
	        })
	      })
	    }
		onLoad(()=>{
		getfactorTypeOptions()	
		})
	            // 显示选择器
				const treePicker = ref()
				const treeValue = ref(["3271316026079319815", "506829832026344069"])
	           function showPicker() {
	                treePicker.value._show();
	            }
	            //监听选择（ids为数组）
	           function selectChange(ids, names) {
				   treeValue.value = ids
	            }
</script>

<style>
</style>