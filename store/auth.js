export const state = () => ({
    currentUser: null,
    token: null
})
    
export const mutations = {
  SET_CURRENT_USER (state, currentUserData) {
    state.currentUser = currentUserData
  },

  SET_TOKEN (state, token) {
    state.token = token
  },
}

export const actions = {
  
}
  