<template>
   <div class="chat-box" v-cloak>
    <div class="nav">
    </div>
    <div class="main">
     <div class="top-bar">
      <div class="left">
        <img class="group-icon" v-bind:src="user.avatar">
        <span>这是组标题</span>        
      </div>
      <div class="right">
        <span>{{user.username}}</span>
        <img class="avatar" v-bind:src="user.avatar">        
      </div>
     </div>
     <div class="chat-room">
     <div class="mes-list" id="mes-list-box">
       <div v-for="item in timeline" class="mes-item">
         <div class="left">
           <img class="avatar" v-bind:src="item.avatar">
         </div>
         <div class="right">
           <div><span class="nickname">{{item.name }}</span> <span class="time">{{item.time}}</span></div>
           <div class="mes-content">{{item.text}}</div>
         </div>
       </div >
     </div>
       <div class="chat-input">
         <div class="self-info">
           <img class="avatar" v-bind:src="user.avatar">
         </div>
         <textarea class="form-control" id="text-input" v-model="wordsValue" @keyup.enter="sendMessage"></textarea>
       </div>
     </div>
     <div class="right-bar"></div>
   </div>
  </div>
</template>
<style lang="sass">
    div.chat-box {
      height: 100%;
      width: 100%;
    }

    .center {
      text-align: center;
    }

    .nav {
      width: 350px;
      height: 100%;
      border: 1px solid #f0f0f0;
      float: left;
    }

    .avatar {
      width: 35px;
      height: 35px;
      cursor: pointer;
    }

    .main {
      float: left;
      background: #fff;
      width: calc(100% - 350px);
      height: 100%;
      position: relative;

      .chat-room {
        position: relative;
        border: 1px solid #f0f0f0;
        height: calc(100% - 75px);
        width: calc(100% - 350px);

        .mes-item {
          overflow: hidden;
          padding: 10px 20px;
        }

        .mes-item > .left {
          width: 35px;
          float: left;
          margin-right: 10px;
          text-align: center;
          cursor: pointer;
        }

        .mes-item > .right {
          width: calc(100% - 50px);
          float: left;
        }

        .nickname {
          font-weight: 600;
          color: #917070;
          cursor: pointer;
        }

        .time {
          float: right;
        }

        .mes-content {
          margin-top: 5px;
        }

        .mes-list {
          height: calc(100% - 100px);
          width: 100%;
          overflow-y: scroll;
          padding-bottom: 50px;
        }

        .chat-input {
          height: 100px;
          border: 1px solid #f0f0f0;
          width: 100%;
          position: absolute;
          bottom: 0;
        }

        .self-info {
          width: 50px;
          height: 100%;
          float: left;
          text-align: center;
          padding-top: 30px;
        }

        .self-info > .avatar {
          border-radius: 50%;
          width: 35px;
          height: 35px;
        }

        #text-input.form-control {
          border: 0;
          box-shadow: 0 0 0;
          border-radius: 0;
          width: calc(100% - 50px);
          height: 100%;
          background: #fbfbfb;
        }
      }

      .top-bar {
        width: 100%;
        height: 75px;
        border: 1px solid #f0f0f0;
        line-height: 75px;
        font-size: 20px;
        padding: 0 20px;
        
        .left {
          display: inline-block;
        }

        .right {
          display: inline-block;
          float: right;
        }

        .group-icon {
          width: 50px;
        }
      }

      .right-bar {
        width: 350px;
        height: calc(100% - 75px);
        position: absolute;
        top: 75px;
        right: 0;
        border: 1px solid #f0f0f0;
      }
    }
</style>

<script>
import Moment from 'moment';
import Cookies from 'js-cookie';
import ioClient from 'socket.io-client';
import { setUser } from '../../vuex/actions';
import Config from '../../../config.js';

const socket = ioClient(Config.socketIp);
console.log(setUser)
export default {
  data () {
    return {
      title: 'ChatGroup',
      test: 'test',
      wordsValue: '',
      user: '',
      timeline: [],
    }
  },
  vuex: {
    actions: {
      setUser: setUser,
    },
  },
  created() {
    socket.on('new message', (data) => {
      this.timeline.push(data);
      this.scrollBottom();
    });
  },
  route: {
    data: function (transition) {
      if (!window.global.userId) {
        this.$router.go({ name: 'portal', query: {action: 'login'}});
      } else {
        if (this.user === '') {
          this.$http.get(`/users/${window.global.userId}`).then((res) => {
            if (res.status === 200) {
              console.log(res.body);
              this.$dispatch('SETUSER', res.body);
              transition.next({user: res.body});
            }
          });  
        }
      }
    },
  },
  methods: {
    sendMessage() {
      if (this.wordsValue !== '') {
        const mes = {
          name: this.user.username,
          text: this.wordsValue,
          time: Moment().format('Y年MM月DD日 HH:mm'),
          avatar: this.user.avatar,
        };
        
        socket.emit('send message', mes);
        this.timeline.push(mes);
        this.wordsValue = '';
        this.scrollBottom();
      }
    },
    scrollBottom() {
      setTimeout(() => {
        const mesListBox = document.querySelector('#mes-list-box');
        mesListBox.scrollTop = mesListBox.scrollHeight;
      }, 0);
    }
  },
}
</script>