<template> 
<div class="portal-container" >
  <h1>ChatGroup</h1>

    <div class="form-box form-group" v-if="hasAccount" transition="slideright">
      <validator name="loginForm" @touched="hasLoginTouched = true">
      <div class="input-box">
        <input class="form-control" type="text" name="" placeholder="手机号" v-model="loginForm.mobile" v-validate:mobile="{ minlength: 11, maxlength: 11 }">
        <span v-show="$loginForm.mobile.minlength && hasLoginTouched" class="glyphicon glyphicon-remove"></span>
      </div>

      <div class="input-box">
        <input class="form-control" type="password" name="" placeholder="密码" v-model="loginForm.password" v-validate:password="{ minlength: 6 }">

        <span v-show="$loginForm.password.minlength && hasLoginTouched" class="glyphicon glyphicon-remove"></span>
      </div>

      <button class="btn btn-primary"  @click="hasLoginTouched = true">登录</button>

      <a class="signup" href="javascript:void(0);" @click="changeAction">没有账号？注册一个</a>

      </validator>
    </div>

  <div class="form-box form-group" v-else transition="slideleft">
    <validator name="signForm" >
    
    <div class="input-box">
      <input class="form-control" type="text" name="" placeholder="手机号" v-model="signForm.mobile" v-validate:mobile="{ minlength: 11, maxlength: 11 }">
      <span v-show="$signForm.mobile.minlength && hasSignTouched" class="glyphicon glyphicon-remove"></span>
      <span v-show="$signForm.mobile.maxlength && hasSignTouched" class="glyphicon glyphicon-remove"></span>
    </div>
    <div class="input-box">
      <input class="form-control" type="text" name="" placeholder="昵称" v-model="signForm.nickname" v-validate:nickname="['required']">
      <span v-show="$signForm.nickname.required && hasSignTouched" class="glyphicon glyphicon-remove"></span>
    </div>
    <div class="input-box">
      <input class="form-control" type="password" name="" placeholder="密码" v-model="signForm.passwordA" v-validate:passworda="{ minlength: 6 }">
      <span v-show="$signForm.passworda.minlength && hasSignTouched" class="glyphicon glyphicon-remove"></span>
    </div>
    <div class="input-box">
      <input class="form-control" type="password" name="" placeholder="确认密码" v-model="signForm.passwordB">
      <span v-show="signForm.passwordB !== signForm.passwordA  && hasSignTouched" class="glyphicon glyphicon-remove"></span>
    </div>  
      <button class="btn btn-primary" @click="hasSignTouched = true">注册</button>
      <a class="signup" href="javascript:void(0);" @click="changeAction">已有账号，去登陆</a>
    </validator>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import VueStrap from 'vue-strap';

export default {
  data () {
    return {
      loginForm:{
        mobile: '',
        password: '',
      },
      signForm: {
        mobile: '',
        nickname: '',
        passwordA: '',
        passwordB: '',
      },
      hasLoginTouched: false,
      hasSignTouched: false,
      // type 1：登录 2：注册
      hasAccount: true,
    }
  },
  methods: {
    changeAction() {
      this.hasAccount = this.hasAccount ? false : true;
    },
    signUpSubmit() {
      //
    },
    loginAction() {
      //
    },
  },
  component: {},
}
</script>

<style lang="sass">

  .portal-container {
    width: 300px;
    margin: 200px auto;
    text-align: center;
    position: relative;
    h1 {
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      font-weight: 800;
      color: #514f50;
      margin-bottom: 20px;
    }

    a {
      margin-top: 30px;
      display: inline-block;
    }

    input {
      margin-top: 30px;
      height: 40px;
    }
    button {
      margin-top: 30px;
      width: 100%;
      height: 40px;
    }

    .form-box {
        position: absolute;
        width: 100%;
    }
  }

    /* 必需 */
  .slideleft-transition {
    transition: all .3s ease;
    right: 0;
    opacity: 1;
  }

  /* .slide-enter 定义进入的开始状态 */
  /* .slide-leave 定义离开的结束状态 */
  .slideleft-enter, .slideleft-leave {
    right: -500px;
    opacity: 0;
  }

    /* 必需 */
  .slideright-transition {
    transition: all .3s ease;
    left: 0;
    opacity: 1;
  }

  /* .slide-enter 定义进入的开始状态 */
  /* .slide-leave 定义离开的结束状态 */
  .slideright-enter, .slideright-leave {
    left: -500px;
    opacity: 0;
  }

  .glyphicon {
    float: right;
    position: absolute;
    top: 3px;
    right: 2px;
    display: inline-block;
    color: #ea3131;
    /* border: 1px solid #000; */
    height: 35px;
    width: 25px;
    line-height: 32px;
    background: #fff;
  }

  .input-box {
    position: relative;
  }

</style>