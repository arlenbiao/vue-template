import Vue from 'vue'
import App from './App'
import router from './router'
import '@/libs/response.js'
import 'babel-polyfill'
/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
