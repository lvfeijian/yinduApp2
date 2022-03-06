<!-- Home -->
<template>
	<div class="home">
		<!-- <div class="home-title">HOME</div> -->
		<!-- 背景图 -->
		<div class="home-bg">
			<div class="introduct" @click="golink('introduce')">
				<img src="../../assets/img/home/intro.png" alt="" />
				{{$t('home.intro')}}
			</div>
			<!-- 轮播图 -->
			<div class="home-banner">
				<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				  <van-swipe-item v-for="(item,index) in bannerImg" :key="index" @click="onBanner(item.url)">
						<img :src="item.logo" alt="" />
				  </van-swipe-item>
				</van-swipe>
			</div>
		</div>
		<div class="cont_block" v-if="userInfo">
			<div class="top" @click="golink('profit')">
				<div class="text">
					<img class="tip" src="@/assets/img/home/tip.png" alt="" />
					<p>{{$t('home.earnings_today')}}</p>
				</div>
				<div class="number">💲{{userInfo.today_money}}</div>
			</div>
			<div class="bottom">
				<div class="saldo" @click="golink('memberCenter')">
					<p>{{$t('home.total_balance')}}</p>
					<span>${{userInfo.balance}}</span>
				</div>
				<div class="tasks"  @click="golink('taskEnter')">
					<p>{{$t('home.task_number')}}</p>
					<span>{{userInfo.vip_surplus}}</span>
				</div>
			</div>
		</div>
		<!-- 提示轮播 -->
		<div class="home-tip">
			<div class="text">{{$t('home.notice')}}</div>
			<van-notice-bar :scrollable="false">
				<van-swipe vertical class="notice-swipe" :autoplay="5000" :show-indicators="false">
					<van-swipe-item class="swipe-item" v-for="(item,index) in noticeData" :key="index" @click="handleNotice(item.id)">{{item.title}}</van-swipe-item>
				</van-swipe>
			</van-notice-bar>
		</div>
		<div class="line"></div>
		<div class="picture">
			<img @click="golink('invite')" class="invite" src="../../assets/img/home/invite.png" alt="" />
			<div class="list">
				<div class="item" @click="golink('invite')">
					<p class="text">{{$t('home.invitation')}}</p>
					<img class="img" src="../../assets/img/home/11.png" alt="" />
				</div>
				<div class="item" @click="golink('memberCenter')">
					<p class="text">{{$t('home.upgrade_member')}}</p>
					<img class="img" src="../../assets/img/home/22.png" alt="" />
				</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="member" v-if="userInfo">
			<img class="go_icon" src="../../assets/img/mine/CombinedShape.png" alt="" />
			<div class="title">{{$t('home.membership_center')}}</div>
			<div class="member_cont" @click="golink('memberCenter')">
				<template v-if="vip_level">
					<div class="pre_level" v-if="vip_level==9">
						<img :src='"../../assets/img/memberCenter/" + (vip_level*1-2) + ".png"' alt="" />
					</div>
					<div class="pre_level" v-if="vip_level==8">
						<img :src='"../../assets/img/memberCenter/" + (vip_level*1-1) + ".png"' alt="" />
					</div>
					<div class="left1">
						<img :src='"../../assets/img/memberCenter/" + vip_level + ".png"' alt="" />
						<div class="money">${{userInfo.vip_price}}</div>
					</div>
					<div class="next_level" v-if="vip_level<=8">
						<img :src='"../../assets/img/memberCenter/" + (vip_level*1+1) + "-1.png"' alt="" />
					</div>
					<div class="next_level" v-if="vip_level<=7">
						<img :src='"../../assets/img/memberCenter/" + (vip_level*1+2) + "-1.png"' alt="" />
					</div>
				</template>
				<template v-else>
					<div class="next_level" style="margin-left: 0px;">
						<img src="../../assets/img/memberCenter/1-1.png" alt="" />
					</div>
					<div class="next_level">
						<img src="../../assets/img/memberCenter/2-1.png" alt="" />
					</div>
					<div class="next_level">
						<img src="../../assets/img/memberCenter/3-1.png" alt="" />
					</div>
				</template>
			</div>
		</div>
		<VipLevel></VipLevel>
		<!-- 列表项 -->
		<!-- <div class="item-box">
			<div class="item-list"  v-for="(item,index) in listData" :key="index" @click="onItemBanner(item.path)">
				<img :src="require('../../assets/img/home/' + item.url)"/>
			</div>
		</div> -->
		<Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog"  btnText="BUY NOW">
			<div>YOU ARE NOT <br>
				YET A VIP</div>
    </Dialog>
		<div class="dialog1" v-if="isShowSpringFrame">
			<div class="dialog_cont">
				<img class="close" @click="handleClose" src="../../assets/img/close.png" alt="" />
				<div class="text">{{loginRemindText}}</div>
			</div>
		</div>
		<div class="Version_cover" v-if="VersionFlag">
      <div class="center_box">
        <h1>{{$t('home.new_version')}}</h1>
        <div class="btn" @click="Upgrade">{{$t('home.uodate_download')}}</div>
      </div>
    </div>
	</div>
</template>

<script>
	import Vue from 'vue';
  import VipLevel from '@/components/content/VipLevel.vue'
	import {
		getSwiperList,
		noticeListApi,
		loginRemindApi
	} from '@/network/home'
	import {
    getUserInfo,
		downloadApi
  } from '@/network/mine'
	import {
		NoticeBar,
		Swipe,
		SwipeItem ,
		Lazyload,
		Toast
	} from 'vant';
	Vue.use(NoticeBar);
	Vue.use(Swipe);
	Vue.use(SwipeItem);
	Vue.use(Lazyload);
	Vue.use(Toast);
	import Dialog from '@/components/common/dialog/Dialog'
	import config from '../../../package.json'
	export default {
		data() {
			return {
				listData: [
					{
						url: "create-task.png",
						path: 'task'
					},
					{
						url: "free-center.png",
						path: 'free'
					},
					{
						url: "upgrade-vip.png",
						path: 'member'
					}
				],
				bannerImg: [],
				noticeData: [],
				is_vip: 0,
				isShowDialog: false,
				isShowSpringFrame: false,
				loginRemindText: '',
				user_status: 0,
				VersionFlag: false,
				androidUrl: '',
				iosUrl: '',
				version: '', // 最新版本
				vip_level: null,
				userInfo:null,
			};
		},

		components: {
			Dialog,
			VipLevel
		},
		watch:{
			'$route':function(to,from){
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			}
		},
		computed: {},
		created(){
			downloadApi().then(res => {
        if(res.code == 1){
          this.androidUrl = res.data.android || ''
          this.iosUrl = res.data.ios || ''
					this.version = res.data.version
					if(plus){
						if(plus.runtime.version == this.version){
							// 是最新版本
						} else {
							this.VersionFlag = true
						}
					}
					
        }
      })
			loginRemindApi().then(res => {
				if(res.code == 1){	
					this.loginRemindText = res.data.remind
					let nowTime = Date.parse(new Date())/1000
					let showTime = localStorage.getItem('remindShowTime')*1
					if(this.loginRemindText != '' && showTime < nowTime){
						this.isShowSpringFrame = true
					}
				}
			})
		},
		mounted() {
			this.getNoticeList()
			getSwiperList().then(res => {
				if(res.code == 1){
					this.bannerImg = res.data
				}
			})
			getUserInfo().then(res => {
				if(res.code == 1){
					localStorage.setItem('userInfo',JSON.stringify(res.data))
					this.is_vip = res.data.is_vip
					this.userInfo = res.data
					this.user_status = res.data.user_status
					if(this.is_vip == 1){
						this.vip_level = res.data.vip_level.replace('VIP','')*1
					} else {
						this.vip_level = null
					}
				}
			})
		},

		methods: {
			golink(path){
				this.$router.push(path)
			},
			/**
			 * 轮播图点击
			 */
			onBanner: function(url){
				window.location.href = url
			},
			/**
			 * 列表点击
			 */
			onItemBanner: function(path){
				if(this.is_vip == 0 && path == 'task'){
					this.isShowDialog = true
					return
				}
				// if(this.user_status == 0 && path == 'task'){
				// 	Toast('Task collection failed')
				// 	return
				// }
				this.$router.push({
					path
				})
			},
			// 公告点击
			handleNotice(id){
				this.$router.push({
					path: 'announcementDetail',
					query: {
						id
					}
				})
			},
			getNoticeList(){
        noticeListApi({
          type: 0
        }).then(res => {
          if(res.code == 1){
            this.noticeData = res.data
          }
        })
      },
			doClose(){
				this.isShowDialog = false
			},
			handleBtn(){
				this.isShowDialog = false
				this.$router.push('/member')
			},
			handleClose(){
				this.isShowSpringFrame = false
				let time = Date.parse(new Date())/1000 + 24*60*60
				localStorage.setItem('remindShowTime', time)
			},
			Upgrade(){
				// let u = navigator.userAgent
				window.location.href=this.androidUrl || this.iosUrl
				// if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
				// 	//android终端
				// 	if(this.androidUrl == ''){
				// 		Toast('Coming soon')
				// 		return
				// 	}
				// 	// plus.runtime.openURL(this.androidUrl)
				// }
				// if(userAgent.indexOf('iPhone') > -1){
				// 	// 是否为iPhone或者QQHD浏览器
				// 	if(this.iosUrl == ''){
				// 		Toast('Coming soon')
				// 		return
				// 	}
				// 	plus.runtime.openURL(this.iosUrl)
				// 	// window.open(this.iosUrl)
				// }
			}
		}
	}
</script>
<style lang='less' scoped>
	@import url('./home.less');
</style>
