<template>
	<view class="main-container" v-if='detailVisible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="conf-container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">准备阶段</text>
				<text @click="submit()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
			</view>
			<u-toast ref="uToast" />
			<view class="content-box">
				<!-- <uni-navigator url="{{url}}"></uni-navigator> -->
				<view class="item-box" v-for="(item,index) of props.curConfTreeData" :key="index">
					<view class="left-item">
						<view class="title" @click="goToDeatil(item.id)">{{ item.checkItemName }}</view>
						<u-form :model="item" ref="form1">
							<u-form-item label-width="150" label="是否检查" prop="name">
								<u-radio-group v-model="item.checkState">
									<u-radio :name="val.value" :disabled="val.disabled"
										v-for="(val,index) of selectRadio" :key="index">{{val.name}}</u-radio>
								</u-radio-group>
							</u-form-item>
							<u-form-item label-width="150" label="检查结果" prop="name"><u-input type="textarea"
									v-model="item.checkResult" /></u-form-item>
						</u-form>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		nextTick,
		defineProps,
		watch,
		defineExpose,
		defineEmits
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const emits = defineEmits(['emitVisible', 'emitConfTreeData'])
	const detailVisible = ref(false)
	const curConfIndex = ref(0)
	const props = defineProps({
		curConfTreeData: {
			type: Object,
			default: {}
		}
	})
	const selectRadio = ref([{
			name: "是",
			value: "1",
			disabled: false
		},
		{
			name: "否",
			value: "0",
			disabled: false
		}
	])

	function addOrUpdateData() {

	}

	function goToBack() {
		emits('emitVisible', true)
		detailVisible.value = false
	}

	function submit() {
		emits('emitVisible', true)
		let curData = {
			[`${curConfIndex.value}`]: props.curConfTreeData
		}
		emits('emitConfTreeData', curData)
		detailVisible.value = false
	}
	onLoad(() => {

		// console.log(updateConfTreeData.value,"---")

	})
	defineExpose({
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

		.conf-container {
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
	}


	.content-box {
		display: flex;
		flex-direction: column;
	}

	.item-box {
		width: 90%;
		height: 180px;
		margin: 10px auto;
		padding: 10px 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		box-shadow: 5px 5px 18px #ebebeb, -5px -5px 18px #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left-item {
		height: 100%;
		display: flex;
		flex-direction: column;

		.title {
			font-size: $uni-font-size-base;
			margin: $uni-spacing-col-sm 0;
		}
	}
</style>