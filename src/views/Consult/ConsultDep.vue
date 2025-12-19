<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { TopDep } from '@/types/consult.js'
import { getAllDepAPI } from '@/services/consult.js'
import { useConsultStore } from '@/stores/index.js'

// 默认激活第1个
const active = ref(0)

// 所有一级科室
const allTopDep = ref<TopDep[]>([])
const getTopDepList = async () => {
  const res = await getAllDepAPI()
  allTopDep.value = res.data
}

// 二级科室
const subDep = computed(() => allTopDep.value[active.value]?.child)

onMounted(async () => {
  getTopDepList()
})

const consultStore = useConsultStore()
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          v-for="dep in allTopDep"
          :key="dep.id"
          :title="dep.name"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          v-for="subdep in subDep"
          :key="subdep.id"
          @click="consultStore.setDepId(subdep.id)"
        >
          {{ subdep.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
