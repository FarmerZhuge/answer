<template>
  <div class="main">
    <!-- <van-button plain type="primary" block to="/admin">主持人</van-button>
    <van-button plain type="primary" block to="/user">参与者</van-button> -->
    <div class="manager btn" @click="jump('/admin')">主持人</div>
    <div class="user btn" @click="jump('/user')">参与者</div>
  </div>
</template>
<script>

export default {
  name: 'Main',
  methods: {
    /**
     * 页面跳转
     * @param { string } url 跳转的url
     */
    jump(url) {
      this.$router.push(url)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  padding: 40px;
  margin-top: 180px
}

.main .btn {
  margin: 10px auto;
  padding: 10px 0;
  width: 200px;
  height: 46px;
  background: lightseagreen;
  color: #fff;
  font-size: 24px;
  line-height: 46px;
}

</style>
