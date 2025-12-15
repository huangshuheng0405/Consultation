<script setup lang="ts">
import { Button } from 'vant'
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()
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
</template>

<style scoped lang="scss">
// 使用 css 变量
a {
  color: var(--cp-primary);
}
</style>
