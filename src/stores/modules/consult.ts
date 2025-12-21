import { defineStore } from 'pinia'
import { ConsultIllness, PartialConsult } from '@/types/consult.js'
import { ref } from 'vue'
import { ConsultType } from '@/enum/index.js'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    // 问诊信息
    const consult = ref<PartialConsult>({})
    // 设置问诊类型
    const setConsult = (newConsult: ConsultType) => {
      consult.value.type = newConsult
    }
    // 记录问诊级别
    const setIllnessType = (newIllnessType: 0 | 1) => {
      consult.value.illnessType = newIllnessType
    }
    // 记录科室
    const setDepId = (newDepId: string) => {
      consult.value.depId = newDepId
    }
    // 记录病情
    const setIllnessDesc = (newIllnessDesc: ConsultIllness) => {
      consult.value.illnessDesc = newIllnessDesc.illnessDesc
      consult.value.illnessTime = newIllnessDesc.illnessTime
      consult.value.consultFlag = newIllnessDesc.consultFlag
      consult.value.pictures = newIllnessDesc.pictures
    }
    // 记录患者
    const setPatientId = (newPatientId: string) => {
      consult.value.patientId = newPatientId
    }
    // 记录优惠券
    const setCouponId = (newCouponId: string) => {
      consult.value.couponId = newCouponId
    }
    // 清除数据
    const clearConsult = () => {
      consult.value = {}
    }

    return {
      consult,
      setConsult,
      setIllnessType,
      setDepId,
      setIllnessDesc,
      setPatientId,
      setCouponId,
      clearConsult
    }
  },
  {
    persist: true
  }
)
