import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App' // 引入自定义组件


// 全局注册UI组件
Vue.component(Button.name, Button)

new Vue({
  components: { 
    App: App
  },
  template: '<App/>'
}).$mount('#root')