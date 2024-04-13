import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
// import {initRequest} from './util/request/index'
Vue.config.productionTip = false
// import httpInterceptor from '@/common/http.interceptor.js'
App.mpType = 'app'
const app = new Vue({
  ...App,
})
app.$mount()
// import store from './store'
// Vue.prototype.$store = store

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import define from './utils/define';
import request from './utils/request';
import uView from './uni_modules/vk-uview-ui';
import store from './store';
import setPermission from '@/libs/codeGeneration.js';


export function createApp() {

  const app = createSSRApp(App)
  app.use(store) 
  app.use(uView)
  app.provide('define',define)
app.config.globalProperties.$define = define;
app.config.globalProperties.$request = request;
app.config.globalProperties.$setPermission = setPermission;
  return {
    app
  }
}
// #endif