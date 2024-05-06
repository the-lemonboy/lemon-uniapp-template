<template>
	<view class="main-container">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="mo-container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title"
						style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">个人信息</text>
				</view>
			</view>
			<u-form :model="userInfo" ref="form" style="margin:20px auto; width: 90%;">
				<u-form-item label-width='100px' label="用户名" prop="userAccount"><u-input placeholder="" disabled
						v-model="userInfo.userAccount" /></u-form-item>
				<u-form-item label-width='100px' label="姓名" prop="userName"><u-input placeholder="" disabled
						v-model="userInfo.userName" /></u-form-item>
				<u-form-item label-width='100px' label="手机号码" prop="mobilePhone"><u-input placeholder="" disabled
						v-model="userInfo.mobilePhone" /></u-form-item>
				<u-form-item label-width='100px' label="生日" prop="birthday"><u-input placeholder="" disabled
						v-model="userInfo.birthday" /></u-form-item>
				<u-form-item label-width='100px' label="部门名称" prop="departmentName"><u-input placeholder="" disabled
						v-model="userInfo.departmentName" /></u-form-item>
				<u-form-item label-width='100px' label="角色" prop="roleName"><u-input placeholder="" disabled
						v-model="userInfo.roleName" /></u-form-item>
				<u-form-item label-width='100px' label="上次登录时间" prop="prevLoginTime"><u-input placeholder="" disabled
						v-model="userInfo.prevLoginTime" /></u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getMenuId
	} from '@/utils/index.js';
	import {
		openDoor
	} from '@/api/lab/labOperation.js'
	import {
		timestampToTime
	} from '@/utils/index.js'
	import {
		ref
	} from 'vue';
	const userInfo = ref(uni.getStorageSync('userInfo'))

	function initData() {
		userInfo.value.prevLoginTime = timestampToTime(userInfo.value.prevLoginTime)
	}
	onLoad(() => {
		initData()
	})
	const emits = defineEmits(['visible'])

	function goToBack() {
		const userInfoEl = document.querySelector('.mo-container')
		userInfoEl.classList.add('animate__animated', 'animate__bounceOutRight')
		emits('visible', false)
	}
</script>

<style lang="scss" scoped>
	.mo-container {
		padding-bottom: 10px;
	}
</style>