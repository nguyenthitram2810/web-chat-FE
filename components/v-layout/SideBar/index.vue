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
					<a class="d-flex" :class="d._id == activeConversation._id ? 'active' : ''" @click="openConversation(d)" data-toggle="tab">
						<figure>
              <img v-if="d.avatar != undefined" :src="d.avatar" alt="">
              <template v-else v-for="el in d.userIds">
                <img v-if="el._id != user._id" :key="el._id" :src="el.avatar">
              </template>
							<!-- <span class="status"></span> -->
						</figure>
						<div class="user-name d-flex flex-column cn-w-100">
							<h6 class="" v-if="d.groupName != undefined">{{ d.groupName }}</h6>
              <h6 v-else>
                <template v-for="el in d.userIds">
                  <span v-if="el._id != user._id"  :key="el._id"> {{ el.username }}</span>
                </template>
              </h6>
              <span class="truncate-2-line" v-if="d.lastUser != undefined">{{ d.lastUser._id == user._id ? 'you: ' : `${d.lastUser.username}: ` }}{{ d.lastMessage }}</span>
						</div>
					</a>
				</li>
			</ul>
		</div>

    <Modal  
      @create="createConversation"
      @fetch="fetchUser"
      @add="addUser"
      @cancel="cancelModal"
    />
	</div>
</template>

<script>
import Modal from '~/components/Modal'
import Search from '~/components/Search'
import { mapState } from 'vuex'

export default {
  name: 'SideBar',
  components: {
    Modal, 
    Search
  },

  data() {
    return {
			txtSearchMessage: null,
			txtSearchFriend: "",
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser, 
      listConversations: (state) => state.conversation.list, 
      activeConversation: (state) => state.conversation.activeConversation, 
    })
  },

  methods: {
    handleError(err) {
      this.$notification["error"]({
        message: 'ERROR',
        description:
          err.message
      });
    },

    searchMessage(event) {
			console.log(this.searchText)
    }, 
    fetchUser(value) {
      this.$emit('fetchUser', value)
    },
    addUser(value) {
      this.$emit('addUser', value)
    },
    showModal() {
      this.$store.commit('conversation/SET_VISIBLE_MODAL', true)
    },
    
    createConversation(value) {
      this.$emit('createConversation', value)
    },

    openConversation(value) {
      this.$emit('open', value._id)
    }, 
    cancelModal(value) {
      this.$store.commit('conversation/SET_VISIBLE_MODAL', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>