<template>
  <div id="app">
    <img :src="require('~/assets/images/logo.png')" alt="">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    padding: 0;
    margin: 0;
  }
  /* // 禁止长按图片保存 */
  img {
    -webkit-touch-callout: none;
    pointer-events: none;
    /* // 像微信浏览器还是无法禁止，加上这行样式即可 */
  }
  /* // 禁止长按选择文字 */
  div {
    -webkit-user-select: none;
  }
  /* // 禁止长按呼出菜单 */
  div {
    -webkit-touch-callout: none;
  }
</style>
