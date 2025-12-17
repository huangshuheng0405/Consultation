<script lang="ts" setup>
import { useRouter } from 'vue-router'

// 通过defineProps 获取父组件传递的参数 实现标题和右侧文字的设置
const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()

const emit = defineEmits<{
  (event: 'click-right'): void
}>()

const onClickRight = () => {
  emit('click-right')
}

const router = useRouter()
// 回退到上一页 如果没有上一页 则跳转到首页
const onClickLeft = () => {
  if (props.back) {
    return props.back()
  }
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="login-page">
    <van-nav-bar
      fixed
      left-arrow
      :title="title"
      :right-text="rightText"
      @click-left="onClickLeft"
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
