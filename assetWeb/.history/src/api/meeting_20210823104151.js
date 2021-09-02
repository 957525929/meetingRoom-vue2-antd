import Vue from 'vue'
import { axios } from '@/utils/request'

//post
export function placeTree(parameter) {
  console.log(parameter)
  return axios({
    url: '/MeetingRoomController/getPlaceByPid?id=2',
    method: 'get',
    data: parameter
  })
}

// //post method= {post | put}
// export function httpAction(url, parameter, method) {
//   return axios({
//     url: url,
//     method: method,
//     data: parameter
//   })
// }
