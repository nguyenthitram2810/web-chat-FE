<template>
  <section>
		<div class="gap2 no-gap gray-bg">
			<div class="container-fluid px-0">
				<div class="row">
					<div class="col-lg-12 px-0">
						<SideBar 
              :listConversations="listConversations" 
              :user="user"
              @open="getConversation"
              @fetchUser="fetchUser"
              @addUser="addUser"
              @createConversation="createConversation"
            />
            <a-empty v-if="listConversations.length == 0" style="height: 638px;" class="d-flex align-items-center justify-content-around" :description="false" />
            <Message 
              v-else 
              :conversation="activeConversation" 
              :message="listMessage" 
              :user="user"
              @send="sendMessage"
              @call="callVideo"
            />
					</div>
				</div>
			</div>
		</div>

    <div v-if="incomingCall" class="call-wraper active">
	  	<div class="m-live-call">
	  		<figure><img src="images/resources/author.jpg" alt=""></figure>
	  		<div class="call-box">
	  			<h6>Jack Carter</h6>
	  			<span>incoming call</span>
	  			<i class="ti-microphone"></i>
	  			<div class="wave">
	  				<span class="dot"></span>
	  				<span class="dot"></span>
	  				<span class="dot"></span>
	  			</div>
	  			<ins class="later-rmnd">Remind me later</ins>
	  			<div class="yesorno">
	  				<a @click="cancelCall" class="bg-red decline-call" title=""><i class="fa fa-close"></i></a>
	  			</div>
	  		</div>
	  	</div>
	  </div><!-- audio video call popup -->		

    <Call 
      v-if="calling"
      @cancel="cancelCalling"
    />
    <video id="localVideo" class="video__myself" autoplay></video>
	</section><!-- content -->
</template>

<script>
import SideBar from "~/components/v-layout/SideBar"
import Message from "~/components/Message"
import Call from "~/components/Call"
import axios from "axios"
import * as io from 'socket.io-client'

export default {
  middleware: "authentication",
  components: {
    SideBar, 
    Message, 
    Call
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("currentUser")), 
      token: localStorage.getItem("token"), 
      listConversations: [],
      params: {
        id: String
      }, 
      activeConversation: {}, 
      listMessage: [],
      socket: io('http://localhost:5000/Conversation'), 
      socketNotify: io('http://localhost:5000/notifyIO'), 
      incomingCall: false,
      calling: false,
      // videos
      myVideo: {},
      remoteVideo: {},
      // Media config
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
    }
  },

  watch: {
    'listConversations': function(value) {
      const query = this.$route.query;
      if(!query.id && this.listConversations.length > 0) {
        this.params.id = this.listConversations[0]._id
        this.$router.push({name: this.$route.name, query: {...this.params} })
        this.openConversation(this.params.id)
      }
    }
  },

  created() {
    this.getListConversation();
    this.getQueryParams()
    this.joinUserNotify()

    this.socket.on('new-message-room', (data) => {
      this.listMessage.push(data.returnMessage)
      this.pushNewConversation(data.conversation)
    });

    this.socket.on('notifyMessage', (data) => {
      console.log(data);
      this.pushNewConversation(data.conversation)
    });
  },

  methods: {
    joinUserNotify() {
      this.socketNotify.emit('join', this.user._id)
    }, 

    joinRoom(id) {
      this.socket.emit('join', id)
    },

    leftRoom(id) {
      this.socket.emit('left', id)
    },

    pushNewConversation(conversation) {
      this.listConversations = this.listConversations.filter(o => o._id !== conversation._id);
      this.listConversations.unshift(conversation)
    },

    async getListConversation() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/listConversations`, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          this.listConversations = response.data.data.listConversations
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET LIST CONVERSATION ERROR',
          description:
            e.message
        });
      }
    },

    getQueryParams() {
      const query = this.$route.query
      if(query.id) {
        this.params.id = query.id
        this.joinRoom(query.id)
        this.openConversation(query.id)
      }
    },

    async fetchUser(value) {
      try {
        this.$store.commit('conversation/SET_FETCHING_USER', true)
        const response = await axios.post(`http://localhost:5000/api/v1/searchFriend`, {
          searchText: value
				},
        {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        }); 
        this.$store.commit('conversation/SET_FETCHING_USER', false)
        if(response.data.status == "200") {
          this.$store.commit('conversation/SET_RETURN_DATA', response.data.data.listUser)
        } 
			}
			catch(e) {
        this.$store.commit('conversation/SET_FETCHING_USER', false)
        this.$notification["error"]({
          message: 'SEARCH ERROR',
          description:
            e.message
        });
			}
    },

    async addUser(value) {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/checkExistConversation`,
        {
          params: {
            userIds: value
          },
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          if(response.data.data.conversation != null) {
            this.$store.commit('conversation/SET_EXIST_CONVERSATION', response.data.data.conversation)
          }
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'CHECK CONVERSATION ERROR',
          description:
            e.message
        });
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
        const response = await axios.post(`http://localhost:5000/api/v1/createConversation`, createGroup,
        {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          this.listConversations.unshift(response.data.data.conversation)
          this.getConversation(this.listConversations[0]._id)
        }
        this.$store.commit('conversation/SET_LOADING_MODAL', false)
        this.$store.commit('conversation/SET_VISIBLE_MODAL', false)
      }
      catch(e) {
        this.$store.commit('conversation/SET_LOADING_MODAL', false)
        this.$notification["error"]({
          message: 'CREATE ERROR',
          description:
            e.message
        });
      }
    },

    getConversation(value) {
      const query = this.$route.query
      this.params.id = value
      this.$router.push({name: this.$route.name, query: {...this.params} })
      this.leftRoom(this.activeConversation._id)
      this.joinRoom(this.params.id)
      this.openConversation(this.params.id)
    },

    async openConversation(value) {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/oneConversation`, 
        {
          params: {
            roomId: value
          },
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        this.$store.commit('conversation/SET_ACTIVE_CONVERSATION', value)
        if(response.data.status == "200") {
		      this.activeConversation = response.data.data.conversation
          this.listMessage = response.data.data.message
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET CONVERSATION ERROR',
          description:
            e.message
        });
      }
    }, 

    async sendMessage(value) {
      try {
        const response = await axios.post(`http://localhost:5000/api/v1/sendMessage`, { 
          content: value, 
          conversationID: this.params.id, 
          userIds: this.activeConversation.userIds
        },
		    {
        	headers: {
        	  Authorization: 'Bearer ' + this.token,
          }
        })
      }
      catch(e) {
        this.$notification["error"]({
          message: 'SEND MESSAGE ERROR',
          description:
            e.message
        });
      }
    }, 

    async getUserMedia() {
      if ("mediaDevices" in navigator) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
          const video = document.getElementById("localVideo");
          video.srcObject = stream;
          video.play()
        } catch (error) {
          console.log(`getUserMedia error: ${error}`);
        }
      }
    },

    async callVideo() {
      this.calling = true;
      await this.getUserMedia()
    }, 

    acceptCall() {

    }, 

    cancelCall() {
      this.incomingCall = false
    }, 

    acceptCalling() {

    },

    cancelCalling() {
      this.calling = false
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
