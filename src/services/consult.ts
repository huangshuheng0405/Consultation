import { KnowledgePage, KnowledgeParams } from '@/types/consult.js'
import { request } from '@/utils/request.js'

/**
 * 获取文章列表
 *@param params
 *
 * */
export const getKnowledgePageListAPI = (params: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'get', params)
}
