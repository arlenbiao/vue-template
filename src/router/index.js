import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tables',
      component: () => import('@/views/tables/index.vue')
    }, {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index/index.vue')
    }, {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo/index.vue')
    }
  ]
})
