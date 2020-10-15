<template>
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
					<a @click="openConversation(d)" data-toggle="tab">
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
					</a>
				</li>
			</ul>
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
</template>

<script>
import axios from "axios"

export default {
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
        console.log(response)
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
      this.$router.push({ path: `/message/${value._id}`})
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>