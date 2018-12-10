<template>
  <div class="rights">这是 权限 列表
    <!-- 面包屑导航 -->
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="rightsList" stripe style="width: 100%">
    <!-- index索引列 -->
      <el-table-column type="index" width="50" :index="indexMethod"> </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0' ">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    // 自定义索引的方法
    indexMethod (index) {
      // return index * 2
      return index
    },
    /**
     * 获取权限列表
     */
    async getRightList () {
      const res = await this.$http.get('rights/list')
      this.rightsList = res.data.data
    }

  }
}
</script>

<style>
.bread {
  height: 50px;
  padding-left: 10px;
  line-height: 50px;
  font-size: 16px;
  background-color: #D4DAE0;
}
</style>
