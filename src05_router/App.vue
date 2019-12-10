<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Basic - 01</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 路由链接 -->
          <router-link class="list-group-item" to="/about">About</router-link>
          <router-link class="list-group-item" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 在些显示当前路由组件 -->
            <!-- 当前: 与请求的路径匹配的路由 -->
            <keep-alive exclude="About">  <!-- 对指定的路由组件不做缓存处理 -->
              <router-view msg='abc'></router-view> <!-- 内部会将接收的属性原样传递给管理的路由组件对象 -->
            </keep-alive>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped>


</style>