<!-- 会员 -->
<template>
	<div class="member">
		<van-nav-bar title="UPGRADE MEMBER" left-arrow @click-left="onClickLeft" />
		<!-- 积分版头部 -->
		<div class="member-container">
			<div class="member-score">
				<img src="../../assets/img/home/score.png">
				<div class="member-title">
					UPGRADE VIP TO EARN MORE MONEY
				</div>
			</div>
			<!-- 积分版列表 -->
			<div class="score-item" v-for="(item,index) in vipList" :key="index">
				<img :src="require('../../assets/img/home/' + Number(index*1+1) + '.png')" />
				<div class="score-title">{{item.name}}</div>
				<div class="score-btn" :class="item.select ? 'active' : ''" @click="onItemList(index)">
					₹{{item.amount}}
				</div>
			</div>
			<div class="pay-btn" :class="currentIndex!=null ? 'active' : ''" @click="onPayBtn()">
				PAY
			</div>
		</div>
		<van-popup v-model="show" round position="bottom" :style="{ height: '33%' }">
			<div class="pay-box">
				<div class="pay-title">PAY IMMEDIATELY</div>
				<div class="pay-container">
					<div class="wallet">
						<img src="../../assets/img/home/wallet.png" alt="">
					</div>
					<div class="small-title">BANK CARD</div>
					<div class="pay-check" @click="onCheck">
						<van-icon v-if="showIcon" name="checked" size="23px" />
					</div>
				</div>
				<div class="pay-btntwo" @clcik="onPatBtnTwo">PAY</div>
			</div>

		</van-popup>
		<Dialog @close="doClose" @handleBtn="handleBtn" :isShow="isShowDialog" :type="type" :btnText="btnText">
      {{message}}
    </Dialog>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Dialog from '@/components/common/dialog/Dialog'
	import {
		NavBar,
		Popup,
		Icon,
		Notify
	} from 'vant';
	import { Toast } from 'vant';
	Vue.use(NavBar);
	Vue.use(Popup);
	Vue.use(Icon);
	Vue.use(Notify);
	Vue.use(Toast);
	import {
		vipListApi,
		vipPayApi,
		vipOrderApi
	} from '@/network/home'
	export default {
		data() {
			return {
				vipList: null,
				currentIndex: null, // 当前选中的下标
				show: false, // 弹窗显示
				showIcon: false, // 图标选中
				isShowDialog: false,
				type: 1,
				message: '',
				btnText: ''
			};
		},

		components: {
			Dialog
		},

		computed: {},
		created(){
			vipListApi().then(res => {
				if(res.code == 1){
					res.data.map(item => {
						item.select = false
					})
					this.vipList = res.data
				}
			})
		},
		mounted() {
			if(window.localStorage.getItem('order_sn')){
				vipOrderApi({
					order_sn: window.localStorage.getItem('order_sn')
				}).then(res => {
					window.localStorage.removeItem('order_sn')
					if(res.code == 1){
						if(res.data.pay_status == 1){
							this.isShowDialog = true
							this.message = 'PAYMENT SUCCESSFUL!'
							this.type = 1
							this.btnText = 'ok'
						} else if(res.data.pay_status == 0){
							this.isShowDialog = true
							this.message = 'PAYMENT FAILED!'
							this.type = 2
							this.btnText = 'PLEASE REPAY'
						}
					}
				})
			}
		},

		methods: {
			onClickLeft: function() {
				this.$router.go(-1)
			},

			/**
			 * 支付设置
			 */
			onItemList: function(index) {
				this.currentIndex = index
				this.vipList.map((item, key) => {
					if(key == index) {
						item.select = true
					} else {
						item.select = false
					}
				})
			},
			/**
			 * 升级会员支付
			 */
			onPayBtn: function() {
				if(this.currentIndex == null){
					Notify({ type: 'warning', message: 'Please select member level' });
					return
				}
				let id = this.vipList[this.currentIndex].id
				let url = window.location.host + '/member'
				Toast.loading({
					message: 'loading...',
					forbidClick: true,
					duration: 10000
				});
				vipPayApi({
					id,
					callback_url: url
				}).then(res => {
					if(res.code == 1){
						window.location.href = res.data.url
						window.localStorage.setItem('order_sn', res.data.order_sn)
					}
				})
			},
			doClose(){
				this.isShowDialog = false
			},
			handleBtn(){
				if(this.message == 'PAYMENT SUCCESSFUL!'){
					this.$router.push('/myLevel')
				} else {
					this.isShowDialog = false
				}
			},
			/**
			 * 图标选中
			 */
			onCheck: function() {
				if (this.showIcon) {
					this.showIcon = false
				} else {
					this.showIcon = true
				}

			},

			/**
			 * 支付2
			 */
			onPatBtnTwo: function() {
				console.log("支付2");
			}
		}
	}
</script>
<style lang='less' scoped>
	@import url('./member.less');
</style>
