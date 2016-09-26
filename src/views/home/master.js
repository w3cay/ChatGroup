/* jslint browser:true */
/* global window */
import Vue from 'vue';
import VueRouter from 'vue-router';

import './index.html';
import './master.scss';
import App from './App.vue';
import UserAccountView from './UserAccountView.vue';
import ChatMainView from './ChatMainView.vue';

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
  '/': {
    component: ChatMainView,
  },
  '/user/account': {
    component: UserAccountView,
  },
});

router.start(App, '#app');
