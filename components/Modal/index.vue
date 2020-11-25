  
<template>
  <div >
	  <a-modal v-model="visible" @cancel="handleCancel">
      <template slot="title">
        <span><i class="fas fa-users mr-3" style="font-size: 20px;"></i> New Conversation</span>
      </template>
      <template slot="footer">
        <a-button key="submit" type="primary" :loading="loading" @click="createConversation" :disabled="showLinkConversation">
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

<script>
import { mapState } from "vuex"
import { state } from '~/store/auth'
export default {
  name: 'Modal',
  data() {
    return {
      createGroup: {
        userIds: [],
        groupName: null,
      },
      showGroupName: false,
      value: [],
      fetching: false,
      timeout: null,
      data: [],
      showLinkConversation: false,
    }
  },
  watch: {
    '$store.state.user.fetching': function(value) {
      this.fetching = value
    }, 
    '$store.state.user.list': function(value) {
      this.data = value
    }, 
    'value': function (value) {
      if(value.length >= 2) {
        this.showGroupName = true
      }
      else {
        this.showGroupName = false
        this.createGroup.groupName = null
      }
    }, 
    '$store.state.conversation.existConversation': function(value) {
      if(value != null) {
        this.showLinkConversation = true
      }
      else {
        this.showLinkConversation = false
      }
    }, 
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser, 
      activeConversation: (state) => state.conversation.activeConversation, 
      visible: (state) => state.conversation.visibleModal, 
      existConversation: (state) => state.conversation.existConversation, 
      loading: (state) => state.conversation.loading,
    })
  },

  methods: {
    createConversation() {
      this.$emit('create', this.createGroup)
    },

    fetchUser(value) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async() => {
      this.$emit('fetch', value.trim().toUpperCase())
      }, 1000); // 1 sec delay
    }, 

    handleChange(value) {
      Object.assign(this, {
        value,
        data: [],
        fetching: false,
      });
      this.mappingValue(this.value)
      if(value.length > 0) {
        this.$emit('add', this.createGroup.userIds)
      }
      else {
        this.showLinkConversation = false
      }
    }, 

    openExistConversation() {
    }, 

    mappingValue(value) {
      this.createGroup.userIds = value.map(e => e.key);
    },

    handleCancel() {
      this.$emit('cancel', false);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>