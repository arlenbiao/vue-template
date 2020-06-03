import axios from '@/libs/api.request'
// 请求示例
export const searchSChoolList = (params) => {
  return axios.request({
    url: `/api-cclient/school/findSchools`,
    method: 'post',
    params
  })
}
