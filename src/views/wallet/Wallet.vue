<!-- 钱包 -->
<template>
  <div class="wallet">
    <div class="header">
      <van-nav-bar
        title="WALLET"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="account">
      <div class="text">ACCOUNT BALANCE</div>
      <div class="price">₹{{balance}}</div>
    </div>
    <div class="card">
      <div class="tips">AVAILABLE CASH AMOUNT：₹{{balance}}</div>
      <div class="withdraw">
        <div class="sign">₹</div>
        <van-field class="ipt" v-model="money" type="number" placeholder="" />
        <div class="withdraw_all" @click="handleWithdrawAll">WITHDRAW ALL</div>
      </div>
      <div class="btn" @click="handleUserCash">WITHDRAW</div>
    </div>
    <div class="rule_text">
      Withdrawal rules of JCD wallet:<br/>
      1. Monday to Saturday, 10:00-16:00 every day, withdrawals outside this time period will be postponed to the next day. The withdrawal application on Sunday will be postponed to the next Monday.<br/>
      2. Due to the withdrawal restrictions of the banking system, each withdrawal needs to be greater than 500 rupees.<br/>
      3. Withdrawal fee: ₹10 + 5% of the withdrawal amount
      <br/>
      <br/>
      Rewards for false registration accounts will be deducted and the account will be frozen
    </div>
    <Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" :type="type">
      {{message}}
    </Dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Field, Toast } from 'vant';
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Toast);
import Dialog from '@/components/common/dialog/Dialog'

import {
  userCashApi
} from '@/network/mine'
  export default {
    data() {
      return {
        balance: 0,
        money: '',
        isShowDialog: false,
        type: 1,
        message: ''
      };
    },

    components: {
      Dialog
    },

    computed: {},
    created(){
      this.balance = this.$route.query.balance || 0
    },
    mounted() { 
    },

    methods: {
      onClickLeft(){
        this.$router.go(-1)
      },
      handleWithdrawAll(){
        this.money = this.balance
      },
      handleUserCash(){
        if(this.money < 120){
          Toast('CASH AMOUNT IS GREATER THAN 120')
          return
        }
        userCashApi({
          amount: this.money
        }).then(res => {
          if(res.code == 1){
            this.isShowDialog = true
            this.type = 1
            this.message = 'WITHDRAW SUCCESSFULLY'
          }
        })
      },
      handleBtn(){
        this.isShowDialog = false
      },
      doClose(){
        this.isShowDialog = false
      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./wallet.less');
</style>