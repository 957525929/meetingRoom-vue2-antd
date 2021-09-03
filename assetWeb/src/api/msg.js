import Vue from 'vue'
import { axios } from '@/utils/request'
const api = {
  }
  
export default api

//deletePostAction
export function deletePostAction(url,parameter) {
    return axios({
      url: url,
      method: 'post',
      params: parameter
    })
  }