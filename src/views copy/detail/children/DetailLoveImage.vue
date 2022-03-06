<template>
  <div class="all">
    <div v-for='item of goods' class="block">
      <img :src="item.image" alt="" @load='load' >
      <p class="tit">{{item.title}}</p>
    </div>
  </div>
</template>
<script>

export default {
props:{
  goods:{
    type:Array,
    default(){
      return []
    }
  },
  scroll:Object,
},
methods: {
  load(){
    this.scroll && this.scroll.refresh()
  },


},
mounted() {
  
},  



}
</script>
<style>

.all{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 44px;
}
.block{
    width: 48%;
    height: auto
}
img{
    width: 100%;
}
.tit{
    width: 100%;
    height: auto;
    overflow:hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}
</style>
