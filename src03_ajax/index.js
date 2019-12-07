import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App' // 引入自定义组件

// 声明使用Vue插件
Vue.use(VueResource) // 内部给所有的组件对象都添加了一个属性对象: $http

new Vue({

  beforeCreate () {
    // 将当前vm对象作为事件总线对象保存到Vue的原型对象(让所有的组件对象都直接可见)
    Vue.prototype.$eventBus = this
  },

  // 注册局部组件
  components: { // 注册组件(后面才能写组件标签)
    App: App
  },
  template: '<App/>'
}).$mount('#root')