<!-- 银行卡 -->
<template>
  <div class="backcard">
    <div class="header">
      <van-nav-bar
        :title="$t('bankcard.title')"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <input type="text" v-model="real_name" :placeholder="$t('bankcard.real_name')">
      <input type="text" v-model="bank_name" :placeholder="$t('bankcard.bank_name')">
      <input type="number" v-model="account_no" :placeholder="$t('bankcard.account_no')">
      <input type="text" v-model="ifsc_code" :placeholder="$t('bankcard.ifsc_code')">
      <input type="number" v-model="phone" :placeholder="$t('bankcard.phone')">
      <input type="text" v-model="email" :placeholder="$t('bankcard.email')">
    </div>
    <div class="ok" @click="submit">{{$t('bankcard.confirm')}}</div>
    <!-- <toast msg="msg" isshow="true"></toast> -->
    <Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" :type="type">
      {{message}}
    </Dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Notify } from 'vant';
Vue.use(NavBar);
Vue.use(Notify);
import Dialog from '@/components/common/dialog/Dialog'
import {
  bindBankCard
} from '@/network/mine'
  export default {
    data() {
      return {
        real_name: null,
        bank_name: null,
        account_no: null,
        ifsc_code: null,
        phone: null,
        email: null,
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
      
    },
    mounted() {
      // this.$message.success('登录成功')
    },

    methods: {
      submit(){
        bindBankCard({
          real_name: this.real_name,
          bank_name: this.bank_name,
          account_no: this.account_no,
          ifsc_code: this.ifsc_code,
          phone: this.phone,
          email: this.email
        }).then(res => {
          if(res.code == 1){
            this.type = 1
            this.isShowDialog = true
            this.message = res.msg || this.$t('bankcard.bind_success')
          }
        })
      },
      doClose(){
        this.isShowDialog = false
        this.$router.push('mine')
      },
      handleBtn(){
        this.isShowDialog = false
        this.$router.push('card')
      },
      onClickLeft(){
        this.$router.go(-1)
      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./bankCard.less');
</style>