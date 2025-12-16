import { request } from '@/utils/request.js'
import { CodeType, User, UserInfo } from '@/types/user.js'

/** 密码登录
 * @param mobile 手机号
 * @param password 密码
 * @returns {code: number, msg: string, token?: string} 登录成功返回token, 否则返回错误消息
 * */
export const loginByPasswordAPI = (mobile: string, password: string) => {
  return request<User>('/login/password', 'post', { mobile, password })
}

/** 获取短信验证码
 * @param mobile 手机号 type 验证码类型 login 登录 register 注册
 * @returns {code: number, msg: string} 返回码和消息
 * */
export const sendMobileCodeAPI = (mobile: string, type: CodeType) => {
  return request('/code', 'get', { mobile, type })
}

/** 短信登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns {code: number, msg: string, token?: string} 登录成功返回token, 否则返回错误消息
 * */
export const loginByMobileAPI = (mobile: string, code: string) => {
  return request<User>('/login', 'post', { mobile, code })
}

/**
 * 获取用户信息
 * @returns {code: number, msg: string, data: User}
 */
export const getUserInfoAPI = () => {
  return request<UserInfo>('/patient/myUser', 'GET')
}
