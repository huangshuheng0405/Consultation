<script setup lang="ts">
import DoctorCard from '@/views/Home/components/DoctorCard.vue'
import { useWindowSize } from '@vueuse/core'
import { DoctorList } from '@/types/consult.js'
import { onMounted, ref } from 'vue'
import { getDoctorListAPI } from '@/services/consult.js'

// 获取当前屏幕宽度
const { width } = useWindowSize()

const doctorList = ref<DoctorList>([])
const getDoctorList = async () => {
  const res = await getDoctorListAPI({ pageSize: 5, current: 1 })
  doctorList.value = res.data.rows
}

onMounted(() => {
  getDoctorList()
})
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe
        :width="(150 / 375) * width"
        :show-indicators="false"
        :loop="false"
      >
        <van-swipe-item v-for="doctor in doctorList" :key="doctor.id">
          <doctor-card :doctor="doctor"></doctor-card>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
