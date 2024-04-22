<template>
	<view class="ms-container">
		
	</view>
</template>

<script setup>
    import {ref} from 'vue' 
	import {getMessageList} from '@/api/system/message.js'
	import {onLoad} from '@dcloudio/uni-app'
	const dataList = ref([])
	function getInfo(){
		let _query = {
			currentPage: 1,
			pageSize: 20,
			sort: desc,
			keyword:'',
			type: ''
		}
		getMessageList(_query).then(res=>{
			dataList.value = res.data.list
		})
	}
	onLoad(()=>{
		getInfo()
	})
</script>
<style lang="scss" scoped>
</style>