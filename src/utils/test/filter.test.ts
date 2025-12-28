import { test, expect } from 'vitest'
import { getConsultFlag, getIllnessTime } from '../filter'
import { ConsultTime } from '@/enum'

// 测试 getIllnessTimeText 函数
test('getIllnessTimeText', () => {
  // 进行测试 函数 输入是否可以达到预期的输出
  const text = getIllnessTime(ConsultTime.month)
  expect(text).toBe('一月内')
  const text2 = getIllnessTime(ConsultTime.week)
  expect(text2).toBe('一周内')
})

// 测试 getConsultFlagText 函数
test('getConsultFlagText', () => {
  // 进行测试 函数 输入是否可以达到预期的输出
  const text = getConsultFlag(0)
  expect(text).toBe('没就诊过')
  const text2 = getConsultFlag(1)
  expect(text2).toBe('就诊过')
})
