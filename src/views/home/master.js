/* jslint browser:true */
/* global window */

import Moment from 'moment';
import ioClient from 'socket.io-client';
// import App from '../../../app.js';
import './index.html';
import './master.scss';

const socket = ioClient('192.168.8.109:8080');

const VueStrap = window.VueStrap;
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
  created() {
    socket.on('new message', (data) => {
      this.timeline.push(data);
    });
  },
  methods: {
    sendMessage() {
      if (this.wordsValue !== '') {
        const mes = {
          name: 'Bright',
          text: this.wordsValue,
          time: Moment().format('Y-MM-DD HH:mm:ss'),
        };
        socket.emit('send message', mes);
        this.timeline.push(mes);
        this.wordsValue = '';
        setTimeout(() => {
          window.location.href = `#mes-${this.timeline.length}`;
        }, 0);
      }
    },
  },
  components: {
    bsInput: VueStrap.input,
  },
});
