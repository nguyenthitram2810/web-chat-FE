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
            />
					</div>
				</div>
			</div>
		</div>	
	</section><!-- content -->
</template>

<script>
import SideBar from "~/components/v-layout/SideBar"
import Message from "~/components/Message"
import axios from "axios"
import * as io from 'socket.io-client'

export default {
  middleware: "authentication",
  components: {
    SideBar, 
    Message
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
    }
  },

  watch: {
    'listConversations': function(value) {
      const query = this.$route.query
      console.log(this.listConversations);
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
      console.log(data)
      this.listMessage.push(data.returnMessage)
    });
  },

  methods: {
    joinUserNotify() {
      this.socketNotify.emit('join', this.user._id)
    }, 

    joinRoom(id) {
      this.socket.emit('join', id)
    },

    async getListConversation() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/listConversations`, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response)
        if(response.data.status == "200") {
          this.listConversations = response.data.data.listConversations
          this.listConversations.forEach(e => {
            this.joinRoom(e._id)
          });
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
        console.log(response)
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
        console.log(response)
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
        console.log(response);
      }
      catch(e) {
        this.$notification["error"]({
          message: 'SEND MESSAGE ERROR',
          description:
            e.message
        });
      }
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
