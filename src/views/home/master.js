/* jslint browser:true */
/* global window */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueValidator from 'vue-validator';

import './index.html';
import './master.scss';
import App from './App.vue';
import UserPortalView from './UserPortalView.vue';
import ChatMainView from './ChatMainView.vue';

Vue.use(VueRouter);
Vue.use(VueValidator);

const router = new VueRouter();

router.map({
  '/': {
    component: ChatMainView,
  },
  '/user/portal': {
    component: UserPortalView,
  },
});

router.start(App, '#app');
