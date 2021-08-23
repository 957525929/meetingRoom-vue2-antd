import Vue from 'vue'
import { axios } from '@/utils/request'


//post
export function placeTree(parameter) {
  return axios({
    url: /MeetingRoomController/BPPacdeegilty,
    method: 'post',
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
