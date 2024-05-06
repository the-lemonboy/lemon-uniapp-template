<template>
<view class="main-container">
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">
		<view class="top_view"></view>
	</view>
	<!-- #endif -->
	<view class="mo-container">
		<view class="map-box">
			<!--#ifdef APP-PLUS-->
			<web-view src="/static/map.html" @message="onMessage"></web-view>
			<!--#endif-->
			<!--#ifdef H5-->
			<web-view
				src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=KMKBZ-S2R6N-RTAF4-SVH4F-6I3KJ-UUFJ4&referer=myapp"
				@message="onMessage">
			</web-view>
			<!--#endif-->
		</view>
	</view>
</view>
</template>

<script setup>
	import {
		onReady
	} from '@dcloudio/uni-app'
	import {ref,defineEmits,defineProps,defineExpose} from 'vue'
	const emits = defineEmits(['emitLocation','emitVisible'])
	onReady(() => {
		const self = this
		//#ifdef H5
		if (window.isListen) {
			// 防止多次注册addEventListener事件
			return
		}
		window.addEventListener('message', function(event) {
			var loc = event.data;
			if (loc && loc.module == 'locationPicker') {
				self.getPositon(loc, self)
			};
			window.isListen = true
			window.removeEventListener('message', function() {}, true)
		}, false)
		//#endif
	})



	function onMessage(res) {
		// console.log('app接收网页消息:', res.detail.data[0])
		emits('emitLocation',res.detail.data[0])
		emits('emitVisible',true)
		getPositon(res.detail.data[0], this)
	}

	function getPositon(res, self) {
		uni.$emit('onAddressChange', res)
		
		// setTimeout(function() {
		// 	self.$nav.back()
		// }, 1000)
	}
	function submit(){
		emits('emitVisible',true)
		mapVisible.value = false
	}
</script>

<style>
</style>