<template>
  <div>
    <v-toolbar flat>
      <v-col cols="3">

        <!-- Left side - Search bar -->
        <v-toolbar-items class="hidden-xs-only vertical-align-center mb-2">
          <!-- <v-text-field clearable filled rounded class="d-flex justify-start" align="center" id="search">
            <v-icon> mdi-magnify </v-icon>
          </v-text-field> -->
          <SearchBar />
        </v-toolbar-items>

        <!-- Left side - Mobile search button -->
        <v-btn icon class="hidden-sm-and-up">
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
      </v-col>

      <!-- Center - Site name/home -->
      <v-col class="d-flex justify-space-around">
        <router-link to="/">
          <v-toolbar-title id="title">
            Zero Waste
          </v-toolbar-title>
        </router-link>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">

        <!-- Mobile menu button -->
        <span class="hidden-sm-and-up">
          <v-btn text rounded @click.stop="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </span>

        <!-- Desktop & tablet menu -->
        <v-toolbar-items class="hidden-xs-only">
          <div v-if="$store.state.loggedIn" class="nav">
          </div>
          <div v-if="!$store.state.loggedIn">
            <v-btn depressed rounded id="login" to="/login">Log in</v-btn>
            <!-- <v-btn depressed rounded id="signup" to="register">Sign Up</v-btn> -->
          </div>

          <!-- Right side - Login / User account options -->
          <div v-if="$store.state.loggedIn">
            <v-menu flat text offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="justify-center" text id="user" v-bind="attrs" v-on="on">
                  User &nbsp;<v-icon class="justify-center">mdi-menu-down</v-icon>
                </v-btn>
              </template>

              <v-list text>
                <v-list-item v-for="userItem in userItems" :key="userItem.title" :to="userItem.link">
                  <v-list-item-title>{{ userItem.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <!-- <v-list-item-title>
                    <router-link class="itemTitle" :to="{ name: 'account', params: { id: user._id }}">
                      Account
                    </router-link>
                  </v-list-item-title> -->

                </v-list-item>
                <v-list-item class="justify-center">
                  <v-btn depressed rounded id="logout" @click="logout()">Logout</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-toolbar-items>
      </v-col>
    </v-toolbar>

    <!-- Mobile menu - items -->
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-item v-if="!$store.state.loggedIn" to="/">
          Home
        </v-list-item>
        <div v-if="$store.state.loggedIn">
          <v-list-item to="/">
            Home
          </v-list-item>
          <v-list-item v-for="userItem in userItems" :key="userItem.title" :to="userItem.link">
            <v-list-item-title>{{ userItem.title }}</v-list-item-title>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-title :to="{ name: 'account', params: { id: user._id}}"></v-list-item-title>
          </v-list-item> -->
          <v-list-item v-for="siteItem in siteItems" :key="siteItem.title" :to="siteItem.link" link>
            <v-list-item-title>{{ siteItem.title }}</v-list-item-title>
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
              <v-btn v-if="$store.state.loggedIn" depressed rounded id="logout-sm" @click="logout()">Logout</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import axios from '@/config'
  import SearchBar from '@/components/SearchBar'

  import {
    mapActions,
    mapState
  } from 'vuex'

  export default ({
    components: {
      SearchBar
    },
    data() {
      return {
        drawer: false,
        // siteItems: [{
        //     title: 'About',
        //     link: '/about',
        //   },
        //   {
        //     title: 'Items',
        //     link: '/items',
        //   }
        // ],
        // userItems: [{
        //   title: 'Account',
        //   link: '/account/:id',
        // },
        // {
        //   title: 'Your items',
        //   link: '/items',
        // }]
      }
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    mounted() {
      this.getUserDashboard()
    },
    methods: {
      ...mapActions(['logout']),
      getUserDashboard() {
        axios.get(`/users`)
          .then((response) => {
            console.log(response.data)
            this.user = response.data
          })
          .catch(error => console.log(error))
      }
    }
  })
</script>


<style scoped>
  router-link,
  a {
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
  }

  #title {
    text-transform: uppercase !important;
    color: #000 !important;

  }

  .nav {
    height: 80% !important;
    width: 100%;
    margin-right: 10px;
  }

  .v-toolbar__items {
    vertical-align: middle;
  }

  v-btn,
  #login,
  #signup,
  #logout {
    font-size: 12px !important;
    border-radius: 25px !important;
    height: 35px !important;
    width: 100px !important;
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

  .v-input__slot,
  #search {
    min-height: 15px !important;
    height: 15px !important;
  }

  .v-text-field--filled .v-input__control .v-input__slot {
    height: auto;
  }

  .v-list {
    padding: 0px !important;
  }

  .v-text-field {
    height: 30px;
  }
</style>