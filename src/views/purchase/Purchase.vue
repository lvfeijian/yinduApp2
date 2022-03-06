<!-- 下级购买 -->
<template>
  <div class="purchase">
    <div class="header">
      <van-nav-bar
        title="SUBORDINATE PURCHASE"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="empty"></div>
    <div class="list">
      <div class="title"><span></span>LOWER-LEVEL PURCHASE RECORDS</div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="no more"
        @load="onLoad"
        loading-text="loading..."
      >
        <div class="item" v-for="(item,index) in retailList" :key="index">
          <div class="cont">
            <div class="vip">VIP {{item.level}}</div>
            <div class="price">+{{item.amount}}</div>
          </div>
          <div class="hour">TRANSACTION HOUR：{{item.create_time}}</div>
          <div class="level">MEMBERSHIP LEVEL：{{item.GOLD}}</div>
        </div>
      </van-list>
    </div>
    <div class="empty2"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, List } from 'vant';
Vue.use(NavBar).use(List)
import {
  userRetailApi
} from '@/network/mine'
  export default {
    data() {
      return {
        retailList: [],
        loading: false, // 是否处于加载状态，加载过程中不触发load事件
        finished: false, // 是否已加载完成，加载完成后不再触发load事件
        page: 1,
        total: 0,
      }
    },

    components: {
    },

    computed: {
      
    },

    mounted() {},

    methods: {
      onClickLeft(){
        this.$router.go(-1)
      },
      onLoad(){
        userRetailApi({
          page: this.page,
          limit: 20
        }).then(res => {
          if(res.code == 1){
            this.retailList.push(...res.data)
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
  @import url('./purchase.less');
</style>