<!--介绍-->
<template>
  <div class="introduce">
    <img class="back_icon" src="../../assets/img/back.svg" alt="" @click="goBack" />
  	<div class="introduce-bg">
      <div class="title">Company project introduction</div>
      <div class="container" v-html="company"></div>
  	</div>
  </div>
</template>

<script>
	import Vue from 'vue';
  import {
    getCompanyIntro
  } from '@/network/introduct'
	import {
		NavBar,
	} from 'vant';
	Vue.use(NavBar);
  export default {
    data() {
      return {
        company: ''
      }
    },

    components: {},
    watch:{
			'$route':function(to,from){
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			}
		},
    computed: {},
    created(){
      getCompanyIntro().then(res => {
        if(res.code == 1){
          this.company = res.data.company
        }
      })
    },
    mounted() {},

    methods: {
      goBack: function() {
				this.$router.go(-1)
			},
    }
  }

</script>
<style lang='less' scoped>
  @import url('./introduce.less');
</style>