<template>
  <div class="notFound">
    <h1>NotFound</h1>
    <h2>哎呀，迷路了-页面不存在哦</h2>
    <p>您将在{{times}}秒后返回首页</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      times: 5,
      timerId: null
    }
  },
  created () {
    this.timerId = setInterval(() => {
      if (this.times <= 1) {
        clearInterval(this.timerId)
        this.$router.push('/home')
        return
      }
      this.times--
    }, 1000)
  }
}
</script>

<style>
  .notFound{
    margin: 0 auto;
    text-align: center;
    color: #fff;
  }
</style>
