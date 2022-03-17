import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    token: null,
    user: null
  },
  mutations: {
    SET_STATUS(state, loggedIn) {
      state.loggedIn = loggedIn
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
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
          context.commit('SET_TOKEN', response.data.token)
          context.commit('SET_STATUS', true)
          // router.push('/account');
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.status == 401) {
            this.passwordError = 'Incorrect email/password.'
            alert('Incorrect email/password.')
          }
        })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('SET_TOKEN', null)
      context.commit('SET_STATUS', false)
      // context.commit('SET_USER', null)
      router.push('/').catch(() => {});
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
          context.commit('SET_TOKEN', response.data.token)
          context.commit('SET_STATUS', true)
          context.commit('SET_USER', response.data)
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data.message)
          router.push('/register').catch(() => {});
        })
    },
    // addItem({}, form) {
    //   axios
    //     .post(`/items`, {
    //       title: form.title,
    //       description: form.description,
    //       categoryID: form.categoryID,
    //       qualityID: form.qualityID,
    //       userID: form.user,
    //       price: form.price
    //     })
    //     .then(response => {
    //       console.log(response.data)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       console.log(error.response.data.message)
    //       router.push('/items').catch(() => {});
    //     })
    // }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
})