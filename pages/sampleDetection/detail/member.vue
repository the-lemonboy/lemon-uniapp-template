<template>
	<uni-table border="true" class="container">
			<uni-tr>
				<uni-th width="30">序号</uni-th>
				<uni-th width="50">项目职责</uni-th>
				<uni-th width="50">姓名</uni-th>
				<uni-th width="50">手机</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) of dataList" :key="index">
						<uni-td>{{index}}</uni-td>
						<uni-td>{{item.positionid}}</uni-td>
						<uni-td>{{item.user.realName}}</uni-td>
						<uni-td>{{item.user.mobilePhone}}</uni-td>
			</uni-tr>
	</uni-table>
</template>

<script setup>
	import {
		getMenuId,
		searchId
	} from "@/utils/getMenuId.js"
	import {
		ref
	} from "vue"
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getMember
	} from '@/api/sample.js'
	const dataList = ref([])

	function getMenberInfo() {
		let query = {
			projectid: uni.getStorageSync('projectId'),
			menuId: getMenuId('项目成员')
		}
		getMember(query).then(res => {
			dataList.value = res.data.list
			console.log(dataList.value)
		})
	}
	onLoad(() => {
		getMenberInfo()
		
	})
</script>

<style lang="scss" scoped>
	.container{
		width: 90%;
		margin: 10px auto 20px auto;
	}
</style>