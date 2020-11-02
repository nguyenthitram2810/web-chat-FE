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

    <Search />

		<div class="mesg-peple">
			<ul class="nav nav-tabs nav-tabs--vertical msg-pepl-list">
				<li class="nav-item unread" v-for="d in listConversations" :key="d._id">
					<a :class="d._id == activeConversation ? 'active' : ''" @click="openConversation(d)" data-toggle="tab">
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

    <Modal  
      :visible="visibleAddGroup" 
      @create="createConversation"
      @fetch="fetchUser"
      @add="addUser"
    />
	</div>
</template>

<script>
import Modal from '~/components/Modal'
import Search from '~/components/Search'
import axios from "axios"

export default {
  name: 'SideBar',
  components: {
    Modal, 
    Search
  },
  props: {
    listConversations: Array, 
    user: Object,
  },
  data() {
    return {
			txtSearchMessage: null,
			txtSearchFriend: "",
      visibleAddGroup: false,
      showLinkConversation: false,
      activeConversation: null,
    }
  },

  watch: {
    'listConversations': function(value) {
      this.listConversations = value
    }, 

    '$store.state.conversation.visibleModal': function(value) {
      this.visibleAddGroup = value
    }, 

    '$store.state.conversation.active': function(value) {
      this.activeConversation = value
    },
  },

  methods: {
    searchMessage(event) {
			console.log(this.searchText)
    }, 
    
    showModal() {
      this.$store.commit('conversation/SET_VISIBLE_MODAL', true)
    },
    
    createConversation(value) {
      this.$emit('conversation', value)
    },
    
    fetchUser(value) {
      this.$emit('fetchUser', value)
    },

    addUser(value) {
      this.$emit('addUser', value)
    },

    openConversation(value) {
      this.$emit('open', value._id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>