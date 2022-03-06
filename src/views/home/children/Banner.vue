<template>
  <div id="app">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in banner.list">
        <img :src="item.image" class="bannerImg" @load='swiperImageLoad'/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>   
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name:'App',
  components:{
    swiper,
    swiperSlide
  },
  props:{
    banner:{}
  },
  data(){
    return{
      swiperOption: {
        pagination:{ 
          el:'.swiper-pagination',
          clickable :true,
        },
        autoplay: {
          delay:3000,
          disableOnInteraction:false,
          autoplayStopOnLastBooleantrue:false
        },
        loop:true,
      },
      isLoad:false
    }
  },
  methods: {
    swiperImageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },


   
}
</script>
<style>
#app{
  width: 100%;
  height: 200px;
}

.bannerImg{
  width:100%;
  height: 200px;
}
</style>
