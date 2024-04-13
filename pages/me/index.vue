<template>
<view class="me-container">
	<view class="me-header">
		<view class="avatar">
			<!-- <img src="@/static" alt="" /> -->
			<view class="img">
				
			</view>
		</view>
		<viwe class="info">
		<view class="info-top">
			<text class="name">小明</text>
			<text class="phone">12345678912</text>
		</view>
		<text class="comp">某某某有限公司</text>
		</viwe>
	</view>
	<view class="me-menu">
		<view class="message-center link-box">
			<text class="left-text">消息中心</text>
			<view class="right-content">
				<text class="right-text">new</text>
				<uni-icons type="right" size="30"></uni-icons>
			</view>
		</view>
		<view class="update link-box">
			<text class="left-text">检查更新</text>
			<view class="right-content">
				<text class="right-text">1.0.0</text>
				<uni-icons type="right" size="30"></uni-icons>
			</view>
		</view>
		<view class="clear-cache link-box">
			<text class="left-text">清除缓存</text>
			<view class="right-content">
				<text class="right-text">50.32KB</text>
				<uni-icons type="right" size="30"></uni-icons>
			</view>
			
		</view>
		<view class="setting link-box">
			<text class="left-text">设置</text>
			<uni-icons type="right" size="30"></uni-icons>
		</view>
	</view>
</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.me-container{
		padding: 0;
		margin: 0;
	    min-height: calc(100vh - 50px);
		width: 100%;
		background-color: #e9ecef;
	}
	.me-header{
		width: 100%;
		height: 200rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #ffffff;
		.img{
			width: 180rpx;
			height: 180rpx;
			background-color: gray;
			border-radius: 50%;
		}
		.info{
			.info-top{
				display: flex;
				flex-direction: row;
				text{
					margin:0 10px;
				}
			}
			.comp{
				margin: 0 10px;
			}
		}
		
	}
	.me-menu{
		margin-top: 50rpx;
		.link-box{
			height: 100rpx;
			width: 100%;
			box-sizing: border-box;
			background-color: #ffffff;
			border-top:1px solid gainsboro;
			padding: 0 10px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			// .left-text{
			// 	line-height: 100rpx;
			// }
		}
		.right-content{
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		
	}
</style>