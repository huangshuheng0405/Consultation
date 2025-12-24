import { ref } from 'vue'
import { ConsultOrderItem, FollowType } from '@/types/consult.js'
import {
  cancelConsultOrderAPI,
  followOrUnfollowAPI,
  getPrescriptionAPI
} from '@/services/consult.js'
import { showFailToast, showImagePreview, showSuccessToast } from 'vant'
import { OrderType } from '@/enum/index.js'
import { deleteConsultOrderAPI } from '@/services/consult.js'

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
