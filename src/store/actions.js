/* 
一个包含n个用于间接更新状态数据的方法的对象模块
可以包含异步和逻辑处理代码
*/
import axios from 'axios'
import {
  REQUESTING,
  REQ_ERROR,
  REQ_SUCCESS
} from './mutation-types'

export default {
  
  /* 
  搜索的异步action: 包含了异步代码的action
  */
  async search ({commit}, searchName) {
    // 在发请求前, 提交请求中的mutation
    commit(REQUESTING)

    // 发异步ajax请求获取数据
    try {
      const response = await axios('/gh/search/users', {params: {q: searchName}})
      // 如果成功了, 提交请求成功的mutation
      const result = response.data
      const users = result.items.map(item => ({
        username: item.login,
        url: item.html_url,
        avatar_url: item.avatar_url 
      }))
      // commit(REQ_SUCCESS, users) // 传递数据本身
      commit(REQ_SUCCESS, {users}) // 传递包含数据的对象
    } catch (error) { // 如果失败了, 提交请求失败的mutation
      // commit(REQ_ERROR, error.message)
      commit(REQ_ERROR, {errorMsg: error.message})
    }
  }
}