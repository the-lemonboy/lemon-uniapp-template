<template>
			<view class="driver"></view>
</template>

<script>
	import {defineProps} from 'vue'
	const props = defineProps({
		width:{
			type:Number,
			default:90
		}
	})
</script>

<style scoped>
	.driver {
		width: 90%;
		height: 0.5px;
		background-color: #39ebe9;
		margin: 5px auto;
	}
</style>