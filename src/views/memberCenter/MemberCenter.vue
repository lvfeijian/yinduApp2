<!-- 会员中心 -->
<template>
  <div class="member_center" v-if="userInfo">
    <img class="back_icon" src="../../assets/img/back.svg" alt="" @click="goBack" />
    <div class="header">
      <div class="header_text">{{$t('memberCenter.more_money')}}</div>
    </div>
    <section>
      <div class="left_text">
        <p class="text">{{$t('memberCenter.member_level')}}</p>
        <p class="text2">{{$t('memberCenter.next_level')}} {{userInfo.vip_next_data}}</p>
      </div>
      <img v-if="vip_level" class="img" :src='"../../assets/img/memberCenter/"+ vip_level + ".png"' alt="" />
      <img v-else class="img" src="../../assets/img/memberCenter/1-1.png" alt="" />
    </section>
    <div class="balance">
      <div class="total">{{$t('memberCenter.overall_balance')}}：<span>{{userInfo.total_amount}}</span></div>
      <div class="btn" @click="golink('recharge')">{{$t('memberCenter.recharge')}}</div>
    </div>
    <div class="title">{{$t('memberCenter.member_intro')}}</div>
    <div class="member_list">
      <div class="item" v-for="(item,index) in vipListData.slice(0,9)" :class="vip_level == index+1 ? 'current': vip_level<index+1 ? 'active' : ''">
        <img :src='"../../assets/img/memberCenter/" + Number(index+1) + (vip_level<index+1 ? "-1": "") +".png"' alt="" />
        <p class="money">${{item.satisfy.split('.')[0]}}</p>
      </div>
    </div>
    <VipLevel></VipLevel>
  </div>
</template>
<script>
	import Vue from 'vue';
  import {
    vipListApi
  } from '@/network/memberCenter'
  import {
    getUserInfo
  } from '@/network/mine'
  import VipLevel from '@/components/content/VipLevel.vue'
  export default {
    data() {
      return {
        vipListData: [],
        userInfo: null,
        vip_level: null,
      };
    },
    components: {
      VipLevel
    },
    computed: {},
    created(){
      getUserInfo().then(res => {
        if (res.code == 1) {
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
    mounted() {
      this.getVipList()
    },
    methods: {
      golink(url){
        this.$router.push(url)
      },
      goBack: function() {
				this.$router.go(-1)
			},
      getVipList(){
        vipListApi().then(res => {
          if(res.code == 1){
            this.vipListData = res.data
          }
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  @import url('./memberCenter.less');
</style>