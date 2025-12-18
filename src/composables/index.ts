import { ref } from 'vue'
import { FollowType } from '@/types/consult.js'
import { followOrUnfollowAPI } from '@/services/consult.js'

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
