import axios from "axios"
export const state = () => ({
  list: [],
  existConversation: {},
  visibleModal: false,
  loading: false,
  activeConversation: {},
  query: {}, 
  listMessage: []
})
    
export const mutations = {
  SET_EXIST_CONVERSATION(state, data) {
    state.existConversation = data
  }, 
  
  SET_VISIBLE_MODAL(state, data) {
    state.visibleModal = data
  },

  SET_LOADING_MODAL(state, data) {
    state.loading = data
  }, 

  SET_ACTIVE_CONVERSATION(state, data) {
    state.activeConversation = data
  }, 

  SET_LIST(state, data) {
    state.list = data
  }, 

  SET_QUERY(state, query) {
    state.query = { ...query }
  }, 

  SET_LIST_MESSAGE(state, listMessage) {
    state.listMessage = listMessage
  },

  ADD_MESSAGE(state, message) {
    state.listMessage.push(message)
  }, 

  CHANGE_INDEX_CONVERSATION(state, conversation) {
    state.list = state.list.filter(o => o._id !== conversation._id);
    state.list.unshift(conversation) 
  }, 

  PUSH_CONVERSATION(state, conversation) {
    if(state.list.length!= 0) {
      state.list.unshift(conversation) 
    }
    else {
      state.list.push(conversation) 
    }
  }
}

export const actions = {
  async fetchListData({state, commit, rootState}) {
    try {
      const response = await axios.get(`http://78f90e8249d4.ngrok.io/api/v1/listConversations`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.token,
        }
      })
      if(response.data.status == "200") {
        commit('SET_LIST', response.data.data.listConversations)
      }
    } catch (err) {
      throw err
    }
  },

  async open({state, commit, rootState}) {
    try {
      let roomId = state.query.id
      const response = await axios.get(`http://78f90e8249d4.ngrok.io/api/v1/oneConversation`, 
      {
        params: {
          roomId,
        },
        headers: {
          Authorization: 'Bearer ' + rootState.auth.token,
        }
      })
      console.log(response);
      if(response.data.status == "200") {
        commit('SET_ACTIVE_CONVERSATION', response.data.data.conversation)
        commit('SET_LIST_MESSAGE', response.data.data.message)
      }
    } catch (err) {
      throw err
    }
  },

  async create({state, commit, rootState}, { data }) {
    try {
      const response = await axios.post(`http://78f90e8249d4.ngrok.io/api/v1/createConversation`, data,
      {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.token,
        }
      })
      if(response.data.status == "200") {
        console.log(response);
        commit('PUSH_CONVERSATION', response.data.data.conversation)
      }
    } catch (err) {
      throw err
    }
  },

  async checkExist({state, commit, rootState}, { userIds }) {
    try {
      const response = await axios.get(`http://78f90e8249d4.ngrok.io/api/v1/checkExistConversation`,
      {
        params: {
          userIds
        },
        headers: {
          Authorization: 'Bearer ' + rootState.auth.token,
        }
      })
      if(response.data.status == "200") {
        if(response.data.data.conversation != null) {
          commit('SET_EXIST_CONVERSATION', response.data.data.conversation)
        }
        else {
          commit('SET_EXIST_CONVERSATION', null)
        }
      }
    } catch (err) {
      throw err
    }
  },

  async sendMessage({state, commit, rootState}, { content }) {
    try {
      const response = await axios.post(`http://78f90e8249d4.ngrok.io/api/v1/sendMessage`, { 
        content, 
        conversationID: state.query.id, 
        userIds: state.activeConversation.userIds
      },
		  {
      	headers: {
      	  Authorization: 'Bearer ' + rootState.auth.token,
        }
      })
    } catch (err) {
      throw err
    }
  },
}
  