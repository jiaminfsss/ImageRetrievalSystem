import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
    msg:'我是vuex!'
  },
  mutations: {
    setLogin (state, data) {
      state.isLogin = data
    },
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {},
  getters:{},
})

