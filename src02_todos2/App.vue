<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--<Header @addTodo="addTodo"/> --><!-- 给当前Header对象绑定自定义事件监听 -->
      <Header ref="header"/>
      <List :todos="todos"/>
      <Footer>
        <!-- 在父组件中解析好了后传入的 -->
        <input type="checkbox" v-model="isCheckAll" slot="left"/>

        <span slot="middle">
          <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span>

        <button class="btn btn-danger" v-show="completeSize>0" @click="clearCompletedTodos" slot="right">清除已完成任务</button> 
      </Footer>
    </div>
  </div>
</template>


<script>
  import PubSub from 'pubsub-js'
  import Header from '@/components/Header.vue'
  import List from '@/components/List.vue'
  import Footer from '@/components/Footer.vue'
  import { saveTodos, readTodos } from '@/utils/storageUtils.js'
  export default { // 配置对象

    data () {
      return {
        todos: []
      }
    },

    computed: {
      completeSize () {
        return this.todos.reduce((preTotal, todo, index) => preTotal + (todo.completed ? 1 : 0), 0)
      },

      isCheckAll: {
        get () {
          return this.todos.length === this.completeSize && this.completeSize>0 // 读属性值就会自动调用对应的getter方法
        },
        set (value) { // value代表当前勾选状态的boolean值
          this.checkAll(value)
        }
      } 
    },

    mounted () {
      // 订阅消息
      PubSub.subscribe('updateTodo', (msg, {todo, isCheck}) => {
        this.updateTodo(todo, isCheck)
      })

      // 给<Header/>绑定事件监听
      this.$refs.header.$on('addTodo', this.addTodo)

      // 通过xxx来绑定事件监听
      this.$globalEventBus.$on('deleteTodo', this.deleteTodo)

      // 模拟异步读取数据
      setTimeout(() => {
        // 读取local中保存的todos, 更新数据
        this.todos = readTodos()
      }, 1000);

    },


    beforeDestroy () { // 在组件销毁前, 移除自定义监听
      this.$refs.header.$off('addTodo')
      this.$globalEventBus.$off('deleteTodo')
    },


    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      deleteTodo (index) {
        console.log('deleteTodo()', index)
        this.todos.splice(index, 1)
      },

      clearCompletedTodos () {
        this.todos = this.todos.filter((todo, index) => !todo.completed)
      },

      checkAll (isCheckAll) {
        this.todos.forEach(todo => todo.completed = isCheckAll)
      },

      updateTodo (todo, isCheck) {
        todo.completed = isCheck
      }
    },
    watch: {
      todos: {
        deep: true, // 深度监视(本身和内部所有层次的数据)
        /* handler (value) { // 最新的todos值
          // 将todos保存到local中(以json形式)
          // localStorage.setItem('todos_key', JSON.stringify(value))
          saveTodos(value)
        } */
        handler: saveTodos
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