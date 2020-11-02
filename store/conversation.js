export const state = () => ({
    fetching: false,
    data: [],
    existConversation: {},
    visibleModal: false,
    loading: false,
    active: null,
})
    
export const mutations = {
  SET_FETCHING_USER (state, data) {
    state.fetching = data
  },

  SET_RETURN_DATA (state, data) {
    state.data = data
  },

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
    state.active = data
  }
}

export const actions = {
  
}
  