<!-- 注册页 -->
<template>
  <div class="register">
    <div class="logo">
      <img src="@/assets/img/login/bg.png" alt="">
    </div>
    <div class="title">{{$t('register')}}</div>
    <div class="content">
      <section>
        <img src="@/assets/img/login/user.svg" alt="" class="icon" />
        <div class="block">
          <p class="city_code">+57</p>
          <input class="userInput" type="number" ref="phone" v-model="phone" @input="changeNumber" :placeholder="$t('phone_number')" :maxlength="phoneLength">
        </div>
      </section>
      <section>
        <img src="@/assets/img/login/pwd.svg" alt="" class="icon" />
        <div class="block">
          <input class="pwdInput" type="password" ref="password" v-model="password" :placeholder="$t('input_password')" maxlength="18">
        </div>
      </section>
      <section>
        <img src="@/assets/img/login/pwd.svg" alt="" class="icon" />
        <div class="block">
          <input class="confirmPwdInput" type="password" v-model="confirmPassword" :placeholder="$t('confirm_password')" maxlength="18">
        </div>
      </section>
      <section>
        <img src="@/assets/img/login/invitation .svg" alt="" class="icon" />
        <div class="block">
          <input class="code" :disabled="isInvite" ref="code" type="text" v-model="code" :placeholder="$t('invitation_code')">
        </div>
      </section>
      <div class="register_btn" @click="handleRegister">{{$t('register')}}</div>
      <div class="switch" @click="goLink">{{$t('login_account')}}></div>
      <div class="down_app" @click="goDownload">{{$t('download_app')}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  userRegister
} from '@/network/register'
import { Notify } from 'vant';
import { Toast } from 'vant';
Vue.use(Toast);
Vue.use(Notify);
export default {
  data () {
    return {
        phone: '',
        password: '',
        confirmPassword: '',
        code: '',
        isInvite: false,
        phoneLength: 10,
    }
  },

  components: {},

  computed: {},
  created(){
    this.code = this.$route.query.code || ''
    if(this.code != ''){
      this.isInvite = true
    }
  },
  mounted() {
  },

  methods: {
    changeNumber(){
      if(this.phone.length>this.phoneLength){
        this.phone = this.phone.slice(0,this.phoneLength)
      }
    },
    // 注册
    handleRegister(){
      if(this.phone.trim().length != this.phoneLength){
        Toast(this.$t('phone_error'));
        this.$refs.phone.focus()
        return
      }
      if(this.password.trim().length < 6){
        Toast(this.$t('password_length_tip'));
        this.$refs.password.focus()
        return
      }
      if(this.confirmPassword != this.password){
        Toast(this.$t('pwd_inconsistent'));
        return
      }
      if(this.code.length == 0){
        Toast(this.$t('fill_code'));
        this.$refs.code.focus()
        return
      }
      Toast.loading({
        message: this.$t('register') + '...',
        forbidClick: true,
        duration: 10000
      });
      userRegister({
        phone: this.phone,
        password: this.password,
        repassword: this.confirmPassword,
        code: this.code
      }).then(res => {
        if(res.code == 1){
          this.$router.push('/login')
          Toast(this.$t('register_success'));
        }
      })
    },
    goLink(){
      this.$router.push({
        path: '/login'
      })
    },
    goDownload(){
      this.$router.push({
        path: '/appDownload'
      })
    }
  }
}

</script>
<style lang='less' scoped>
  @import url('./register.less');
</style>