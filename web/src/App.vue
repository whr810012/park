<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>
<script>
// import Mapview from "./components/MapContainer.vue"
export default {
  name: 'App',
  // components: {
  //   Mapview
  // }
  created() {
    const userInfo = localStorage.getItem('userInfo')
    // 判断userInfo不是空对象

    if (userInfo && userInfo !== 'undefined' && userInfo !== 'null' && userInfo !== '' && userInfo !== '{}') {
      this.$store.commit('setUserInfo', JSON.parse(userInfo))
    } else {
      this.$router.push('/login')
    }

  }
}
</script>

<style  scoped>
  #app {
    height: 100%;
    width: 100%;
    margin: 0;
  }
</style>
