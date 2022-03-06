<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
  export default{
    name:"Scroll",
    props:{
      pullUpLoad: {
        type:Boolean,
        default:true
      },
      probeType:{
        type:Number,
        default:3
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      const scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      click:true,
      pullUpLoad:this.pullUpLoad
      })
      this.scroll = scroll
      scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
       //上拉加载更多
      scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    }
  }
</script>
<style>

</style>