<template>
	<view class="main-container" v-if='visible'>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="qc-container">
			<view class="nav-container" style="height: 44px;">
				<view class="nav-bar"
					style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
					<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
					<text class="title"
						style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">质控信息</text>
					<text @click="addOrUpdateData()" type="primary" class="submit"
						style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
				</view>
			</view>
			<u-toast ref="uToast" />
			<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
				<u-form-item v-if="itemId" label-width='100px' label="记录编号" prop="startDepth"><u-input disabled="true"
						placeholder="" v-model="dataForm.id" /></u-form-item>
				<u-form-item label-width='100px' label="检查日期" prop="checkTime"><u-input type="select"
						@click="showPickerDate('checkTime')" v-model="dataForm.checkTime" /></u-form-item>
				<view class="detail-content">
					<text class="zk-title">质控内容</text>
					<view class="read" v-for="(item,index) in confTreeData" :key="index" @click="goDetail(index)">
						<!-- <text class="content">({{item.length}})</text> -->
					   <div class="content-left">{{confTitle[index]}}</div>
					   <div class="content-right"><uni-icons type="right" color="`${$uni-text-color-grey;}`" size="30" style="line-height: 44px;"></uni-icons></div>
					</view>
				</view>
				<u-form-item label-width='100px' label="上传图片" prop="file">
					<upload @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files"></upload>
				</u-form-item>
				<!-- <u-form-item label-width='100px' label="上传视频" prop="file">
					 <htz-image-upload 
					 mediaType="video"
					        :max="3" 
					        v-model="ceshiData" 
					        @uploadSuccess="ceshiUploadSuccess" 
					        :action="comUploadUrl+type"></htz-image-upload>
				</u-form-item> -->
			</u-form>
			<u-picker v-model="checkTimeVisible" mode="time" :params="timeParams" @confirm="getTime"
				:default-time='getCurrentTime()'></u-picker>
		</view>
	</view>
	<editorDetail ref="detailRef" :curConfTreeData="curConfTreeData" @emitVisible="(val)=>{visible = val}"
		@emitConfTreeData="updateConfTree"></editorDetail>
</template>

<script setup>
	import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	import {
		reactive,
		ref,
		nextTick,
		defineProps,
		watch,
		defineExpose,
		defineEmits,
		inject
	} from 'vue'
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import upload from '@/components/cityk-upload.vue';
	import {
		getMenuId,
		getCurrentTime
	} from '@/utils/index.js';
	import {
		UserSettingInfo
	} from '@/api/common.js'
	import {
		addQCCheckBase,
		updateQCCheckBase,
		getQCCheckBaseDetail,
		QcInitListTree
	} from '@/api/sample/qualityControl.js'
	import editorDetail from './editorDetail.vue';
	const form = ref(null)
	const rules = reactive({
		checkTime: [{
			required: true,
			message: '请输入检查日期',
			trigger: 'blur',
		}]
	})
	onReady(() => {
		form.value.setRules(rules);
	})
	// 选择时间
	const timeParams = reactive({
		year: true,
		month: true,
		day: true,
		hour: true,
		minute: true,
		second: true,
	})
	const curTimeKey = ref(null)
	const checkTimeVisible = ref(false)

	function showPickerDate(value) {
		curTimeKey.value = value,
			checkTimeVisible.value = true
	}

	function getTime(e) {
		if (curTimeKey.value === 'checkTime') dataForm.value.checkTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
		else if (curTimeKey.value === 'endTime') dataForm.value.endTime =
			`${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
	}
	let dataForm = ref({
		holeId: '',
		holeNo: '',
		projectId: '',
		recordNo: '',
		temperature: '',
		weather: '',
		checkType: '',
		files: [],
		detailList: [],
		checkUserId: '',
		checkTime: ''
	})
	const visible = ref(false)
	const qcType = reactive({
		name: '内部质控',
		type: '1'
	})
	const userInfo = reactive({})

	function clearData(data) {
		for (let key in data) {
			data[key] = null
		}
		return
	}

	function getUser() {
		UserSettingInfo().then(res => {
			Object.assign(userInfo, res.data)
		})
	}

	function parseFiles(_data) {
		if (_data.files) {
			_data.files = JSON.stringify(_data.files)
		} else {
			_data.files = '[]'
		}
		_data.projectId = uni.getStorageSync('projectId')
		_data.checkType = checkType.value
		_data.checkUserId = uni.getStorageSync('userInfo').userId
		_data.checkUserName = uni.getStorageSync('userInfo').userName
		_data.projectName = uni.getStorageSync('projectName')
		_data.createUser = uni.getStorageSync('userInfo').userId
	}

	function addOrUpdateData() {
		form.value.validate(valid => {
			if (valid) {
				parseFiles(dataForm.value)
				if (!dataForm.value.id) {
					addQCCheckBase(dataForm.value).then(res => ToastFn('创建成功'))
				} else {
					updateQCCheckBase(dataForm.value.id, dataForm.value).then(res => ToastFn('修改成功'))
				}
			}
		});
	}

	function ToastFn(text) {
		// debugger
		uni.$emit('refresh', checkType.value)
		goToBack()
		uni.showToast({
			title: text,
			duration: 2000
		});
	}
	const itemId = ref(null)

	function dataInfo(_dataAll) {
		if (_dataAll.files) {
			_dataAll.files = JSON.parse(_dataAll.files)
		} else {
			_dataAll.files = []
		}
		return _dataAll
	}

	function initData() {
		const id = itemId.value
		if (id) {
			getQCCheckBaseDetail(id).then(res => {
				dataForm.value = dataInfo(res.data)
				confTreeData.value = editorTableData(dataForm.value.detailList)
			})
		} else {
			// 初始化配置项
			getQCCheckConfList()
		}
	}

	const emits = defineEmits(['emitVisible', 'curTab'])

	function goToBack() {
		if (itemId.value) {
			emits('curTab', dataForm.value.checkType)
		} else {
			emits('curTab', checkType.value)
		}
		emits('emitVisible', true)
		itemId.value = null
		clearData(dataForm.value)
		visible.value = false
	}
	// 质控内容
	const zkContent = ref([{
			id: 0,
			checkItemName: '准备阶段',
			children: [],
			count: 0
		},
		{
			id: 0,
			checkItemName: '采样过程中的质量控制和质量保证',
			children: [],
			count: 0
		}
	])
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
	function editorTableData(data) {
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
				if (Array.isArray(confTreeData.value)) {
					for (let value of confTreeData.value) {
						dataForm.value.detailList = dataForm.value.detailList.push(value)
					}
				} else {
					for (let key in confTreeData.value) {
						if (Array.isArray(confTreeData.value[key])) {
							dataForm.value.detailList = dataForm.value.detailList.concat(confTreeData.value[key])
						}
					}
				}
			}
		})
	}
	// 转配置项
	const curConfTreeData = ref(null)
	const detailRef = ref(null)

	function goDetail(index) {
		visible.value = false
		detailRef.value.detailVisible = true
		curConfTreeData.value = confTreeData.value[index]
		detailRef.value.curConfIndex = index
	}
	// 子组件传来的配置项
	function updateConfTree(val) {
		for (let key in confTreeData.value) {
			for (let childKey in val) {
				if (key === childKey) {
					confTreeData.value[key] = val[key]
				}
			}
		}
	}
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
	.main-container {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100vw;
		position: absolute;
		top: 0;
		background-color: white;

		.qc-container {
			margin: 0;
			padding: 0;
		}

		.detail-content {
			margin: 20px 0;

			.zk-title {
				font-size: 30rpx;
				font-weight: bold;
			}
			.read {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				color: $uni-text-color-grey;
			}
			.content {
				
			}
		}

	}
</style>