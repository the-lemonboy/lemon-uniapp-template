<template>
	<view class="main-container" v-if='detailVisible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="container">
		<view class="nav-container" style="height: 44px;">
			<view class="nav-bar"
				style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
				<text @click="addOrUpdateData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">新增</text>
			</view>
			</view>
			<view class="content-box">
				<text class="form-title" style="margin-left: 20px; font-weight: bold;">设备信息</text>
				<driver></driver>
				<u-form :model="equipBase" ref="Form" style="margin:10px 20px;">
					<u-form-item label-width='100px' label="资产编号" prop="assetNo"><u-input
							placeholder="" disabled="true" v-model="equipBase.assetNo" /></u-form-item>
					<u-form-item label-width='100px' label="资产名称" prop="assetName"><u-input
						placeholder=""	disabled="true" v-model="equipBase.assetName" /></u-form-item>
					<u-form-item label-width='100px' label="型号" prop="assetModel"><u-input
						placeholder=""	disabled="true" v-model="equipBase.assetModel" /></u-form-item>
					<u-form-item label-width='100px' label="厂家" prop="manufactor"><u-input
						placeholder=""	disabled="true" v-model="equipBase.manufactor" /></u-form-item>
					<u-form-item label-width='100px' label="固资归属" prop="organizeText"><u-input
						placeholder=""	disabled="true" v-model="equipBase.organizeText" /></u-form-item>
				    <u-form-item label-width='100px' label="分级" prop="assetGrade"><u-input
				    	placeholder=""	disabled="true" v-model="equipBase.assetGrade" /></u-form-item>
					<!-- <u-form-item label-width='100px' label="负责人" prop="leader"><u-input
							disabled="true" v-model="equipBase.leader.account" /></u-form-item>
					<u-form-item label-width='100px' label="联系方式" prop="leader"><u-input
							disabled="true" v-model="equipBase.leader.mobilePhone" /></u-form-item> -->
				<!-- 	<u-form-item label-width='100px' label="安装位置" prop="areaId"><u-input
						placeholder=""	disabled="true" v-model="equipBase.areaId" /></u-form-item>
					<u-form-item label-width='100px' label="出厂编号" prop="serialNo"><u-input
						placeholder=""	disabled="true" v-model="equipBase.serialNo" /></u-form-item> -->
					<!-- <u-form-item label-width='100px' label="开放日" prop="leader"><u-input
							disabled="true" v-model="equipBase.openDays" /></u-form-item> -->
					<u-form-item label-width='100px' label="开放时段" prop="openRang"><u-input
						placeholder=""	disabled="true" v-model="equipBase.openRang" /></u-form-item>
				</u-form>
				<view class="stock-title" style="margin: 10px 0;">
					<text class="form-title" style="margin-left: 20px; font-weight: bold;">仪器使用记录</text>
				</view>
				<driver></driver>
				<view class="stock-box" v-for="(item,index) of equipUseList">
					<u-form :model="item" ref="Form" style="margin:10px 20px;">
						<u-form-item label-width='100px' label="申请人" prop="assetName"><u-input
								v-model="item.applyUser.account"  /></u-form-item>
						<u-form-item label-width='100px' label="申请时间" prop="assetNo"><u-input
								v-model="item.applyTime" /></u-form-item>
						<u-form-item label-width='100px' label="使用日期" prop="useDay"><u-input
								v-model="item.useDay" /></u-form-item>
					</u-form>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,defineExpose,defineEmits} from 'vue'
	import {onLoad,onBackPress} from '@dcloudio/uni-app'
	import {getMenuId, searchId} from '@/utils/getMenuId.js'
	import driver from '@/components/driver.vue'
	import {getEquipmentUseDetail,getEquipmentBaseDetail} from '@/api/lab/labOperation.js'
	const detailVisible = ref(false)
	// 获取设备信息
	const equipid = ref()
	const equipBase = ref([])
	function getEquipBase(){
		const id = equipid.value
		getEquipmentBaseDetail(id).then(res=>{
			equipBase.value = res.data
		})
	}
	// 获取使用人
	const equipUseList = ref([])
	function getEquipUseList(){
		const query = {
					equipId: equipid.value,
			        menuId: getMenuId('仪器清单'),
			        pcPermission: false
		}
		getEquipmentUseDetail(query).then(res=>{
			equipUseList.value = res.data.list
		})
	}
	// 返回
	const emits = defineEmits(['emitVisible'])
	function goToBack() {
		equipid.value = null
		detailVisible.value = false
		emits('emitVisible', true)
	}
	onBackPress((e) => {
		if (e.from === "backbutton" && detailVisible.value) {
			goToBack()
			return true
		}
	})
	onLoad(()=>{
	})
	defineExpose({
		equipid,
		getEquipBase,
		getEquipUseList,
		detailVisible
	})
</script>

<style lang="scss" scoped>
	.main-container {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100vw;
		position: absolute;
		top: 0;
		background-color: white;

		.container {
			margin: 0;
			padding: 0;
		}

		.detail-content {
			margin: 20px 0;

			.zk-title {
				font-size: 30rpx;
				font-weight: bold;
			}

			.content {
				line-height: 23px;
				font-size: 25rpx;
				color: $uni-text-color-grey;
			}
		}

		.stock-Header {

			// marg
			.delete-btn {
				float: right;
				margin-right: 10px;
			}
		}

		.stock-title {
			.add-btn {
				float: right;
				margin-right: 10px;
			}
		}
	}
	.content-box{
		margin-top: 15px;
	}
</style>