<template>
  <div>
    <v-toolbar flat>
      <v-col cols="3">
        <!-- Mobile - left - Site title/home -->
        <div class="hidden-sm-and-down">
          <router-link to="/" class="d-flex justify-start">
            <v-toolbar-title id="site-name">
              Wastenot
            </v-toolbar-title>
          </router-link>
        </div>

        <!-- Mobile - Search bar -->
        <div class="hidden-md-and-up">
          <div class="d-flex justify-start">
            <v-btn icon to="/search">
              <v-icon> mdi-magnify </v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col class="d-flex justify-space-around">

        <!-- Desktop center - Nav items -->
        <div class="hidden-sm-and-down">
          <v-toolbar-items>
            <div>
              <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text plain active-class="nav-item" :ripple="false" id="nav-item" to="/items" v-bind="attrs"
                    v-on="on">Items &nbsp; <v-icon>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item to="/items/category/all">
                    Categories</v-list-item>
                  <v-list-item to="/items/quality/all">
                    Qualities
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn text plain :ripple="false" id="nav-item" active-class="nav-item" to="/about">About</v-btn>
            </div>
          </v-toolbar-items>
        </div>

        <!-- Mobile center - Site title/home -->
        <div class="hidden-md-and-up">
          <router-link to="/" id="site-name">
            <v-toolbar-title>
              WasteNot
            </v-toolbar-title>
          </router-link>
        </div>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <!-- mobile menu button -->
        <span class="hidden-md-and-up justify-center">
          <v-btn icon @click.stop="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </span>
        <!-- Desktop menu -->
        <v-toolbar-items class="hidden-sm-and-down">
          <div class="d-flex justify-start">
            <v-btn icon to="/search">
              <v-icon> mdi-magnify </v-icon>
            </v-btn>
          </div>
          <div v-if="!$store.state.loggedIn">
            <v-btn depressed rounded class="mr-2" id="login" to="/login">Log in</v-btn>
            <v-btn depressed rounded id="signup" to="/register">Sign Up</v-btn>
          </div>

          <div v-if="$store.state.loggedIn">
            <v-menu text offset-y open-on-hover class="">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon id="user" v-bind="attrs" v-on="on" :ripple="false">
                  <!-- <div class="d-flex justify-start"> -->
                    <v-avatar size="40">
                      <v-img
                        src="https://repository-images.githubusercontent.com/130118224/a2c75780-e0a9-11eb-8494-3581a0b1c93b">
                      </v-img>
                    </v-avatar>
                  <!-- </div>  &nbsp;-->
                </v-btn>
              </template>

              <v-list text>
                <v-list-item to="/account">
                  Account
                </v-list-item>
                <v-list-item :to="{ name: 'viewUserItems', params: { id: user._id }}">
                  Your Items
                </v-list-item>
                <v-list-item to="/user/messages">
                  Messages
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

    <!-- Mobile menu -->
    <v-row cols=10>
      <v-navigation-drawer v-model="drawer" absolute temporary right>
        <v-list>
          <v-list-item to="/">
            Home
          </v-list-item>
          <v-list-item to="/about">
            About
          </v-list-item>
          <v-list-item to="/items">
            Items
          </v-list-item>
          <v-list-item to="/items/category/all" class="pl-10">
            Categories
          </v-list-item>
          <v-list-item to="/items/quality/all" class="pl-10">
            Qualities
          </v-list-item>
          <!-- Mobile menu - logged in user -->
          <div v-if="$store.state.loggedIn">
            <hr>
            <v-list-item to="/account">
              Account
            </v-list-item>
            <v-list-item class="itemTitle" :to="{ name: 'viewUserItems', params: { id: user._id }}">
              Your Items
            </v-list-item>
            <v-list-item class="itemTitle" to="/user/messages">
              Messages
            </v-list-item>
          </div>


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
    </v-row>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState
  } from 'vuex'

  export default ({
    data() {
      return {
        user: {},
        drawer: false,
      }
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    mounted() {
      this.getUserDetails();
    },
    methods: {
      ...mapActions(['logout']),
      getUserDetails() {
        if (localStorage.getItem("user")) {
          this.user = JSON.parse(localStorage.getItem("user"))
        }
      }
    }
  })
</script>


<style scoped>
  #nav {
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
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
    /* width: 110px !important; */
  }

  #user {
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .v-menu__content {
    box-shadow: none;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .v-list {
    background-color: #f0f0f0 !important;
    opacity: 0.95;
  }

  .nav-item {
    border: solid;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  #nav-item:before {
    display: none;
  }

  .v-navigation-drawer {
    z-index: 999999 !important;
    height: 100vh !important;
    touch-action: auto;
  }

  #bottom {
    margin-top: 0px;
    position: absolute;
    bottom: 0 !important;
    width: 100%;
  }
</style>