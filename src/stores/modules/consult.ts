import { defineStore } from 'pinia'
import { PartialConsult } from '@/types/consult.js'
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

    return { consult, setConsult, setIllnessType, setDepId }
  },
  {
    persist: true
  }
)
