<!-- Home -->
<template>
	<div class="task">
		<van-nav-bar title="VIP TASK" left-arrow  @click-left="onClickLeft"/>
		<div class="task-bg">
			<div class="task-container">
				<div class="item-list"  v-for="(item,index) in bannerImg" :key="index" @click="onTaskDetail(item.id)">
					<img :src="item.logo" :alt="item.title">
				</div>
			</div>
		</div>
		<Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" :type="type" :btnText="btnText">
      <div v-html="message" style="font-size: 15px;text-align: left"></div>
    </Dialog>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		getTaskList
	} from '@/network/task'
	import {
    getUserInfo,
  } from '@/network/mine'
	import Dialog from '@/components/common/dialog/Dialog'
	import {
		NavBar,
	} from 'vant';
	Vue.use(NavBar);
	export default {
		data() {
			return {
				bannerImg:[],
				isShowDialog: false,
				type: 3,
				btnText: 'BACK',
				message: 'UNFORTUNATELY, YOU DID <br/>NOT GRAB THE REWARD,<br/> PLEASE KEEP WORKING HARD'
			};
		},

		components: {
			Dialog
		},

		computed: {},

		mounted() {
			getUserInfo().then(res => {
        if (res.code == 1) {
					if(res.data.user_status==0){
						return this.isShowDialog = true
					}
        }
      })
			
			// 获取任务中心数据
			getTaskList().then(res => {
				if(res.code == 1){
					this.bannerImg = res.data
					console.log(res.data.length);
					if(res.data.length == 0){
						this.isShowDialog = true
					}
				}
			})
		},
		
		methods: {
			// 任务详情跳转
			onTaskDetail: function(id){
				this.$router.push({
					path: 'taskDetail',
					query:{
						id
					}
				})
			},
			
			onClickLeft: function(){
				this.$router.push({
					path: 'home'
				})
			},
			doClose(){
				this.isShowDialog = false
				this.$router.replace('/home')
			},
			handleBtn(){
				this.isShowDialog = false
				this.$router.replace('/home')
			}
		}
	}
</script>
<style lang='less' scoped>
	@import url('./task.less');
</style>
