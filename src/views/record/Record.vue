<!-- 提现记录 -->
<template>
  <div class="record">
    <img class="back_icon" src="../../assets/img/back.png" alt="" @click="goBack" />
    <div class="title">{{$t('withdrawal_record')}}</div>
    <div class="record_card">
      <div class="top">
        <div class="text">{{$t('withdrawn_amount')}}</div>
        <div class="money">${{userDetail.amount}}</div>
      </div>
      <div class="end">
        <div class="text">{{$t('can_withdrawn_amount')}}</div>
        <div class="money">${{balance}}</div>
      </div>
    </div>
    <div class="list">
      <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="$t('no_more')"
      @load="onLoad"
      :loading-text="$t('loading')"
      >
        <div class="item" v-for="(item,index) in moneyRecord" :key="index">
          <div class="cont">
            <div class="vip">{{$t('withdrawn_detail')}}</div>
            <div class="price">+{{item.amount}}</div>
          </div>
          <div class="hour">{{item.create_time}}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
import { List } from 'vant';
Vue.use(List);
  import{
    getUserInfo,
    userCashDetailsApi,
    userCashListApi
  } from '@/network/mine'
  export default {
    data() {
      return {
        moneyRecord: [],
        userDetail: null,
        page: 1,
        loading: false,
        finished: false,
        balance: null
      };
    },

    components: {},

    computed: {},

    mounted() {
      this.getUserCashDetails()
    },

    methods: {
      goBack(){
        this.$router.go(-1)
      },
      getUserCashDetails(){
        getUserInfo().then(res => {
          this.balance = res.data.balance
          if(res.code == 1){
            userCashDetailsApi({
              id:res.data.vip_data.id
            }).then(result => {
              if(result.code == 1){
                this.userDetail = result.data
              }
            })
          }
        })
      },
      onLoad(){
        userCashListApi({
          page: this.page,
          limit: 20
        }).then(res => {
          if(res.code == 1){
            this.moneyRecord.push(...res.data)
            this.page++
            this.loading = false;
            // 数据全部加载完成
            if (res.data.length < 20) {
              this.finished = true;
            }
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  @import
  url('./record.less');
</style>