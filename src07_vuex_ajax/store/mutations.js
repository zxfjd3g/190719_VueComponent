/* 
一个包含n个用于直接更新状态数据的方法的对象模块
*/
import {
  REQUESTING,
  REQ_ERROR,
  REQ_SUCCESS
} from './mutation-types'

export default {
  // 请求中
  [REQUESTING] (state) {
    state.firstView = false
    state.loading = true
  },

  // 请求成功
  // [REQ_SUCCESS] (state, users) {
  [REQ_SUCCESS] (state, {users}) {
    state.loading = false
    state.users = users
  },

  // 请求失败
  // [REQ_ERROR] (state, errorMsg) {
  [REQ_ERROR] (state, {errorMsg}) {
    state.loading = false
    state.errorMsg = errorMsg
  }
}