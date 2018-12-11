export default {
  data () {
    return {
      // 分类列表数据
      cateList: [],
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 加载动画一开始不出现
      isloading: false,

      // 控制添加分类对话框的展示和隐藏
      isShowCateDialog: false,
      cateForm: {
        // 分类名称
        cat_name: '',
        // 存储选中项结合
        cat_pid_arr: []
      },
      // 添加分类时的列表数据
      cateAddList: []
      // options: [{
      //   value: 'zhinan',
      //   label: '指南',
      //   children: [{
      //     value: 'shejiyuanze',
      //     label: '设计原则'
      //   },
      //   {
      //     value: 'sketch',
      //     label: 'Sketch Templates'
      //   }]
      // }]
    }
  },
  created () {
    this.getCateList()
    // 获取添加分类时的数据
    this.getCateAddList()
  },
  methods: {
    /**
     * 获取分类列表
     */
    async getCateList (pagenum = 1) {
      // 开启loading
      this.isloading = true
      const res = await this.$http.get('/categories', {
        params: {
          type: 3,
          pagenum,
          pagesize: 5
        }
      })
      console.log(res.data)
      // this.cateList = res.data.data
      const { result, total, pagenum: curPage } = res.data.data
      this.cateList = result // result是返回的数据
      this.total = total
      this.pagenum = curPage + 1
      // 关闭loading
      this.isloading = false
    },
    /**
     * 切换分页
     * @param {number} curPage 当前页
     */
    changePage (curPage) {
      this.getCateList(curPage)
    },
    // 显示添加分类对话框
    showCateDialog () {
      this.isShowCateDialog = true
    },
    /**
     * 获取添加分类需要的分类数据
     */
    async getCateAddList () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 2 // 获取到二级分类即可  自己添加第三级
        }
      })
      this.cateAddList = res.data.data
      // console.log('getCateAddList', res)
    },
    /**
    * 添加分类
    */
    async addCate () {
      /*
        cat_name 分类名称 不能为空

        cat_pid 分类父ID 不能为空  注意：这个 pid 指的值当前要添加的分类的pid，也就是选中父级分类的id
        cat_level 分类层级 不能为空
          一级分类 0
          二级分类 1
          三级分类 2
      */
      /* eslint-disable camelcase */
      const { cat_name, cat_pid_arr } = this.cateForm
      // console.log('cat_pid_arr', cat_pid_arr)
      const res = await this.$http.post('/categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1], // 是cat_pid_arr的最后一个的值
        cat_name,
        cat_level: cat_pid_arr.length
      })
      // 关闭对话框
      this.isShowCateDialog = false
      // 刷新数据
      this.getCateList()
      // 提示成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    },
    // 关闭添加分类对话框
    closeCateDialog () {
      // 重置表单
      // this.$refs.cateForRef.resetFields()
      // this.$refs.cateFormRef.resetFields() //无法生效
      this.cateForm.cat_name = ''
      this.cat_pid_arr = []
      this.cateAddList = []
      console.log('关闭')
    }
  }
}
