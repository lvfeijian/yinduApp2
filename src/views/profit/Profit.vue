<!-- 广告收益 -->
<template>
  <div class="profit">
    <div class="profit_title">
      {{$t('income.income_enter')}}
    </div>
    <div class="profit_cont" v-if="userInfo">
      <div class="total">
        {{$t('income.total_income')}}
        <p class="money">${{Number(userInfo.retail_earnings) + Number(userInfo.task_earnings)}}</p>
      </div>
      <div class="income">
        <div class="item">
          {{$t('income.advertising_revenue')}}
          <p class="money">${{userInfo.task_earnings}}</p>
        </div>
        <div class="item">
          {{$t('income.team_income')}}
          <p class="money">${{userInfo.retail_earnings}}</p>
        </div>
      </div>
    </div>
    <div class="balance_cont">
      <div class="balance">
        <div class="title">{{$t('memberCenter.overall_balance')}}</div>
        <div class="money" v-if="userInfo"><span>$</span>{{userInfo.total_amount}}</div>
      </div>
      <div class="btn" @click="golink('wallet')">{{$t('my.withdrawal')}}</div>
    </div>
    <div class="list_cont">
      <div class="today">
        <div class="title">{{$t('income.today_total_income')}}</div>
        <div class="money" v-if="userInfo">${{userInfo.today_money}}</div>
      </div>
    </div>
    <div class="navbar">
      <div class="item" :class="curType == 1 ? 'active' : ''" @click="switchTab(1)">{{$t('income.adv_revenue_detail')}}</div>
      <div class="item" :class="curType == 2 ? 'active' : ''" @click="switchTab(2)">{{$t('income.team_revenue_detail')}}</div>
    </div>
    <div class="list">

      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('no_more')"
        @load="onLoad"
        loading-text="loading..."
        v-show="curType == 1"
      >
        <div class="item" v-for="(item,index) in earningList" :key="index">
          <div class="cont">
            <div class="vip">{{item.task_name}}</div>
            <div class="price">+{{item.amount}}</div>
          </div>
          <div class="hour">{{item.create_time}}</div>
        </div>
      </van-list>
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('no_more')"
        @load="onLoadTeam"
        loading-text="loading..."
        v-show="curType == 2"
      >
        <div class="item" v-for="(item,index) in teamList" :key="index">
          <div class="cont">
            <div class="vip">{{item.name}}</div>
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
import { NavBar, List } from 'vant';
Vue.use(List);
Vue.use(NavBar);
import {
  taskEaningsApi,
  TeamProfitApi,
  getUserInfo
} from '@/network/mine'
  export default {
    data() {
      return {
        earningList: [], // 广告收益
        teamList: [], // 团队收益
        loading: false, // 是否处于加载状态，加载过程中不触发load事件
        finished: false, // 是否已加载完成，加载完成后不再触发load事件
        page: 1,
        page2: 1,
        total: 0,
        total2: 0,
        task_earnings: 0,
        userInfo: null,
        curType: 1, // 1 广告收入 2团队收入
      }
    },

    components: {},

    computed: {},
    created(){
    },
    mounted() {
      getUserInfo().then(res => {
				if(res.code == 1){
          this.userInfo = res.data
        }
      })
    },

    methods: {
      switchTab(val){
        this.curType = val
        this.loading = true
        this.finished = false
        if(val == 1){
          this.page = 1
          this.earningList = []
          this.onLoad()
        }
        if(val == 2){
          this.page2 = 1
          this.teamList = []
          this.onLoadTeam()
        }
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      golink(url){
        this.$router.push(url)
			},
      onLoad(){
        taskEaningsApi({
          page: this.page,
          limit: 20
        }).then(res => {
          if(res.code == 1){
            this.earningList.push(...res.data)
            this.page++
            this.loading = false;
            // 数据全部加载完成
            if (res.data.length < 20) {
              this.finished = true;
            }
          }
        })
      },
      onLoadTeam(){
        TeamProfitApi({
          page: this.page2,
          limit: 20
        }).then(res => {
          if(res.code == 1){
            this.teamList.push(...res.data)
            this.page2+=1
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
  @import url('./profit.less');
</style>