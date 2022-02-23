import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  getters: {},
  mutations: {
    SET_USER_STATUS(state, loggedIn) {
      state.loggedIn = loggedIn
    }
  },
  actions: {
    login(context, credentials) {
      axios
        .post(`/login`, {
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          console.log(response.data)
          localStorage.setItem('token', response.data.token)
          context.commit('SET_USER_STATUS', true)
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          router.push('/login');
        })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('SET_USER_STATUS', false)
      router.push('/login').catch(() => {});
    },
    register(context, credentials) {
      axios
        .post(`/register`, {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          console.log(response.token)
          localStorage.setItem('token', response.data.token)
          context.commit('SET_USER_STATUS', true)
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data.message)
          router.push('/register').catch(() => {});
        })
    }
  },
  modules: {}
})