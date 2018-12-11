// 导入 富文本编辑器 的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入 富文本编辑器 组件
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    // 注册为局部组件
    quillEditor
  },
  data () {
    return {
      // 步骤条高亮索引号
      stepActive: 0,
      // tab标签页高亮name
      tabActive: 'basic',
      goodsAddForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        // 是否促销单选框
        is_promote: false,
        // 上传图片临时路径
        pics: [],
        // 商品详情
        goods_introduce: ''
      },
      // 是否促销单选框
      // radio: 'false'

      // 分类数据
      cateList: [],
      // 文件上传请求头
      uploadHeader: {
        Authorization: localStorage.getItem('token')
      }
      // fileList2: [
      //   {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
      //   {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },

  created () {
    this.getCatList()
  },
  methods: {
    /**
     * 切换tab页
     */
    changeTab (tab) {
      console.log('changeTab', tab.index)
      this.stepActive = tab.index - 0
    },
    /**
     * 点击切换下一步
     * @param {number} step 步骤条的index索引号
     * @param {string} tabName tab标签页的name属性
     */
    nextStep (step, tabname) {
      this.stepActive = step
      this.tabActive = tabname
    },
    /**
     * 获取分类列表数据
     */
    async getCatList () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      this.cateList = res.data.data
      console.log('getCatList', res)
    },
    /**
     * 文件上传成功时的回调函数
     * @param {object} response 上传图片接口返回的数据
     * @param {object} file 当前上传图片的信息
     * @param {object} fileList 已上传图片列表
     */
    uploadSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      // 在pics数组中存放一个对象
      this.goodsAddForm.pics.push({
        pic: response.data.tmp_path
      })
    },
    /**
     * 添加商品
     */
    async addGoods () {
      // console.log('addGoods')
      /* eslint-disable camelcase */
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      } = this.goodsAddForm
      const res = await this.$http.post('goods', {
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      })
      // 跳转到商品列表页面
      this.$router.push('/goods')
      // 提示添加成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
