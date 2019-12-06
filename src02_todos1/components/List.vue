<template>
  <ul class="todo-main">
   <Item v-for="(todo, index) in todos" :key="todo.id" 
      :todo="todo" :deleteTodo="deleteTodo" :index="index" :updateTodo="updateTodo"/>
  </ul>
</template>

<script type="text/ecmascript-6">
  import Item from './Item'
  export default {
    // 声明接收属性: 属性名   ==>组件对象多了一个todos属性
    props: ['todos', 'deleteTodo', 'updateTodo'],

    components: {
      Item
    }
  }
</script>

<style scoped>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  } 
</style>
