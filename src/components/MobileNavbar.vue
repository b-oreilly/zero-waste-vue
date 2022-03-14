<template>
  <div>
    <v-toolbar flat>
      <v-col cols="3">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
      <v-col class="d-flex justify-space-around">
        <router-link to="/">
          <v-toolbar-title id="title">
            Zero Waste
          </v-toolbar-title>
        </router-link>
      </v-col>

      <!-- Mobile menu - items -->
      <v-col cols="3" class="d-flex justify-end">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-navigation-drawer v-model="drawer" absolute temporary right>
          <v-list>
            <v-list-item to="/">
              Home
            </v-list-item>
            <v-list-item to="about">
              About
            </v-list-item>
            <v-list-item to="items">
              Items
            </v-list-item>

            <!-- Mobile menu - logged in user -->
            <div v-if="$store.state.loggedIn">
              <v-list-item to="/account">
                Account
              </v-list-item>
            </div>

            <!-- Mobile menu - bottom -->
            <v-list-item id="bottom">
              <v-list-item-content>
                <div v-if="!$store.state.loggedIn">
                  <v-list-item-title>
                    <v-btn depressed rounded id="login-sm" to="/login">Login</v-btn>
                  </v-list-item-title>
                  <v-list-item-title>
                    <v-btn depressed rounded id="signup-sm" to="/register">Sign Up</v-btn>
                  </v-list-item-title>
                </div>
                <v-list-item-title>
                  <v-btn v-if="$store.state.loggedIn" depressed rounded id="logout-sm" @click="logout()">Logout
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
    </v-toolbar>
  </div>
</template>

<script>
  // import axios from '@/config'
  //import SearchBar from '@/components/SearchBar'

  import {
    mapActions,
    mapState
  } from 'vuex'

  export default ({
    components: {
      //SearchBar
    },
    data() {
      return {
        drawer: false
      }
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    mounted() {
      // this.getUserDashboard()
    },
    methods: {
      ...mapActions(['logout']),
      //   getUserDashboard() {
      //     axios.get(`/users`)
      //       .then((response) => {
      //         console.log(response.data)
      //         this.user = response.data
      //       })
      //       .catch(error => console.log(error))
      //   }
    }
  })
</script>


<style scoped>
  router-link,
  a {
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
    color: #000 !important;
  }

  #title {
    text-transform: uppercase !important;
    color: #000 !important;
  }

  .v-toolbar__items {
    vertical-align: middle;
  }

  #user {
    /* background-color: rgba(0, 0, 0, 0.06); */
    width: 140px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  .v-menu__content {
    box-shadow: none;
    /* background-color: #c0c0c0; */
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .v-list {
    padding: 0px !important;
  }
</style>