import { ConsultTime } from '@/enum/index.js'

// 患病时间
export const timeOptions = [
  { label: '一周内', value: ConsultTime.week },
  { label: '一月内', value: ConsultTime.month },
  { label: '半年内', value: ConsultTime.halfYear },
  { label: '一年内', value: ConsultTime.more }
]
// 就诊过
export const flagOptions = [
  { label: '就诊过', value: 1 },
  { label: '没就诊过', value: 0 }
]
