<!-- 公告 -->
<template>
  <div class="announcement">
    <div class="header">
      <van-nav-bar
        title="PLATFORM ANNOUNCEMENT"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div style="height:0px;">&nbsp;</div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="no more"
        @load="onLoad"
        loading-text="loading..."
      >
        <div class="item" v-for="(item,index) in noticeListData" :key="index" @click="handleDetail(item.id)">
          <div class="name">{{item.title}}</div>
          <div class="intro" v-html="item.content"></div>
          <div class="time">{{item.create_time}}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, List } from 'vant';
Vue.use(NavBar).use(List)
import {
  noticeListApi
} from '@/network/home'
  export default {
    data() {
      return {
        noticeListData: [],
        loading: false, // 是否处于加载状态，加载过程中不触发load事件
        finished: false, // 是否已加载完成，加载完成后不再触发load事件
        page: 1,
      };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
      onClickLeft(){
        this.$router.push({
          path: 'mine'
        })
      },
      handleDetail(id){
        this.$router.push({
          path: 'announcementDetail',
          query: {
						id
					}
        })
      },
      onLoad(){
        noticeListApi({
          type: 1,
          page: this.page,
          limit: 20
        }).then(res => {
          if(res.code == 1){
            this.noticeListData.push(...res.data)
            this.page+=1
            this.loading = false;
            // 数据全部加载完成
            if (res.data.length < 20) {
              this.finished = true;
            }
          }
        })
      },
      
    },
    // activated () {
    //   const scrollTop = this.$route.meta.scrollTop;
    //   const $wrapper = document.querySelector('.list');
    //   if (scrollTop && $wrapper) {
    //     $wrapper.scrollTop = scrollTop;
    //   }
    // },
  }

</script>
<style lang='less' scoped>
  @import url('./announcement.less');
</style>