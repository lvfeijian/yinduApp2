<template>
  <div class="DetailBottom">
    <div class="server">
      <img src="@/assets/img/客服.png" alt="">
      <div>客服</div>
    </div>
    <div class="shop">
      <img src="@/assets/img/店铺.png" alt="">
      <div>店铺</div>
    </div>
    <div class="collection">
      <img src="@/assets/img/收藏.png" alt="">
      <div>收藏</div>
    </div>
    <div class="addCart" @click='addToCart'>加入购物车</div>
    <div class="purchase">购买</div>
  </div>
</template>
<script>
  export default {
    name:'DetailBottom',
    methods: {
      addToCart(){
        this.$emit('addToCart')
      }
    },
  }
</script>
<style>
.DetailBottom{
  display: flex;
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: -2px;
  background-color: #fff;
}
.DetailBottom .server,.DetailBottom .shop,.DetailBottom .collection{
  width: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.DetailBottom .server img{
  width: 27px;
  height: 27px;
}
.DetailBottom .shop img{
  width: 27px;
  height: 27px;
}
.DetailBottom .collection img{
  width: 27px;
  height: 27px;
}
.DetailBottom .addCart{
  padding: 0 10px;
  line-height: 49px;
  background: #0f0f;
}
.DetailBottom .purchase{
  flex: 1;
  text-align: center;
  line-height: 49px;
  background: #767676;
  color: #fff;
}
</style>