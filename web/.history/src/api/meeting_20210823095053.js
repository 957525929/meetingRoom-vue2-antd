import Vue from 'vue'
import { axios } from '@/utils/request'

// const api = {
//   user: '/api/user',
//   role: '/api/role',
//   service: '/api/service',
//   permission: '/api/permission',
//   permissionNoPager: '/api/permission/no-pager'
// }

// export default api

//post
export function postAction(url, parameter) {
  return axios({
    url: /MeetingRoomController/BPPacdeegilty,
    method: 'post',
    data: parameter
  })
}

//post method= {post | put}
export function httpAction(url, parameter, method) {
  return axios({
    url: url,
    method: method,
    data: parameter
  })
}
