<template>
  <!-- <div>这是 登录 首页</div> -->

  <el-row class="login" type="flex" justify="center" align="middle">
    <el-col :span="8" :xs="14" :sm="12" :md="10" :lg="8">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" label-position="top" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// 导入axios
import axios from 'axios'

export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        // 表单验证规则对象
        username: [
          // required 必填项
          // message  当前验证规则失败时，显示的提示信息
          // trigger  什么时候出发表单验证规则 ：blur 失去焦点
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // min 和 max： 限制该文本框内容的长度
          { min: 3, max: 6, message: '用户名长度为3-6', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为6-12', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm () {
      // console.log(this.$refs)
      // this.$refs[formName].validate((valid) => {
      // validate() 方法：对表单进行校验

      // this.$refs.loginForm.validate().then(res => {
      //   console.log('验证成功：', res)
      // }).catch(err => {
      //   console.log('验证失败：', err)
      // })
      console.log('点击登录')
      try {
        // 表单验证 不需要返回值，故不用接收
        await this.$refs.loginForm.validate()
        const res = await axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
        // 登陆成功：
        // 3 将登录标识 token 存储到 localStorage 中
        // 注意：先保存 token ，再跳转路由，因为 跳转路由的时候，导航守卫中获取了 token。如果在获取token前，没有存储 token ，就出问题了
        console.log(res, 666)
        // 验证成功：登录的代码逻辑
        if (res.data.meta.status === 200) {
          // 登录成功:  设置存储token，用于后方的导航守卫
          localStorage.setItem('token', res.data.data.token)
          // 跳转到首页  Vue Router编程式导航
          this.$router.push('/home')
          // 2 登录成功的消息提示：
          this.$message({
            message: res.data.meta.msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: 'error',
            duration: 1000
          })
        }
      } catch (error) {
        console.log('验证失败', error)
      }
    },
    // 表单重置
    resetForm (formName) {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
 .login{
   height: 100%;
  }
 .login-form{
    background-color: #fff;
    padding: 25px;
    border-radius: 15px;
  }
</style>
