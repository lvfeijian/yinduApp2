<template>
  <div class="DetailShopInfo">
    <div class="head">
      <img :src="shopInfo.shopLogo" alt="" >
      {{shopInfo.name}}
    </div>
    <div class="content">
      <div class="left">
        <div class="goods">
          {{shopInfo.cGoods}}
          <div class="text">全部宝贝</div>
        </div>
        <div class="sells">
          {{shopInfo.cSells}}
          <div class="text">总销量</div>
        </div>
      </div>
      <div class="shopInfo-score">
        <div v-for='item in shopInfo.score' class="shopInfo-score-item">
          <div class="name">{{item.name}}  </div>
          <div class="score">{{item.score}}</div>
          <div :class="item.isBetter?'green':'red'">{{item.isBetter ? '高':'低'}}</div>
        </div>
      </div>
    </div>
    <div class="goshop">进店逛逛</div>
    

  </div>
</template>
<script>
  export default{
    name:'DetailShopInfo',
    props:{
      shopInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return{

      }
    },
    created() {
      
    },
    mounted() {
      
    }
  }
</script>
<style scoped>
  .DetailShopInfo{
    border-top: 5px solid #eee;
  }
  .head{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
  }
  .head img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #ddd;
    margin: 0 10px;
  }
.content{
  display: flex;
  color: #333;
}
.shopInfo-score{
  width: 48%;
  height: 100px;
  margin-right: 2%;
}
.shopInfo-score-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
}
.shopInfo-score-item .green{
  color: #fff;
  background-color: green;
}
.shopInfo-score-item .red{
  color: #fff;
  background-color: red;
}
.left{
  width: 50%;
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
}
.goods,.sells{
  width: 70px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 20px;
  box-sizing: border-box;
  text-align: left;
}
.goods .text,.sells .text{
  font-size: 12px;
}
.sells{
  border-right: 1px solid #eee;
}
.goshop{
  width: 150px;
  height: 30px;
  line-height: 30px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  margin: auto;
  color: #666;
  border-right: 2px;
}
</style>