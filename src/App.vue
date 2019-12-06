<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :deleteTodo="deleteTodo"/>
      <Footer :todos="todos" :clearCompletedTodos="clearCompletedTodos" :checkAll="checkAll"/>
    </div>
  </div>
</template>


<script>
  import Header from '@/components/Header.vue'
  import List from '@/components/List.vue'
  import Footer from '@/components/Footer.vue'
  export default { // 配置对象

    data () {
      return {
        todos: [
          {id: 1, title: 'A', completed: false},
          {id: 2, title: 'B', completed: true},
          {id: 3, title: 'C', completed: false}
        ]
      }
    },

    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      clearCompletedTodos () {
        this.todos = this.todos.filter((todo, index) => !todo.completed)
      },

      checkAll (isCheckAll) {
        this.todos.forEach(todo => todo.completed = isCheckAll)
      }
    },

    components: {
      Header,
      List,
      Footer
    }
  }
</script>

<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>