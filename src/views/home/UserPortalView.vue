<template> 
<div class="portal-container" >
  <h1>ChatGroup</h1>
  <div class="form-box form-group" v-if="hasAccount"  transition="slideright">
    <input class="form-control" type="text" name="" placeholder="手机号">
    <input class="form-control" type="password" name="" placeholder="密码">
    <button class="btn btn-primary">登录</button>
    <a class="signup" href="javascript:void(0);" @click="changeAction">没有账号？注册一个</a>
  </div>
  <div class="form-box form-group" v-else transition="slideleft">
    <input class="form-control" type="text" name="" placeholder="手机号">
    <input class="form-control" type="text" name="" placeholder="昵称">
    <input class="form-control" type="password" name="" placeholder="密码">
    <input class="form-control" type="password" name="" placeholder="确认密码">
    <button class="btn btn-primary">注册</button>
    <a class="signup" href="javascript:void(0);" @click="changeAction">已有账号，去登陆</a>
  </div>
</div>
</template>
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

</style>
<script>
import VueStrap from 'vue-strap';
export default {
  data () {
    return {
      title: 'ChatGroup',
      // type 1：登录 2：注册
      hasAccount: true,
    }
  },
  methods: {
    changeAction() {
      this.hasAccount = this.hasAccount ? false : true;
    },
  },
  component: {},
}
</script>