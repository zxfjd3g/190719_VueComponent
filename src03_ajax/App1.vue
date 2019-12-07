<template>
  <div>
    <p v-if="!repoName">loading...</p>
    <p v-else>
      most star repo is 
      <a :href="repoUrl">{{repoName}}</a>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data () {
      return {
        repoName: '',
        repoUrl: ''
      }
    },

    mounted () {
      // 利用vue-resource发送ajax请求获取数据
      // this.$http.get(`https://api.github.com/search/repositories2?q=j&sort=stars`)
      //   .then(response => {
      //     const result = response.data
      //     const {name, html_url} = result.items[0]
      //     this.repoName = name
      //     this.repoUrl = html_url
      //   })
      //   .catch(error => {
      //     alert('请求出错了')
      //   })

      // 利用axios发送ajax请求获取数据
      axios.get(`https://api.github.com/search/repositories`, {
        params: {
          q: 'j',
          sort: 'stars'
        }
      })
        .then(response => {
          const result = response.data
          const {name, html_url} = result.items[0]
          this.repoName = name
          this.repoUrl = html_url
        })
        .catch(error => {
          alert('请求出错了')
        })

    }
  }
</script>

<style scoped>

 
</style>
