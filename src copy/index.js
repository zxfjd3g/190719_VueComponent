// import Vue from 'vue/dist/vue.runtime.common'
// import Vue from 'vue/dist/vue.esm.js'
import Vue from 'vue'
import App from './App' // 引入自定义组件


// import './base.css'

// 注册全局组件
// Vue.component('App', App) 

Vue.config.productionTip = false // 不显示不是生产环境的提示

/* 
所有组件对象的原型对象是一个vm对象  ==> Vue原型对象是组件对象的原型链上的对象
创建一个全局的用于绑定事件监听和分发事件的对象: Global Event Bus (全局事件总线)
事件总线对象就是一个vm
将其挂载到Vue的原型对象上, 所有的组件对象就都可以看到这个事件总线对象
*/
// Vue.prototype.$globalEventBus = new Vue()

new Vue({

  beforeCreate () { // 尽量早的执行挂载全局事件总线对象的操作
    Vue.prototype.$globalEventBus = this
  },

  // el: '#root'
  // 注册局部组件
  components: { // 注册组件(后面才能写组件标签)
    App: App
  },
  template: '<App/>'
}).$mount('#root')