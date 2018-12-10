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
      isloading: false
    }
  },
  created () {
    this.getCateList()
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
    }
  }
}
