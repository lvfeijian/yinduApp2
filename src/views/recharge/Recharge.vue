<!--充值页-->
<template>
  <div class="recharge">
    <img class="back_icon" src="../../assets/img/back.svg" alt="" @click="goBack" />
    <div class="account">
      <div class="text">充值金额</div>
      <div class="price">${{money || 0}}</div>
    </div>
    <div class="card">
      <div class="tips">实际到账金额：${{money || 0}}</div>
      <div class="withdraw">
        <div class="sign">$</div>
        <van-field class="ipt" v-model="money" type="number" placeholder="≥15000" />
      </div>
      <div class="btn" @click="investMoney">充值</div>
    </div>
    <div class="rule_text">
      单笔充值金额不能少于15000
    </div>
    <Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" :type="type">
      {{message}}
    </Dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Field, Toast, Notify } from 'vant';
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Notify);
import Dialog from '@/components/common/dialog/Dialog'

import {
  userCashApi,
  getUserInfo
} from '@/network/mine'
  import {
    usePayApi,
    checkPayApi
	} from '@/network/home'
  export default {
    data() {
      return {
        money: '',
        isShowDialog: false,
				type: 1,
				message: '',
				btnText: ''
      };
    },

    components: {
      Dialog
    },

    computed: {},
    created(){
    },
    mounted() { 
      if(window.localStorage.getItem('out_trade_no')){
        checkPayApi({
          order_sn: window.localStorage.getItem('out_trade_no')
        }).then(res => {
          if(res.code == 0){
            if(res.data.pay_status == 1){
							this.isShowDialog = true
							this.message = 'PAYMENT SUCCESSFUL!'
							this.type = 1
							this.btnText = 'ok'
						} else if(res.data.pay_status == 0){
							this.isShowDialog = true
							this.message = 'PAYMENT FAILED!'
							this.type = 2
							this.btnText = 'PLEASE REPAY'
						}
          }
        }).catch(() =>{
          window.localStorage.removeItem('order_sn')
        })
      }
      
    },

    methods: {
      goBack: function() {
				this.$router.go(-1)
      },
      // 充值按钮
      investMoney(){
        if(this.money == 0 || this.money == ''){
          Notify({ type: 'warning', message: '请输入充值金额' });
					return
        }
        if(this.money<15000){
          Notify({ type: 'warning', message: '充值金额不能小于15000' });
					return
        }
        usePayApi({
					total: this.money
				}).then(res => {
          console.log(res);
					if(res.code == 0){
						window.location.href = res.data.url
						window.localStorage.setItem('out_trade_no', res.data.out_trade_no)
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
  @import url('./recharge.less');
</style>