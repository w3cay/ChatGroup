import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 创建一个对象来保存应用启动时的初始状态
const state = {
  count: 0,
  user: {},
};

const mutations = {
 INCREMENT (state) {
    state.count++
  }
};

export default new Vuex.Store({
  state,
  mutations,
});

