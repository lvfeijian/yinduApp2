<template>
  <div class="tabcon">
    <div class="tabcon-title" 
      v-for='(item,index) in title'
      :class="{active:currentIndex==index}"
      @click='btnclick(index)'
    >
      <span :key="item">{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabcon',
  props: {
    title: Array
  },
  data(){
    return{
      currentIndex: 0
    }
  },
  methods: {
    btnclick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  },

}
</script>
<style scoped>
.tabcon{
  /* position: sticky;
  top: 100px; */
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
  color: #000333;
}
.tabcon .tabcon-title{
  flex: 1;
}
.tabcon .tabcon-title span{
  padding: 6px;
 
}
.active span{
  border-bottom: 3px solid #ff5453;
  color: #ff5453;
}
</style>