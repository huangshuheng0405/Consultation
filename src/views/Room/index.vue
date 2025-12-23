<script setup lang="ts">
import RoomStatus from '@/views/Room/components/RoomStatus.vue'
import RoomAction from '@/views/Room/components/RoomAction.vue'
import RoomMessage from '@/views/Room/components/RoomMessage.vue'
import io, { Socket } from 'socket.io-client'
import { useUserStore } from '@/stores/index.js'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { baseURL } from '@/utils/request.js'
import { Message, TimeMessages } from '@/types/room.js'
import { MsgType } from '@/enum/index.js'

const userStore = useUserStore()
const route = useRoute()
const list = ref<Message[]>([])
let socket: Socket
onMounted(async () => {
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${userStore.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  socket.on('connect', () => {
    console.log('connect success')
  })
  socket.on('disconnect', () => {
    console.log('connect failed')
  })
  socket.on('error', (err) => {
    console.log(err)
  })
  // 获取聊天记录 第一次是默认消息
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = []
    data.forEach((item) => {
      arr.push({
        msgType: MsgType.Notify,
        msg: {
          content: item.createTime
        },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    // console.log(arr)
    list.value.unshift(...arr)
  })
})
onUnmounted(() => {
  socket.close()
})
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
