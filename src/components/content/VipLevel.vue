<template>
  <div class="vip_level" v-if="userInfo">
    <div class="item" v-for="(item,index) in 9" :class="vip_level == item ? 'current': vip_level < item ? 'no_pay': ''" :key="index">
      <div class="level_bg"></div>
      <div class="circle"></div>
      <p class="text">vip{{item}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo:null,
        vip_level: null, // 当前是会员几
      };
    },

    components: {},

    computed: {},
    created(){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(this.userInfo.is_vip == 1){
        this.vip_level = this.userInfo.vip_level.replace('VIP','')
      } else {
        this.vip_level = null
      }
    },
    mounted() {
    },

    methods: {}
  }

</script>
<style lang='less' scoped>
  .vip_level{
    height: 48px;
    width: calc(100vw - 20px);
    margin: auto;
    display: flex;
    color: #262626;
    font-size: 10px;
    justify-content: space-between;
    .item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      &.current{
        .level_bg{
          display: block;
          background: url('../../assets/img/current_icon.svg') 100% 100% no-repeat;
          background-size: cover;
          background-position: center;
        }
        
      }
      &.no_pay{
        .circle{
          background: #E3E3E3;
          &:after{
            background: #E3E3E3;
          }
        }
      }
      .level_bg{
        display: none;
        width: 48px;
        height:48px;
        position: absolute;
      }
      &:first-child{
        .circle{
          &:after{
            display: none;
          }
        }
      }
      .circle{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: linear-gradient(180deg, #FFB749 0%, #FF9900 100%);
        position: relative;
        margin-top: 10px;
        &:after{
          width: 41px;
          height: 1px;
          background: #FFA927;
          margin-top: 4px;
          content: '';
          position: absolute;
          right: 0px;
        }
      }
      .text{
        z-index: 5;
      }
    }
    
  }
</style>