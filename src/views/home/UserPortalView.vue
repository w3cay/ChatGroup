<template> 
<div class="portal-container" >
  <h1>ChatGroup</h1>
  <div class="login-box form-group" v-if="type == 1">
    <input class="form-control" type="text" name="" placeholder="手机号">
    <input class="form-control" type="password" name="" placeholder="密码">
    <button class="btn btn-primary">登录</button>
    <a class="signup" href="javascript:void(0);" @click="toSignUp">没有账号？注册一个</a>
  </div>
  <div class="sign-box form-group" v-else transition="slide">
    <input class="form-control" type="text" name="" placeholder="手机号">
    <input class="form-control" type="text" name="" placeholder="昵称">
    <input class="form-control" type="password" name="" placeholder="密码">
    <input class="form-control" type="password" name="" placeholder="确认密码">
    <button class="btn btn-primary">注册</button>
  </div>
</div>
</template>
<style lang="sass">

  .portal-container {
    width: 300px;
    margin: 200px auto;
    text-align: center;
    h1 {
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      font-weight: 800;
      color: #514f50;
      margin-bottom: 50px;
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
  }

    /* 必需 */
  .slide-transition {
    transition: all .3s ease;
    position: relative;
    right: 0;
    opacity: 1;
  }

  /* .slide-enter 定义进入的开始状态 */
  /* .slide-leave 定义离开的结束状态 */
  .slide-enter, .slide-leave {
    position: relative;
    right: -500px;
    opacity: 0;
  }
</style>
<script>
import VueStrap from 'vue-strap';
export default {
  data () {
    return {
      title: 'ChatGroup',
      // type 1：登录 2：注册
      type: 1,
    }
  },
  methods: {
    toSignUp() {
      this.type = 2;
    },
  },
  component: {},
}
</script>