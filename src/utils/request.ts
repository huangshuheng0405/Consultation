import router from '@/router/index.js'
import { useUserStore } from '@/stores/index.js'
import axios, { AxiosError } from 'axios'
import { showToast } from 'vant'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: 'https://consult-api.itheima.net',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.user?.token) {
      config.headers.Authorization = `Bearer ${userStore.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    if (res.data.code !== 10000) {
      showToast(res.data.message || '业务失败')
      return Promise.reject(res.data)
    }
    // TODO 4. 摘取核心响应数据
    return res.data
  },
  (err: AxiosError) => {
    // TODO 5. 处理401错误
    if (err.response?.status === 401) {
      showToast('登录过期，请重新登录')
      // 清空用户信息
      const userStore = useUserStore()
      userStore.removeUser()
      // 跳转到登录页
      router.push({
        path: '/login',
        query: {
          returnUrl: router.currentRoute.value.fullPath
        }
      })
    }
    return Promise.reject(err)
  }
)

export default instance
