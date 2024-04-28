<template>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">  
	    <view class="top_view"></view>  
	</view>  
	<!-- #endif -->
	<view class="logo-v">
		<view class="logo-hd u-flex-col">
			<view class="logoImg">
				<image src="@/static/images/logo.png" mode="widthFix"></image>
			</view>
			<view class="loginSwitch u-flex-col">
				<view class="loginInputBox u-flex-col">
					<u-form :model="formData" :rules="rules" ref="form" :errorType="['toast']" label-position="left"
						label-width="150" label-align="left">
						<u-form-item prop="account">
							<u-input v-model="formData.account" placeholder="请输入帐号" @focus="onFocus" @blur="onBlur">
							</u-input>
						</u-form-item>
						<u-form-item prop="password">
							<u-input v-model="formData.password" type="password" placeholder="请输入密码"></u-input>
						</u-form-item>
						<u-form-item prop="code" required v-if="needCode">
							<view class="u-flex code-box">
								<u-input v-model="formData.code" placeholder="验证码"></u-input>
								<view style="flex: 0.1;">
									<u-image :showLoading="true" :src="baseURL+imgUrl" width="130px" height="38px"
										@click="changeCode">
									</u-image>
								</view>
							</view>
						</u-form-item>
					</u-form>
					<view class="loginBtnBox u-m-t-64">
						<u-button @click="loginFn" type="primary" :loading="loading">{{ loading ? "登录中...":"登录"}}
						</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="copyright">Copyright 上海城勘信息科技有限公司</view>
	</view>
</template>

<script setup>
	import {
		login,
		getDefaultConfig
	} from '@/api/common.js'
	// import { mapGetters } from 'vuex'
	import md5Libs from "@/uni_modules/vk-uview-ui/libs/function/md5";
	// import resources from '@/libs/resources'
	// import {
	// 	getProjBase
	// } from '@/api/sample.js'
	import {
			getCurrentUser
		} from '@/api/common.js'
	import {reactive, ref} from 'vue'
	import {onLoad,onReady} from '@dcloudio/uni-app'
	import { useStore } from 'vuex'
		const imgUrl = ref('')
		const loading = ref(false)
		const formData = reactive({
					account: "",
					password: "",
					code: "",
					origin: 'password'
				})
		const needCode = ref(false)
		const codeLength = ref(4)
		const isCode = ref(false)
		const timestamp = ref()
		const rules = reactive({
					account: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur',
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur',
					}],
				})
	    const sysConfigInfo = reactive({})
		const appIcon = ref('')	
		const sysName = ref('')
		const form = ref()
		const store = useStore()
		function onFocus(e) {
				getConfig(e)
			}
		function onBlur(e) {
				getConfig(e)
			}
		
		function getConfig(val) {
				if (!val) return
				getDefaultConfig(formData.account).then(res => {
					needCode.value = !!res.data.enableVerificationCode
					if (needCode.value) {
						codeLength.value = res.data.verificationCodeNumber || 4
						changeCode()
					}
				})
			}
		function changeCode() {
				let timestamp = Math.random()
				timestamp.value = timestamp
				imgUrl.value = `/api/oauth/ImageCode/${codeLength.value || 4}/${timestamp}`
			}
		function loginFn() {
				form.value.validate(valid => {
					if (valid) {
						loading.value = true
						let query = {
							account: formData.account,
							password: md5Libs.md5(formData.password),
							timestamp: timestamp.value,
							code: formData.code,
							origin: formData.origin
						}
						// #ifdef  APP-PLUS
						const clientId = plus.push.getClientInfo().clientid;
						query.clientId = clientId
						// #endif
						login(query).then(res => {
							loading.value = false
							let token = res.data.token
							store.commit('user/SET_TOKEN', token)
							uni.setStorageSync('token', token)
							uni.switchTab({
								url: '/pages/sampleDetection/index'
							});
						store.dispatch('user/getCurrentUser')
						}).catch((err) => {
							loading.value = false
						})
					}
				});
			}
		onReady(()=>{
			form.value.setRules(rules);
			// 			setTimeout(()=>{
			// 				store.dispatch('user/getCurrentUser')
			// 			},1000)
		})
		onLoad(()=>{
			formData.password = ''
		})
</script>

<style lang="scss">
	page {}

	.logo-v {
		.login-bg {
			image {
				width: 100%;
				height: 100%;
			}
		}

		.logo-hd {
			width: 100%;
			position: absolute;
			top: 200rpx;

			.logoImg {
				width: 160rpx;
				height: 160rpx;
				margin: 0 auto;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20%;
				}
			}

			.introduce {
				justify-content: center;
				align-items: center;

				.text-one {
					height: 70rpx;
					font-weight: 700;
				}

				.text-two {
					color: #999999;
				}
			}
		}

		.loginSwitch {
			margin-top: 40rpx;
			justify-content: center;
			align-items: center;

			.tabs {
				color: #999999;
				position: relative;

				&::after {
					content: "";
					width: 64rpx;
					height: 4rpx;
					background-color: #356efe;
					margin-top: 15rpx;
					position: absolute;
					left: 0;
					bottom: -15rpx;
					display: block;
					border-radius: 50rpx;
				}

				// &.active1 {
				// 	&::after {
				// 		left: 0;
				// 	}
				// }

				&.active2 {
					&::after {
						left: 70%;
					}
				}

				.tab {
					width: 50%;
					height: 80upx;
					text-align: center;
					color: #AEAFB5;
					font-size: 32upx;

					&.active {
						color: #3281ff;
					}
				}

			}

			.loginInputBox {
				width: 100%;
				margin-top: 80rpx;
				padding: 0 64rpx;

				.code-box {
					width: 100%;
				}

				.loginBtnBox {}
			}
		}
	}
	.copyright{
		position: absolute;
		width: auto;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		 white-space: nowrap;
		color: #41abaf;
	}
</style>