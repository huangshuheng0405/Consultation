import {
  ConsultOrderItem,
  ConsultOrderListParams,
  ConsultOrderPage,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  DoctorPage,
  FollowType,
  Image,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  PartialConsult,
  TopDep
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

/** 获取所有科室
 * @return 所有科室信息
 * */
export const getAllDepAPI = () => {
  return request<TopDep[]>('/dep/all')
}

/** 上传图片
 * @return 图片信息
 * @param file
 */
export const uploadImageAPI = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request<Image>('/upload', 'post', formData)
}

/** 获取问诊订单预览信息
 * @param params
 * */
export const getConsultOrderPreviewAPI = (params: ConsultOrderPreParams) => {
  return request<ConsultOrderPreData>(
    '/patient/consult/order/pre',
    'get',
    params
  )
}

/** 创建问诊订单
 * @param data
 * */
export const createConsultOrderAPI = (data: PartialConsult) => {
  return request<{ id: string }>('/patient/consult/order', 'POST', data)
}

/** 获取问诊订单详情
 * @param
 * */
export const getConsultOrderUrlAPI = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallBack: string
}) => {
  return request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)
}

/** 获取问诊订单详情
 * @param orderId 订单ID
 * */
export const getConsultOrderDetailAPI = (orderId: string) => {
  return request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', {
    orderId
  })
}
/** 获取处方图片  */
export const getPrescriptionAPI = (id: string) => {
  return request<{ url: string }>(`/patient/consult/prescription/${id}`, 'GET')
}
/** 评价医生 */
export const evaluateDocAPI = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => {
  return request('/patient/order/evaluate', 'POST', data)
}

/** 获取订单列表 */
export const getConsultOrderListAPI = (params: ConsultOrderListParams) => {
  return request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)
}
/** 取消订单 */
export const cancelConsultOrderAPI = (id: string) => {
  return request(`/patient/order/cancel/${id}`, 'PUT')
}
