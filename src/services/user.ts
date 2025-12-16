import { request } from '@/utils/request.js'
import { CodeType, User } from '@/types/user.js'

/** 密码登录
 * @param mobile 手机号 password 密码
 *
 * */
export const loginByPasswordAPI = (mobile: string, password: string) => {
  return request<User>('/login/password', 'post', { mobile, password })
}

/** 获取短信验证码
 *
 *
 *
 * */
export const sendMobileCodeAPI = (mobile: string, type: CodeType) => {
  return request('/code', 'get', { mobile, type })
}
