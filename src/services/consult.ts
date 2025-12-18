import {
  DoctorPage,
  FollowType,
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

/** 关注或取消关注
 * @param id 关注对象id
 * @param type topic百科话题,knowledge百科文章,doc医生,disease疾病
 * */
export const followOrUnfollowAPI = (id: string, type: FollowType = 'doc') => {
  return request('like', 'POST', { id, type })
}
