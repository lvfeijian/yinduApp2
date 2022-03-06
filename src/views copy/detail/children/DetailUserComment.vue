<template>
  <div class="user-comment">
    <div class="comment">
      用户评论
    </div>
    <div v-for='item in detailRate.list' class="detailRate" v-if="detailRate.cRate">
      <div class="userInfo">
        <img :src="item.user.avatar" alt="">
        {{item.user.uname}}
      </div>
      <div class="content">
        {{item.content}}
      </div>
      <div class="time">
        {{item.created | formatDate}}
        {{item.style}}
      </div>
      <div v-if='item.profileUrl'>
        <img :src="item.profileUrl" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name:'DetailUserComment',
  props:{
    detailRate:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  filters: {
   formatDate: function (value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d;
   }
  },
  mounted() {
  },
}
</script>
<style scoped>
.comment{
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.detailRate img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.userInfo{  
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #333;
  margin-top: 20px;
  margin-bottom: 20px;
}
.userInfo img{
  margin-left: 5px;
  margin-right: 10px;
}
.content{
  margin: 20px;
  color: #767676;
  font-size: 16px;
}
.time{
  display: flex;
  margin-left: 20px;
  font-size: 14px;
  color: #767676;
}
</style>