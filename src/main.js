// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
// 导入路由实例
import router from './router'

// 导入 ElementUI组件库
import ElementUI from 'element-ui'
// 导入组件库的样式 注意：应该在element-ui导入样式后,导入
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义的样式
import '@/assets/css/index.css'

// 导入第三方组件：表格展开
// 教程中的导入方法，配置到全局
// var ElTreeGrid = require('element-tree-grid');
// Vue.component(ElTreeGrid.name,ElTreeGrid);

import ElTreeGrid from 'element-tree-grid'

// 导入axios
import axios from 'axios'
// 将 axios 添加到 Vue 原型中
Vue.prototype.$http = axios
// 注册全局组件：element-tree-grid
// 注册后，就可以在任意的单文件组件中使用了
Vue.component(ElTreeGrid.name, ElTreeGrid)

// 配置基础路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 请求拦截器
axios.interceptors.request.use(config => {
  // 所有请求之前都要执行的操作
  // console.log('1 请求发送出去之前')
  // 在此处，统一处理 请求头，处理后，就不需要在每个请求中，单独的处理了
  console.log(config)
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截器
// axios.interceptors.response.use(response => {
//   // 所有请求完成后都要执行的操作
//   console.log('2 响应完成')

//   return response
// }, (error) => {
//   return Promise.reject(error)
// })

// 响应拦截器

// 安装插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 4 将路由实例与Vue实例关联到一起
  router
})
