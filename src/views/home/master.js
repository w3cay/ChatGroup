/* jslint browser:true */
/* global window */
import Moment from 'moment';
import './index.html';
import './master.scss';

const VueStrap = window.VueStrap;
// Set ES6 template string style delimiters.
// Vue.config.delimiters = ['${', '}'];
// init root Vue instants
new Vue({
  el: '#app',
  data: {
    title: 'ChatGroup',
    test: 'test',
    wordsValue: '',
    timeline: [
    ],
  },
  methods: {
    sendMessage() {
      this.timeline.push({
        name: 'Bright',
        text: this.wordsValue,
        time: Moment().format('Y-MM-DD HH:mm:ss'),
      });
      this.wordsValue = '';
      setTimeout(() => {
        window.location.href = `#mes-${this.timeline.length}`;
      }, 0);
    },
  },
  components: {
    bsInput: VueStrap.input,
  },
});
