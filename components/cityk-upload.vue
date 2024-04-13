<template>
	<u-upload ref="uploadRef" :file-list="fileList" :action="comUploadUrl+type" :header="uploadHeaders" @on-success="onSuccess" @on-remove="onRemove"></u-upload>
</template>

<script setup>
	import { inject, ref, defineEmits, defineProps } from 'vue'
	const props = defineProps({
		value: {
			type: Array,
			default: () => []
		}
	})
	const emits = defineEmits(['update:value']);
	const fileList = ref([])
	const baseURL = inject('define').baseURL
	const comUploadUrl = inject('define').comUploadUrl
	const type = 'annexpic'
	const uploadHeaders = {
		Authorization: uni.getStorageSync('token')
	}
	const uploadRef = ref(null)

	function onSuccess(data, index, lists, name) {
		if (data.code == 200) {
			fileList.value.push({
				name: data.data.name,
				fileId: data.data.name,
				url: data.data.url,
				fullName: lists[index].file.name,
				filePath: data.data.name,
				fileExtenSion: lists[index].file.type,
				fileSize: lists[index].file.size
			});
			emits('update:value', fileList.value); // 触发 input 事件，并传递更新后的 fileList 的值
		} else {
			// 处理请求失败的逻辑
		}
	}

	function onRemove(index, lists) {
		uploadRef.value.remove(index);
		fileList.value.splice(index, 1)
		emits('update:value', fileList.value) // 触发 update:value 事件，并传递更新后的 fileList 的值
	}
</script>

<style>
</style>
