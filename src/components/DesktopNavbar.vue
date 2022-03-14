<template>
  <div>
    <v-toolbar flat>
      <!-- Left side - Site name/home -->
      <v-col cols="4">
        <router-link to="/" class="d-flex justify-start">
          <v-toolbar-title id="title">
            Zero Waste
          </v-toolbar-title>
        </router-link>
      </v-col>

      <!-- Center - Nav items -->
      <v-col class="d-flex justify-space-around">
        <v-toolbar-items>
          <div class="nav-items">
            <v-toolbar-item>
              <v-btn text to="items">Items</v-btn>
            </v-toolbar-item>
            <v-toolbar-item>
              <v-btn text to="about">About</v-btn>
            </v-toolbar-item>

          </div>
        </v-toolbar-items>
      </v-col>

      <!-- Right side - Login / User account options -->
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
                <v-list-item to="account">
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
      </v-col>
    </v-toolbar>


  </div>
</template>

<script>
  // import axios from '@/config'
  // import SearchBar from '@/components/SearchBar'

  import {
    mapActions,
    mapState
  } from 'vuex'

  export default ({
    components: {
      // SearchBar
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