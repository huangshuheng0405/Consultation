import { createRouter, createWebHistory } from 'vue-router'

// vite.config.ts 中配置了 BASE_URL
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
