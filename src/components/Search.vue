<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName"/>
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        searchName: ''
      }
    },

    methods: {
      search () {
        const searchName = this.searchName.trim()
        if (searchName) {
          // 触发异步action search调用
          this.$store.dispatch('search', searchName)

          this.searchName = ''
        }
      }
    }
  }
</script>

<style scoped>

 
</style>
