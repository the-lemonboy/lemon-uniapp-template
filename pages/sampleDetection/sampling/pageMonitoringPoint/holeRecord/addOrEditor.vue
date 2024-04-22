<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
	<view class="mo-container">
		<view class="nav-bar" style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
			<uni-icons @click="goToBack()"  type="left" size="30" style="line-height: 44px;"></uni-icons>
			<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">钻孔记录</text>
			<text @click="addOrUpdateData()" type="primary" class="submit" style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
		</view>
		<u-toast ref="uToast" />
		<u-form :model="dataForm" ref="Form" style="margin: 10px;">
			<u-form-item label-width='100px' label="起始深度" prop="startDepth"><u-number-box v-model="dataForm.startDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="结束深度" prop="endDepth"><u-number-box v-model="dataForm.endDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="土层类型" prop="holeType"><u-input v-model="holeTypeOptions.current.label" type="select" @click="holeTypeOptions.show = true"/></u-form-item>
			<u-form-item label-width='100px' label="颜色" prop="solumColor"><u-input v-model="dataForm.solumColor" /></u-form-item>
			<u-form-item label-width='100px' label="气味" prop="solumSmell"><u-input v-model="dataForm.solumSmell" /></u-form-item>
			<u-form-item label-width='100px' label="湿度" prop="solumHumidity"><u-input v-model="dataForm.solumHumidity" type="select" @click="solumHumidityOptions.show=true"/></u-form-item>
			<u-form-item label-width='100px' label="可塑性" prop="solumPlasticity"><u-input  v-model="dataForm.solumPlasticity" type="select" @click="solumPlasticityOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="密实度" prop="solumCompactness"><u-input  v-model="dataForm.solumCompactness" type="select" @click="solumCompactnessOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="备注" prop="remark"><u-input  v-model="dataForm.remark" /></u-form-item>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload :watermark='true' @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files"></upload>
			</u-form-item>
			</u-form>
				<u-select v-model="holeTypeOptions.show" value-name="fullName" label-name="fullName"  :list="holeTypeOptions.list" @confirm="onHoleTypeOptions"></u-select>
<u-select v-model="solumHumidityOptions.show" value-name="id" label-name="fullName" :list="solumHumidityOptions.list" @confirm="onSolumHumidityOptions"></u-select>
<u-select v-model="solumCompactnessOptions.show" value-name="id" label-name="fullName" :list="solumCompactnessOptions.list" @confirm="onSolumCompactnessOptions"></u-select>
<u-select v-model="solumPlasticityOptions.show" value-name="id" label-name="fullName" :list="solumPlasticityOptions.list" @confirm="onSolumPlasticityOptions"></u-select>
	</view>
</template>

<script setup>
	import { reactive, ref ,nextTick,watch} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import upload from '@/components/cityk-upload.vue';
	import { getMenuId,getCurrentTime } from '@/utils/index.js';
	import { addHoleRecord,updateHoleRecord,getHoleRecordDetail } from '@/api/sample.js'
	import { getDictionaryDataSelector ,getDictionaryDataSelectorCascade} from '@/api/dictionary'
	let dataForm = reactive({
        projectId: '',
        holeId: '',
        startDepth: '',
        endDepth: '',
        solumType: '',
        solumColor: '',
        solumSmell: '',
        solumHumidity: '',
        solumCompactness: '',
        solumPlasticity: '',
        pollutionDesc: '',
        files: []
      })
	  // 获取采样类型
	  let holeTypeOptions = reactive({show: false,current:{}, list:[],})
	  function getHoleTypeOptions(){
		  getDictionaryDataSelectorCascade('497318342525198917').then(res=>{
			  res.data.list.forEach(item=>{		 
				  changeHoleType(item)
			  })
		  })
	  }
	  function onHoleTypeOptions(arr) {
	  			let current = arr[0];
	  			holeTypeOptions.current = current;
	  			dataForm.holeType = current.value;
	  	}
	  function changeHoleType(node){
		  if(!node.hasChildren){
			  holeTypeOptions.list.push(node)
		  }else{
			 node.children.forEach(child => changeHoleType(child))  
		  }
	  }
		function onSolumHumidityOptions(arr) {
					let current = arr[0];
					solumHumidityOptions.current = current;
					dataForm.solumHumidity = current.label;
			}
			function onSolumCompactnessOptions(arr) {
						let current = arr[0];
						solumCompactnessOptions.current = current;
						dataForm.solumCompactness = current.label;
				}
				function onSolumPlasticityOptions(arr) {
							let current = arr[0];
							solumPlasticityOptions.current = current;
							dataForm.solumPlasticity = current.label;
					}
		
			// 湿度
		const solumHumidityOptions = reactive({show: false,current:{}, list:[]})
	   function getsolumHumidityOptions() {
	      getDictionaryDataSelector('497319923836527173').then(res => {
	        solumHumidityOptions.list = res.data.list
	      })
	    }
		// 密实度
		const solumCompactnessOptions = reactive({show: false,current:{}, list:[]})
		  function getsolumCompactnessOptions() {
		      getDictionaryDataSelector('497320163494863429').then(res => {
		        solumCompactnessOptions.list = res.data.list
		      })
		    }
		// 可塑性
		const solumPlasticityOptions = reactive({show: false,current:{}, list:[]})
	    function getsolumPlasticityOptions() {
	      getDictionaryDataSelector('497320786047017541').then(res => {
	        solumPlasticityOptions.list = res.data.list
	      })
	    }
	  function parseFiles(data) {
	       var _data = JSON.parse(JSON.stringify(data))
	            if (_data.files) {
	              _data.files = JSON.stringify(_data.files)
	            } else {
	              _data.files = '[]'
	            }
	           _data.projectId = uni.getStorageSync('projectId')
	           _data.holeId = uni.getStorageSync('holeId')
	           _data.id = uni.getStorageSync('holeRecordId')
	            return _data
	      }
	 function addOrUpdateData(){
		const data = parseFiles(dataForm)
		if(!data.id){
			addHoleRecord(data).then(res=>{
				ToastFn('创建成功')
			})
		}else{
			 updateHoleRecord(data.id, data).then(res=>{
				 ToastFn('修改成功')
			 })
		}
	}
	function ToastFn(text){
		goToBack()
		uni.showToast({
			title: text,
			duration: 2000
		});
	}
	function dataInfo(dataAll) {
	      let _dataAll = dataAll
	      if (_dataAll.files) {
	        _dataAll.files = JSON.parse(_dataAll.files)
	      } else {
	        _dataAll.files = []
	      }
	      dataForm = _dataAll
	    }
	function initData(){
		const id = uni.getStorageSync('holeRecordId')
		if(id){
		    getHoleRecordDetail(id).then(res=>{
				dataInfo(res.data)
			})
		}
	}
	onLoad(()=>{
		 initData()
		getsolumHumidityOptions()
		getsolumCompactnessOptions()
		getsolumPlasticityOptions()
		getHoleTypeOptions()
	})

	function goToBack(){
		uni.setStorageSync('holeRecordId', null)
		uni.navigateBack({delta:1})
	}
</script> 

<style lang="scss" scoped>
</style>