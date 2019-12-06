<template>
  <div>
    <h2>Blog列表</h2>
    <ul>
      <Blog v-for="(blog, index) in blogs" :key="blog.id" :blog="blog"/>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Blog from './Blog'
  import moduleName from '@/App.vue'
  export default {

    data() {
      return {
        blogs: [
          {id: 1, title: 'Blog1111'},
          {id: 3, title: 'Blog3333'},
          {id: 5, title: 'Blog5555'},
        ]
      }
    },

    components: { // 注册局部组件, 只能在当前组件使用
      Blog
    }
  }
</script>

/* scoped: 限定当前组件的样式只对当前组件有效, 对外部和内部的其它组件无效 */
<style scoped>
  h2 {
    color: red;
  }
</style>
