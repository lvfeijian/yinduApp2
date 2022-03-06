<template>
  <div class="DetailParams">
    <div class="params" v-for='item in DetailParams'>
      <div class="key">{{item.key}}</div>
      <div class="value">{{item.value}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'DetailParams',
    props:{
      DetailParams:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{

      }
    },

  }
</script>
<style scoped>
  img{
    width: 100vw
  }
  .params{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    color: #767676;
    border-top: 1px solid #ccc;
    height: 40px;
  }
.key{
  margin-left: 20px;
}
.value{
  width: 60%;
}


</style>