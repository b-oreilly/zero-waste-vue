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
    SET_STATUS(state, loggedIn) {
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
          localStorage.setItem('user', JSON.stringify(response.data.user))
          context.commit('SET_STATUS', true)
          router.push('/account');
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
      localStorage.removeItem('user')
      context.commit('SET_STATUS', false)
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
          localStorage.setItem('user', JSON.stringify(response.data.user))
          context.commit('SET_STATUS', true)
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
          title: this.form.title,
          description: this.form.description,
          userID: localStorage.getItem("user"._id),
          categoryID: this.form.category,
          qualityID: this.form.quality,
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