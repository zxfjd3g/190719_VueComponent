<template>
  <div>
    App
   <p>click {{$store.state.count}} times, count is {{$store.getters.evenOrOdd}}</p>
   <button @click="increment">+</button>
   <button @click="decrement">-</button>
   <button @click="incrementIfOdd">increment if odd</button>
   <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script type="text/ecmascript-6">

  /* 
  store对象
    1. state: 包含所有state数据的对象
    2. getters: 包含所有getter计算属性的对象
    3. dispatch(actionName, data)
    4. commit(mutationName, data)

  */
  export default {
    
    mounted () {
      console.log(this.$store)
    },
    

    methods: {
      increment () {
        this.$store.commit('INCREMENT')
      },

      decrement () {
        this.$store.commit('DECREMENT')
      },

      incrementIfOdd () {
        this.$store.dispatch('incrementIfOdd')
      },

      incrementAsync () {
        this.$store.dispatch('incrementAsync')
      },
    }
  }
</script>

<style scoped>


</style>