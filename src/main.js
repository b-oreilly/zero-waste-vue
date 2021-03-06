import Vue from 'vue'
import '@/config.js'
import '@/assets/main.css'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router.js'
import store from '@/store.js'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
