<template>
  <div>
    <nav-bar>
      <div slot="left" @click='leftClick' class="go-back">
        <img src="@/assets/img/返回.png" alt="" class="img">
      </div>
      <div slot="center" class="center">
        <div v-for='(item,index) in title' :key='index'>
          <div :class="{active: index==currentIndex}" @click='headClick(index)'>{{item}}</div>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  export default{
    components:{
      NavBar
    },
    data() {
      return {
        title:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods: {
      headClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      leftClick(){
        this.$router.go(-1)
      }
    },
  }
</script>
<style scoped>
.center{
  display: flex;
  justify-content: space-evenly;
}
.active{
  color: #767676;
}
.img{
  width: 20px;
  height: 20px;
}
.go-back{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>