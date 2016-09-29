<template> 
<div class="portal-container" >
  <h1>ChatGroup</h1>
<!-- 登录模块 -->
    <div class="form-box form-group" v-if="$route.query.action == 'login'" transition="slideright">
      <validator name="loginForm" @touched="hasLoginTouched = true">
      <div class="input-box">
        <input class="form-control" type="text" name="" placeholder="手机号" v-model="loginForm.mobile" v-validate:mobile="{ minlength: 11, maxlength: 11 }">
        <span v-show="$loginForm.mobile.minlength && hasLoginTouched" class="glyphicon glyphicon-remove"></span>
      </div>

      <div class="input-box">
        <input class="form-control" type="password" name="" placeholder="密码" v-model="loginForm.password" v-validate:password="{ minlength: 6 }">

        <span v-show="$loginForm.password.minlength && hasLoginTouched" class="glyphicon glyphicon-remove"></span>
      </div>

      <button class="btn btn-primary"  @click="loginSubmit">登录</button>
      <div class="error-container">
        <div v-if="loginErrorMessage" class="login-error alert alert-warning" role="alert">{{loginErrorMessage}}</div>
      </div>

      <a class="signup" href="javascript:void(0);" @click="changeAction">没有账号？注册一个</a>

      </validator>
    </div>

<!-- 注册模块 -->
  <div class="form-box form-group" v-if="$route.query.action == 'signup'" transition="slideleft">
    <validator name="signForm" >
    
    <div class="input-box">
      <input class="form-control" type="text" name="" placeholder="手机号" v-model="signForm.mobile" v-validate:mobile="{ minlength: 11, maxlength: 11 }">
      <span v-show="$signForm.mobile.minlength && hasSignTouched" class="glyphicon glyphicon-remove"></span>
      <span v-show="$signForm.mobile.maxlength && hasSignTouched" class="glyphicon glyphicon-remove"></span>
    </div>
    <div class="input-box">
      <input class="form-control" type="text" name="" placeholder="昵称" v-model="signForm.username" v-validate:username="['required']">
      <span v-show="$signForm.username.required && hasSignTouched" class="glyphicon glyphicon-remove"></span>
    </div>
    <div class="input-box">
      <input class="form-control" type="password" name="" placeholder="密码" v-model="signForm.passwordA" v-validate:passworda="{ minlength: 6 }">
      <span v-show="$signForm.passworda.minlength && hasSignTouched" class="glyphicon glyphicon-remove"></span>
    </div>
    <div class="input-box">
      <input class="form-control" type="password" name="" placeholder="确认密码" v-model="signForm.passwordB">
      <span v-show="signForm.passwordB !== signForm.passwordA  && hasSignTouched" class="glyphicon glyphicon-remove"></span>
    </div>  
      <button class="btn btn-primary"  @click="signUpSubmit">注册</button>
      <div class="error-container">
        <div v-if="signErrorMessage" class="login-error alert alert-warning" role="alert">{{signErrorMessage}}</div>
      </div>
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
        username: '',
        passwordA: '',
        passwordB: '',
      },
      hasLoginTouched: false,
      hasSignTouched: false,
      loginErrorMessage : '',
      signErrorMessage : '',
    }
  },
  created() {
    if (window.global.userId) {
      this.$router.go({ name: 'chatMain'});
    }
  },
  methods: {
    changeAction () {
      const goAction 
      = this.$route.query.action == 'login' ? 'signup' : 'login';
      this.$router.go({ name: 'portal', query: {action: goAction}});
    },
    signUpSubmit() {
      this.hasSignTouched = true;
      if (this.$signForm.valid) {
        this.$http.post('/users',{
          username: this.signForm.username,
          mobile: this.signForm.mobile,
          password: this.signForm.passwordB,
        }).then((res) => {
          if (res.status === 200) {
            this.$router.go({ name: 'portal', query: {action: 'login'}});
          }
        });
      }
    },
    loginSubmit() {
      this.hasLoginTouched = true;
      if (this.$loginForm.valid) {
        this.$http.post('/users/login',{
          mobile: this.loginForm.mobile,
          password: this.loginForm.password,
        }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            window.global.userId =  res.body.userId;
            this.$router.go({ path: '/' });
          } else {
            this.loginErrorMessage = res.body.message;
          }
        },(err) => {
          this.loginErrorMessage = err.body.message;
        });
      }
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

  .login-error.alert.alert-warning {
    margin: 10px;
    padding: 5px;
  }

  .error-container {
    height: 65px;
    border: 1px solid #fff;
  }

</style>