export default {
  data () {
    return {
      rolesList: [],
      // 显示编辑角色对话框
      isShowEditRolesDialog: false,
      editRoleform: {
        roleName: '',
        roleDesc: '',
        // 添加id属性
        id: -1
      },
      // 添加对话框
      isShowAddRolesDialog: false,
      AddRoleform: {
        roleName: '',
        roleDesc: ''
      },
      // 分配权限
      isShowRolesDialog: false,
      // 树形控件的数据
      rightsTree: [],
      // Tree树形控件，默认使用数据中的 label 属性作为节点名称，使用 children 属性指定该接待你的子节点
      // 但是，如果我们自己的数据结构与默认的结构不同，可以通过 defaultProps 来修改默认的两个属性
      defaultProps: {
        // children: 'children',
        label: 'authName'
      },
      // 当前被分配权限的角色id
      roleId: -1
    }
  },
  created () {
    this.getRolesList()
    // 获取权限树形结构列表
    this.getRightsTree()
  },
  methods: {
    // 获取权限数据
    async getRolesList () {
      const res = await this.$http.get('roles')
      this.rolesList = res.data.data
    },
    // 删除权限
    async delUse (id) {
      console.log(id)
      const res = await this.$http.delete(`roles/${id}`)
      console.log(res)
      // 成功信息提示
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      // 刷新页面
      this.getRolesList()
    },
    // 展示编辑角色对话框
    showEditRolesDialog (curRole) {
      console.log('当前角色', curRole)
      this.isShowEditRolesDialog = true
      for (let key in this.editRoleform) {
        this.editRoleform[key] = curRole[key]
      }
    },
    // 更改权限
    async editRoles () {
      const {roleName, roleDesc} = this.editRoleform
      const res = await this.$http.put(`roles/${this.editRoleform.id}`, {
        roleName,
        roleDesc
      })
      console.log('修改返回的结果', res)
      // 关闭编辑对话框
      this.isShowEditRolesDialog = false
      // 刷新页面
      this.getRolesList()
      // 显示成功提示
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
    // 显示添加角色的对话框
    ShowAddRolesDialog () {
      // 打开添加用户对话框
      this.isShowAddRolesDialog = true
    },
    // 添加角色
    async addRoles () {
      const res = await this.$http.post('/roles', this.AddRoleform)
      // 关闭对话框
      this.isShowAddRolesDialog = false
      // 显示提示
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      // 刷新页面
      this.getRolesList()
    },
    // 显示分配权限的对话框
    showRolesDialog (curRole) {
      this.isShowRolesDialog = true
      // curRole 表示当前角色的数据，children属性是当前角色拥有的权限
      console.log('showRoleDialog', curRole)

      // 暂存角色id
      this.roleId = curRole.id
      /*
        获取不到 tree 原因说明：
        1 tree是在对话框中的，而对话框默认是隐藏的，隐藏是说组件没有被选中
        2 isShowRoleDialog 是控制对话框展示和隐藏的，让 isShowRoleDialog = true，表示展示对话框，但是 Vue 中是 异步DOM更新 所以，数据变化后，DOM没有立即更新

        可以通过 $nextTick() 获取到更新后的DOM内容

        v-if 隐藏元素时，元素不会被编译解析； v-show 隐藏元素时，元素已经编译解析了
      */
      this.$nextTick(() => {
        // console.log(this.$refs, this.$refs.tree)
        const checkedKeys = []
        // 遍历一级节点
        curRole.children.forEach(level1 => {
          // 遍历二级节点
          level1.children.forEach(level2 => {
            // 遍历三级节点
            level2.children.forEach(level3 => {
              // 收集 三级节点 的id
              checkedKeys.push(level3.id)
            })
          })
        })
        // 选中指定的节点
        // 说明：应该获取 最后一级节点（叶子节点） 并且设置为选中，父级会自动被选中
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
      // 直接获取tree会报错：Cannot read property 'setCheckedKeys' of undefined
      // console.log(this.$refs, this.$refs.tree)
    },
    // 获取所有权限Tree列表（树形结构）
    async getRightsTree () {
      const res = await this.$http.get('rights/tree')
      this.rightsTree = res.data.data
    },
    // 给角色分配权限
    async assignRights () {
      // 全选中的key
      const HalfcheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // 半选中的key
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const allKeys = [...HalfcheckedKeys, ...checkedKeys]
      // ES6中的数组扩展运算符：
      // const allKeys = [109, 102, 107]
      // 发送请求，分配权限
      console.log(this.roleId, allKeys)
      const res = await this.$http.post(`/roles/${this.roleId}/rights`, {
        rids: allKeys.join(',')
      })
      console.log(res)
      // 关闭对话框
      this.isShowRolesDialog = false
      // 显示提示
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      // 刷新
      this.getRolesList()
    }
  }

}
