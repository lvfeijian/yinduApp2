<!-- Home -->
<template>
	<div class="free" v-if="freeData" :class="freeData.type == 0 ? 'active' : ''">
		<div class="header">
      <van-nav-bar
        title="FREE MISSION"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
		<div v-if="freeData">
			<div class="video" v-if="freeData.type == 1">
				<video ref="video" controls="controls" :src="freeData.video_url"></video>
			</div>
			<div class="free-bg" v-if="freeData.type == 0">
				<img class="img-box" src="../../assets/img/home/free.png" alt="">
				<div class="container-box" v-if="freeData">
					<div class="container-title">{{freeData.title}}</div>
					<div class="container-text" v-html="freeData.content"></div>
				</div>
			</div>
		</div>
		<Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" :type="type" :btnText="btnText">
      <div v-html="message" style="font-size: 16px;text-align: left"></div>
    </Dialog>
		<div class="count_down" v-if="isShowCountDown">
			Gain rewards after watching for {{freeData.view_time}} seconds
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		NavBar,
		Notify
	} from 'vant';
	import {
		taskDetailApi,
		taskFinishApi
	} from '@/network/task'
	import Dialog from '@/components/common/dialog/Dialog'
	Vue.use(NavBar);
	export default {
		data() {
			return {
				freeData: null,
				isShowCountDown: false,
				isShowDialog: false,
				type:1,
				message: 'CONGRATULATIONS YOU <br>HAVE GRABBED THE TASK <br>REWARD, PLEASE·',
				btnText:'TO FINISH',
				timer: null
			};
		},

		components: {
			Dialog

		},

		computed: {},

		mounted() {
			this.getFreeData()
		},

		methods: {
			onClickLeft: function(){
				this.$router.go(-1)
			},
			getFreeData() {
				taskDetailApi({
					id:0
				}).then(res => {
					if(res.code == 1){
						this.freeData = res.data
						if(res.data && res.data.is_finish==0){
							this.isShowDialog = true
						}
					}
				})
			},
			doClose(){
				this.isShowDialog = false
			},
			handleBtn(){
				if(this.freeData.type == 1){
					this.$refs.video.play()
				}
				this.isShowDialog = false
				this.isShowCountDown = true
				this.timer = setInterval(() => {
					this.freeData.view_time--
					if(this.freeData.view_time <= 0){
						clearInterval(this.timer)
						this.isShowCountDown = false
						taskFinishApi({
							id: this.freeData.id,
							auth_code: this.freeData.auth_code
						}).then(res => {
							if(res.code == 1){
								Notify({ type: 'success', message: 'Mission accomplished' });
							}
						})
					}
				}, 1000);
			},

		
		}
	}
</script>
<style lang='less' scoped>
	@import url('./free.less');
</style>
