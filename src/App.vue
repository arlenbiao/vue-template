<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  padding: 0;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
/* // 禁止长按图片保存 */
img {
  -webkit-touch-callout: none;
  pointer-events: none;
  /* // 像微信浏览器还是无法禁止，加上这行样式即可 */
}
div {
  -webkit-overflow-scrolling: touch;
  /* // 禁止长按选择文字 */
  -webkit-user-select: none;
  /* // 禁止长按呼出菜单 */
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
li {
  list-style: none;
}
body,
html {
  -webkit-overflow-scrolling: touch;
}
body {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
</style>
