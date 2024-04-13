<template>
	<u-picker v-model="props.selectTimeVisible" mode="time" :default-time="defaultTime"></u-picker>
</template>

<script setup>
	import {ref,defineProps,defineEmits} from 'vue'
	const emits = defineEmits(['pickerVal'])
	const props = defineProps({
		selectTimeVisible:{
			type:String,
			default:false
		}
	})
	function confirm(e){
		emits('pickerVal',e)
	}
</script>

<style>
</style>