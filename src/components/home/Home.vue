<template>
  <el-container class="home">
     <!-- 头部 -->
    <el-header class="home-header">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="@/assets/images/logo.png" alt="黑马程序员">
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="4" class="logout-desc">
          <div class="grid-content bg-purple">
            欢迎show-星耀会员
            <a href="javascript:;" class="logout" @click.prevent="logout">退出</a>
          </div>
        </el-col>
    </el-row>
    </el-header>
    <!-- 下边： -->
    <el-container class="home-content">
      <!-- 左侧侧边栏 -->
      <el-aside class="home-content-aside" width="200px">
       <!--
         el-menu 菜单父组件
            default-active 当前激活菜单的 index（高亮）
            @open="handleOpen"    菜单展开时触发的事件
            @close="handleClose"  菜单收起时触发的事件
            background-color 菜单的背景色
            text-color 菜单文字默认颜色
            active-text-color 激活菜单文字颜色

            :router="true" 表示让菜单启动路由模式，此时，el-menu-item 的 index 选项变为 哈希值（ 相当于 router-link 的 to 属性值 ）

            :router="true" 表示动态绑定一个布尔类型的值
            router="true"  表示绑定了一个字符串：'true'
            :unique-opened="true" 只保持一个菜单展开
            el-submenu 子级菜单（可展开菜单，可以有子菜单，内部包含了可点击的菜单 el-menu-item）
            可以无限级嵌套（一级菜单 > 二级菜单 > 三级菜单 。。。）
            index 唯一标志，不能重复

          el-menu-item 菜单项组件（可点击的子菜单）
          :default-active="$route.path.slice(1)" 从第一位开始裁剪，去除/
       -->
        <el-menu
          :unique-opened="true"
          :router="true"
          :default-active="$route.path.split('/').length === 3 ? ('/' + $route.path.split('/')[1]): $route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="skyblue">
          <!-- 原先的左侧菜单栏 -->
          <!-- 一级菜单 -->
          <!-- <el-submenu index="1"> -->
            <!-- template 用来给该菜单添加菜单名称和 -->
            <!-- <template slot="title"> -->
               <!-- 菜单图标 -->
              <!-- <i class="el-icon-location"></i> -->
              <!-- 菜单名称 -->
              <!-- <span>用户管理</span> -->
            <!-- </template> -->
             <!-- 二级菜单 -->
            <!-- <el-menu-item index="/users"> -->
              <!-- <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu> -->

          <!-- 动态生成的左侧菜单栏 -->
          <!-- 一级菜单 -->
          <el-submenu :index=" level1.id + ''" v-for="level1 in menus" :key="level1.id">
            <!-- template 用来给该菜单添加菜单名称和 -->
            <template slot="title">
               <!-- 菜单图标 -->
              <i class="el-icon-location"></i>
              <!-- 菜单名称 -->
              <span>{{level1.authName}}</span>
            </template>

             <!-- 二级菜单 -->
              <!--
              二级菜单
              这个 index 没有添加 / ，后面会有bug
              哈希值为： goods

              注意：路由的哈希值应该都带有 / 开头！！！ 否则，可能会有问题
            -->
            <el-menu-item :index="'/'+ level2.path" v-for="level2 in level1.children" :key="level2.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{level2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>

      <!-- 右侧内容区域 -->
      <el-main>
        <!-- 子路由出口： -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.getMenus()
  },
  data () {
    return {
      // 菜单数据
      menus: []
    }
  },
  methods: {
    logout () {
      this.$confirm('是否确定退出', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 2 退出后，要跳转到登录页面
        this.$router.push('/login')
        // 清除token
        localStorage.removeItem('token')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    // 动态获取菜单数据
    async getMenus () {
      const res = await this.$http.get('/menus')
      this.menus = res.data.data
      // console.log(res.data.data)
    }
  }
}
</script>

<style>

.home {
  height: 100%;
}
.home-header {
   background-color: #B3C1CD;
   padding-left:0;

}
.home-header img{
  width: 200px;
}
.home-header h3{
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 30px;
}
.home-header .logout-desc{
  text-align: center;
  line-height: 60px;
  font-weight: 700;
}
.home-header .logout{
  text-decoration: none;
  color: #daa520;
}
.home-content {
   background-color: #EAEEF1;
}
.home-content-aside{
  background-color: #545C64;
}
</style>
