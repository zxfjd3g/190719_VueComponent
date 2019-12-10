<template>
  <div>
    <h2>About</h2>
    <input type="text">
    <p>{{msg}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'About', // 组件的标识名称 
    props: ['msg']
  }
</script>

<style scoped>

 
</style>
