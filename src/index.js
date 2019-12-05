// import Vue from 'vue/dist/vue.runtime.common'
// import Vue from 'vue/dist/vue.esm.js'
import Vue from 'vue'
import App from './App' // 引入自定义组件

// 注册全局组件
// Vue.component('App', App) 

new Vue({
  // el: '#root'
  // 注册局部组件
  components: { // 注册组件(后面才能写组件标签)
    App: App
  },
  template: '<App/>'
}).$mount('#root')