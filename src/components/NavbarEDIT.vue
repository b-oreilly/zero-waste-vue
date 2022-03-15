<template>
  <div>
    <v-toolbar flat>
      <!-- Desktop Navbar -->


      <!-- Desktop Navbar - Left side - Site Name/Home -->
      <v-col cols="4">
        <div class="hidden-xs-only">
          <router-link to="/" class="d-flex justify-start">
            <v-toolbar-title id="title">
              Zero Waste
            </v-toolbar-title>
          </router-link>
        </div>

        <!-- Mobile Navbar - Left side - Search -->
        <div class="hidden-sm-and-up">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </v-col>

      <!-- Mobile Navbar - Centre - Site Name/Home -->
      <v-col class="d-flex justify-space-around">
        <div class="hidden-sm-and-up">
          <router-link to="/">
            <v-toolbar-title id="title">
              Zero Waste
            </v-toolbar-title>
          </router-link>
        </div>

        <!-- Desktop Navbar - Center - Nav items -->
        <v-toolbar-items>
          <div class="hidden-xs-only">
            <div class="nav-items">
              <!-- Fix to underline -->
              <v-btn text to="/items">Items</v-btn>
              <v-btn text to="/about">About</v-btn>
            </div>
          </div>
        </v-toolbar-items>
      </v-col>

      <!-- Desktop Navbar - Right side - Login / User account options -->
      <v-col cols="4" class="d-flex justify-end">
        <v-toolbar-items>
          <div v-if="!$store.state.loggedIn">
            <v-btn depressed rounded id="signup" to="/register">Sign Up</v-btn>
            <v-btn depressed rounded id="login" to="/login">Log in</v-btn>
          </div>

          <div v-if="$store.state.loggedIn">
            <v-menu flat text offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="justify-center" text id="user" v-bind="attrs" v-on="on">
                  User &nbsp; <v-icon>mdi-menu-down</v-icon>
                </v-btn>
              </template>

              <v-list text>
                <v-list-item to="/account">
                  <v-list-item-title class="itemTitle">
                    Account
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="justify-center">
                  <v-btn depressed rounded id="logout" @click="logout()">Logout</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-toolbar-items>


        <!-- Mobile Navbar - Right side - Hamburger -->
        <div class="hidden-sm-and-up">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>




          <!-- Mobile menu - items -->
          <!-- <v-col cols="3" class="d-flex justify-end"> -->
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
        </div>
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
        drawer: false,
      }
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    methods: {
      ...mapActions(['logout']),
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