<script setup lang="ts">
import RoomStatus from '@/views/Room/components/RoomStatus.vue'
import RoomAction from '@/views/Room/components/RoomAction.vue'
import RoomMessage from '@/views/Room/components/RoomMessage.vue'
import io, { Socket } from 'socket.io-client'
import { useUserStore } from '@/stores/index.js'
import { useRoute } from 'vue-router'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { baseURL } from '@/utils/request.js'
import { Message, TimeMessages } from '@/types/room.js'
import { MsgType, OrderType } from '@/enum/index.js'
import { ConsultOrderItem } from '@/types/consult.js'
import { getConsultOrderDetailAPI } from '@/services/consult.js'

const userStore = useUserStore()
const route = useRoute()
const list = ref<Message[]>([])
let socket: Socket

const consult = ref<ConsultOrderItem>()
const loadConsult = async () => {
  const res = await getConsultOrderDetailAPI(route.query.orderId as string)
  consult.value = res.data
}

onMounted(async () => {
  loadConsult()
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
  // socket.on('chatMsgList', (res) => {
  //   console.log(res)
  // })
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    console.log('chatMsgList', data)
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
  // 监听订单状态变化
  socket.on('statusChange', () => loadConsult())
  // 接收聊天消息
  socket.on('receiveChatMsg', async (event) => {
    console.log('chatMsg', event)
    list.value.push(event)
    await nextTick()
    //  向上滚动
    window.scrollTo(0, document.body.scrollHeight)
  })
})
onUnmounted(() => {
  socket.close()
})
// 发送文字信息
const onSendText = (text: string) => {
  // console.log(text)
  socket.emit('sendChatMsg', {
    from: userStore.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: {
      content: text
    }
  })
}
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <!--  状态栏  -->
    <room-status
      :status="consult?.status"
      :countDown="consult?.countdown"
    ></room-status>
    <!--  消息  -->
    <room-message
      v-for="item in list"
      :key="item.id"
      :item="item"
    ></room-message>
    <!--  操作栏  -->
    <room-action
      @sendText="onSendText"
      :disabled="consult?.status !== OrderType.ConsultChat"
    ></room-action>
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
