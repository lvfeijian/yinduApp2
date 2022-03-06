<!-- 公告详情页 -->
<template>
  <div class="announcement_detail">
    <div class="header">
      <van-nav-bar
        title="PLATFORM ANNOUNCEMENT"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div style="height:0px;">&nbsp;</div>
    <div class="list">
      <div class="item" v-if="noticeDetailData">
        <div class="name">{{noticeDetailData.title}}</div>
        <div class="intro" v-html="noticeDetailData.content"></div>
        <div class="time">{{noticeDetailData.create_time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
Vue.use(NavBar);
import {
  noticeDetailApi
} from '@/network/home'
  export default {
    data() {
      return {
        noticeDetailData: null
      };
    },

    components: {},

    computed: {},
    created(){
      let id = this.$route.query.id
      this.getNoticeList(id)
    },
    mounted() {},

    methods: {
      onClickLeft(){
        this.$router.go(-1)
      },
      getNoticeList(id){
        noticeDetailApi({
          id
        }).then(res => {
          if(res.code == 1){
            this.noticeDetailData = res.data
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./announcementDetail.less');
</style>