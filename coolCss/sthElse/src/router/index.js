import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
{
  path: '/',
  name: 'index',
  component: () =>
      import( /* webpackChunkName: "index" */ '@/views/index/index'),
  meta: {},
},
]

const router = new VueRouter({
  // 解决vue框架页面跳转有白色不可追踪色块的bug
  //  scrollBehavior: () => ({ x: 0, y: 0 }),
  // 页面刷新白屏问题
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
