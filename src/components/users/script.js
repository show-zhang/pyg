// 导入axios
// import axios from 'axios'

export default {
  data () {
    return {
      // 用户列表数据
      usersList: [],
      // 总条数
      total: 0,
      // 当前页码
      pagenum: 1,
      // 当前页码
      pagesize: 3,
      // 查询条件
      searchText: '',
      // 开关状态
      // value3: true

      // 控制添加用户对话框的展示和隐藏
      isShowUserAddDialog: false,
      // 添加用户表单数据
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userAddRules: {
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
        ],
        email: [
          // 表单验证查看 elelment文档中的表单验证代码中的文档
          { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ]
      },
      // 编辑用户数据：
      // 控制编辑用户对话框的展示和隐藏
      isShowUserEditDialog: false,
      userEditForm: {
        username: '',
        email: '',
        mobile: '',
        id: -1
      }
    }
  },
  created () {
    // 进入页面，获取第一页数据
    // 因为第一页是默认值，因此，不需要传入参数
    this.getUsersList()
  },
  methods: {
    // 获取用户列表数据
    // 第一个参数：表示当前页，也就是要获取哪一页的数据
    async getUsersList (pagenum = 1, query = '') {
      // const url = 'http://localhost:8888/api/private/v1/users'
      const config = {
        params: {
          // 查询条件
          query,
          // 第几页数据
          pagenum,
          // 每页大小
          pagesize: 3
        },
        // 添加请求头
        // 说明：因为该接口是需要登录后，才能够访问，所以，需要将登录后的标识 token 当作请求头，传递给服务器，目的是为了让服务器知道你已经登录过了
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
      const res = await this.$http.get(`/users`, config)
      // 请求完成后续执行代码
      console.log(res, 6666)
      if (res.data.meta.status === 200) {
        // 获取数据成功
        this.usersList = res.data.data.users
        // 设置总条数
        this.total = res.data.data.total
        // 当前页码
        this.pagenum = res.data.data.pagenum
      } else {
        // 获取数据失败，说明： token 失效，因此，直接跳回到登录页面，让用户登录
        this.$router.push('/login')
        // 清除token
        localStorage.removeItem('token')
      }
    },

    // 通过 then 使用：
    getUsersList2 (pagenum = 1, query = '') {
      this.$http.get('http://localhost:8888/api/private/v1/users', {
        params: {
          // 查询条件
          query,
          // 第几页数据
          pagenum,
          // 每页大小
          pagesize: 3
        },
        // 添加请求头
        // 说明：因为该接口是需要登录后，才能够访问，所以，需要将登录后的标识 token 当作请求头，传递给服务器，目的是为了让服务器知道你已经登录过了
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          // 获取数据成功
          this.usersList = res.data.data.users
          // 设置总条数
          this.total = res.data.data.total
          // 当前页码
          this.pagenum = res.data.data.pagenum
        } else {
          // 获取数据失败，说明： token 失效，因此，直接跳回到登录页面，让用户登录
          this.$router.push('/login')
          // 清除token
          localStorage.removeItem('token')
        }
      })
    },
    // 页码改变时，获取该页数据
    changePage (curPage) {
      this.getUsersList(curPage, this.searchText)
    },
    // 查询数据
    search () {
      console.log('查询条件为：', this.searchText)
      // 查询数据的时候，页码应该从第一页开始展示查询的结果数据
      this.getUsersList(1, this.searchText)
    },
    // 删除用户
    async delUser (id) {
      try {
        // 弹框
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        // 删除数据
        const res = await this.$http.delete(`/users/${id}`)
        // console.log(res)
        // 刷新列表数据
        this.getUsersList(1, this.searchText)

        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      } catch (err) {
        // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 更改用户状态
    async changUseState (curUser) {
      console.log(curUser)// 对应传输的scope.row获取到当前行的数据
      // console.log(this.$http === axios)  => 返回true//
      const res = await this.$http.put(`/users/${curUser.id}/state/${curUser.mg_state}`)
      console.log('3用户切换状态成功')
      // 显示成功提示
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    },
    // 展示添加用户对话框
    showUserAddDialog () {
      // 打开添加用户对话框
      this.isShowUserAddDialog = true
    },
    // 关闭添加用户对话框
    closeUserAddDialog () {
      // 重置表单
      this.$refs.userAddFormRef.resetFields()
    },
    // 关闭添加用户对话框
    async addUser () {
      try {
        // 1 先进行表单验证
        // 2 验证成功，再添加数据
        await this.$refs.userAddFormRef.validate()

        const res = await this.$http.post('/users', this.userAddForm)
        console.log(res)
        if (res.data.meta.status === 201) {
          // 添加成功
          // 1 关闭对话框
          this.isShowUserAddDialog = false
          // 2 刷新列表数据
          this.getUsersList()
          // 3 提示
          // 显示成功提示
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        } else {
          this.$message({
            type: 'info',
            message: res.data.meta.msg
          })
        }
      } catch (error) {
        console.log('表达验证失败')
      }
    },
    // 展示编辑用户对话框
    showUserEditDialog (curUser) {
      // 展示用户编辑对话框
      this.isShowUserEditDialog = true
      // 给用户编辑表单提供数据
      for (let key in this.userEditForm) {
        this.userEditForm[key] = curUser[key]
      }
    },
    // 编辑用户状态
    async editUser () {
      // const res = await this.$http.put(`/users/${this.userEditForm.id}`, {
      //   email: this.userEditForm.email,
      //   mobile: this.userEditForm.mobile
      // })
      console.log(this.userEditForm)
      const {email, mobile} = this.userEditForm
      // this.userEditForm.id 是上一步中遍历curUser赋值到的
      const res = await this.$http.put(`users/${this.userEditForm.id}`, {
        email,
        mobile
      })

      // 关闭弹框
      this.isShowUserEditDialog = false
      // 刷新页面
      this.getUsersList(1, this.searchText)
      // 弹出提示消息
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
