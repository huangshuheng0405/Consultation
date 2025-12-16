<script setup lang="ts">
import { Button } from 'vant'
import { useUserStore } from '@/stores/modules/user.js'
import { request } from './utils/request.js'
import { User } from './types/user.js'

const userStore = useUserStore()

const getUserInfo = async () => {
  // axios.request({
  //   url: '/patient/myUser',
  //   method: 'get'
  // })
  const res = await request('/patient/myUser', 'get', { test: '123' })
  console.log('获取用户信息成功', res)
}

const login = async () => {
  // axios
  //   .request({
  //     url: '/login/password',
  //     method: 'post',
  //     data: {
  //       mobile: '17850967571',
  //       password: '123456'
  //     }
  //   })
  request<User>('/login/password', 'post', {
    mobile: '17850967571',
    password: '123456'
  })
    .then((res) => {
      console.log('登录成功', res.data)
    })
    .catch((err) => {
      console.log('登录失败', err)
    })
}
</script>

<template>
  {{ userStore.user }}
  <Button
    type="primary"
    @click="
      userStore.setUser({
        token: '123',
        id: '123',
        account: 'admin',
        mobile: '13800000000',
        avatar:
          'https://img2.baidu.com/it/u=3522242222,2827955828&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      })
    "
    >登录</Button
  >
  <Button type="primary" @click="userStore.removeUser()">退出</Button>

  <Button @click="getUserInfo">获取用户信息</Button>
  <Button @click="login">接口登录</Button>
</template>

<style scoped lang="scss">
// 使用 css 变量
a {
  color: var(--cp-primary);
}
</style>
