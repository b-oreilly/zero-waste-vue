<template>
  <div>
    <v-toolbar flat>
      <router-link to="/">
        <v-toolbar-title>
          Zero Waste
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <!-- mobile menu button -->
      <!-- <span class="hidden-sm-and-up">
        <v-btn text @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </span> -->
      <!-- desktop & tablet menu -->
      <v-toolbar-items class="hidden-xs-only">
        <div v-if="$store.state.loggedIn" class="nav">
          <v-btn to="/about" text>
            About
          </v-btn>
          <v-btn to="/items" text>
            Items
          </v-btn>
          <!-- <v-btn to="/" text>
          </v-btn> -->
        </div>
        <div v-if="!$store.state.loggedIn">
          <v-btn depressed rounded id="login" to="login">Login</v-btn>
          <v-btn depressed rounded id="signup" to="register">Sign Up</v-btn>
        </div>
        <v-btn v-if="$store.state.loggedIn" depressed rounded id="logout" @click="logout()">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- mobile menu -->
    <!-- <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-item v-if="!$store.state.loggedIn" to="/">
          <v-icon>mdi-home</v-icon>&nbsp;
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
            <v-list-item-title>
              <v-btn v-if="$store.state.loggedIn" depressed rounded id="logout-sm" @click="logout()">Logout</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
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
        options: [{
            title: 'About',
            link: 'about',
            // icon: 'school'
          },
          {
            title: 'Items',
            link: 'items',
            // icon: 'human-male-board'
          }
          // {
          //   title: 'Enrolments',
          //   link: 'enrolments',
          //   icon: 'page-next-outline'
          // }
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


<style>

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

  .nav {
    height: 100% !important;
    width: 100%;
    margin-top: 15px;
    margin-right: 10px;
  } */
</style>