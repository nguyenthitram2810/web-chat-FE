<template>
  <section>
		<div class="gap2 no-gap gray-bg">
			<div class="container-fluid px-0">
				<div class="row">
					<div class="col-lg-12 px-0">
						<SideBar 
              @open="getConversation"
              @createConversation="createConversation"
              @fetchUser="fetchUser"
              @addUser="addUser"
            />
            <a-empty v-if="listConversations.length == 0" style="height: 638px;" class="d-flex align-items-center justify-content-around" :description="false" />
            <Message 
              v-else 
              @call="callVideo"
            />
					</div>
				</div>
			</div>
		</div>

    <div v-if="incomingCall" class="call-wraper active">
	  	<div class="m-live-call">
	  		<div class="call-box">
	  			<h6>{{ caller.username }}</h6>
	  			<span>incoming call</span>
	  			<i class="ti-microphone"></i>
	  			<div class="wave">
	  				<span class="dot"></span>
	  				<span class="dot"></span>
	  				<span class="dot"></span>
	  			</div>
	  			<ins class="later-rmnd">Remind me later</ins>
	  			<div class="yesorno">
            <a @click="acceptCall" class="bg-purple decline-call" title=""><i class="fa fa-close"></i></a>
	  				<a @click="cancelCall" class="bg-red decline-call" title=""><i class="fa fa-close"></i></a>
	  			</div>
	  		</div>
	  	</div>
	  </div><!-- audio video call popup -->		

    <div v-if="calling" class="call-wraper active">
	  	<div class="m-live-calling">
	  		<div class="call-box">
	  			<h6>Jack Carter</h6>
	  			<span>incoming call</span>
	  			<i class="ti-microphone"></i>
	  			<div class="wave">
	  				<span class="dot"></span>
	  				<span class="dot"></span>
	  				<span class="dot"></span>
	  			</div>
	  			<div class="yesorno">
	  				<a @click="cancelCalling" class="bg-red decline-call" title=""><i class="fa fa-close"></i></a>
	  			</div>
	  		</div>
        <div class="d-flex">
          <video ref="localVideo" class="video__myself" autoplay></video>
          <template v-for="(peer, index) in peers">
            <Video :key="index" :peer="peer"/>
          </template>
        </div>
	  	</div>
      
	  </div><!-- audio video call popup -->
	</section><!-- content -->
</template>

<script>
import SideBar from "~/components/v-layout/SideBar"
import Message from "~/components/Message"
import Video from "~/components/Video"
import { mapState } from 'vuex'
import Peer from "simple-peer"
import io from 'socket.io-client'

export default {
  components: {
    SideBar, 
    Message, 
    Video
  },

  middleware({store, query}) {
    store.commit('conversation/SET_QUERY', query)
  },

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      socket: io.connect('https://multimedia--chat-api.herokuapp.com/Conversation'), 
      socketNotify: io.connect('https://multimedia--chat-api.herokuapp.com/notifyIO'), 
      incomingCall: false,
      calling: false,
      constraints: {
        audio: {
          echoCancellation: true,
          noiseSuppression: true, 
          autoGainControl: false
        },
        video: { 
          width: 450, 
          height: 348 
        }
      },
      //local
      localStream: null,

      //peer
      peers: [], 
      peersRef: [],

      //callee
      roomCall: null,

      //Info caller
      caller: ""
    }
  },

  watch: {
    '$store.state.conversation.list': function(value) {
      const query = this.$route.query;
      if(!query.id && this.listConversations.length > 0) {
        this.getConversation(this.listConversations[0]._id)
      }
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser, 
      token: (state) => state.auth.token, 
      listConversations: (state) => state.conversation.list, 
      params: (state) => state.conversation.query, 
      activeConversation: (state) => state.conversation.activeConversation, 
      listMessage:  (state) => state.conversation.listMessage,
    })
  },

  created() {
    this.getQueryParams()
    this.joinUserNotify()

    this.socket.on('new-message-room', (data) => {
      this.$store.commit('conversation/ADD_MESSAGE', data.returnMessage)
      this.$store.commit('conversation/CHANGE_INDEX_CONVERSATION', data.conversation)
    });

    this.socketNotify.on('notifyMessage', (data) => {
      this.$store.commit('conversation/CHANGE_INDEX_CONVERSATION', data.conversation)
    });

    this.socket.on('all users', (data) => {
      const peers = [];
      data.forEach(socketID => {
        const peer = this.createPeer(socketID, this.socket.id, this.localStream);
        this.peersRef.push({
          peerID: socketID,
          peer,
        })
        peers.push(peer);
      })
      this.peers = peers
    });

    this.socketNotify.on('new call', (data) => {
      this.incomingCall = true
      this.roomCall = data.roomID
      this.caller = data.userCall
    });

    this.socket.on('user joined', (payload) => {
      const peer = this.addPeer(payload.signal, payload.callerID, this.localStream);
      this.peersRef.push({
        peerID: payload.callerID,
        peer,
      })
      
      this.peers.push(peer)
    });

    this.socket.on('receiving returned signal', (payload) => {
      const item = this.peersRef.find(p => p.peerID === payload.id);
      item.peer.signal(payload.signal);
    });
  },

  methods: {
    handleError(err) {
      this.$notification["error"]({
        message: 'ERROR',
        description:
          err.message
      });
    },

    async fetchData() {
      try {
        await this.$store.dispatch('conversation/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    joinUserNotify() {
      this.socketNotify.emit('join', this.user._id)
    }, 

    joinRoom(id) {
      this.socket.emit('join',  id)
    },

    leftRoom(id) {
      this.socket.emit('left', id)
    },

    getQueryParams() {
      if(this.params.id) {
        this.openConversation()
      }
    },

    async fetchUser(value) {
      try {
        await this.$store.dispatch('user/fetchListData', { value : value })
			}
			catch(error) {
        this.$store.commit('conversation/SET_FETCHING_USER', false)
        this.handleError(error)
			}
    },

    async addUser(value) {
      try {
        await this.$store.dispatch('conversation/checkExist', { userIds : value })
      }
      catch(error) {
        this.handleError(error)
      }
    },

    async createConversation(createGroup) {
      try {
        if(!createGroup.groupName && createGroup.userIds.length >= 2) {
          throw {message: "Ban phai dat ten nhom!"}
        }
        if(createGroup.userIds.length < 2) {
          delete createGroup.groupName
        }
        if(createGroup.userIds.length <= 0) {
          throw {message: "Chon thanh vien!"}
        }
        await this.$store.dispatch('conversation/create', { data : createGroup })
        this.getConversation(this.listConversations[0]._id)
        this.$store.commit('conversation/SET_LOADING_MODAL', false)
        this.$store.commit('conversation/SET_VISIBLE_MODAL', false)
      }
      catch(error) {
        this.$store.commit('conversation/SET_LOADING_MODAL', false)
        this.handleError(error)
      }
    },

    getConversation(value) {
      this.$store.commit('conversation/SET_QUERY', { id: value})
      this.$router.push({name: this.$route.name, query: {...this.params} })
      if(this.activeConversation._id){
        this.leftRoom(this.activeConversation._id)
      }
      this.joinRoom(this.params.id)
      this.openConversation()
    },

    async openConversation() {
      try {
        await this.$store.dispatch('conversation/open')
      }
      catch(error) {
        this.handleError(error)
      }
    }, 

    async getUserMedia() {
      if ("mediaDevices" in navigator) {
        try {
          return await navigator.mediaDevices.getUserMedia(this.constraints);
        } catch (error) {
          throw error
        }
      }
    },

    playStream(id, stream) {
      const video = document.getElementById(id);
      video.srcObject = stream;
      video.play()
    },

    async callVideo() {
      try {
        this.calling = true
        navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
          this.localStream = stream
          this.$refs.localVideo.srcObject = this.localStream
          this.socket.emit('join call', this.activeConversation._id)
          this.socketNotify.emit('notify call', { list: this.activeConversation, user: this.user})
        })
      } catch (error) {
        this.handleError(error)
      }
    }, 

    async acceptCall() {
      this.calling = true
      this.incomingCall = false
      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
        this.localStream = stream
        this.$refs.localVideo.srcObject = this.localStream
        this.socket.emit('join call', this.roomCall)
      })
    }, 

    cancelCall() {
      this.socket.emit('disconnect-call', this.roomCall)
      this.incomingCall = false
    }, 

    async cancelCalling() {
      if(this.roomCall) {
        this.socket.emit('disconnect-call', { user: this.socket.id})
      }
      else {
        this.socket.emit('disconnect-call',{ user: this.socket.id})
      }
      this.localStream.getTracks().forEach(function(track) {
        track.stop();
      });
      this.calling = false
    }, 

    //socketID: client in room
    //callerID: ng goi
    //stream: localStream
    createPeer(socketID, callerID, stream) {
      let count = 0
      const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
      });

      peer.on("signal", signal => {
        this.socket.emit("sending signal", { socketID, callerID, signal })
      })

      return peer;
    }, 

    //incomingSignal: signal user join
    //callerID: ID user join
    //stream:localStream
    addPeer(incomingSignal, callerID, stream) {
      let count = 0
      const peer = new Peer({
          initiator: false,
          trickle: false,
          stream,
      })
      peer.on("signal", signal => {
          this.socket.emit("returning signal", { signal, callerID })
      })

      peer.signal(incomingSignal);
      return peer;
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 500px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
