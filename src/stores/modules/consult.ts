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

    return { consult, setConsult }
  },
  {
    persist: true
  }
)
