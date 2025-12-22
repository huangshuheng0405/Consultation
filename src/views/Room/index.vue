<script setup lang="ts">
import RoomStatus from '@/views/Room/components/RoomStatus.vue'
import RoomAction from '@/views/Room/components/RoomAction.vue'
import RoomMessage from '@/views/Room/components/RoomMessage.vue'
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <!--  状态栏  -->
    <room-status></room-status>
    <!--  消息  -->
    <room-message></room-message>
    <!--  操作栏  -->
    <room-action></room-action>
  </div>
</template>

<style scoped lang="scss">
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
