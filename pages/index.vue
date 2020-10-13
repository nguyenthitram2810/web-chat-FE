<template>
  <section>
		<div class="gap2 no-gap gray-bg">
			<div class="container-fluid px-0">
				<div class="row">
					<div class="col-lg-12 px-0">
						<div class="message-users">
							<div class="message-head">
								<h4>Chat Messages</h4>
								<div class="more">
									<div class="more-post-optns"><a-icon type="form" />
										<ul>
											<li><a-icon type="user-add" />New user</li>
											<li  @click="showModal"><a-icon type="usergroup-add" />New Conversation</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="message-people-srch">
								<a-input-search class="mb-3" v-model="txtSearchMessage" placeholder="Search Message.." style="width: 100%" @change="searchMessage" />
							</div>

							<div class="mesg-peple">
								<ul class="nav nav-tabs nav-tabs--vertical msg-pepl-list">
									<li class="nav-item unread" v-for="d in listConversations" :key="d._id">
										<a @click="openConversation(d._id)" data-toggle="tab">
											<figure>
                        <img v-if="d.avatar != undefined" :src="d.avatar" alt="">
                        <template v-else v-for="el in d.userIds">
                          <img v-if="el._id != user._id" :key="el._id" :src="el.avatar">
                        </template>
												<!-- <span class="status"></span> -->
											</figure>
											<div class="user-name">
												<h6 class="" v-if="d.groupName != undefined">{{ d.groupName }}</h6>
                        <h6 v-else>
                          <template v-for="el in d.userIds">
                            <span v-if="el._id != user._id"  :key="el._id"> {{ el.username }}</span>
                          </template>
                        </h6>
												<span v-if="d.lastUser != undefined">{{ d.lastUser }}</span>
                        <span v-if="d.lastMessage != undefined"> {{ d.lastMessage }}</span>
											</div>
											<!-- <div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>
													</ul>
												</div>
											</div> -->
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div class="tab-content messenger">
							<div class="tab-pane active fade show " >
								<div class="row merged">
									<div class="col-lg-12">
										<div class="mesg-area-head">
											<div class="active-user">
												<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												  <span class="status f-offline"></span>
											  </figure>
												<div>
													<h6 class="unread">Andrew</h6>
													<span>Online</span>
												</div>
											</div>
											<ul class="live-calls">
												<li class="audio-call"><span class="fa fa-phone"></span></li>
												<li class="video-call"><span class="fa fa-video"></span></li>
												<li class="uzr-info"><span class="fa fa-info-circle"></span></li>
												<!-- <li>
                          <a-dropdown>
                            <a-menu slot="overlay">
                              <a-menu-item key="1"> <i class="ti-headphone-alt"></i>Voice Call </a-menu-item>
                              <a-menu-item key="2"> <i class="ti-video-camera"></i>Video Call </a-menu-item>
                            </a-menu>
                            <span><a-icon type="appstore" /></span>
                          </a-dropdown>
												</li> -->
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
											<form method="post">
												<div class="text-area">
													<input type="text" placeholder="write your message here..">
													<a-button @click="sendMessage"><i class="far fa-paper-plane"></i></a-button>
												</div>
											</form>
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

						<template>
						  <div >
						    <a-modal v-model="visibleAddGroup">
                  <template slot="title">
                    <span><i class="fas fa-users mr-3" style="font-size: 20px;"></i> New Conversation</span>
                  </template>

                  <template slot="footer">
                    <a-button key="submit" type="primary" :loading="loading" @click="createConversation">
                      Create
                    </a-button>
                  </template>
                  
                  <a-input v-if="showGroupName" class="mb-3" v-model="createGroup.groupName" placeholder="Group Name">
                    <a-icon slot="prefix" type="team" style="color:rgba(0,0,0,.25)" />
                  </a-input>

                  <a-select
                    mode="multiple"
                    label-in-value
                    :value="value"
                    placeholder="Select Users"
                    style="width: 100%"
                    :filter-option="false"
                    :not-found-content="fetching ? undefined : null"
                    @search="fetchUser"
                    @change="handleChange"
                    class="mb-3"
                  >
                    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                    <a-select-option v-for="d in data" :key="d._id">
                      <div class="d-flex align-items-center">
                        <div class="mr-3">
                          <a-avatar
                            slot="avatar"
                            :src="d.avatar"
                            style="border: 1.5px solid green;"
                          />
                        </div>

                        <div>
                          {{ d.username }}
                        </div>
                      </div>
                    </a-select-option>
                  </a-select>

                  <a-button v-if="showLinkConversation" type="primary" @click="openExistConversation">
                    Go to conversation<a-icon type="right" />
                  </a-button>
						    </a-modal>
						  </div>
						</template>
					</div>
				</div>
			</div>
		</div>	
	</section><!-- content -->
</template>

<script>
import axios from "axios";
export default {
  middleware: "authentication",
  data() {
    return {
			user: JSON.parse(localStorage.getItem("currentUser")), 
			txtSearchMessage: null,
			txtSearchFriend: "",
      visibleAddGroup: false,
      token: localStorage.getItem("token"), 
      timeout: null,
      loading: false,
      data: [],
      value: [],
      fetching: false,
      createGroup: {
        userIds: [],
        groupName: null,
      },
      listConversations: [],
      showGroupName: false,
      showLinkConversation: false,
      existConversation: {},
    }
  },
  created() {
    this.getListConversation();
  },
  watch: {
    'value': function (value) {
      if(value.length >= 2) {
        this.showGroupName = true
      }
      else {
        this.showGroupName = false
        this.createGroup.groupName = null
      }
    }
  },
  methods: {
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

    logout() {
      localStorage.removeItem("currentUser")
		}, 
		
    sendMessage() {

		}, 

		searchMessage(event) {
			console.log(this.searchText)
		}, 

		showModal() {
      this.visibleAddGroup = true;
		},
		
    async createConversation(e) {
      this.loading = true
      try {
        console.log(this.createGroup.groupName)
        console.log(this.createGroup.userIds)
		    if(this.createGroup.groupName == null && this.createGroup.userIds.length >= 2) {
          throw {message: "Ban phai dat ten nhom!"}
        }
        if(this.createGroup.userIds.length <2) {
          delete this.createGroup.groupName
        }
        const response = await axios.post(`http://localhost:5000/api/v1/createConversation`, this.createGroup,
        {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response)
        if(response.data.status == "200") {
          this.listConversations.push(response.data.data.conversation)
        }
        this.loading = false
        this.visibleAddGroup = false;
      }
      catch(e) {
        this.loading = false
        this.$notification["error"]({
          message: 'CREATE ERROR',
          description:
            e.message
        });
      }
		},

    fetchUser(value) {
      try {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(async() => {
          this.fetching = true
          const response = await axios.post(`http://localhost:5000/api/v1/searchFriend`, {
            searchText: value.trim().toUpperCase(),
				  },
          {
            headers: {
              Authorization: 'Bearer ' + this.token,
            }
          }); 
          this.fetching = false
          if(response.data.status == "200") {
            this.data = response.data.data.listUser
          }
          }, 1000); // 1 sec delay
        
			}
			catch(e) {
        this.fetching = false
        this.$notification["error"]({
          message: 'SEARCH ERROR',
          description:
            e.message
        });
			}
    },

    async handleChange(value) {
      Object.assign(this, {
        value,
        data: [],
        fetching: false,
      });

      this.mappingValue(this.value)

      if(value.length > 0) {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/checkExistConversation`,
          {
            params: {
              userIds: this.createGroup.userIds
            },
            headers: {
              Authorization: 'Bearer ' + this.token,
            }
          })
          if(response.data.status == "200") {
            if(response.data.data.conversation != null) {
              this.showLinkConversation = true
              this.existConversation = response.data.data.conversation
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
      }
      else {
        this.showLinkConversation = false
      }
    },
    
    mappingValue(value) {
      this.createGroup.userIds = value.map(e => e.key);
    },

    openConversation(value) {
      console.log(value)
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
