<!-- 任务入口页 -->
<template>
  <div class="task_enter">
    <div class="title">{{$t('taskEnter.tarea')}}</div>
    <div class="task_bg" @click="start">
      <div class="frulit-box">
        <div class="slot" v-for="(slot, index) in slots" ref="slots" :key="index">
          <div v-for="item in slot.items" class="slot__item">
            {{item}}
          </div>
        </div>
      </div>
      <div class="start">{{$t('taskEnter.start')}}</div>
    </div>
    <div class="task_cont">
      <div class="introduct" v-if="userInfo">
        {{$t('taskEnter.now')}}{{userInfo.is_vip == 1 ?  userInfo.vip_level : $t('taskEnter.user')}}，{{$t('taskEnter.every')}}${{userInfo.vip_data.center_amount || 0}}
      </div>
      <div class="btn_list">
        <div class="btn1" @click="golink('memberCenter')">{{$t('my.upgrade_member')}}</div>
        <div class="btn2" @click='start(true)'>{{$t('taskEnter.do_task')}}</div>
      </div>
      <div class="line"></div>
      <div class="task_number" v-if="userInfo">
        <div class="item">
          <div class="num">{{(userInfo.vip_data.show_num||0) - userInfo.vip_surplus}}</div>
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
    <Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" :btnText="$t('buy')">
			<div v-html="$t('not_vip')"></div>
    </Dialog>
    <Dialog @close="doClose2" @handleBtn="handleBtn2" :isShow="isShowDialog2" :btnText="$t('to_finish')">
      <div v-html="$t('get_task')" style="font-size: 16px;text-align: left"></div>
    </Dialog>
    <Dialog @close="doClose3" @handleBtn="handleBtn3" :isShow="isShowDialog3" :type="type" :btnText="$t('ok')">
      <div v-html="$t('not_get_task')" style="font-size: 15px;text-align: left"></div>
    </Dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    getCompanyIntro
  } from '@/network/introduct'
  import {
    getTaskList,
    randVipTaskApi,
    userLuckDrawApi
	} from '@/network/task'
  import {
    getUserInfo,
  } from '@/network/mine'
  import { Notify } from 'vant';
  Vue.use(Notify);
  import Dialog from '@/components/common/dialog/Dialog'
  const next =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (cb) {
      window.setTimeout(cb, 10000 / 60);
    };
  export default {
    data() {
      return {
        company: '',
        userInfo: null,
        slots: [{
            title: "When",
            items: [0,1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
          {
            title: "Where",
            items: [0,1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
          {
            title: "How",
            items: [0,1, 2, 3, 4, 5, 6, 7, 8, 9],
          }
        ],
        opts: null,
        startedAt: null,
        fontSize: null,
        isShowDialog: false,
        isShowDialog2: false,
        isShowDialog3: false,
        bannerImg:[],
        type: 3,

      };
    },

    components: {
      Dialog
    },

    computed: {},
    created() {
      getUserInfo().then(res => {
        if (res.code == 1) {
          this.userInfo = res.data
        }
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.fontSize = this.getFont();
      });
      getCompanyIntro().then(res => {
        if (res.code == 1) {
          this.company = res.data.company
        }
      })
      // 获取任务中心数据
			// getTaskList().then(res => {
			// 	if(res.code == 1){
			// 		this.bannerImg = res.data
			// 		if(res.data.length == 0){
			// 			this.isShowDialog = true
			// 		}
			// 	}
			// })
    },

    methods: {
      
      doClose(){
				this.isShowDialog = false
			},
      doClose2(){
        this.isShowDialog2 = false
      },
      doClose3(){
        this.isShowDialog3 = false
      },
			handleBtn(){
				this.isShowDialog = false
				this.$router.push('/memberCenter')
      },
      handleBtn2(){
        randVipTaskApi().then(res => {
          if(res.code == 1){
            this.$router.push({path: 'taskDetail',query: res.data})
          }
        })
				// if(this.videoInfo.type == 1){
				// 	this.$refs.video.play()
				// }
				// this.isShowDialog = false
				// this.isShowCountDown = true
				// this.timer = setInterval(() => {
				// 	this.videoInfo.view_time--
				// 	if(this.videoInfo.view_time <= 0){
				// 		clearInterval(this.timer)
				// 		this.isShowCountDown = false
				// 		taskFinishApi({
				// 			id: this.videoInfo.id,
				// 			auth_code: this.videoInfo.auth_code
				// 		}).then(res => {
				// 			if(res.code == 1){
				// 				Notify({ type: 'success', message: 'Mission accomplished' });
				// 			}
				// 		})
				// 	}
				// }, 1000);
			},
      handleBtn3(){
        this.isShowDialog3 = false
      },
      golink(path) {
        this.$router.push(path)
      },
      start(status=false) {
        if(status){
          document.body.scrollIntoView()
        }
        userLuckDrawApi().then(res => {
          getUserInfo().then(res => {
            if (res.code == 1) {
              this.userInfo = res.data
            }
          })
        })
        if (this.opts) {
          return;
        }
        let height = this.fontSize * 10;
        this.opts = this.slots.map((data, i) => {
          const slot = this.$refs.slots[i]; // 读取每一列
          const choice = Math.floor(Math.random() * data.items.length); // 获取每一列的长度
          const opts = {
            el: slot, //指向奖项元素的父级来控制控制滚动速度;
            finalPos: choice * height, // height 为每一个奖品滚动标签的高度;
            startOffset: 720 + Math.random() * 500 + i * 500, // 影响转的圈数
            height: data.items.length * height,
            duration: 3000 + i * 700, // 动画时常
            isFinished: false, // 是否已经停止了
          };
          return opts;
        });
        next(this.animate); // 启动动画
      },
      animate: function (timestamp) {
        // timestamp当前的方法持续的毫秒数
        if (this.startedAt == null) {
          this.startedAt = timestamp; // 动画初始时间
        }
        const timeDiff = timestamp - this.startedAt; //动画持续的时间

        this.opts.forEach((opt) => {

          if (opt.isFinished) {

            return;

          }

          const timeRemaining = Math.max(opt.duration - timeDiff, 0); // 总的持续时间 - 动画持续时间 = 剩下的时间,0表示结束

          const power = 3;

          const offset =

            (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) *

            opt.startOffset;

          let pos = -1 * Math.floor((offset + opt.finalPos) % opt.height);
          
          opt.el.style.transform = "translateY(" + pos + "px)";



          if (timeDiff > opt.duration) {

            opt.isFinished = true;
              if(this.userInfo.user_status==0){
                // 用户为冻结状态
                setTimeout(() => {
                  this.isShowDialog3 =true
                }, 2200);
                pos = 0 + this.fontSize
              } else if(this.userInfo.vip_surplus > 0 && (this.userInfo.is_vip == 1||this.userInfo.vip_level=="普通会员")){
                // 会员 去做任务
                pos = -80*this.fontSize
                
                setTimeout(() => {
                  this.isShowDialog2 =true
                }, 2200);
              } else if(this.userInfo.vip_surplus == 0 && (this.userInfo.is_vip == 1||this.userInfo.vip_level=="普通会员")){
                // 会员 任务次数使用完毕
                Notify({ type: 'danger', message: this.$t('not_task_number') });
                pos = 0 + this.fontSize
              } else {
                // 普通用户
                pos = 0 + this.fontSize
                this.isShowDialog = true
              }

            opt.el.style.transform = "translateY(" + pos + "px)";
            
            

          }

        });

        if (this.opts.every((o) => o.isFinished)) {

          // 判断时候所有的isFinished都是true

          this.opts = null;

          this.startedAt = null;

        } else {

          next(this.animate);

        }

      },
      getFont() {
        var ration = 2;
        var params = {
          defaultFontSize: 20,
          designWidth: 750,
        };
        var clientWidth = document.documentElement.clientWidth,
          ration = clientWidth / params.designWidth;
        return ration * params.defaultFontSize;
      },
    }
  }

</script>
<style lang='less' scoped>
  @import

  url('./taskEnter.less');

</style>
