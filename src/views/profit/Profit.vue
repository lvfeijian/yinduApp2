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
        <div class="money" v-if="userInfo"><span>$</span>{{userInfo.balance}}</div>
      </div>
      <div class="btn" @click="golink('wallet')">{{$t('my.withdrawal')}}</div>
    </div>
    <div class="list_cont">
      <div class="today">
        <div class="title">{{$t('income.today_total_income')}}</div>
        <div class="money" v-if="userInfo">${{userInfo.today_money}}</div>
      </div>
    </div>
    <div class="navbar"></div>
    <div class="list">

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="no more"
        @load="onLoad"
        loading-text="loading..."
      >
        <div class="item" v-for="(item,index) in earningList" :key="index">
          <div class="cont">
            <div class="vip">{{item.task_name}}</div>
            <div class="price">+{{item.amount}}</div>
          </div>
          <div class="hour">{{item.create_time}}</div>
        </div>
      </van-list>
      <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="no more"
          @load="onLoad"
          loading-text="loading..."
        >
          <div class="table_item" v-for="(item,index) in teamList" :key="index">
            <div class="level">
              {{item.vip_level}}
            </div>
            <div class="number">
              {{item.account.replace(item.account.substring(3,7), "****")}}
            </div>
            <div class="name">
              {{item.name || item.account.replace(item.account.substring(3,7), "****")}}
            </div>
          </div>
        </van-list> -->
      
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
        earningList: [],
        loading: false, // 是否处于加载状态，加载过程中不触发load事件
        finished: false, // 是否已加载完成，加载完成后不再触发load事件
        page: 1,
        total: 0,
        task_earnings: 0,
        userInfo: null
      }
    },

    components: {},

    computed: {},
    created(){
      this.task_earnings = this.$route.query.task_earnings
    },
    mounted() {
      getUserInfo().then(res => {
				if(res.code == 1){
          this.userInfo = res.data
        }
      })
    },

    methods: {
      onClickLeft(){
        this.$router.go(-1)
      },
      golink(path){
				this.$router.push(path)
			},
      onLoad(){
        taskEaningsApi({
          page: this.page,
          limit: 20
        }).then(res => {
          if(res.code == 1){
            this.earningList.push(...res.data)
            this.page+=1
            this.loading = false;
            // 数据全部加载完成
            if (res.data.length < 20) {
              this.finished = true;
            }
          }
        })
      },
      
    }
  }

</script>
<style lang='less' scoped>
  @import url('./profit.less');
</style>