// 导入Vue
import Vue from 'vue'
// 导入vur-router
import VueRouter from 'vue-router'

// 5 导入组件，配置路由  .vue后缀可以省略，已经进行配置
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'

// 2 将路由作为Vue的插件安装
Vue.use(VueRouter)

// 3 创建路由实例，配置路由
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// 导入路由实例
export default router
