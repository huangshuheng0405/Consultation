import { User } from '@/types/user.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    const user = ref<User>()

    const setUser = (newUser: User) => {
      user.value = newUser
    }
    // 删除用户信息
    const removeUser = () => {
      user.value = undefined
    }

    const returnUrl = ref('')
    const setReturnUrl = (url: string) => {
      returnUrl.value = url
    }

    return {
      user,
      setUser,
      setReturnUrl,
      returnUrl,
      removeUser
    }
  },
  {
    persist: true
  }
)
