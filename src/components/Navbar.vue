<template>
  <div>
    <v-toolbar flat>
      <v-col cols="2">
        <!-- Search bar -->
        <v-btn icon>
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
      </v-col>
      <v-col class="d-flex justify-space-around">
        <router-link to="/">
          <v-toolbar-title>
            Zero Waste
          </v-toolbar-title>
        </router-link>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <!-- mobile menu button -->
        <span class="hidden-sm-and-up">
          <v-btn text rounded @click.stop="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </span>
        <!-- desktop & tablet menu -->
        <v-toolbar-items class="hidden-xs-only">
          <div v-if="$store.state.loggedIn" class="nav">
          </div>
          <div v-if="!$store.state.loggedIn">
            <v-btn depressed rounded id="login" to="login">Log in</v-btn>
            <!-- <v-btn depressed rounded id="signup" to="register">Sign Up</v-btn> -->
          </div>

          <div v-if="$store.state.loggedIn">
            <v-menu offset-y :rounded="rounded">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text rounded id="edit" v-bind="attrs" v-on="on">
                  User
                </v-btn>
              </template>

              <v-list text>
                <v-list-item v-for="userItem in userItems" :key="userItem.title" :to="userItem.link">
                  <v-list-item-title>{{ userItem.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item class="d-flex justify-space-around">
                  <v-btn depressed rounded id="logout" @click="logout()">Logout</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>


        </v-toolbar-items>
      </v-col>
    </v-toolbar>

    <!-- mobile menu -->
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-item v-if="!$store.state.loggedIn" to="/">
          <!-- <v-icon>mdi-home</v-icon>&nbsp; -->
          Home
        </v-list-item>
        <div v-if="$store.state.loggedIn">
          <v-list-item v-for="option in options" :key="option.title" :to="option.link" link>
            <v-list-item-icon>
              <v-icon>mdi-{{ option.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ option.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>


        <v-list-item id="bottom">
          <v-list-item-content>
            <div v-if="!$store.state.loggedIn">
              <v-list-item-title>
                <v-btn depressed rounded id="login-sm" to="login">Login</v-btn>
              </v-list-item-title>
              <v-list-item-title>
                <v-btn depressed rounded id="signup-sm" to="register">Sign Up</v-btn>
              </v-list-item-title>
            </div>
            <v-list-item-title >
              <v-btn v-if="$store.state.loggedIn" depressed rounded id="logout-sm" @click="logout()">Logout</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
        drawer: false,
        siteItems: [{
            title: 'About',
            link: 'about',
          },
          {
            title: 'Items',
            link: 'items',
          }
        ],
        userItems: [{
            title: 'Account',
            link: 'account',
          },
          {
            title: 'Your items',
            link: 'items',
          }
          // {
          //   title: 'Click Me 2'
          // },
        ]
      }
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    methods: {
      ...mapActions(['logout'])
    }
  })
</script>


<style scoped>
  router-link,
  toolbar-title,
  a {
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
    color: #000 !important;
    text-transform: uppercase;
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

  /* 
  #login {
    background-color: #fff;
    font-size: 12px;
    border-radius: 25px;
    height: 45px !important;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
  }

  #signup {
    background-color: #EB6F99;
    color: #fff !important;
    border-radius: 25px;
    height: 45px !important;
    margin-top: 10px;
  }

  #logout {
    background-color: #153AB0;
    color: #fff !important;
    border-radius: 25px;
    height: 45px !important;
    margin-top: 10px;
  }

  #login-sm {
    background-color: #fff;
    border-radius: 25px;
    height: 45px !important;
    width: 100%;
    margin-top: 10px;
  }

  #signup-sm {
    background-color: #EB6F99;
    color: #fff !important;
    border-radius: 25px;
    height: 45px !important;
    width: 100%;
    margin-top: 10px;
    margin-right: 10px;
  }

  #logout-sm {
    background-color: #004FFF;
    color: #fff !important;
    border-radius: 25px;
    height: 45px !important;
    width: 100%;
    margin-top: 10px;
    margin-right: 10px;
  }

  #bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
 */
</style>