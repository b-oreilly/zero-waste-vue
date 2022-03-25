<template>
  <div>
    <v-toolbar flat>
      <!-- Left side - Site name/home -->
      <v-col cols="3">
        <router-link to="/" class="d-flex justify-start">
          <v-toolbar-title id="title">
            Zero Waste
          </v-toolbar-title>
        </router-link>
      </v-col>

      <!-- Center - Nav items -->
      <v-col class="d-flex justify-space-around">
        <v-toolbar-items>
          <div>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text plain :ripple="false" id="nav-item" active-class="nav-item" to="/items" v-bind="attrs"
                  v-on="on">Items</v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <router-link to="/items/category/all">
                    <v-list-item-title>Categories</v-list-item-title>
                  </router-link>
                  <v-list>
                    <v-list-item>
                    </v-list-item>
                  </v-list>
                </v-list-item>
                <v-list-item>
                  <router-link to="/items/quality/all">
                    <v-list-item-title>Qualities</v-list-item-title>
                  </router-link>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn text plain :ripple="false" id="nav-item" active-class="nav-item" to="/about">About</v-btn>
          </div>
        </v-toolbar-items>
      </v-col>

      <!-- Right side - Login / User account options -->
      <v-col cols="3" class="d-flex justify-end">
        <v-toolbar-items>
          <div v-if="!$store.state.loggedIn">
            <v-btn depressed rounded id="signup" to="/register">Sign Up</v-btn>
            <v-btn depressed rounded id="login" to="/login">Log in</v-btn>
          </div>

          <div v-if="$store.state.loggedIn">
            <v-menu text offset-y class="">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="justify-center mt-2" text rounded id="user" v-bind="attrs" v-on="on" :ripple="false">
                  User &nbsp; <v-icon>mdi-menu-down</v-icon>
                </v-btn>
              </template>

              <v-list text>
                <v-list-item to="/account">
                  <v-list-item-title class="itemTitle">
                    Account
                  </v-list-item-title>
                </v-list-item>
                <!-- <router-link :to="{ name: 'viewUser', params: { id:item.userID._id }}">
                  <p v-if="item.userID.username"> {{ item.userID.username }}</p>
                </router-link> -->
                <v-list-item>
                  <v-list-item-title class="itemTitle">
                    <router-link :to="{ name: 'viewUserItems', params: { id: user._id }}">
                      Your Items
                    </router-link>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="justify-center">
                  <v-btn depressed rounded id="logout" class="mb-2" @click="logout()">Logout</v-btn>
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
    data() {
      return {
        user: {}
      }
    },
    components: {
      // SearchBar
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    mounted() {
      this.getUserDetails();
      // this.getUserItems();
    },
    methods: {
      ...mapActions(['logout']),
      getUserDetails() {
        if (localStorage.getItem("user")) {
          this.user = JSON.parse(localStorage.getItem("user"))
        }
      },
      // getUserItems() {
      //   axios.get(`/items/user/${this.$route.params.id}`)
      //     .then((response) => {
      //       console.log(response.data)
      //       // this.user = response.data
      //     })
      //     .catch(error => console.log(error))
      // }
    }
  });
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
    /* padding-bottom: 10px; */
    height: 55px;
    /* border-top-left-radius: 20px;
    border-top-right-radius: 20px; */
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

  /* #nav-item:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0px !important;
    content: "";
    display: block;
    height: 1.5px;
    left: 0%;
    position: absolute;
    background: #000;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  #nav-item:hover:after {
    width: 100%;
    left: 0;
  } */

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
</style>