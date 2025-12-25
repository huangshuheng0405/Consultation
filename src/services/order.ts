import { request } from '@/utils/request.js'
import { AddressItem, OrderDetail, OrderPre } from '@/types/order.js'

/** 获取订单预览信息 */
export const getMedicalOrderPreviewAPI = (params: {
  prescriptionId: string
}) => {
  return request<OrderPre>('/patient/medicine/order/pre', 'GET', params)
}
/** 获取收获地址 */
export const getAddressListAPI = () => {
  return request<AddressItem[]>('/patient/order/address', 'GET')
}
/** 创建订单 */
export const createMedicalOrderAPI = (data: {
  id: string
  addressId: string
  couponId?: string
}) => {
  return request<{ id: string }>('/patient/medicine/order', 'POST', data)
}
/** 获取订单详情 */
export const getOrderDetailAPI = (id: string) => {
  return request<OrderDetail>(`/patient/medicine/order/detail/${id}`)
}
