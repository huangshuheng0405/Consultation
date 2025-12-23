import router from '@/router/index.js'
import { useUserStore } from '@/stores/index.js'
import axios, { AxiosError, Method } from 'axios'
import { showToast } from 'vant'

export const baseURL = 'https://consult-api.itheima.net'

const instance = axios.create({
  //  1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    //  2. 携带token
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
    //  3. 处理业务失败
    if (res.data.code !== 10000) {
      showToast(res.data.message || '业务失败')
      return Promise.reject(res.data)
    }
    //  4. 摘取核心响应数据
    return res.data
  },
  (err: AxiosError) => {
    //  5. 处理401错误
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

type Data<T> = {
  code: number
  message: string
  data: T
}

export const request = <T>(
  url: string,
  method: Method = 'get',
  submitData?: object
) => {
  return instance.request<never, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
