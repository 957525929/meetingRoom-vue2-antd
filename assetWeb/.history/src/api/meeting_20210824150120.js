import Vue from 'vue'
import { axios } from '@/utils/request'

//post
export function addMeetingRoom(parameter) {
  console.log(parameter)
  return axios({
    url: '/MeetingRoomController/addMeetingRoom',
    method: 'post',
    data: parameter
  })
}
export function addMeetingRoom(parameter) {
  console.log(parameter)
  return axios({
    url: '/MeetingRoomController/BIMRddeeeeegilmnootty',
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
