<!--我的-->
<template>
  <div class="mine">
    <div class="bg">
      <div class="user" v-if="userInfo">
        <div class="id">ID:{{userInfo.code}}</div>
        <div class="btn_copy" @click="handleCopy">{{$t('my.copy')}}</div>
      </div>
    </div>
    <div class="head_image">
      <img v-if="userInfo" :src="userInfo.logo" alt="" />
    </div>
    <div class="name" v-if="userInfo">
      {{userInfo.name == '' ? userInfo.phone.replace(userInfo.phone.substring(3,7), "****") : userInfo.name}}
      <!-- <img src="../../assets/img/mine/edit.svg" alt="" /> -->
    </div>
    
    <div class="balance">
      <div class="text">
        <img v-if="vip_level" :src='"../../assets/img/memberCenter/" + vip_level + ".png"' alt="" />
        <img v-else src="../../assets/img/memberCenter/1-1.png" alt="" />
        <p>{{$t('my.available_balance')}}</p>
      </div>
      <div class="money" v-if="userInfo">${{userInfo.total_amount}}</div>
    </div>
    <div class="available_balance" v-if="userInfo">
      <p>{{$t('wallet.withdrawal_balance')}}：${{userInfo.balance}}</p >
      <div class="btn" @click="golink('wallet')">{{$t('my.withdrawal')}}</div>
    </div>
    
    <div class="navbar" @click="golink('memberCenter')">
      <div class="navbar_left">
        {{$t('my.upgrade_member')}}
      </div>
    </div>
    <div class="list">
      <div class="list_item" @click="golink('announcement')">
        <img class="icon" src="../../assets/img/mine/0.png" alt="" />
        <div class="list_name">{{$t('my.active_center')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('invite')">
        <img class="icon" src="../../assets/img/mine/1.png" alt="" />
        <div class="list_name">{{$t('my.invite_friend')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('team')">
        <img class="icon" src="../../assets/img/mine/2.png" alt="" />
        <div class="list_name">{{$t('my.team_manage')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('memberCenter')">
        <img class="icon" src="../../assets/img/mine/3.png" alt="" />
        <div class="list_name">{{$t('my.upgrade_member')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('record')">
        <img class="icon" src="../../assets/img/mine/10.png" alt="" />
        <div class="list_name">{{$t('withdrawal_record')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('bankCard')">
        <img class="icon" src="../../assets/img/mine/4.png" alt="" />
        <div class="list_name">{{$t('my.back_card')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('modifyPassword')">
        <img class="icon" src="../../assets/img/mine/5.png" alt="" />
        <div class="list_name">{{$t('my.change_pwd')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('introduce')">
        <img class="icon" src="../../assets/img/mine/6.png" alt="" />
        <div class="list_name">{{$t('my.platform_intro')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="goService1">
        <img class="icon" src="../../assets/img/mine/8.png" alt="" />
        <div class="list_name">{{$t('my.online_service')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('appDownload')">
        <img class="icon" src="../../assets/img/mine/7.png" alt="" />
        <div class="list_name">{{$t('my.app_download')}}</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      
      
      <!-- <div class="list_item" @click="golink('bankCard')">
        <img class="icon" src="../../assets/img/mine/yinhangqia.png" alt="" />
        <div class="list_name">BANK CARD</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div>
      <div class="list_item" @click="golink('aboutme')">
        <img class="icon" src="../../assets/img/mine/bangzhuzhongxin.png" alt="" />
        <div class="list_name">ABOUT US</div>
        <img class="jiantou" src="../../assets/img/mine/CombinedShape.png" alt="" />
      </div> -->
    </div>
    <div class="exit" @click="exitSystem">
      {{$t('my.exit')}}
    </div>
    <div class="service" @click="goService2">
      <img src="@/assets/img/mine/kefu4.png" alt="" />
    </div>
    <Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" type="1">
      {{$t('my.copy_success')}}
    </Dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
	import Dialog from '@/components/common/dialog/Dialog'
	import { Toast } from 'vant';
	Vue.use(Toast);

  import {
    getUserInfo,
    getBankCard,
    getChatUrl
  } from '@/network/mine'
  export default {
    data() {
      return {
        userInfo: null,
        bankCardInfo: null,
				isShowDialog: false,
        chatUrl: null,
        vip_level: null
      };
    },

    components: {
      Dialog
    },

    computed: {},
    created(){
      this.handleUserInfo()
      getChatUrl().then(res => {
        if(res.code == 1){
          this.chatUrl = res.data
        }
      })
      getBankCard().then(res => {
        if(res.code == 1){
          this.bankCardInfo = res.data
        }
      })
    },
    mounted() {
    },

    methods: {
      handleUserInfo(){
        getUserInfo().then(res => {
          if(res.code == 1){
            this.userInfo = res.data
            if(this.userInfo.is_vip == 1){
              if(this.userInfo.vip_level == '普通会员'){
                this.vip_level = 1
              } else {
                this.vip_level = this.userInfo.vip_level.replace('AI','')
              }
            } else {
              this.vip_level = null
            }
          }
        })
      },
      golink(url){
        let path = {
          path: url,
        }
        if(url == 'team'){
          path.query = {
            direct_push: this.userInfo.direct_push,
            total_people: this.userInfo.total_people
          }
        }
        if(url == 'profit'){
          path.query = {
            task_earnings: this.userInfo.task_earnings
          }
        }
        if(url == 'wallet'){
          // path.query = {
          //   balance: this.userInfo.balance
          // }
        }
        if(url == 'bankCard'){
          // 是null或者是数组都跳转到backCrad
          if(this.bankCardInfo == null || Array.isArray(this.bankCardInfo)){
            return this.$router.push('/bankCard')
          } else {
            return this.$router.push('/card')
          }
        }
        // 关于我们
        // if(url == 'about'){
        //   path.query = {
        //     about: this.userInfo.about
        //   }
        // }
        this.$router.push(path)
      },
      goRouter(){
        // 是null或者是数组都跳转到backCrad
        if(this.bankCardInfo == null || Array.isArray(this.bankCardInfo)){
          this.$router.push('/bankCard')
        } else {
          this.$router.push('/card')
        }
      },
      exitSystem(){
        window.localStorage.removeItem("token");
        localStorage.removeItem('userInfo')
        localStorage.removeItem('remindShowTime')
        this.$router.push('login')
      },
      handleCopy(){
        this.copy(this.userInfo.code)
      },
      copy(data) {
        let OrderNumber = data;
        let newInput = document.createElement("input");
        newInput.value = OrderNumber;
        document.body.appendChild(newInput);
        newInput.select();
        document.execCommand("Copy");
        newInput.remove();
        this.isShowDialog = true
      },
      doClose(){
        this.isShowDialog = false
      },
      handleBtn(){
        this.isShowDialog = false
      },
      goService1(){
        if(this.chatUrl.url1 == ''){
          Toast(this.$t('no_service'));
          return
        }
        window.location.href = this.chatUrl.url1
      },
      goService2(){
        if(this.chatUrl.url2 == ''){
          Toast(this.$t('no_service'));
          return
        }
        window.location.href = this.chatUrl.url2
      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./mine.less');
</style>