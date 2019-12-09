<template>
    <div>
      <ul>
      <li v-for="(m, index) in messages" :key="m.id">
        <!-- <router-link :to="'/home/message/detail/' + m.id">{{m.title}}</router-link> -->
        <router-link :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
      </li>
    </ul>

    <hr>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        messages: []
      }
    },

    mounted () {
      // 模拟发送异步ajax请求获取消息列表数据
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 3, title: 'message003'},
          {id: 4, title: 'message004'},
        ]
        this.messages = messages

      }, 1000);
    }
  }
</script>

<style scoped>

 
</style>
