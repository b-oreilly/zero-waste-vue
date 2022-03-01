import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
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
          this.user = response.data
          localStorage.setItem('token', response.data.token)
          context.commit('SET_USER_STATUS', true)
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          // router.push('/login');
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
          first_name: credentials.first_name,
          last_name: credentials.last_name,
          email: credentials.email,
          username: credentials.username,
          password: credentials.password
        })
        .then(response => {
          console.log(response.token)
          console.log(response.data)
          localStorage.setItem('token', response.data.token)
          context.commit('SET_USER_STATUS', true)
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data.message)
          router.push('/register').catch(() => {});
        })
    },
    addItem() {
      axios
        .post(`/items`, {
          title: this.form.name,
          description: this.form.description,
          category: this.form.category,
          price: this.form.price
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data.message)
          router.push('/items').catch(() => {});
        })
    }
  },
  getters: {}
})