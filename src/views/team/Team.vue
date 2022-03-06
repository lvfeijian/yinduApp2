<!-- 团队 -->
<template>
  <div class="team">
    <div class="header">
      <van-nav-bar
        title="TEAM"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="switch">
      <div class="switch_item">
        <div class="text">DIRECT PUSH</div>
        <div class="number">{{direct_push}}</div>
      </div>
      <div class="switch_item active">
        <div class="text">TOTAL PEOPLE</div>
        <div class="number">{{total_people}}</div>
      </div>
    </div>
    <div class="table">
      <div class="table_header">
        <div class="header_item">VIP LEVEL</div>
        <div class="header_item">ACCOUNT</div>
        <div class="header_item name">NAME</div>
      </div>
      <div class="table_body">
        <van-list
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
        </van-list>
        
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, List } from 'vant';
Vue.use(List);
Vue.use(NavBar);
import {
  userTeam
} from '@/network/mine'
  export default {
    data() {
      return {
        teamList: [],
        loading: false, // 是否处于加载状态，加载过程中不触发load事件
        finished: false, // 是否已加载完成，加载完成后不再触发load事件
        page: 1,
        total: 0,
        direct_push: 0,
        total_people: 0
      };
    },

    components: {},

    computed: {},
    created() {
      this.direct_push = this.$route.query.direct_push
      this.total_people = this.$route.query.total_people
    },
    mounted() { },

    methods: {
      onClickLeft(){
        this.$router.go(-1)
      },
      onLoad(){
        userTeam({
          page: this.page,
          limit: 20
        }).then(res => {
          if(res.code == 1){
            this.teamList.push(...res.data)
            
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
  @import url('./team.less');
</style>