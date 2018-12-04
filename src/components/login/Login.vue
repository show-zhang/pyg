<template>
  <!-- <div>这是 登录 首页</div> -->
 <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="usename">
    <el-input v-model="loginForm.usename"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="loginForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
    <el-button @click="resetForm('loginForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        usename: '',
        password: ''
      },
      rules: {
        // 表单验证规则对象
        usename: [
          // required 必填项
          // message  当前验证规则失败时，显示的提示信息
          // trigger  什么时候出发表单验证规则 ：blur 失去焦点
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // min 和 max： 限制该文本框内容的长度
          { min: 3, max: 6, message: '用户名长度为3-6', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为6-12', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // console.log(this.$refs)
      // this.$refs[formName].validate((valid) => {
      // validate() 方法：对表单进行校验
      this.$refs.loginForm.validate((valid) => {
        // valid 表示：表单是否校验成功：
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>

</style>
