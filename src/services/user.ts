import { request } from '@/utils/request.js'
import { User } from '@/types/user.js'

export const loginByPasswordAPI = (mobile: string, password: string) => {
  return request<User>('/login/password', 'post', { mobile, password })
}
