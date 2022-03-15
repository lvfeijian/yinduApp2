<!-- 登录页 -->
<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/img/login/bg.png" alt="">
    </div>
    <div class="title">{{$t("login")}}</div>
    <div class="content">
      <section>
        <img src="@/assets/img/login/user.svg" alt="" class="icon" />
        <div class="block">
          <p class="city_code">+57</p>
          <input class="userInput" type="number" v-model="phone" @input="changeNumber" :placeholder="$t('account_number')" :max="phoneLength">
        </div>
      </section>
      <section>
        <img src="@/assets/img/login/pwd.svg" alt="" class="icon" />
        <div class="block">
          <input class="pwdInput" type="password" v-model="password" :placeholder="$t('password')" maxlength="18">
        </div>
      </section>
      <div class="login_btn" @click="handleLogin">{{$t('password')}}</div>
      <div class="switch" @click="goLink">{{$t('registered_account')}}></div>
      <!-- <div class="tips">{{$t('login_tips')}}</div> -->
    </div>
    
      
  </div>
</template>

<script>
import Vue from 'vue';
import {
  userLogin
} from '@/network/login'
import { Notify ,Toast } from 'vant';
Vue.use(Notify);
Vue.use(Toast);
export default {
  data () {
    return {
      phone: '',
      password: '',
      loading: false,
      phoneLength: 10
    }
  },

  components: {},

  computed: {
    login() {
      return this.$t("login");
    }
  },

  mounted() {
    const token = window.localStorage.getItem('token')
    if(token){
    }
  },

  methods: {
    changeNumber(){
      if(this.phone.length>this.phoneLength){
        this.phone = this.phone.slice(0,this.phoneLength)
      }
    },
    handleLogin(){
      if(this.phone.trim().length != this.phoneLength){
        Notify({ type: 'danger', message: this.$t('phone_error') });
        return
      }
      if(this.password.trim().length < 6){
        Notify({ type: 'danger', message: this.$t('password_length_tip') });
        return
      }
      Toast.loading({
        message: this.$t('login')+ '...',
        forbidClick: true,
        duration: 10000
      });
      userLogin({
        phone: this.phone,
        password: this.password
      }).then(res => {
        if(res.code == 1){
          localStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      })
    },
    goLink(){
      this.$router.push({
        path: '/register'
      })
    }
  }
}

</script>
<style lang='less' scoped>
  @import url('./login.less');
</style>