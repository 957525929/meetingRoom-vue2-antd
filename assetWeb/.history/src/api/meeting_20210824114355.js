import Vue from 'vue'
import { axios } from '@/utils/request'

const api = {
  //   user: '/MeetingRoomController/getPlaceByPid?id=2',
}

export default api

//post
export function addMeetingRoom(parameter) {
  console.log(parameter)
  return axios({
    url: '/MeetingRoomController/addMeetingRoom',
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
