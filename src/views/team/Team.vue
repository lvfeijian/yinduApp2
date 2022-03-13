<!-- 团队 -->
<template>
  <div class="team">
    <div class="header">
      <van-nav-bar
        :title="$t('team')"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="switch">
      <div class="switch_item">
        <div class="text">{{$t('direct_push')}}</div>
        <div class="number">{{direct_push}}</div>
      </div>
      <div class="switch_item active">
        <div class="text">{{$t('total_people')}}</div>
        <div class="number">{{total_people}}</div>
      </div>
    </div>
    <div class="table">
      <div class="table_header">
        <div class="header_item level">ID</div>
        <div class="header_item">{{$t('account')}}</div>
        <div class="header_item name">{{$t('time')}}</div>
      </div>
      <div class="table_body">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('no_more')"
          @load="onLoad"
          :loading-text="$t('loading')"
        >
          <div class="table_item" v-for="(item,index) in teamList" :key="index">
            <div class="level">
              {{item.id}}
            </div>
            <div class="number">
              {{item.account.replace(item.account.substring(3,6), "***")}}
            </div>
            <div class="name">
              {{getTime(item.time)}}
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

    computed: {
      
    },
    created() {
      this.direct_push = this.$route.query.direct_push
      this.total_people = this.$route.query.total_people
    },
    mounted() { },

    methods: {
      getTime(time){
        let month = time.split(' ')[0].split('-')[1]
        let day = time.split(' ')[0].split('-')[2]
        let hour = time.split(' ')[1].split(':')[0]
        let minute = time.split(' ')[1].split(':')[1]
        return month+ '/' + day + '/' + hour + ':' + minute
        
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      onLoad(){
        userTeam({
          page: this.page,
          limit: 20
        }).then(res => {
          if(res.code == 1){
            this.teamList.push(...res.data.list)
            
            this.page+=1
            this.loading = false;
            // 数据全部加载完成
            if (res.data.list.length < 20) {
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