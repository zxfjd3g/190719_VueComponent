<template>
  <ul>
    <li>ID: {{id}}</li>
    <li>Title: {{detail.title}}</li>
    <li>Content: {{detail.content}}</li>
  </ul>
</template>

<script type="text/ecmascript-6">

  const allMessageDetils = [
    {id: 1, title: 'message001', content: 'message content001'},
    {id: 3, title: 'message003', content: 'message content003'},
    {id: 4, title: 'message004', content: 'message content004'},
  ]
  export default {
    props: ['id', 'name'],
    data () {
      return {
        detail: {}
      }
    },

    /* 
    路由组件对象是在第一次请求对应路径时才创建
    从一个路由组件离开, 路由组件死亡, 再进入需要重新创建
    当在同一个路由路径上做切换(只是改了参数), 当前路由组件对象被直接复用
    同一个组件对象mounted()只执行一次
    */
    mounted () {
      console.log('Detail mounted()')
      setTimeout(() => {
        // 得到当前id
        const id = this.id * 1
        const detail = allMessageDetils.find(detail => detail.id===id)
        this.detail = detail
      }, 1000);
    },

     watch: {
      '$route' (to, from) { // 当请求参数发生改变时, 内部指定了新的$route属性
        // 对路由变化作出响应...
        setTimeout(() => {
          // 得到当前新的id
          const id = this.id * 1
          const detail = allMessageDetils.find(detail => detail.id===id)
          this.detail = detail
        }, 1000);
      }
    }
  }
</script>

<style scoped>

 
</style>
