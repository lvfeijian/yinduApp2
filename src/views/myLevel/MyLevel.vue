<!-- 我的等级 -->
<template>
  <div class="my_level">
    <div class="header">
      <van-nav-bar
        title="INVITE"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <img class="img" src="../../assets/img/mine/huangjinhuiyuan.png" alt="" />
      <div class="title">GOLD VIP</div>
      <div class="days">
        THE REMAINING NUMBER OF DAYS：{{remain_day}} DAY
      </div>
      <div class="buy" @click="goBuy">DIRECT PURCHASE</div>
      <div class="level">
        <div class="next_level">{{upgrade_num}} PEOPLE TO UPGRADE TO THE NEXT LEVEL</div>
        <div class="progress-box">
          <div ref="menu" class="menu">
            <!-- for循环开始 -->
            <div class="progress" v-for="(item,index) in vipList" :key="index">
              <div class="cire-box" v-show="index<vipList.length-1" :class="curVipIndex > index ? 'isActive' : 'active'"></div>
                <div class="left-cire" :class="curVipIndex >= index ? 'isActive' : 'active'"></div>
                <div class="vip-title">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="tips">CURRENT LEVEL </div>
        <div class="btn" @click="handleInvite">INVITE NOW</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getMyPush
  } from '@/network/mylevel.js';
  import Vue from 'vue';
	import {
		taskDetailApi
	} from '@/network/task'
	import {
		NavBar, Step, Steps
	} from 'vant';
  Vue.use(Step);
  Vue.use(Steps);
	Vue.use(NavBar);
  export default {
    data() {
      return {
        active: 1,
        vipList:null ,
        curVip:null,
        curVipIndex: 0,
        remain_day: null,
        upgrade_num: null,
        
      };
    },

    components: {},

    computed: {
    },
    mounted() {
      
		getMyPush().then(res => {
		  if(res.code == 1){
			let newData = res.data
		    this.vipList = newData.vip
        this.curVip = newData.vip_level
        this.vipList.map((item,index) => {
          if(item.name == newData.vip_level){
            this.curVipIndex = index
          }
        })
        this.remain_day = newData.remain_day
        this.upgrade_num = newData.upgrade_num
        this.$nextTick(() => {
          let scrollWidth = 0
          if(this.curVipIndex<=1){
            scrollWidth = 0
          } else {
            scrollWidth = (this.curVipIndex-1)*112-60
          }
          document.getElementsByClassName('progress-box')[0].scrollTo(scrollWidth,0)
        })
        
		  }
		})
	},

    methods: {

      onClickLeft(){
        this.$router.go(-1)
      },
      goBuy(){
        this.$router.push('/member')
      },
      handleInvite(){
        this.$router.push('/invite')
      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./myLevel.less');
</style>