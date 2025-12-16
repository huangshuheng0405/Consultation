import { useUserStore } from '@/stores/index.js'
import { createRouter, createWebHistory } from 'vue-router'

// vite.config.ts 中配置了 BASE_URL
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: {
            title: '健康百科'
          }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: {
            title: '消息通知'
          }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: {
            title: '个人中心'
          }
        }
      ]
    }
  ]
})

// 全局前置守卫
router.beforeEach((to) => {
  // 判断用户是否登录，如果未登录且不是在登录页面，则跳转到登录页面
  const userStore = useUserStore()
  // 白名单，不需要登录即可访问的页面
  const whiteList = ['/login']
  // 如果未登录且不在白名单中，则跳转到登录页面
  if (!userStore.user?.token && !whiteList.includes(to.path)) {
    return '/login'
  }
})

// 全局后置导航
router.afterEach((to) => {
  document.title = `${to.meta.title || ''}-优医问诊`
})

export default router
