import { request } from '@/utils/request.js'
import { AddressItem, OrderPre } from '@/types/order.js'

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
