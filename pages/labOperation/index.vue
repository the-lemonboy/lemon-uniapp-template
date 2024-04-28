<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
	<view class="lo-container">
		<view class="materiel-box">
			<view class="select-zone" @click="goDetail('/pages/labOperation/materiel/index')">
				<text class="zone-one">物料库存盘点</text>
				<text class="zone-two">点击前往</text>
			</view>
		</view>
		<view class="instrument-box">
			<view class="select-zone" @click="goDetail('/pages/labOperation/instrument/index')">
			<text class="zone-one">仪器使用登记</text>
			<text class="zone-two">点击前往</text>
			</view>
		</view>
		<view class="guard-box">
			<view class="select-zone" @click="goDetail('/pages/labOperation/guard/index')">
			<text class="zone-one">门禁远程控制</text>
			<text class="zone-two">点击前往</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {onPullDownRefresh} from '@dcloudio/uni-app'
	function goDetail(path){
		uni.navigateTo({
			url: path,
		})
	}
	onPullDownRefresh( () => {
		uni.stopPullDownRefresh();
	})
</script>
<style lang="scss" scoped>
	 /* #ifndef H5 */
	.lo-container{
		padding: 0;
		margin: 0;
		height: calc(100vh - 50rpx);
		box-sizing: border-box;
		display: grid;
		grid-template-row: repeat(3,1fr);
		grid-row-gap: 10px;
	}
	/* #endif */
	/* #ifdef H5 */
	.lo-container{
		padding: 0;
		margin: 0;
		height: calc(100vh - 50px);
		box-sizing: border-box;
		display: grid;
		grid-template-row: repeat(3,1fr);
		grid-row-gap: 10px;
	}
	/* #endif */
	.zone-one{
		font-size: $uni-font-size-xlg;
		margin:0 5px;
		font-weight: bold;
	}
	.zone-two{
		font-size: $uni-font-size-base;
		margin:0 5px;
	}
	.materiel-box{
		display: flex;
		align-items: center;
		background-image: url('../../static/images/materiel.png');
		// height: 100%;
		.select-zone{
			background-color: white;
			opacity: 0.7;
			width: 100%;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.instrument-box{
		background-image: url('../../static/images/instrument.png');
		display: flex;
		align-items: center;
		.select-zone{
			background-color: white;
			opacity: 0.7;
			width: 100%;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.guard-box{
		background-image: url('../../static/images/guard.png');
		display: flex;
		align-items: center;
		.select-zone{
			background-color: white;
			opacity: 0.7;
			width: 100%;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>