export default {
  data () {
    return {
      // 商品列表数据
      goodsList: [],
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 每页大小
      pagesize: 5
    }
  },
  created () {
    // 获取路由参数（分页）
    const curPage = this.$route.params.page
    this.getGoodsList(curPage)
  },
  watch: {
    $route (to, from) {
      this.getGoodsList(to.params.page)
    }
  },
  methods: {
    /**
     * 分页获取商品列表数据
     */
    async getGoodsList (pagenum = 1) {
      const res = await this.$http.get('/goods', {
        params: {
          query: '',
          pagenum,
          pagesize: this.pagesize
        }
      })
      console.log('getGoodsList', res)
      // this.goodsList = res.data.data.goods
      const {goods, total, pagenum: curPage} = res.data.data
      this.goodsList = goods
      this.total = total
      this.pagenum = curPage - 0
      // 返回的res中pagenum为字符串“1”,通过-0转换为数值类型
    },
    /**
     * 点击切换分页
     */
    changePage (curPage) {
      // 获取当前页数据
      this.getGoodsList(curPage)
      // 修改路由（跳转页面）
      this.$router.push(`/goods/${curPage}`)
    }
  }
}
