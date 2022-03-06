<template>
  <div id="detail">
    <detail-head class="detail-head" @titleClick='titleClick' ref='detailhead'></detail-head>
    <scroll class="scroll" ref='scroll' @scroll='scroll'>
      <DetailNavBar :topImage="topImage"></DetailNavBar>
      <DetailInfo :detailInfo="detailInfo"></DetailInfo>
      <DetailShopInfo :shopInfo='shopInfo'></DetailShopInfo>
      <DetailImageInfo :detailImageInfo="detailImageInfo" @imageLoad='imageLoad'></DetailImageInfo>
      <DetailParams ref='params' :DetailParams='DetailParams'></DetailParams>
      <DetailRule :DetailRule='DetailRule'></DetailRule>
      <DetailUserComment ref="comments" :detailRate='detailRate'></DetailUserComment>
      <DetailLoveImage ref="loveImage" :goods='recommend'></DetailLoveImage>
    </scroll>
    <div class="goTop" @click='scrollTop' v-show='gotopShow'>
      <img src="@/assets/img/回到顶部.png" alt="">
    </div>
    <DetailBottom @addToCart='addToCart'></DetailBottom>
    <toast :msg="msg" :isshow='isshow'></toast>
  </div>

</template>
<script>
  import DetailHead from './children/DetailHead'
  import DetailNavBar from './children/DetailNavBar'
  import DetailInfo from './children/DetailInfo'
  import {getDetail,getRecommend} from '@/network/detail.js'
  import scroll from '@/components/common/scroll/Scroll'
  import DetailShopInfo from './children/DetailShopInfo'
  import DetailImageInfo from './children/DetailImageInfo'
  import DetailParams from './children/DetailParams'
  import DetailRule from './children/DetailRule'
  import DetailUserComment from './children/DetailUserComment'
  import DetailLoveImage from './children/DetailLoveImage'
  import DetailBottom from './children/DetailBottom'
  import toast from '@/components/common/toast/Toast'
  
  export default{
    name:'Detail',
    components:{
      DetailHead,
      DetailNavBar,
      DetailInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailParams,
      DetailRule,
      DetailUserComment,
      scroll,
      DetailLoveImage,
      DetailBottom,
      toast

    },
    data(){
      return{
        iid:null,
        topImage:[],
        detailInfo:{},
        shopInfo:{},
        detailImageInfo:[],
        detailRate:{},
        recommend:[],
        themeTop:[],
        gotopShow:false,
        msg:'',
        isshow:false,
        DetailParams:[],
        DetailRule:{}
      }
    },
    created() {
      //获取iid
      this.iid = this.$route.params.iid//传参
      getDetail(this.iid).then((res) => {
        this.topImage = res.data.result.itemInfo.topImages
        this.detailInfo = res.data.result
        this.shopInfo = res.data.result.shopInfo
        this.detailImageInfo = res.data.result.detailInfo.detailImage
        this.DetailParams = res.data.result.itemParams.info.set
        this.DetailRule = res.data.result.itemParams.rule
        this.detailRate = res.data.result.rate
      })
      getRecommend().then(res => {
        this.recommend = res.data.data.list
      })

    },
    methods: {
      imageLoad(){
        this.$refs.scroll.scroll.refresh()
        this.themeTop = []
        this.themeTop.push(0)
        this.themeTop.push(this.$refs.params.$el.offsetTop)
        this.themeTop.push(this.$refs.comments.$el.offsetTop)
        this.themeTop.push(this.$refs.loveImage.$el.offsetTop)
      },
      titleClick(index){
        this.$refs.scroll.scroll.scrollTo(0,-this.themeTop[index]-5,500)
      },
      scroll(position){
        for(let i in this.themeTop){
          if(-position.y > this.themeTop[i*1] && -position.y < this.themeTop[i*1+1] || (-position.y>=this.themeTop[i*1])){
            this.$refs.detailhead.currentIndex = i
          }
        }
        this.gotopShow = -position.y>1000 ? true : false
      },
      scrollTop(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      addToCart(){
        const product={}
        product.image = this.topImage[0]
        product.title = this.detailInfo.itemInfo.title
        product.price = this.detailInfo.itemInfo.lowNowPrice
        product.iid = this.iid
        this.$store.commit('addCart',product)
        this.isshow=true
        this.msg='成功加入购物车'
        setTimeout(() => {
          this.isshow=false
          this.msg=''
        },2000)
      }
    },
    mounted(){
      
    },
    updated(){
    
    }
    
 
  }
</script>
<style scoped>
.detail-head{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
#detail{
  height:100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;
}
.scroll{
  height: calc(100vh - 95px);
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