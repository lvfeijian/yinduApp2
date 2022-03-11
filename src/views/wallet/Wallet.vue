<!-- 钱包 -->
<template>
  <div class="wallet">
    <!-- <div class="header">
      <van-nav-bar
        title="WALLET"
        left-arrow
        @click-left="onClickLeft"
      />
    </div> -->
    <img class="back_icon" src="../../assets/img/back.svg" alt="" @click="goBack" />
    <div class="account">
      <div class="text">{{$t('account_number')}}</div>
      <div class="price">${{total_amount}}</div>
    </div>
    <div class="card">
      <div class="tips">{{$t('wallet.withdrawal_balance')}}：${{balance}}</div>
      <div class="withdraw">
        <div class="sign">$</div>
        <van-field class="ipt" v-model="money" type="number" placeholder="" />
        <div class="withdraw_all" @click="handleWithdrawAll">{{$t('withdrawal_all')}}</div>
      </div>
      <div class="btn" @click="handleUserCash">{{$t('my.withdrawal')}}</div>
    </div>
    <div class="rule_text" v-html="$t('rules')">
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
  userCashApi,
  getUserInfo
} from '@/network/mine'
  export default {
    data() {
      return {
        balance: 0,
        total_amount: 0,
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
      getUserInfo().then(res => {
				if(res.code == 1){
          this.userInfo = res.data
          this.balance = this.userInfo.balance || 0
          this.total_amount = this.userInfo.total_amount
          console.log(this.userInfo.balance,this.userInfo.total_amount);
          
        }
      })
    },
    mounted() { 
    },

    methods: {
      goBack: function() {
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
            this.message = this.$t('wallet.Withdrawal_success')
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