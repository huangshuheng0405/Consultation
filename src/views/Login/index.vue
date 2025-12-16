<script setup lang="ts">
const handleRightClick = () => {
  console.log('点击了注册')
}
</script>

<template>
  <h1>登录</h1>
  <van-button type="success">登录</van-button>
  <cp-nav-bar
    title="登录"
    rightText="注册"
    @click-right="handleRightClick"
  ></cp-nav-bar>
</template>

<style scoped lang="scss"></style>
