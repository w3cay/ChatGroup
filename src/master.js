/* jslint browser:true */
/* global window */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import VueValidator from 'vue-validator';
import VueResource from 'vue-resource';


import './views/index.html';
import './master.scss';
import App from './components/App.vue';
import store from './store/index';
import UserPortalView from './components/UserPortalView.vue';
import ChatMainView from './components/ChatMainView.vue';
import ProfileEditView from './components/ProfileEditView.vue';

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

sync(store, router);
router.start(App, '#app');
