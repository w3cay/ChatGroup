<template> 
  <div class="form-container">
    <div><img v-bind:src="user.avatar "></div>
    <label>昵称</label><input class="form-control" type="" name="" v-model="user.username">
    <label>生日</label><input class="form-control" type="" name="">
  </div>
</template>

<script>
import Vue from 'vue';
import store from '../store/index';

export default {
  data () {
    return {

    }
  },
  computed: {
    user() {
      return store.state.user;
    },
  },
  created() {

  },
  methods: {
   
  },
}
</script>

<style lang="sass">
.form-container {
  width: 90%;
  margin: auto;
}
</style>