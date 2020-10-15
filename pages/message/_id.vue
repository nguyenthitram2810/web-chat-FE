<template>
  <section>
		<div class="gap2 no-gap gray-bg">
			<div class="container-fluid px-0">
				<div class="row">
					<div class="col-lg-12 px-0">
						<SideBar/>
						<div class="tab-content messenger">
							<div class="tab-pane fade " >
								<div class="row merged">
									<div class="col-lg-12">
										<div class="mesg-area-head">
											<div class="active-user">
                        <figure>
                          <img v-if="activeConversation.avatar != undefined" :src="activeConversation.avatar" alt="">
                          <template v-else v-for="el in activeConversation.userIds">
                            <img v-if="el._id != user._id" :key="el._id" :src="el.avatar">
                          </template>
                        </figure>
												<div>
													<h6 v-if="activeConversation.groupName != undefined" class="unread"> {{ activeConversation.groupName }}</h6>
                          <h6 v-else class="unread"> 
                            <template v-for="el in activeConversation.userIds">
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
											<ul class="conversations">
												<li class="me">
													<figure><img :src="user.avatar" alt=""></figure>
													<div class="text-box">
														<p>HI, i have checked about your query, there is no any problem like that...</p>
														<span><i class="ti-check"></i><i class="ti-check"></i> 2:35PM</span>
													</div>
												</li>

												<li class="you">
													<figure><img :src="user.avatar" alt=""></figure>
													<div class="text-box">
														<p>
															thank you for your quick reply, i am sending you a screenshot
															<em>Size: 106kb <ins>download Complete</ins></em>
														</p>
														<span><i class="ti-check"></i><i class="ti-check"></i> 2:36PM</span>
													</div>
												</li>
                        
												<li class="you">
													<figure><img :src="user.avatar" alt=""></figure>
													<div class="text-box">
														<div class="wave">
															<span class="dot"></span>
															<span class="dot"></span>
															<span class="dot"></span>
														</div>
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
												<div class="media">
													<span>Media</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</section><!-- content -->
</template>

<script>
import SideBar from "~/components/v-layout/SideBar"
import axios from "axios"

export default {
  middleware: "authentication",
  components: {
    SideBar
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("currentUser")), 
      token: localStorage.getItem("token"), 
      activeConversation: {},
      txtMessage: '',
    }
  }, 

  created() {
    this.getConversation()
  },

  methods: {
    async getConversation() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/oneConversation`, 
        {
          params: {
            roomId: this.$route.params.id
          },
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          this.activeConversation = response.data.data.conversation
          console.log(this.activeConversation)
        }
      }
      catch(e) {

      }
    },

    sendMessage() {
      console.log(this.txtMessage)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>