<template>
  <div class="DetailRule">
    <div class="params" v-for='(item,index) in DetailRule.tables[0]'>
      <div v-for='value in item'>{{value}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'DetailRule',
    props:{
      DetailRule:{
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

  }
</script>
<style scoped>
  img{
    width: 100vw
  }
  .params{
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    border-top: 1px solid #ddd;
    height: 30px;
    margin-left: 10%;
    margin-right: 10%;
  }



</style>