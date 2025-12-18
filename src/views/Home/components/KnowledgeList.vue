<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'

// 加载中状态
const loading = ref(false)

// 是否完全加载完毕
const finished = ref(false)

// 数据列表
// const list = ref<number[]>([])

// 加载更多
const onLoad = () => {
  console.log('load')
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="item in 10" :key="item"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
