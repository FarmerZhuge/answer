<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
html, body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.nav {
  height: 56px;
  line-height: 56px;
}

.van-nav-bar__text, .van-nav-bar__title {
 font-size: 18px !important;  
}

.van-nav-bar__text {
  font-size: 15px !important;
}

.van-nav-bar__title {
  font-size: 15px !important; 
}

</style>
