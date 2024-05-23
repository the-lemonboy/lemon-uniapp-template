<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">
		<view class="top_view"></view>
	</view>
	<!-- #endif -->
	<view class="mo-container">
		<view class="nav-container" style="height: 44px;">
			<view class="nav-bar"
				style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">钻孔记录</text>
				<text @click="addOrUpdateData()" type="primary" class="submit"
					style="color:blue; line-height: 44px; margin-right: 10px; float:right;">保存</text>
			</view>
		</view>
		<u-form :model="dataForm" ref="form" :rules="rules" style="margin: 10px;">
			<u-form-item label-width='100px' label="起始深度" prop="startDepth"><u-number-box :positive-integer="false"
					v-model="dataForm.startDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="结束深度" prop="endDepth"><u-number-box :positive-integer="false"
					v-model="dataForm.endDepth"></u-number-box></u-form-item>
			<u-form-item label-width='100px' label="土层类型" prop="solumType"><u-input v-model="dataForm.solumType"
					type="select" @click="solumTypeOptions.show = true" /></u-form-item>
			<u-form-item label-width='100px' label="颜色" prop="solumColor"><u-input
					v-model="dataForm.solumColor" /></u-form-item>
			<u-form-item label-width='100px' label="气味" prop="solumSmell"><u-input
					v-model="dataForm.solumSmell" /></u-form-item>
			<u-form-item label-width='100px' label="湿度" prop="solumHumidity"><u-input v-model="dataForm.solumHumidity"
					type="select" @click="solumHumidityOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="可塑性" prop="solumPlasticity"><u-input
					v-model="dataForm.solumPlasticity" type="select"
					@click="solumPlasticityOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="密实度" prop="solumCompactness"><u-input
					v-model="dataForm.solumCompactness" type="select"
					@click="solumCompactnessOptions.show=true" /></u-form-item>
			<u-form-item label-width='100px' label="备注" prop="remark"><u-input
					v-model="dataForm.remark" /></u-form-item>
			<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload :watermark='true' @update:value="((val)=>{dataForm.files = val})" :value="dataForm.files">
				</upload>
			</u-form-item>
		</u-form>
		<u-select v-model="solumTypeOptions.show" value-name="fullName" label-name="fullName"
			:list="solumTypeOptions.list" @confirm="onSolumTypeOptions"></u-select>
		<u-select v-model="solumHumidityOptions.show" value-name="id" label-name="fullName"
			:list="solumHumidityOptions.list" @confirm="onSolumHumidityOptions"></u-select>
		<u-select v-model="solumCompactnessOptions.show" value-name="id" label-name="fullName"
			:list="solumCompactnessOptions.list" @confirm="onSolumCompactnessOptions"></u-select>
		<u-select v-model="solumPlasticityOptions.show" value-name="id" label-name="fullName"
			:list="solumPlasticityOptions.list" @confirm="onSolumPlasticityOptions"></u-select>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		nextTick
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
		addHoleRecord,
		updateHoleRecord,
		getHoleRecordDetail
	} from '@/api/sample.js'
	import {
		getDictionaryDataSelector,
		getDictionaryDataSelectorCascade
	} from '@/api/dictionary'
	const form = ref(null)
	const rules = reactive({
		solumType: [{
			required: true,
			message: '请输入图层类型',
			trigger: 'blur',
		}]
	})
	onReady(() => {
		form.value.setRules(rules);
	})
	let dataForm = ref({
		projectId: '',
		holeId: '',
		startDepth: 0,
		endDepth: 0,
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
	let solumTypeOptions = reactive({
		show: false,
		current: {},
		list: [],
	})

	function getSolumTypeOptions() {
		getDictionaryDataSelectorCascade('497318342525198917').then(res => {
			res.data.list.forEach(item => {
				changeSolumType(item)
			})
		})
	}

	function onSolumTypeOptions(arr) {
		let current = arr[0];
		solumTypeOptions.current = current;
		dataForm.value.solumType = current.value;
	}

	function changeSolumType(node) {
		if (!node.hasChildren) {
			solumTypeOptions.list.push(node)
		} else {
			node.children.forEach(child => changeSolumType(child))
		}
	}

	function onSolumHumidityOptions(arr) {
		let current = arr[0];
		solumHumidityOptions.current = current;
		dataForm.value.solumHumidity = current.label;
	}

	function onSolumCompactnessOptions(arr) {
		let current = arr[0];
		solumCompactnessOptions.current = current;
		dataForm.value.solumCompactness = current.label;
	}

	function onSolumPlasticityOptions(arr) {
		let current = arr[0];
		solumPlasticityOptions.current = current;
		dataForm.value.solumPlasticity = current.label;
	}

	// 湿度
	const solumHumidityOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getsolumHumidityOptions() {
		getDictionaryDataSelector('497319923836527173').then(res => {
			solumHumidityOptions.list = res.data.list
		})
	}
	// 密实度
	const solumCompactnessOptions = reactive({
		show: false,
		current: {},
		list: []
	})

	function getSolumCompactnessOptions() {
		getDictionaryDataSelector('497320163494863429').then(res => {
			solumCompactnessOptions.list = res.data.list
		})
	}
	// 可塑性
	const solumPlasticityOptions = reactive({
		show: false,
		current: {},
		list: []
	})

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

	function addOrUpdateData() {
		console.log(dataForm.value)
		
		form.value.validate(valid => {
			console.log(valid)
			if (valid) {
				const data = parseFiles(dataForm.value)
				const id = uni.getStorageSync('holeRecordId')
				if (!id) {
					addHoleRecord(data).then(res => {
						ToastFn('创建成功')
					})
				} else {
					updateHoleRecord(id, data).then(res => {
						ToastFn('修改成功')
					})
				}
			}
		});
	}

	function ToastFn(text) {
		uni.$emit('refresh')
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
		dataForm.value = _dataAll
	}

	function initData() {
		const id = uni.getStorageSync('holeRecordId')
		if (id) {
			getHoleRecordDetail(id).then(res => {
				dataInfo(res.data)
			})
		}
	}
	onLoad(() => {
		initData()
		getsolumHumidityOptions()
		getSolumCompactnessOptions()
		getsolumPlasticityOptions()
		getSolumTypeOptions()
	})

	function goToBack() {
		uni.setStorageSync('holeRecordId', null)
		uni.navigateBack({
			delta: 1
		})
	}
</script>

<style lang="scss" scoped>
</style>