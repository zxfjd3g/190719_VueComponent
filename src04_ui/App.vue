<template>
  <div>
    <mt-button style="width: 100%" type="danger" @click="test">测试mint-ui</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  export default {
    methods: {
      test () {
        // alert('----')
        Toast({
          message: '提示',
          // position: 'bottom',
          duration: 5000
        })
      }
    }
  }
</script>

<style scoped>

 
</style>
