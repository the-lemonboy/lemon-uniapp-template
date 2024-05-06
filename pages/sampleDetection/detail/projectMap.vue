<template>
	<view class="container">
		<web-view :fullscreen="false" webview-styles="{width:100px},{height:200px}" src="/static/holeMap.html"></web-view>
	</view>
<view class="ce" @click="back">
			<text>ce</text>
		</view>
</template>

<script setup>
	import {
		onReady
	} from '@dcloudio/uni-app'
	import { onMounted,ref } from 'vue';
	const webviewStyles = ref({
		  progress: {
		    color: '#07c160'
		  }
		});
		onReady(async () => {
		  let height = 0;
		  let statusbar = 0;
		
		  // 使用 async/await 来获取系统信息
		  const sysinfo = await uni.getSystemInfo();
		  console.log("sysinfo",sysinfo.windowHeight)
		  statusbar = sysinfo.statusBarHeight;
		  height = sysinfo.windowHeight;
		 //获取webview
		 let pages = getCurrentPages();
		  let page = pages[pages.length - 1];
		  let currentWebview = page.$getAppWebview();
	            setTimeout(function() {
	                    var wv = currentWebview.children()[0];
	                    wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
	                            top: 150, //此处是距离顶部的高度，应该是你页面的头部
	                            height: 400, //webview的高度
								background:'#000000'
	                    })
	            }, 200); //如页面初始化调用需要写延迟
		});
</script>

<style lang="scss" scoped>
	// .container {
	// 	height: 300px;
	// 	width: 100%;
	// }

	web-view {
		// height: 100%;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// background-color: white;
	}
	.ce {
			position: absolute;
			z-index: 99999;
			top: 80rpx;
			right: 150rpx;
			background-color: cadetblue;
		}

</style>