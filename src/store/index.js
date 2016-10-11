import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';

Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态
const state = {
  user: {},
};

const mutations = {
  setUser (state, user) {
    state.user = user;
  },
};

export default new Vuex.Store({
  actions,
  mutations,
});


