<!-- 任务入口页 -->
<template>
  <div class="task_enter">
    <div class="task_bg" @click="getTask">
      <div class="start">{{$t('taskEnter.do_task')}}</div>
    </div>
    <div class="task_cont">
      <div class="introduct">
        {{$t('taskEnter.now')}}{{userInfo.vip_level}}，{{$t('taskEnter.every')}}${{userInfo.vip_data.amount}}
      </div>
      <div class="btn_list">
        <div class="btn1" @click="golink('memberCenter')">{{$t('my.upgrade_member')}}</div>
        <div class="btn2">{{$t('taskEnter.do_task')}}</div>
      </div>
      <div class="line"></div>
      <div class="task_number">
        <div class="item">
          <div class="num">{{userInfo.vip_data.show_num - userInfo.vip_surplus}}</div>
          <div class="text">{{$t('taskEnter.finish_task')}}</div>
        </div>
        <div class="item">
          <div class="num">{{userInfo.vip_surplus}}</div>
          <div class="text">{{$t('taskEnter.remain_task')}}</div>
        </div>
      </div>
      <div class="task_intro">
        <div class="title">{{$t('taskEnter.task_intro')}}</div>
        <div class="intro_text" v-html="company"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getCompanyIntro
  } from '@/network/introduct'
  import {
    getUserInfo,
  } from '@/network/mine'
  export default {
    data() {
      return {
        company: '',
        userInfo: null
      };
    },

    components: {},

    computed: {},
    created(){
      getUserInfo().then(res => {
				if(res.code == 1){
          this.userInfo = res.data
        }
      })
    },
    mounted() {
      
      getCompanyIntro().then(res => {
        if(res.code == 1){
          this.company = res.data.company
        }
      })
    },

    methods: {
      golink(path){
				this.$router.push(path)
			},
      getTask(){

      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./taskEnter.less');
</style>