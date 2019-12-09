/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/pages/About'
import Home from '@/pages/Home'
import News from '@/pages/News'
import Message from '@/pages/Message'
import MessageDetail from '@/pages/MessageDetail'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // 去掉路径中的#
  // 应用中所有路由
  routes: [
    // 路由
    {
      path: '/about',
      component: About
    },
    {
      path: '/home', // path最左边的/代表项目根路径
      component: Home,
      children: [ // 注册子路由
        {
          name: 'news',
          path: '/home/news',
          component: News
        },
        {
          path: 'message',  // 相当于: /home/message
          component: Message,
          children: [
            {
              name: 'detail',
              path: '/home/message/detail/:id',   // 动态路由
              component: MessageDetail,
              // props: true, // 内部自动将接收的parmas参数以标签属性传入路由组件
              props: (route) => ({id: route.params.id, name: route.query.name})  // 函数返回的对象中的所有属性都会以标签属性传入路由组件
            }
          ]
        },
        {
          path: '',
          redirect: '/home/news'
        }
      ]
    },
    


    // 自动重定向的路由
    {
      path: '/',
      redirect: '/about'
    }
  ]
})