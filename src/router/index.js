import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '',
    redirect: Home,
  },
  {
    path: '/search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/type',
    component: _ => import('@/components/Type.vue')
  },
  // {
  //   path: '/find',
  //   component: _ => import('@/components/Find.vue')
  // },
  {
    path: '/cart',
    component: _ => import('@/components/Cart.vue')
  },
  {
    path: '/register',
    component: _ => import('@/components/Register.vue')
  },
  {
    path: '/forget',
    component: _ => import('@/components/Forget.vue')
  },
  {
    path: '/detail',
    component: _ => import('@/components/Detail.vue'),
  },
  {
    path: '/order',
    component: _ => import('@/components/Order.vue')
  },
  {
    path: '/my',
    component: _ => import('@/components/My.vue')
  },
  {
    path: '/test',
    component: _ => import('@/components/test.vue')
  },
  {
    path: '/index',
    component: _ => import('@/components/service/Index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
