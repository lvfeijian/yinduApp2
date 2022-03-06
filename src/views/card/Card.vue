<!-- 银行卡2 -->
<template>
  <div class="card">
    <div class="header">
      <van-nav-bar
        title="BANK CARD"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <img class="bg" src="../../assets/img/bg-black.png" alt="" />
    <div class="card_info" v-if="bankCardInfo">
      <div style="height:0px;">&nbsp;</div>
      <img class="card_img" src="../../assets/img/card/card.png" alt="" />
      <div class="bank_name">{{bankCardInfo.bank_name}}</div>
      <div class="bank_number">****  ****  ****  {{bankCardInfo.account_no.slice(-4)}}</div>
      <div class="change" @click="handleChange">CHANGE</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Notify } from 'vant';
Vue.use(NavBar);
Vue.use(Notify);
import {
  getBankCard
} from '@/network/mine'
  export default {
    data() {
      return {
        bankCardInfo: null
      };
    },

    components: {
    },

    computed: {},
    created(){
      getBankCard().then(res => {
        if(res.code == 1){
          this.bankCardInfo = res.data
        }
      })
    },
    mounted() {
    },

    methods: {
      onClickLeft(){
        this.$router.push('/mine')
      },
      handleChange(){
        this.$router.push('/bankCard')
      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./card.less');
</style>