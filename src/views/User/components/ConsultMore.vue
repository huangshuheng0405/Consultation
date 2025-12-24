<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  disabled: boolean
}>()

// 更多操作
const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: props.disabled },
  { text: '删除订单' }
])
const emit = defineEmits<{
  (e: 'on-delete'): void
  (e: 'on-preview'): void
}>()
const onSelect = (action: { text: string }, index: number) => {
  if (index === 1) emit('on-delete')
  if (index === 0) emit('on-preview')
}
</script>

<template>
  <div class="consult-more">
    <van-popover
      v-model:show="showPopover"
      :actions="actions"
      @select="onSelect"
      placement="top-start"
    >
      <template #reference>
        <van-button class="gray" plain size="small" round>
          更多
        </van-button></template
      >
    </van-popover>
  </div>
</template>

<style scoped lang="scss">
.consult-more {
  margin-left: -15px;
  color: var(--cp-tag);
  flex: 1;
  font-size: 13px;
}
.van-button {
  margin-left: 10px;
  padding: 0 16px;
  &.gray {
    color: var(--cp-text3);
    background-color: var(--cp-bg);
  }
}
</style>
