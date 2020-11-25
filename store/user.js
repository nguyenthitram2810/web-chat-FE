import axios from "axios"
export const state = () => ({
  list: [],
  fetching: false,
})
    
export const mutations = {
  SET_LIST(state, data) {
    state.list = data
  }, 
  SET_FETCHING_USER (state, data) {
    state.fetching = data
  },
}

export const actions = {
  async fetchListData({state, commit, rootState}, { value }) {
    try {
      commit('SET_FETCHING_USER', true)
      const response = await axios.post(`http://78f90e8249d4.ngrok.io/api/v1/searchFriend`, {
        searchText: value
			},
      {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.token,
        }
      });
      commit('SET_FETCHING_USER', false)
      if(response.data.status == "200") {
        commit('SET_LIST', response.data.data.listUser)
      }
    } catch (err) {
      commit('SET_FETCHING_USER', false)
      throw err
    }
  },
}
  