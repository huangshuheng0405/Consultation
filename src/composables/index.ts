import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { ConsultOrderItem, FollowType } from '@/types/consult.js'
import {
  cancelConsultOrderAPI,
  deleteConsultOrderAPI,
  followOrUnfollowAPI,
  getPrescriptionAPI
} from '@/services/consult.js'
import {
  FormInstance,
  showFailToast,
  showImagePreview,
  showSuccessToast,
  showToast
} from 'vant'
import { OrderType } from '@/enum/index.js'
import { OrderDetail } from '@/types/order.js'
import { getOrderDetailAPI } from '@/services/order.js'
import { sendMobileCodeAPI } from '@/services/user.js'
import { CodeType } from '@/types/user.js'

// 关注
export const useFollow = (type: FollowType = 'doc') => {
  // 关注加载动画
  const loading = ref(false)
  // 关注医生
  const follow = async (doctor: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollowAPI(doctor.id, type)
      doctor.likeFlag = doctor.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}

export const useShowPrescription = () => {
  // 查看处方
  const onShowPrescription = async (id: string) => {
    if (id) {
      const res = await getPrescriptionAPI(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}

// 取消订单
export const useCancelOrder = () => {
  // 取消订单
  const loading = ref(false)
  const cancelOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await cancelConsultOrderAPI(item.id)
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      showSuccessToast('取消成功')
    } catch (error) {
      console.log(error)
      showFailToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, cancelOrder }
}
// 删除订单
export const useDeleteOrder = (callback: () => void) => {
  const loading = ref(false)
  const deleteOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await deleteConsultOrderAPI(item.id)
      callback()
      showSuccessToast('删除成功')
    } catch (error) {
      console.log(error)
      showFailToast('删除失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, deleteOrder }
}
// 获取订单详情
export const useOrderDetail = (id: string) => {
  const order = ref<OrderDetail>()
  const loading = ref(false)
  onMounted(async () => {
    try {
      loading.value = true
      const res = await getOrderDetailAPI(id)
      order.value = res.data
    } finally {
      loading.value = false
    }
  })
  return { order, loading }
}
export const useMobileCode = (
  mobile: Ref<string>,
  type: CodeType = 'login'
) => {
  // 发送验证码
  const time = ref(0)
  let timer: number
  const form = ref<FormInstance>()
  const onSendCode = async () => {
    // 获取验证码
    if (time.value > 0) {
      return showToast('请稍后再试')
    }
    await form.value?.validate('mobile')
    await sendMobileCodeAPI(mobile.value, type)
    showToast('验证码已发送')
    time.value = 60
    // 开始倒计时
    if (!timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      time.value--
      // 倒计时结束 关闭定时器
      if (time.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  onUnmounted(() => {
    clearInterval(timer)
  })
  return { time, onSendCode, form }
}
