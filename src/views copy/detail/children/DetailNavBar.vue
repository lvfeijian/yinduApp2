<template>
  <div class="detail-navbar">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in topImage">
        <img :src="item" class="bannerImg" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>   
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
  name:"DetailNavBar",
  props:{
    topImage:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    swiper,
    swiperSlide
  },
  created() {
    
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
    }
  },
  methods: {
    
  },
}
</script>
<style scoped>
.detail-navbar{
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.bannerImg{
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>