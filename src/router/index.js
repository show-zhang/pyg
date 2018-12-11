// lang="less" 模板中使用到，需要下载 npm i -D less less-router  下载包即可 已经配置好

// 导入Vue
import Vue from 'vue'
// 导入vur-router
import VueRouter from 'vue-router'

// 5 导入组件，配置路由  .vue后缀可以省略，已经进行配置
import Home from '@/components/home/Home.vue'
import Login from '@/components/login/Login.vue'
import Users from '@/components/users/Users.vue'
import Roles from '@/components/roles/Roles.vue'
import Rights from '@/components/rights/Rights.vue'
import Categories from '@/components/categories/Categories.vue'
import Goods from '@/components/goods/Goods.vue'
import GoodsAdd from '@/components/goods-add/GoodsAdd.vue'
import NotFound from '@/components/notfound/NotFound.vue'

// 2 将路由作为Vue的插件安装
Vue.use(VueRouter)

// 3 创建路由实例，配置路由
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      // 配置该路由的子路由：
      children: [
        // 如果子路由的path不是以 / 开头的，那么，最终的哈希值为： 父级路由path 拼接 子级路由path，也就是： /home 拼接 users => /home/users
        // 如果子路由的path是以 / 开头的，那么，子级路由的path就是一个独立的哈希值，也就是：/users
        // { path: 'users', component: Users },  此时路径为/home/users
        // { path: '/users', component: Users },  此时路径为/users
        {path: '/users', component: Users},
        {path: '/roles', component: Roles},
        {path: '/rights', component: Rights},
        {path: '/categories', component: Categories},
        /*
          /goods/:page 表示使用了路由参数，用来动态匹配哈希值
          :page 就是路由参数，我们使用这个参数，来匹配分页数值

          :page? 表示这路由参数是可选的，可以有，也可以没有，这样就可以匹配：
          1 /goods
          2 /goods/6
        */
        {path: '/goods/:page?', component: Goods},
        {path: '/goods-add', component: GoodsAdd}
      ]
    },
    // * 表示匹配所有路由，所以，一定要放在路由规则的最后！！！
    // 添加该路由后，就可以匹配路由的哈希值了，如果是我们功能中有的，直接从上面的路由规则
    // 如果是用户随意输入的，就直接跳转到 404 页面
    {path: '*', component: NotFound}
  ]
})

// 添加vue导航守卫，用来实现登录访问限制
// 说明：每次切换路由（访问页面），都会先执行导航守卫，那么，是否登录的逻辑判断就可以放在
//      导航守卫中判断了
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 是登录页面，直接进入到 要访问的登录页面
    return next()
  }

  // 不是登录页面
  const token = localStorage.getItem('token')
  if (token) {
    // 登录过：直接跳转到登陆页面  next()进行管道中的下一个钩子
    next()
  } else {
    // 没有登录过，回到登录页
    next('/login')
  }

// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

// next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

// next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
})
// 导入路由实例
export default router
