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
                  <img v-if="el._id != user._id" :key="el._id" :src="el.avatar">
                </template>
              </figure>
							<div>
								<h6 v-if="conversation.groupName != undefined" class="unread"> {{ conversation.groupName }}</h6>
                <h6 v-else class="unread"> 
                  <template v-for="el in conversation.userIds">
                    <span v-if="el._id != user._id"  :key="el._id"> {{ el.username }}</span>
                  </template> 
                </h6>
							</div>
						</div>
						<ul class="live-calls">
							<li class="audio-call"><span class="fa fa-phone"></span></li>
							<li class="video-call"><span class="fa fa-video"></span></li>
							<li class="uzr-info"><span class="fa fa-info-circle"></span></li>
						</ul>
					</div>
				</div>

				<div class="col-lg-8 col-md-8">
					<div class="mesge-area">
						<ul ref="conversations" class="conversations">
							<li v-for="(msg, index) in message" :key="index" :class="msg.memberId[0]._id == user._id ? 'me' : 'you'">
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
							<a-input v-model="txtMessage" type="text" placeholder="write your message here.."/>
							<a-button @click="sendMessage"><i class="far fa-paper-plane"></i></a-button>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-md-4">
					<div class="chater-info">
						<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt=""></figure>
						<h6>Andrew</h6>
						<span>Online</span>
						<div class="userabout">
							<span>About</span>
							<p>I love reading, traveling and discovering new things. You need to be happy in life.</p>
							<ul>
								<li><span>Phone:</span> +123976980</li>
								<li><span>Website:</span> <a href="#" title="">www.abc.com</a></li>
								<li><span>Email:</span> <a href="http://wpkixx.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="1c6f7d716c70795c7b717d7570327f7371">[email&#160;protected]</a></li>
								<li><span>Phone:</span> Ontario, Canada</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Message', 
  props: {
    user: Object,
    conversation: Object,
    message: Array
  },
  data() {
    return {
      txtMessage: '',
    }
  },

  watch: {
    'conversation': function(value) {
      this.conversation = value
    }, 

    'message': function(value) {
      this.message = value
    }
  }, 

  updated() {
    this.scrollToEnd()
  },

  methods: {
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

    sendMessage() {
      if(this.txtMessage.trim() != "") {
        this.$emit('send', this.txtMessage);
        this.txtMessage = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>