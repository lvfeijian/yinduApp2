<!-- Home -->
<template>
	<div class="task_detail" v-if="videoInfo" :class="videoInfo.type == 0 ? 'active' : ''">
		<div class="header">
      <van-nav-bar
        :title="videoInfo && videoInfo.title"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
		<div v-if="videoInfo">

			<div class="video" v-if="videoInfo.type == 1">
				<video ref="video" controls="controls" :src="videoInfo.video_url"></video>
			</div>
			<div class="free-bg" v-if="videoInfo.type == 0">
				<img class="img-box" src="../../assets/img/home/free.png" alt="">
				<div class="container-box">
					<div class="container-title">{{videoInfo.title}}</div>
					<div class="container-text" v-html="videoInfo.content"></div>
				</div>
			</div>
		</div>

		<Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" :type="type" :btnText="btnText">
      <div v-html="message" style="font-size: 16px;text-align: left"></div>
    </Dialog>
		<div class="count_down" v-if="isShowCountDown">
			Gain rewards after watching for {{videoInfo.view_time}} seconds
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		taskDetailApi,
		taskFinishApi
	} from '@/network/task'
	import Dialog from '@/components/common/dialog/Dialog'
	import {
		NavBar,
		Notify
	} from 'vant';
	Vue.use(Notify);
	Vue.use(NavBar);
	export default {
		data() {
			return {
				timer: null,
				isShowCountDown:false,
				id: null,
				videoInfo: null,
				isShowDialog:false,
				type: 1,
				btnText: 'TO FINISH',
				message: 'CONGRATULATIONS YOU <br>HAVE GRABBED THE TASK <br>REWARD, PLEASE·'
			};
		},

		components: {
			Dialog
		},

		computed: {},
		created(){
			this.id = this.$route.query.id
			this.getTaskDetail()
		},
		mounted() {
		},
		
		methods: {
			getTaskDetail(){
				taskDetailApi({
					id: this.id
				}).then(res => {
					if(res.code == 1){
						this.videoInfo = res.data
						if(res.data && res.data.vip_type == 1 && res.data.is_vip == 1 && res.data.is_finish==0){
							this.isShowDialog = true
						}
					}
				})
			},
			onClickLeft: function(){
				this.$router.go(-1)
			},
			doClose(){
				this.isShowDialog = false
			},
			handleBtn(){
				if(this.videoInfo.type == 1){
					this.$refs.video.play()
				}
				this.isShowDialog = false
				this.isShowCountDown = true
				this.timer = setInterval(() => {
					this.videoInfo.view_time--
					if(this.videoInfo.view_time <= 0){
						clearInterval(this.timer)
						this.isShowCountDown = false
						taskFinishApi({
							id: this.videoInfo.id,
							auth_code: this.videoInfo.auth_code
						}).then(res => {
							if(res.code == 1){
								Notify({ type: 'success', message: 'Mission accomplished' });
							}
						})
					}
				}, 1000);
			}
		}
	}
</script>
<style lang='less' scoped>
	@import url('./taskDetail.less');
</style>
