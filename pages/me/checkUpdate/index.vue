<template>
	<view>
		<uni-popup ref="updateDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" showClose="false" mode="base" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {ref,defineExpose} from 'vue'
	import {getLasterVersion} from '@/api/updateVersion/updateVersion.js'
	import {onLoad} from "@dcloudio/uni-app"
	import {compareVersion} from '@/utils/index.js'
	const updateDialog = ref(null)
	// 获取最新版本号

	// func
	function handleUpdate(){
		const curVersion = ref(plus.runtime.version)
		const updateFlag = compareVersion(lasterVersionNo,curVersion)
		// if(up)
	}


			

	// 更新版本
	const apkPath = ref(null)
	function Tools_saveFile(obj) {
	    const blob = new Blob([obj.content], { type: obj.type });
	    const objectURL = URL.createObjectURL(blob);
	    apkPath.value  = objectURL;
	
	    // 创建一个临时的<a>标签来下载文件
	    // const link = document.createElement('a');
	    // link.href = objectURL;
	    // link.download = obj.filename;
	    // document.body.appendChild(link);
	    // link.click();
	    // document.body.removeChild(link);
	
	    // 释放 URL 对象
	    URL.revokeObjectURL(objectURL);
	  }
	 function handle(fileContent) {
	    Tools_saveFile({
	      filename: 'example.apk',
	      type: 'application/vnd.android.package-archive',
	      content: fileContent
	    });
	  }
	function _getlasterVersion(){
		// plus.runtime.install( wgtFilePath, options, installSuccessCB, installErrorCB);

		getLasterVersion().then(res=>{
			// res
			console.log(res)
		})
		
	}
	function dialogInputConfirm(){
		
	}
	onLoad(async()=>{
		// _getlasterVersion()
		// await _getlasterVersionNo()
		
	})
	defineExpose({
		updateDialog
	})
</script>

<style>
</style>