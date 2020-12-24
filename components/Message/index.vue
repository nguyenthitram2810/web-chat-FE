<template>
  <div class="tab-content messenger">
		<div class="tab-pane fade " >
			<div class="row merged">
				<div class="col-lg-12">
					<div class="mesg-area-head">
						<div class="active-user">
              <figure>
                <img v-if="conversation.avatar != undefined" :src="conversation.avatar" alt="">
                <template v-else v-for="el in conversation.userIds">
                  <img v-if=" (user != null) && (el._id != user._id)" :key="el._id" :src="el.avatar">
                </template>
              </figure>
							<div>
								<h6 v-if="conversation.groupName != undefined" class="unread"> {{ conversation.groupName }}</h6>
                <h6 v-else class="unread"> 
                  <template v-for="el in conversation.userIds">
                    <span v-if="(user != null) && (el._id != user._id)"  :key="el._id"> {{ el.username }}</span>
                  </template> 
                </h6>
							</div>
						</div>
						<ul class="live-calls">
							<li class="audio-call"><span class="fa fa-phone"></span></li>
							<li @click="callVideo" class="video-call"><span class="fa fa-video"></span></li>
							<li class="uzr-info"><span class="fa fa-info-circle"></span></li>
						</ul>
					</div>
				</div>

				<div class="col-lg-8 col-md-8">
					<div class="mesge-area">
						<ul ref="conversations" class="conversations">
							<li v-for="(msg, index) in message" :key="index" :class="(user != null) && (msg.memberId[0]._id == user._id) ? 'me' : 'you'">
                <div><span class="my-0 font--10">{{msg.memberId[0].username}}</span></div>
								<figure><img :src="msg.memberId[0].avatar" alt=""></figure>
								<div class="text-box">
									<p>{{msg.content}}</p>
									<span><i class="ti-check"></i><i class="ti-check"></i>{{ formatDate(msg.createdAt)}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="message-writing-box">
						<div class="text-area">
							<a-input @keyup="onKeyUp" @change="typingMessage" v-model="txtMessage" type="text" placeholder="write your message here.."/>
							<a-button @click="sendMessage"><i class="far fa-paper-plane"></i></a-button>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-md-4">
					<div class="chater-info">
						<figure>
              <img v-if="conversation.avatar != undefined" :src="conversation.avatar" alt="">
              <template v-else v-for="el in conversation.userIds">
                <img v-if=" (user != null) && (el._id != user._id)" :key="el._id" :src="el.avatar">
              </template>
            </figure>
						<h6 v-if="conversation.groupName != undefined"> {{ conversation.groupName }}</h6>
            <h6 v-else> 
              <template v-for="el in conversation.userIds">
                <span v-if="(user != null) && (el._id != user._id)"  :key="el._id"> {{ el.username }}</span>
              </template> 
            </h6>
						<div class="userabout">
							<span>About</span>
							<p>Something about this conversation</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'Message', 
  data() {
    return {
      txtMessage: '',
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser, 
      conversation: (state) => state.conversation.activeConversation, 
      message:  (state) => state.conversation.listMessage,
    })
  },

  updated() {
    this.scrollToEnd()
  },

  methods: {
    handleError(err) {
      this.$notification["error"]({
        message: 'ERROR',
        description:
          err.message
      });
    },
    
    scrollToEnd() {    	
      var content = this.$refs.conversations;
      content.scrollTop = content.scrollHeight;
    },

    formatDate(date) {
      if(new Date().toJSON().slice(0,10) == date.slice(0,10)) {
      return moment(date).format('hh:mm');
      }
      else {
      return moment(date).format('MM/DD/YYYY');
      }
    },

    onKeyUp(event) {
      if (event.keyCode === 13) {
        this.sendMessage();
      }
    },

    async sendMessage() {
      if(this.txtMessage.trim() != "") {
        try {
          await this.$store.dispatch('conversation/sendMessage', { content: this.txtMessage })
          this.txtMessage = ''
        }
        catch(error) {
          this.handleError(error)
        }
      }
    }, 

    typingMessage() {
      
    }, 

    callVideo() {
      this.$emit('call');
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>