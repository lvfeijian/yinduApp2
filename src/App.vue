<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> -->
     <!-- v-if="!$route.meta.keepAlive" -->
      <router-view></router-view>
    <main-tab-bar v-if="$route.meta.TabbarShow"/>
  </div>
</template>
<script>
import MainTabBar from '@/components/content/MainTabBar'
export default {
  name: 'App',
  components:{
    MainTabBar,
  }
}
</script>

<style>
/* @import url('./assets/css/base.css'); */
*{
  margin: 0px;
  padding: 0px;
}
body{
  margin: 0;
  padding: 0;
  font-family: '微软雅黑';
}
a{
  text-decoration-line: none;
}
.back_icon{
  position: absolute;
  margin-left: 20px;
  margin-top: 16px;
}
/* .v-enter,
{
  opacity: 1;
}
.v-leave-to{
  opacity: 0;
} */
.v-enter-active,.v-leave-active{
  transition:all .3s ease;
}
</style>
