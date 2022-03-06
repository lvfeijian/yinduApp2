<!-- 弹框 -->
<template>
  <div class="dialog" v-if="isShow">
    <div class="dialog_cont">
      <img class="close" @click="doClose" src="./img/close.png" alt="" />
      <div class="logo">
        <img v-if="type == 1" src="./img/success.png" alt="" />
        <img v-else-if="type == 2" src="./img/error.png" alt="" />
        <img v-else src="./img/bad.png" alt="" />
      </div>
      <div class="text"><slot></slot></div>
      <div class="btn" @click="handleBtn">{{btnText}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      btnText:{
        type:[String,Number],
        default(){
          return 'ok'
        }
      },
      type: {
        type: [Number,String],
        default(){
          return 1
        }
      },
      isShow:{
        type:Boolean,
        default(){
          return false
        }
      }
    },
    data() {
      return {
      };
    },

    components: {},

    computed: {},

    mounted() { },

    methods: {
      doClose(){
        this.$emit('close')
      },
      handleBtn(){
        this.$emit('handleBtn')
      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./dialog.less');
</style>