/* 
后台服务器应用模块: 使用express快速搭建后台路由
*/

const express = require('express')
const axios = require('axios')
const app = express()

// 能解析urlencode格式的post请求体参数
app.use(express.urlencoded())
// 能解析json格式的请求体参数
app.use(express.json())

app.get('/search/users', (req, res) => {
  const q = req.query.q
  axios.get('https://api.github.com/search/users', {
    params: {q}
  })
    .then(response => {
      const result = response.data
      res.send(result)
    }).catch(error => {
      console.log(error.message)
    })
})


app.listen('4000', () => {
  console.log('server listen on http://localhost:4000')
})