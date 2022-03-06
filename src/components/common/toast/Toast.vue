<template>
  <div class="toast" v-if="isshow">
    {{msg}}
  </div>
</template>
<script>
export default{
  name:'Toast',
  props:{
    msg:{
      type:String,
      default(){
        return ''
      }
    },
    isshow:{
      type:Boolean,
      default(){
        return false
      }
    }
    
  },

}
</script>
<style scoped>
  .toast{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.7);
    color: #fff;
    position: fixed;
    padding: 6px 10px;
    border-radius: 2px;
    z-index: 999;
  }
</style>