/* jslint browser:true */
/* global window */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueValidator from 'vue-validator';
import VueResource from 'vue-resource';

import './index.html';
import './master.scss';
import App from './App.vue';
import UserPortalView from './UserPortalView.vue';
import ChatMainView from './ChatMainView.vue';
import ProfileEditView from './ProfileEditView.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueValidator);
Vue.use(VueResource);


const router = new VueRouter();

router.map({
  '/': {
    name: 'chatMain',
    component: ChatMainView,
  },
  '/user/portal': {
    name: 'portal',
    component: UserPortalView,
  },
  '/user/profile': {
    name: 'profile',
    component: ProfileEditView,
  },
});

router.start(App, '#app');

