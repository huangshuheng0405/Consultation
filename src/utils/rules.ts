import type { FieldRule } from 'vant'

// 手机号规则
const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
]

// 密码规则
const passwordRules: FieldRule[] = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{8,24}$/, message: '密码必须是8-24位字符' }
]

// 验证码规则
const codeRules: FieldRule[] = [
  { required: true, message: '请输入短信验证码' },
  { pattern: /^\d{6}$/, message: '验证码必须是6位数字' }
]

// 中文规则
const nameRules: FieldRule[] = [
  { required: true, message: '请输入真实姓名' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文名位2-16个字符' }
]

// 身份证规则
const idCardRules: FieldRule[] = [
  { required: true, message: '请输入身份证号' },
  {
    pattern:
      /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '请输入正确的身份证号'
  }
]

export { mobileRules, passwordRules, codeRules, nameRules, idCardRules }
