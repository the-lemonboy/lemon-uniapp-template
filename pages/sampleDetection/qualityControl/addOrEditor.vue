<template>
	<view class="main-container"  v-if='visible'>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
	<view class="qc-container">
		<view class="nav-bar" style="position: relative; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
			<uni-icons @click="goToBack()"  type="left" size="30" style="line-height: 44px;"></uni-icons>
			<text class="title" style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">采样信息</text>
			<text @click="addOrUpdateData()" type="primary" class="submit" style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
		</view>
		<u-toast ref="uToast" />
		<u-form :model="dataForm" ref="Form" style="margin: 10px;">
			<u-form-item v-if="itemId" label-width='100px' label="记录编号" prop="startDepth"><u-input  v-model="dataForm.id" /></u-form-item>
			<u-form-item label-width='100px' label="检查日期" prop="checkTime"><u-input v-model="dataForm.checkTime" /></u-form-item>
			<!-- <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> -->
			<!-- <u-form-item label-width='100px' label="检查人" prop="checkUserId"><u-input v-model="dataForm.solumColor" /></u-form-item> -->
			<!-- <u-form-item label-width='100px' label="天气" prop="weather"><u-input v-model="dataForm.weather" /></u-form-item>
			<u-form-item label-width='100px' label="温度" prop="temperature"><u-input v-model="dataForm.temperature"/></u-form-item> -->
			<view class="detail-content">
				<text class="zk-title">质控内容</text>
				<view class="read" v-for="(item,index) in confTreeData" :key = "index" @click="goDetail(index)">
					<text class="content">{{confTitle[index]}}({{item.length}})</text>
				</view>
			</view>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload  @input="(val)=>dataForm.files = val"></upload>
			</u-form-item>
			</u-form>
	</view>
	</view>
	<editorDetail ref="detailRef" :curConfTreeData = "curConfTreeData" @emitVisible = "(val)=>{visible = val}" @emitConfTreeData="updateConfTree"></editorDetail>
</template>

<script setup>
	import { reactive, ref ,nextTick,defineProps,watch,defineExpose,defineEmits} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import upload from '@/components/cityk-upload.vue';
	import { getMenuId } from '@/utils/index.js';
	import { UserSettingInfo } from '@/api/common.js'
	import { addQCCheckBase,updateQCCheckBase,getQCCheckBaseDetail,QcInitListTree } from '@/api/sample/qualityControl.js'
	import editorDetail from './editorDetail.vue';
	const emits = defineEmits(['emitVisible'])
	let dataForm = reactive({})
	  const visible = ref(false)
	  const qcType = reactive({name:'内部质控',type:'1'})
	  const userInfo = reactive({})
	  function clearData(data){
		  for(let key in data){
			  data[key] = null
		  }
		  return
	  }
	 
	    watch(dataForm, (newVal, oldVal) => {
	         console.log(newVal, oldVal);
	       },{deep:true});

	  function getUser(){
		  UserSettingInfo().then(res=>{
			Object.assign(userInfo,res.data)
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
	            return _data
	      }
	 function addOrUpdateData(){
		// dataForm.files = parseFiles(dataForm.files)
		// dataForm = (dataForm)
		if(!dataForm.id){
			addQCCheckBase(dataForm).then(res=>console.log('success!'))
		}else{
			 updateQCCheckBase(dataForm.id, dataForm)
		}
		clearData(dataForm)
	}
	const itemId = ref(null)
	function initData(){
		const id = itemId.value
		if(id){
		    getQCCheckBaseDetail(id).then(res=>{
				Object.assign(dataForm,res.data)
				confTreeData.value = editorTableData(dataForm.detailList)
			})
		}else{
			// 初始化配置项
			getQCCheckConfList()
		}
	}
	function goToBack(){
		// uni.setStorageSync('holeRecordId', null)
		visible.value = false
		itemId.value = null
		 clearData(dataForm)
		emits('emitVisible',true)
	}
	// 质控内容
	const zkContent = ref([{id:0,checkItemName:'准备阶段',children:[],count:0},
	{id:0,checkItemName:'采样过程中的质量控制和质量保证',children:[],count:0}])
	const checkType = ref("1")
	 //新增的时候初始化的表格
	 const confTitle = ref([])
	   function handleTableData(data) {
	      // this.editFlag = false
	      let result = {}
	      let tempArr = []
	      let resItem = {}
	      let handelData = data.sort((a, b) => {
	        return a.itemSort - b.itemSort
	      })
	      handelData.forEach((item, index) => {
	        if (item.children) {
	          for (let val of item.children) {
	            resItem.checkItemId = val.id
	            resItem.checkItemSort = val.itemSort
	            resItem.checkProblem = ''
	            resItem.checkResult = ''
	            resItem.checkItemName = val.itemName
	            resItem.checkState = '0'
	            tempArr.push(resItem)
	            resItem = {}
	          }
	          result[index] = tempArr
	          tempArr = []
	        } else {
	          result[index] = []
	        }
	        // 处理标题
	        confTitle.value[index] = item.itemName
	      })
	      return result
	    }
		// 编辑时初始化的表格数据
		  function  editorTableData(data) {
		      let result = {}
		      let handelData = data.sort((a, b) => {
		        return a.checkItemSort - b.checkItemSort
		      })
		      handelData.forEach((item, index) => {
		        if (item.children) {
		          let childData = item.children.sort((a, b) => {
		            return a.checkItemSort - b.checkItemSort
		          })
		          result[index] = childData
		          childData = null
		        } else {
		          result[index] = []
		        }
		        // 处理标题
		        confTitle.value[index] = item.checkItemName
		      })
		      return result
		    }
	// 初始化配置项
	const confTreeData = ref([])
	function getQCCheckConfList() {
	     let _query = {
	               itemName: '',
	               sort: 'asc',
	               sidx: 'itemSort',
	               checkType: checkType
	     }
	   QcInitListTree(_query).then(res => {
	         if (res.data) {
	           var _list = []
	           for (let i = 0; i < res.data.list.length; i++) {
	             let _data = res.data.list[i]
	             _list.push(_data)
	           }
	           confTreeData.value = handleTableData(_list)
	         }
	       })
	   }
	   // 转配置项
	   const curConfTreeData = ref(null)
	   const detailRef = ref(null)
	   function goDetail(index){
		   visible.value = false
		   detailRef.value.detailVisible = true
		   curConfTreeData.value = confTreeData.value[index]
		   detailRef.value.curConfIndex = index
	   }
	   // 子组件传来的配置项
	   function updateConfTree(val){
		   for(let key in confTreeData.value){
			   for(let childKey in val){
				   if(key === childKey){
					   confTreeData.value[key] = val[key]
				   }
			   }
		   }
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
		onLoad(async()=>{
		})
		defineExpose({
				  visible,
				  qcType,
				  itemId,
				  initData,
				  dataForm,
				  checkType
		})
</script> 

<style lang="scss" scoped>
	.main-container{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100vw;
		position: absolute;
		top: 0;
		background-color: white;
		.qc-container{
			margin: 0;
			padding: 0;
		}
		.detail-content{
			margin:20px 0;
			.zk-title{
				font-size: 30rpx;
				font-weight: bold;
			}
			.content{
				line-height: 23px;
				font-size: 25rpx;
				color: $uni-text-color-grey;
			}
		}
		
	}
</style>