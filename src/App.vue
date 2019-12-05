<template>
  <div>
    <h2>{{title}}</h2>

    <Blogs/>
  </div>
</template>


<script>
  import Blogs from './components/Blogs'
  export default { // 配置对象
    data() {
      return {
        title: 'App组件2222'
      }
    },

    components: {
      Blogs
    }
  }
</script>

<style scoped>
  
</style>