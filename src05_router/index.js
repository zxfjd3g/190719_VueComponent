import Vue from 'vue'
import App from './App'
import router from './router'



new Vue({
  components: { 
    App: App
  },
  template: '<App/>',
  router   // 所有组件都能通过$router属性看到router对象  / 所有组件都有了一个代表当前路由的data数据: $route
}).$mount('#root')