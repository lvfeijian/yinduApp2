<template>
  <div id="DetailInfo">
    <div class="desc">{{detailInfo.itemInfo.title}}</div>
    <div class="price">
      <div class="low-price">￥{{detailInfo.itemInfo.lowNowPrice}}</div>
      <div class="now-price">￥{{detailInfo.itemInfo.lowPrice}}</div>
      <div 
      :style="{backgroundColor:detailInfo.itemInfo.discountBgColor}"
      class="discountDesc">
        {{detailInfo.itemInfo.discountDesc}}
      </div>
    </div>
    <div class="introduce" >
      <div v-for='item in detailInfo.columns' class="introduceInfo">{{item}}</div>
    </div>
    <div class="serveices">
      <div v-for='(item,index) of detailInfo.shopInfo.services' v-show='index<3' class="item">
        <img :src="item.icon" alt="">
        {{item.name}}
      </div>
    </div>
    
    
  </div>
</template>
<script>
  export default{
    name:'DetailInfo',
    props: {
      detailInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    

  }
</script>
<style scoped>
  .desc{
    font-size: 16px;
    padding: 15px 10px;
    overflow:hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
  }
  .introduce{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: #767676;
  }
.price{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.low-price{
  font-size: 32px;
  color: #fa1512;
  margin-right: 10px;
}
.now-price{
  font-size: 16px;
  color: #333;
  opacity: 0.8;
  margin-right: 10px;
  position: relative;
  top: 5px;
  text-decoration-line: line-through;
}
.discountDesc{
  padding: 0px 5px;
  border-radius: 15%;
  line-height: 20px;
  color: #fff;
  position: relative;
  top: 5px;
}
.serveices{
  display: flex;
  font-size: 15px;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.serveices .item{
  display: flex;
  align-items: center;
}

.serveices img{
  display: block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
</style>