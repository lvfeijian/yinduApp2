<template>
  <div id="login">
    <el-form ref="loginFormRefs" :model="form" :rules="rules" label-width="80px" status-icon>

      <el-form-item prop="name" label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="pass" label="密码">
        <el-input v-model="form.pass" type='password'></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repass">
        <el-input v-model="form.repass"  type='password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button type="info" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {
    Form,
    FormItem,
    Input,
    Button
  } from 'element-ui';
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  Vue.use(Button);
  export default {
    name: 'Login',
    data() {
      return {
        //表单数据
        form: {
          name: '',
          pass: '123',
          repass: ''
        },
        //表单验证规则
        rules: {
          name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          pass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          repass: [{
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    methods:{
      onSubmit(){
        console.log('登录')
      },
      onReset(){
        // console.log(this)
        this.$refs.loginFormRefs.resetFields()
      }
    }
  }
</script>
<style>
  .el-input__inner {
    width: 90%;
  }
</style>
