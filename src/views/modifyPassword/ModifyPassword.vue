<!-- 修改密码 -->
<template>
  <div class="modify_password">
    <div class="header">
      <van-nav-bar
        title="CHANGE PASSWORD"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <input type="text" v-model="password" maxlength="18" placeholder="CHANGE NEW PASSWORD">
      <input type="text" v-model="confirmPwd" maxlength="18" placeholder="CONFIRM THE NEW PASSWORD">
    </div>
    <div class="ok" @click="submit">ok</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Notify } from 'vant';
Vue.use(NavBar);
Vue.use(Notify);
import {
  changePassword
} from '@/network/mine'
  export default {
    data() {
      return {
        password:'',
        confirmPwd:''
      };
    },

    components: {},

    computed: {},

    mounted() { },

    methods: {
      submit(){
        if(this.password.trim().length<6){
          return Notify({ type: 'danger', message: 'password length is greater than 6 digits' });
        }
        if(this.confirmPwd != this.password){
          return Notify({ type: 'danger', message: 'two passwords are inconsistent' });
        }
        changePassword({
          password: this.password,
          repassword: this.confirmPwd
        }).then(res => {
          if(res.code == 1){
            window.localStorage.removeItem("token");
            this.$router.push('/login')
          }
        })
      },
      onClickLeft(){
        this.$router.push({
          path: 'mine'
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  @import url('./modifyPassword.less');
</style>