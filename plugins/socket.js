
import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

let socket = io('http://localhost:5000/Conversation');
Vue.use(VueSocketIO, socket)