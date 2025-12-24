import { ConsultTime } from '@/enum/index.js'
import { flagOptions, timeOptions } from '@/services/constants.js'

// 获取患病时间
export const getIllnessTime = (time: ConsultTime) => {
  return timeOptions.find((item) => item.value === time)?.label
}
// 获取是否就诊
export const getConsultFlag = (flag: 1 | 0) => {
  return flagOptions.find((item) => item.value === flag)?.label
}
