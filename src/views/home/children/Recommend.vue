<template>
  <div class="recommend">
    <div v-for='item in recommend.list' class="big">
      <a :href='item.link' class="item">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name:'recommend',
  props: {
    recommend:{}
  }
}
</script>
<style>
.recommend{
  display: flex;
  text-align: center;
  overflow: hidden;
  flex: 1;
  justify-content:space-evenly;
  border-bottom: 10px solid #eeedef;
  width: 100%;
  height: 150px;
}
.item{
  font-size: 12px;
  color: #111111;
}
.item img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  margin-top: 10px;
}

</style>