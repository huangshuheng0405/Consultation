<script setup lang="ts">
import { ref } from 'vue'
import { showLoadingToast, UploaderAfterRead } from 'vant'
import { uploadImageAPI } from '@/services/consult.js'
import { Image } from '@/types/consult.js'

defineProps<{
  disabled: boolean
}>()
const emit = defineEmits<{
  (e: 'sendText', text: string): void
  (e: 'sendImage', image: Image): void
}>()
const text = ref('')

const onSendText = () => {
  if (text.value) {
    emit('sendText', text.value)
    text.value = ''
  }
}
// 提交图片
const onSendImage: UploaderAfterRead = async (image) => {
  if (Array.isArray(image)) return
  if (!image.file) return
  const loading = showLoadingToast({
    message: '上传中...',
    duration: 0
  })
  const res = await uploadImageAPI(image.file)
  loading.close()
  emit('sendImage', res.data)
}
</script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      :disabled="false"
      v-model="text"
      @keyup.enter="onSendText"
    ></van-field>
    <van-uploader
      :after-read="onSendImage"
      :preview-image="false"
      :disabled="false"
    >
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
