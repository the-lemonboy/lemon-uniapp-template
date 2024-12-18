<template>
	<view class="main-container">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="detail-container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title"
						style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">设置</text>
				</view>
			</view>
			<view class="content-box">
				<view class="control-main">
					<text>加水印(图片/视频)</text>
					<u-switch v-model="controlFlag" @change="control"></u-switch>
				</view>
				<view class="control-check">
					<text class="check-title">水印显示内容</text>
					<u-checkbox-group shape="circle" class="check-box" :disabled="checkFlag">
						<view class="check-item" v-for="(item, index) in checkList" :key="index">
							<text>{{item.name}}</text>
							<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.name"></u-checkbox>
						</view>
					</u-checkbox-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineEmits,
		watch
	} from 'vue'
	import {
		onLoad,
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import driver from '@/components/driver.vue'
	import {
		disable
	} from 'ol/rotationconstraint';
	const emits = defineEmits('visible')

	function goToBack() {
		emits('visible', false)
	}
	const controlFlag = ref(true)

	function control(val) {
		controlFlag.value = val
		uni.setStorageSync('watermarkFlag', val)
	}
	const checkList = ref([{
			name: '经纬度',
			disabled: true,
			checked: false
		},
		{
			name: '日期',
			disabled: true,
			checked: false
		},
		{
			name: '人员',
			disabled: true,
			checked: false
		}, {
			name: '项目名称',
			disabled: true,
			checked: false
		}
	])
	const checkFlag = ref(false)
	watch(controlFlag, (val) => {
		checkFlag.value = !val;
		if (!val) {
			checkList.value = checkList.value.map(item => ({
				...item,
				checked: val
			}));
		} else {
			const tempCheckList = uni.getStorageSync('watermarkValue');
			checkList.value = tempCheckList.map(item => ({
				name: item.name,
				disabled: false,
				checked: item.flag
			}));
		}
	});

	function initData() {
		let watermarkValue = uni.getStorageSync('watermarkValue')
		watermarkValue.forEach(item => {
			checkList.value.forEach(el => {
				if (item.name === el.name) {
					el.checked = item.flag
				}
			})
		})
		controlFlag.value = uni.getStorageSync('watermarkFlag')
	}
	onLoad(() => {
		initData()
	})

	function checkboxChange(val) {
		checkList.value.checked = val
		let watermarkValue = uni.getStorageSync('watermarkValue')
		watermarkValue.forEach(item => {
			if (item.name === val.name) {
				item.flag = val.value
			}
		})
		uni.setStorageSync('watermarkValue', watermarkValue)
	}
	onPullDownRefresh(() => {
		uni.stopPullDownRefresh();
	})
</script>

<style lang="scss" scoped>
	/* #ifndef H5 */
	.detail-container {
		background-color: $uni-bg-color-grey;
		height: calc(100vh - 50rpx);
		background-color: #E4E7EB;
	}

	/* #endif */
	/* #ifdef H5 */
	.detail-container {
		background-color: $uni-bg-color-grey;
		height: calc(100vh - 50px);
		background-color: #E4E7EB;
	}

	/* #endif */
	.control-main {
		margin-top: 20px;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		font-size: $uni-font-size-lg;
		font-weight: bold;
		background-color: white;
		margin-bottom: 20px;
	}

	.check-title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		margin: 0 20px 20px 20px;
	}

	.check-box {
		margin-top: 10px;
	}

	.check-item {
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		width: 100vw;
		height: 60px;
		align-items: center;
		font-size: $uni-font-size-base;
		background-color: white;
	}
</style>