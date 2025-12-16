<script lang="ts" setup>
// 通过defineProps 获取父组件传递的参数 实现标题和右侧文字的设置
defineProps<{
  title?: string
  rightText?: string
}>()

const emit = defineEmits<{
  (event: 'click-right'): void
}>()

const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <div class="login-page">
    <van-nav-bar
      fixed
      left-arrow
      :title="title"
      :right-text="rightText"
      @click-right="onClickRight"
    ></van-nav-bar>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text1);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>
