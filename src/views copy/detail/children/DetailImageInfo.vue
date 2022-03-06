<template>
  <div class="DetailImageInfo">
    <img 
    v-for='item in detailImageInfo[0].list' 
    :src="item" 
    @load='imgLoad'>
  </div>
</template>
<script>
  export default {
    name:'DetailImageInfo',
    props:{
      detailImageInfo:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        counter:0,
      }
    },
    methods: {
      imgLoad(){
        // if(++this.counter == this.detailImageInfo[0].list.length){
          this.$emit('imageLoad')
        // }
      }
    },
    mounted() {
      console.log(this.detailImageInfo[0].list );
    },
  }
</script>
<style scoped>
  img{
    width: 100vw
  }
</style>