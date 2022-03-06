<template>
  <div class="home">
    <nav-bar class="bgcolor">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-con :title="['流行','新款','精选']"
        @tabClick="tabClick"
        ref='bbb'
        class="tabcon"
        v-show='tabconShow'
      >
    </tab-con>
    <scroll 
    class="scroll" 
    @scroll="contentScroll"
    @pullingUp='loadMore'
    ref="scroll">
      <Banner :banner='banner' @swiperImageLoad='swiperImageLoad'></Banner>
      <Recommend :recommend='recommend'></Recommend>
      <img src="@/assets/img/9.png" alt="" class="img">
      <tab-con 
        :title="['流行','新款','精选']"
        @tabClick="tabClick"
        ref='aaa'>
      </tab-con>
      <Goods :goods="goods[currentValue].list" :scroll="scroll"></Goods>
    </scroll>
    <div class="goTop" @click='scrollTop' v-show='gotopShow'>
      <img src="@/assets/img/回到顶部.png" alt="">
    </div>


  </div>

</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import TabCon from '@/components/common/TabCon'

import Banner from './children/Banner'
import Recommend from './children/Recommend'
import Goods from './children/Goods'

import scroll from '@/components/common/scroll/Scroll'

import {getHomeData,getHomeGoods} from '@/network/home'
export default {
  name: 'Home',
  components: {
    NavBar,
    TabCon,
    Banner,
    Recommend,
    Goods,
    scroll
  },
  data(){
    return{
      banner:[],
      recommend:[],
      goods:{
        pop:{page:0,list:[]},
        sell:{page:0,list:[]},
        new:{page:0,list:[]},
      },
      type:['pop','sell','new'],
      currentValue:'pop',
      scroll:null,
      offsetTop:0,
      tabconShow:false,
      gotopShow:false

    }
  },
  created(){
    this.getHomeData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  destroyed() {

  },
  methods: {
    tabClick(index){
      switch (index) {
        case 0:
          this.currentValue = 'pop'
          break;
        case 1:
          this.currentValue = 'sell'
          break;
        case 2:
          this.currentValue = 'new'
          break;
      }
      this.$refs.bbb.currentIndex = index
      this.$refs.aaa.currentIndex = index
    },
    getHomeData(){
      getHomeData().then((res) =>{
        this.banner = res.data.data.banner
        this.recommend = res.data.data.recommend
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1;
      getHomeGoods(type,page).then((res) => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page+=1
        
      })
    },
    swiperImageLoad(){
      this.offsetTop = this.$refs.aaa.$el.offsetTop;
    },
    scrollTop(){
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    loadMore(){
      this.getHomeGoods(this.currentValue)
      setTimeout(() => {
        this.$refs.scroll.scroll.finishPullUp()
      }, 2000);
      this.$refs.scroll.scroll.refresh()
    },
    //滚动监听判断回到顶部是否显示
    contentScroll(position){
      this.gotopShow = -position.y>1000 ? true : false
      this.tabconShow = -position.y>this.offsetTop-40
    }
  },
  mounted() {

   },
}
</script>
<style scoped>
@import '../../assets/css/swiper.min.css';
.home{
  height: 100Vh;
}
.bgcolor{
  background-color: #ff8d99;
  color: #ffffff;
}
.scroll{
  height:calc(100vh - 88px);
  overflow: hidden;
}
img{
  width: 100%;
}
/* .wrapper{
  height:calc(100vh - 88px);
  overflow: hidden;
  position: relative;
} */
.content{
  /* position: relative; */
  width: 100%;
  height: 100%;
}
.tabcon{
  position: absolute;
  width: 100%;
  z-index: 10;
}
.goTop{
  width: 40px;
  height: 40px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 60px;
  border-radius: 50%;
}
.goTop img{
  width: 30px;
  height: 30px;
}
</style>
