import axios from '@/libs/api.request'
// 请求示例
export const getList = (params) => {
  return axios.request({
    url: 'v1/payments/count',
    method: 'get',
    params
  })
}
