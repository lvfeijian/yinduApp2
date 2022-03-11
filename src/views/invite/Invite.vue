<!--介绍-->
<template>
  <div class="introduce">
		<img class="back_icon" src="../../assets/img/back.svg" alt="" @click="goBack" />
    <p class="title">{{$t('invite')}}</title>
		<div class="introduce-bg">
			<div class="content" v-html="invitationData"></div>
			<div class="btn" @click="handleCopy">{{$t('copy')}}</div>
			<Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" type="1">
				{{$t('copy_success')}}
			</Dialog>
  	</div>
  </div>
</template>

<script>
	import Vue from 'vue';
	import Dialog from '@/components/common/dialog/Dialog'
	import {
		NavBar,
	} from 'vant';
	Vue.use(NavBar);
	import {
		invitationApi
	} from '@/network/invite'
  export default {
    data() {
      return {
				isShowDialog: false,
				invitationData: ''
      };
    },

    components: {
			Dialog
		},

    computed: {},
		watch:{
			'$route':function(to,from){
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			}
		},
    mounted() {
			invitationApi().then(res => {
				if(res.code == 1){
					this.invitationData = res.data.invitation
				}
			})
		},

    methods: {
			goBack: function() {
				this.$router.go(-1)
			},
			handleCopy(){
				let userInfo = JSON.parse(localStorage.getItem('userInfo'))
				let inviteUrl = 'http://m.vipcbagent.com/' + 'register?code=' + userInfo.code
        this.copy(inviteUrl)
      },
      copy(data) {
        let OrderNumber = data;
        let newInput = document.createElement("input");
        newInput.value = OrderNumber;
        document.body.appendChild(newInput);
        newInput.select();
        document.execCommand("Copy");
        newInput.remove();
				this.isShowDialog = true
      },
			handleBtn(){
				this.isShowDialog = false
			},
			doClose(){
				this.isShowDialog = false
			}
		}
  }

</script>
<style lang='less' scoped>
  @import url('./invite.less');
</style>