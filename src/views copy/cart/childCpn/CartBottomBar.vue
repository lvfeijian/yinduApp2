<template>
  <div class="CartBottomBar">
    <div class="check">
      <div class="checked" :class="{Select:isSelectAll}" @click='checked'></div> 全选
    </div>
    <div class="priceNum">合计：{{totalPrice}}</div>
    <div class="calc">去计算({{this.$store.state.cartList.length}})</div>
  </div>
</template>
<script>
  export default{
    name:'CartBottomBar',
    props:{

    },
    methods: {
      checked(){
        this.$store.state.cartList.forEach(item => item.checked=!this.isSelectAll)
      }
    },
    computed: {
      totalPrice(){
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return item.price*1*item.count+preValue
        },0).toFixed(2)
      },
      isSelectAll(){
        if(this.$store.state.cartList.length==0){
          return false
        }
        return this.$store.state.cartList.filter(item => item.checked).length == this.$store.state.cartList.length
      }
    },
  }
</script>
<style scoped>
.CartBottomBar{
  width: 100%;
  height: 40px;
  background-color: #ffe;
  display: flex;
  align-items: center;
  color: #767676;
}
.check{
  display: flex;
  width: 70px;
  justify-content: center;
  align-items: center;
}
.checked{
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
.Select{
  border: 1px solid #f00;
  background-color: #f00;
}
.priceNum{
  flex: 1;
}
.calc{
  text-align: center;
  padding: 0 15px;
  background-color:saddlebrown;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
}
</style>