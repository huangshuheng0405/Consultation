import {
  DoctorPage,
  KnowledgePage,
  KnowledgeParams,
  PageParams
} from '@/types/consult.js'
import { request } from '@/utils/request.js'

/**
 * 获取文章列表
 *@param params
 * */
export const getKnowledgePageListAPI = (params: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'get', params)
}

/** 获取医生列表
 * @param params
 * */
export const getDoctorListAPI = (params: PageParams) => {
  return request<DoctorPage>('/home/page/doc', 'get', params)
}
