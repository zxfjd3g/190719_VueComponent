import Vue from 'vue'
import App from './App'
import router from './router'



new Vue({
  components: { 
    App: App
  },
  template: '<App/>',
  router
}).$mount('#root')